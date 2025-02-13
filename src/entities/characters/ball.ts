import Drawer from "../../core/drawer";
import Entity from "../../core/entity";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";

class Ball extends Entity {
  constructor(
    zIndex: number,
    radius: number,
    vector: Vector,
    public direction: Vector
  ) {
    super(zIndex, new Circle(vector, radius));
  }

  public static spawn(amount: number): void {
    for (let i = 0; i < amount; i++) {
      let vector = Vector.generateRandom();
      let direction = Vector.generateRandom();
      direction.mul(new Vector(0.01, 0.01));
      new Ball(1, 5, vector, direction).store();
    }
  }

  public override draw(): void {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "white",
      strokeStyle: "white",
      style: "white",
    });
  }

  public override update(): void {
    this.shape.vector.add(this.direction);
  }
}

export default Ball;
