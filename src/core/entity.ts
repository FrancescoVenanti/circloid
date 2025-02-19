import Canvas from "./canvas";
import Drawer from "./drawer";
import type Shape from "./shape/shape";

abstract class Entity {
  protected get drawer() {
    return Drawer.instance;
  }
  protected get canvas() {
    return Canvas.instance;
  }

  public key: string;

  constructor(public zIndex: number, public shape: Shape) {
    this.key = this.constructor.name + "_" + crypto.randomUUID();
  }

  public abstract update(): void;

  public draw(): void {
    this.shape.draw();
  }

  protected init(): void {
    Canvas.instance.add(this);
  }

  public destroy(): void {
    Canvas.instance.destroy(this);
  }

  public store(): void {
    Canvas.instance.add(this);
  }
}

export default Entity;
