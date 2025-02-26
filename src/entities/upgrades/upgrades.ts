import Drawer from "@/src/core/drawer";
import Entity, { IEntity } from "../../core/entity";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";
import Canvas from "@/src/core/canvas";
import { AlignCenter } from "lucide-react";

export interface IUpgrade<T> extends Omit<IEntity<Rect>, "shape"> {
  level?: number;
  maxLevel: number;
  cost: number;
  costMultiplier?: number;
  vector: Vector;
  initialValue: T;
  label: string;
  keyPress: string;
}

abstract class Upgrade<T> extends Entity<Rect> {
  protected _value: T;
  protected _level: number;
  protected _maxLevel: number;
  protected _cost: number;
  protected _costMultiplier: number;
  protected initialValue: Upgrade<T>;
  protected label: string;
  protected keyPress: string;

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
    label,
    keyPress,
    ...props
  }: IUpgrade<T>) {
    const shape = new Rect({ vect: props.vector, width: 40, height: 40 });
    super({ ...props, shape });
    this._value = initialValue;
    this._level = level || 0;
    this._maxLevel = maxLevel;
    this._cost = cost;
    this._costMultiplier = costMultiplier || 0;
    this.label = label;
    this.keyPress = keyPress;
    this.initialValue = JSON.parse(JSON.stringify(this));
  }

  public reset(): void {
    // Object.assign(this, this.initialValue);
    const { _cost, _level, _maxLevel, _value, _costMultiplier } =
      this.initialValue;
    Object.assign(this, { _cost, _level, _maxLevel, _value, _costMultiplier });
    // this._cost = this.initialValue._cost;
    // this._level = this.initialValue._level;
    // this._maxLevel = this.initialValue._maxLevel;
    // this._value = this.initialValue._value;
    // this._costMultiplier = this.initialValue._costMultiplier;
  }

  public override draw(): void {
    console.log(this.shape.vector);
    this.drawRect();
    Drawer.instance.text(
      this.label,
      this.shape.vector.clone().addY(60).addX(120),
      {
        textAlign: "center",
      }
    );
  }

  protected drawRect(): void {
    const vect = this.shape.vector.clone().addX(100);

    Drawer.instance.with(
      () =>
        Drawer.instance.rect(
          new Rect({
            vect,
            height: 40,
            width: 40,
          })
        ),
      {
        ...this.style,
        fill: false,
      }
    );
    Drawer.instance.with(
      () =>
        Drawer.instance.fillRect(
          new Rect({
            vect,
            height: 40,
            width: (this._level / this._maxLevel) * 40,
          })
        ),
      {
        ...this.style,
        fill: true,
      }
    );
    Drawer.instance.text(this.keyPress, vect.addX(20).addY(5), {
      textAlign: "center",
      font: "40px monospace",
    });
  }

  public override update() {}

  public upgrade(): boolean {
    if (this._level >= this._maxLevel) return false;
    this._level++;
    this._cost = Math.floor(this._cost * this._costMultiplier);
    return true;
  }
}

export default Upgrade;
