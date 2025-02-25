import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";
import Canvas from "@/src/core/canvas";

class ConstraintUpgrade extends Upgrade<number> {
  public get value() {
    return this._value;
  }
  public set value(newValue: number) {
    this._value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "constraintUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {
    this._value += 5;
  }

  public draw(): void {
    Drawer.instance.with(
      () =>
        Drawer.instance.drawButton(
          Canvas.instance.rect.bottomLeft.clone().addY(-100).addX(200),
          40,
          "2"
        ),
      {
        fill: false,
        fillStyle: "white",
      }
    );
    Drawer.instance.text(
      "Constraint",
      Canvas.instance.rect.bottomLeft.clone().addY(-60).addX(170)
    );
  }

  public reset(): void {}

  private drawConstraint() {
    super.draw();
  }
}

export default ConstraintUpgrade;
