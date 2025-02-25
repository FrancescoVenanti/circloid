import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";

class ConstraintUpgrade extends Upgrade<number> {
  public get valueOf() {
    return this.value;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "constraintUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {
    this.value += 5;
  }

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
