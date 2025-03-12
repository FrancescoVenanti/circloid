import { IMovingEntity } from "@/src/core/moving-entity";
import Polygon from "@/src/core/shape/polygon";
import Vector from "@/src/core/vector";
import { DEGREE, ROUND } from "@/src/utils";
import PolygonEnemy from "./polygon-enemy";

class SquareEnemy extends PolygonEnemy {
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
        radius: 20,
        vect,
      }),
    });
  }

  public update(): void {
    super.update();
    this.shape.rotationAngle += DEGREE / 2;
    this.shape.rotationAngle %= ROUND;
  }
}
export default SquareEnemy;
