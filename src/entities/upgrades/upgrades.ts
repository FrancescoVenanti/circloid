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
  protected _value: T;
  protected _level: number;
  protected _maxLevel: number;
  protected _cost: number;
  protected _costMultiplier: number;

  public abstract get value();
  public abstract set value(newValue: T);
  public get cost() {
    return this._cost;
  }
  public get costMultiplier() {
    return this._costMultiplier;
  }
  public get level() {
    return this._level;
  }
  public get maxLevel() {
    return this._maxLevel;
  }

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
    this._value = initialValue;
    this._level = level || 0;
    this._maxLevel = maxLevel;
    this._cost = cost;
    this._costMultiplier = costMultiplier || 0;
    // this.store();
  }

  public abstract reset(): void;

  public override update() {}

  public abstract upgrade(): void;
}

export default Upgrade;
