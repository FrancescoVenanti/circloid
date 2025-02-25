import Drawer from "@/src/core/drawer";
import Upgrade, { IUpgrade } from "./upgrades";
import Canvas from "@/src/core/canvas";

class LifeUpgrade extends Upgrade<number> {
  public get value() {
    return this._value;
  }
  public set value(newValue: number) {
    this._value = newValue;
  }
  constructor(props: Omit<IUpgrade<number>, "key">) {
    super({ ...props, key: "lifeUpgrade" });
  }

  public override update(): void {}

  public override upgrade(): void {
    this._value += 1;
  }

  public draw(): void {
    Drawer.instance.with(
      () =>
        Drawer.instance.drawButton(
          Canvas.instance.rect.bottomLeft.clone().addY(-100).addX(300),
          40,
          "3"
        ),
      {
        fill: false,
        fillStyle: "white",
      }
    );
    Drawer.instance.text(
      "Lives",
      Canvas.instance.rect.bottomLeft.clone().addY(-60).addX(295)
    );
  }

  public reset(): void {}

  private drawLife() {
    super.draw();
  }
}

export default LifeUpgrade;
