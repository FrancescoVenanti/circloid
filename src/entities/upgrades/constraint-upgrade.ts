import Upgrade, { IUpgrade } from "./upgrades";

class ConstraintUpgrade extends Upgrade<number> {
  private initialValues: ConstraintUpgrade;
  public get value() {
    return this._value;
  }
  public set value(newValue: number) {
    this._value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "constraintUpgrade" });
    this.style = {
      fillStyle: "lightblue",
      fill: true,
      strokeStyle: "lightblue",
    };
    this.initialValues = JSON.parse(JSON.stringify(this));
  }

  public override update(): void {}

  public override upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += 5;
    return true;
  }

  public decreaseCredits() {
    const player = this.global("player");
    if (!player) return;
    player.credits -= this._cost;
  }
}

export default ConstraintUpgrade;
