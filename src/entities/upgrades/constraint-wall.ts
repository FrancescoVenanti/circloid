import GlobalMixin from "@/src/mixins/global";
import Upgrade, { IUpgrade } from "./upgrades";

interface IConstraintWall extends IUpgrade<number> {
  // angle: number;
}

class ConstraintWall extends GlobalMixin(Upgrade<number>) {
  private _angle: number;
  public get angle() {
    return this._angle;
  }
  public get value() {
    return this._value;
  }
  constructor({ ...props }: IConstraintWall) {
    super(props);
    this._angle = 0;
  }

  public update(): void {
    this._angle = (this._angle + Math.PI / 360) % (Math.PI * 2);
  }
  public upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += (Math.PI / 180) * 27;
    this.decreaseCredits();
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
      strokeStyle: "blue",
      lineWidth: 10,
    });
  }
}

export default ConstraintWall;
