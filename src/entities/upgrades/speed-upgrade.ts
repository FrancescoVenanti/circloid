import Upgrade, { IUpgrade } from "./upgrades";

class SpeedUpgrade extends Upgrade<number> {
  public get value() {
    return this._value;
  }
  public set value(newValue: number) {
    this._value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "speedUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): boolean {
    if (!super.upgrade()) return false;

    const player = this.global("player");
    if (!player) return false;

    this._value++;
    player.speed = this._value;

    this.decreaseCredits();

    return true;
  }
}

export default SpeedUpgrade;
