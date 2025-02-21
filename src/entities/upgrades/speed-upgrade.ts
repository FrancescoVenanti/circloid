import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";

class SpeedUpgrade extends Upgrade {
  constructor(props: Omit<IUpgrade, "key">) {
    super({ ...props, key: "speedUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {}

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
