import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";

class ConstraintUpgrade extends Upgrade {
  constructor(props: Omit<IUpgrade, "key">) {
    super({ ...props, key: "constraintUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {}

  public draw(): void {
    Drawer.instance.with(() => this.drawConstraint(), {
      strokeStyle: "white",
    });
  }

  private drawConstraint() {
    super.draw();
    Drawer.instance.text("CONSTRAINT", this.shape.center, {
      style: "white",
    });
  }
}

export default ConstraintUpgrade;
