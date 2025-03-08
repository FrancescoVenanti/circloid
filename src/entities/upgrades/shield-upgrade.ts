import Circle from "@/src/core/shape/circle";
import sound from "@/src/core/sound";
import Vector from "@/src/core/vector";
import GlobalMixin from "@/src/mixins/global";
import Upgrade, { IUpgrade } from "./upgrades";

interface IShieldUpgrade extends IUpgrade<number> {
  rotationSpeed?: number;
  radius?: number;
  padding: number;
}

class ShieldUpgrade extends GlobalMixin(Upgrade<number>) {
  private angle: number;
  private rotationSpeed: number;
  private radius: number;
  private padding: number;
  public get value() {
    return this._value;
  }
  constructor({ rotationSpeed, padding, radius, ...props }: IShieldUpgrade) {
    super({ ...props, key: "shieldUpgrade" });
    this.angle = 0;
    this.rotationSpeed = (Math.PI / 180) * (rotationSpeed || 1);
    this.radius = radius || 5;
    this.padding = padding || 0;
  }
  public update() {
    this.angle += this.rotationSpeed;
    this.angle %= Math.PI * 2;
  }
  public upgrade() {
    if (!super.upgrade()) return false;
    this._value++;
    this.decreaseCredits();
    sound.play("upgrade").play();
    return true;
  }
  public draw() {
    super.draw();
    const shields = this.getShields();
    shields.forEach((b) => this.drawBall(b));
  }
  private drawBall({ vector, radius }: Circle) {
    this.with(() => this.drawer.arc(vector, radius), {
      ...this.style,
      fill: true,
      fillStyle: "violet",
    });
  }
  public getShields(): Circle[] {
    const result: Circle[] = [];
    const { vector, radius } = this.global("player")!.shape;
    const angle = (Math.PI * 2) / this._value;
    let vect = Vector.zero;
    for (let i = 0; i < this._value; i++) {
      vect = Vector.fromAngle(angle * i + this.angle)
        .mulScalar(radius + this.padding)
        .add(vector);
      result.push(new Circle({ radius: this.radius, vect }));
    }
    return result;
  }
  public downgrade() {
    this._level--;
    this._value--;
  }
}

export default ShieldUpgrade;
