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

  public static spawn(amount: number): void {
    for (let i = 0; i < amount; i++) {
      let vector = Vector.generateRandom();
      let direction = Vector.generateRandom();
      direction.mul(new Vector(0.01, 0.01));
      new Ball(1, 5, vector, Math.PI / 4, 2).store();
    }
  }

  public override draw(): void {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "white",
      strokeStyle: "white",
      style: "white",
    });
  }

  private tempAngle = Math.random() - 0.5;

  public override update(): void {
    const direction = Vector.fromAngle(this.angle);
    direction.mul(new Vector(this.speed, this.speed));
    this.shape.vector.add(direction);
    this.angle += this.tempAngle / 200;
  }
}

export default Ball;
