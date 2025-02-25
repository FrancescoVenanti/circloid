import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";

class LifeUpgrade extends Upgrade<number> {
  public get valueOf() {
    return this.value;
  }
  public set valueOf(newValue: number) {
    this.value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "lifeUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {}

  public draw(): void {
    Drawer.instance.with(() => this.drawLife(), {
      strokeStyle: "white",
    });
  }

  private drawLife() {
    super.draw();
    Drawer.instance.text("LIFE", this.shape.center, {
      style: "white",
    });
  }
}

export default LifeUpgrade;
