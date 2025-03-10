import { IMovingEntity } from "@/src/core/moving-entity";
import Polygon from "@/src/core/shape/polygon";
import Vector from "@/src/core/vector";
import Enemy from "./enemy";

class SquareEnemy extends Enemy<Polygon> {
  constructor(props: IMovingEntity<Polygon>) {
    super({ ...props, key: "squareEnemy" });
  }
  public draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }
  public static spawn(speedMultiplier: number, vect: Vector, angle: number) {
    return new SquareEnemy({
      angle,
      speed: 2,
      shape: new Polygon({
        angles: 4,
        radius: 20 + speedMultiplier * 2,
        vect,
      }),
    });
  }
  protected checkConstraintCollision(): boolean {
    return false;
  }
  protected checkPlayerCollision(): boolean {
    return false;
  }
  protected checkShieldCollisions(): boolean {
    return false;
  }

  public update(): void {
    super.update();
    this.shape.rotationAngle += Math.PI / 360;
    this.shape.rotationAngle %= Math.PI * 2;
  }
}
export default SquareEnemy;
