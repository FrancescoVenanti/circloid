import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import Entity from "../../core/entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";

class Ball extends Entity {
  constructor(
    zIndex: number,
    radius: number,
    vector: Vector,
    public angle: number,
    public speed: number
  ) {
    super(zIndex, new Circle(vector, radius));
  }

  public static spawnAmount(amount: number): void {
    for (let i = 0; i < amount; i++) {
      Ball.spawn();
    }
  }

  public static spawn() {
    const constraint = Canvas.instance.get("constraint");
    if (!constraint || !(constraint.shape instanceof Circle)) return;

    const randomPoint = Canvas.instance.rect.randomPointFromBorder();
    // const randomPoint = new Vector(0, 0);

    const [min, max] = constraint.shape.tangentsFromVector(randomPoint);

    if (!min) return;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    new Ball(0, 10, randomPoint, angle, 6).store();
  }

  public override draw(): void {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "coral",
      strokeStyle: "coral",
      fill: true,
    });
  }

  public override update(): void {
    if (!Canvas.instance.rect.containsVector(this.shape.vector, -10))
      return this.destroy();
    const direction = Vector.fromAngle(this.angle);
    direction.mul(new Vector(this.speed, this.speed));
    this.shape.vector.add(direction);
  }
}

export default Ball;
