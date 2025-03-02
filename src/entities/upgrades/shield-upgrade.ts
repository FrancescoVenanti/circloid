import Vector from "@/src/core/vector";
import GlobalMixin from "@/src/mixins/global";
import Upgrade, { IUpgrade } from "./upgrades";

interface IShieldUpgrade extends IUpgrade<number> {
  angle?: number;
  vect: Vector;
  radius: number;
}

class ShieldUpgrade extends GlobalMixin(Upgrade<number>) {
  private angle: number;
  private vect: Vector;
  private radius: number;
  public get value() {
    return this._value;
  }
  constructor({ angle, vect, radius, ...props }: IShieldUpgrade) {
    super(props);
    this.angle = angle || 0;
    this.vect = vect;
    this.radius = radius;
  }
  public update(): void {
    const player = this.global("player");
    if (!player) return;
    this.vect = player.shape.vector;
    this.angle *= Math.cos(this.angle - player.angle);
  }
  public upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += 10;
    return true;
  }
  public draw(): void {
    const start = this.angle - this._value / 2;
    const end = this.angle + this._value / 2;
    this.arc(this.vect, this.radius, { start, end });
  }
}

export default ShieldUpgrade;
