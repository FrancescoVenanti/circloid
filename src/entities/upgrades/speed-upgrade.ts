import Canvas from "@/src/core/canvas";
import Drawer from "@/src/core/drawer";
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
    this.style = {
      fillStyle: "orange",
      fill: true,
      strokeStyle: "orange",
    };
  }

  public override update(): void {}

  public override upgrade(): boolean {
    if (!super.upgrade()) return false;
    this._value++;
    return true;
  }
}

export default SpeedUpgrade;
