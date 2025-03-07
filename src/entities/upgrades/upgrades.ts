import GlobalMixin from "@/src/mixins/global";
import { KeyboardMixin } from "@/src/mixins/keyboard";
import { Drawable } from "roughjs/bin/core";
import Entity, { IEntity } from "../../core/entity";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";
import Explosion from "../effects/explosion";

export interface IUpgrade<T> extends Omit<IEntity<Rect>, "shape"> {
  level?: number;
  maxLevel: number;
  cost: number;
  costMultiplier?: number;
  vector: Vector;
  initialValue: T;
  label: string;
  keyPress: string;
  color?: string;
}

abstract class Upgrade<T> extends KeyboardMixin(GlobalMixin(Entity<Rect>)) {
  protected _value: T;
  protected _level: number;
  protected _maxLevel: number;
  protected _cost: number;
  protected _costMultiplier: number;
  protected initialValue: Upgrade<T>;
  protected _color: string;
  protected label: string;
  protected keyPress: string;
  private drawable: Drawable;

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

  public get isMaxLevel() {
    return this._level == this._maxLevel;
  }
  public get color() {
    return this._color;
  }

  constructor({
    initialValue,
    level,
    maxLevel,
    cost,
    costMultiplier,
    label,
    keyPress,
    color,
    ...props
  }: IUpgrade<T>) {
    const shape = new Rect({ vect: props.vector, width: 40, height: 40 });
    super({ ...props, shape });
    this._value = initialValue;
    this._level = level || 0;
    this._maxLevel = maxLevel;
    this._cost = cost;
    this._costMultiplier = costMultiplier || 1;
    this.label = label;
    this.keyPress = keyPress;
    this._color = this.getCurrentStyle()["color"];
    color && (this._color = color);
    this.initialValue = JSON.parse(JSON.stringify(this));
    this.drawable = this.drawer.sketchy.rect(
      new Rect({
        vect: this.shape.vector.clone().addX(100),
        height: 40,
        width: 40,
      })
    );
  }

  public reset(): void {
    const { _cost, _level, _maxLevel, _value, _costMultiplier } =
      this.initialValue;
    Object.assign(this, { _cost, _level, _maxLevel, _value, _costMultiplier });
  }

  public decreaseCredits() {
    const player = this.global("player");
    if (!player) return;
    player.credits -= this.cost;
  }

  public override draw(): void {
    this.drawRect();
    this.text(this.label, this.shape.vector.clone().addY(60).addX(120), {
      textAlign: "center",
    });
    this.text(
      "Cost: " + this.cost.toString(),
      this.shape.vector.clone().addY(80).addX(120),
      {
        textAlign: "center",
      }
    );
  }

  public override onKeyDown(e: KeyboardEvent): void {
    if (e.key !== this.keyPress) return;
    this.upgrade();
  }

  protected drawRect(): void {
    const vect = this.shape.vector.clone().addX(100);
    this.with(() => this.drawer.sketchy.draw(this.drawable), {
      fill: false,
      strokeStyle: this.color,
    });
    this.with(
      () =>
        this.fillRect(
          new Rect({
            vect,
            height: 40,
            width: (this._level / this._maxLevel) * 40,
          })
        ),
      {
        fill: true,
        fillStyle: this.color,
      }
    );
    this.text(this.keyPress, vect.addX(20).addY(5), {
      textAlign: "center",
      font: "40px monospace",
    });
  }

  public override update() {}

  public upgrade(): boolean {
    if (!this.canUpgrade()) return false;

    this._level++;
    this._cost = Math.floor(this._cost * this._costMultiplier);
    new Explosion(this.shape.vector.clone().addX(120).addY(20), [this._color]);
    return true;
  }

  public canUpgrade(): boolean {
    const player = this.global("player")!;

    return player.credits >= this._cost && !this.isMaxLevel;
  }
}

export default Upgrade;
