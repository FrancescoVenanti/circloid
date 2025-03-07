import sound from "@/src/core/sound";
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
    this.initialValues = JSON.parse(JSON.stringify(this));
  }

  public override update(): void {}

  public override upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value += 8;
    const constraint = this.global("constraint");
    if (!constraint) return false;
    constraint.shape.radius = this._value;
    this.decreaseCredits();
    sound.play("upgrade").play();
    return true;
  }
}

export default ConstraintUpgrade;
