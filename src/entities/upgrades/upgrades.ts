import Entity, { IEntity } from "../../core/entity";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";

export interface IUpgrade extends Omit<IEntity<Rect>, "shape"> {
  level: number;
  maxLevel: number;
  cost: number;
  costMultiplier: number;
  vector: Vector;
}

abstract class Upgrade extends Entity<Rect> {
  constructor(props: IUpgrade) {
    const shape = new Rect(props.vector, 40, 40);
    super({ ...props, shape });
  }

  public override update() {}

  public abstract upgrade(): void;
}

export default Upgrade;
