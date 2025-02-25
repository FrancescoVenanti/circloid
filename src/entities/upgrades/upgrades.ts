import Entity, { IEntity } from "../../core/entity";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";

export interface IUpgrade<T> extends Omit<IEntity<Rect>, "shape"> {
  level?: number;
  maxLevel: number;
  cost: number;
  costMultiplier?: number;
  vector: Vector;
  initialValue: T;
}

abstract class Upgrade<T> extends Entity<Rect> {
  protected value: T;
  protected level: number;
  protected maxLevel: number;
  protected cost: number;
  protected costMultiplier: number;

  public abstract get valueOf();
  public abstract set valueOf(newValue: T);

  constructor({
    initialValue,
    level,
    maxLevel,
    cost,
    costMultiplier,
    ...props
  }: IUpgrade<T>) {
    const shape = new Rect({ vect: props.vector, witdh: 40, height: 40 });
    super({ ...props, shape });
    this.value = initialValue;
    this.level = level || 0;
    this.maxLevel = maxLevel;
    this.cost = cost;
    this.costMultiplier = costMultiplier || 0;
  }

  public override update() {}

  public abstract upgrade(): void;
}

export default Upgrade;
