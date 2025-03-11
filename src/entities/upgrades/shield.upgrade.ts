import { DEGREE, ROUND } from "@/src/utils";
import Upgrade, { IUpgrade } from "./upgrades";

interface IShieldUpgrade extends IUpgrade<number> {
  rotationSpeed?: number;
}

class ShieldUpgrade extends Upgrade<number> {
  private angle: number = DEGREE;
  private rotationSpeed;
  public get value() {
    return this._value;
  }
  constructor({ rotationSpeed, ...props }: IShieldUpgrade) {
    super({ ...props, key: "shieldUpgrade" });
    this.rotationSpeed = rotationSpeed || 0;
  }
  public upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += DEGREE * 18;
    return true;
  }

  private get variance() {
    return this._value / 2;
  }

  public get start() {
    return (this.angle - this.variance) % ROUND;
  }
  public get end() {
    const result = this.angle + this.variance;
    if (this.start < ROUND) {
      return result;
    }
    return result % ROUND;
  }

  public update(): void {
    const player = this.global("player");
    if (!player) return;

    let targetAngle = player.angle;
    if (targetAngle < 0) targetAngle += ROUND;

    let diff = targetAngle - this.angle;

    if (diff > Math.PI) {
      diff -= ROUND;
    } else if (diff < -Math.PI) {
      diff += ROUND;
    }
    const lerpFactor = 0.1;

    this.angle += diff * lerpFactor;

    this.angle = (this.angle + ROUND) % ROUND;
  }

  public draw(): void {
    super.draw();
    const player = this.global("player");
    if (!player) return;
    const vect = player.shape.vector;
    const radius = player.shape.radius;
    this.with(() => this.drawer.arc(vect, radius, this), {
      ...this.style,
      fill: false,
      strokeStyle: this.color,
      lineWidth: 10,
    });
  }
}

export default ShieldUpgrade;
