import MovingEntity, { IMovingEntity } from "@/src/core/moving-entity";
import Polygon from "@/src/core/shape/polygon";

class SquareEnemy extends MovingEntity<Polygon> {
  constructor(props: IMovingEntity<Polygon>) {
    super(props);
  }
  public draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }
  public update(): void {
    super.update();
    this.shape.rotationAngle += Math.PI / 360;
    this.shape.rotationAngle %= Math.PI * 2;
  }
}
export default SquareEnemy;
