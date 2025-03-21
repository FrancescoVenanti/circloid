import { IMovingEntity } from "@/src/core/moving-entity";
import Polygon from "@/src/core/shape/polygon";
import Vector from "@/src/core/vector";
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
        angles: Math.floor(Math.random() * 2 + 3),
        radius: 20,
        vect,
      }),
    });
  }
}
export default SquareEnemy;
