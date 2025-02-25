import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";

class SpeedUpgrade extends Upgrade<number> {
  public get valueOf() {
    return this.value;
  }
  public set valueOf(newValue: number) {
    this.value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "speedUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {
    this.value++;
  }

  public draw(): void {
    Drawer.instance.with(() => this.drawSpeed(), {
      strokeStyle: "white",
    });
  }

  private drawSpeed() {
    super.draw();
    Drawer.instance.text("SPEED", this.shape.center, {
      style: "white",
    });
  }
}

export default SpeedUpgrade;
