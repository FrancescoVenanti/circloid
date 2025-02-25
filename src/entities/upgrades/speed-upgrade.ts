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
  }

  public override update(): void {}

  public override upgrade(): void {
    this._value++;
  }

  public draw(): void {
    Drawer.instance.with(
      () =>
        Drawer.instance.drawButton(
          Canvas.instance.rect.bottomLeft.clone().addY(-100).addX(100),
          40,
          "1"
        ),
      {
        fill: false,
        fillStyle: "white",
      }
    );
    Drawer.instance.text(
      "Speed",
      Canvas.instance.rect.bottomLeft.clone().addY(-60).addX(90)
    );
  }
}

export default SpeedUpgrade;
