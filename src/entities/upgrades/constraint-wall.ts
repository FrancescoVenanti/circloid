import sound from "@/src/core/sound";
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
    super({ ...props, key: "wallUpgrade" });
    this._angle = 0;
  }

  public update(): void {
    this._angle = (this._angle + Math.PI / 360) % (Math.PI * 2);
  }
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Upgrades the constraint wall by increasing its value, which affects the angle.
   * It checks if the upgrade can be performed by calling the superclass's upgrade method.
   * Upon successful upgrade, it increases the value by a fixed angle increment,
   * decreases credits, and plays an upgrade sound.
   */

  /******  d23895b2-98cf-451b-b05d-e37a7c58262f  *******/
  public upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += (Math.PI / 180) * 18;
    this.decreaseCredits();
    sound.play("upgrade").play();
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
}

export default ConstraintWall;
