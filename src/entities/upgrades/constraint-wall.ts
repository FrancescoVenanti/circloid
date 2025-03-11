import GlobalMixin from "@/src/mixins/global";
import Upgrade, { IUpgrade } from "./upgrades";
import { DEGREE } from "@/src/utils";

interface IConstraintWall extends IUpgrade<number> {
  // angle: number;
  radiant: number;
}

class ConstraintWall extends GlobalMixin(Upgrade<number>) {
  private _angle: number;
  private _radiant: number;
  public get angle() {
    return this._angle;
  }
  public get value() {
    return this._value;
  }
  constructor({ radiant, ...props }: IConstraintWall) {
    super({ ...props, key: "wallUpgrade" });
    this._angle = 0;
    this._radiant = DEGREE * radiant;
  }

  public update(): void {
    this._angle = (this._angle + DEGREE / 2) % (Math.PI * 2);
  }
  public upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += this._radiant;
    this.decreaseCredits();
    this.sound.play("upgrade");
    return true;
  }

  public get start() {
    return (this._angle - this._value / 2) % (Math.PI * 2);
  }
  public get end() {
    const baseAngle = this._angle + this._value / 2;
    const angle = baseAngle % (Math.PI * 2);
    if (angle < this.start) {
      return baseAngle;
    }
    return angle;
  }

  public draw(): void {
    super.draw();
    const constraint = this.global("constraint");
    if (!constraint) return;
    const {
      shape: { vector, radius },
    } = constraint;
    const start = this._angle - this._value / 2;
    const end = this._angle + this._value / 2;
    this.drawer.with(() => this.drawer.arc(vector, radius, { start, end }), {
      strokeStyle: this.color,
      lineWidth: 10,
    });
  }
  public downgrade(): void {
    if (this._level <= 0) return;
    this._level--;
    this._value -= this._radiant;
  }
}

export default ConstraintWall;
