import Upgrade, { IUpgrade } from "./upgrades";
class LifeUpgrade extends Upgrade<number> {
  public get value() {
    return this._value;
  }
  public set value(newValue: number) {
    this._value = newValue;
    this._level = newValue;
  }

  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "lifeUpgrade" });
    this._level = this._value;
  }

  public override update(): void {}

  public override upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value++;
    this.decreaseCredits();
    this.sound.play("upgrade");
    return true;
  }
}

export default LifeUpgrade;
