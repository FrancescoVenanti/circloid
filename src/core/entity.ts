import Canvas from "./canvas";
import type Shape from "./shape/shape";

abstract class Entity {
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
