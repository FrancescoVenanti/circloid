import Canvas from "./canvas";
import type Shape from "./shape/shape";

abstract class Entity {
  public key: string;

  constructor(public zIndex: number, public shape: Shape) {
    this.key = crypto.randomUUID();
  }

  public abstract update(): void;

  public draw(): void {
    this.shape.draw();
  }

  protected init(): void {
    Canvas.instance.add(this);
  }

  protected destroy(): void {
    Canvas.instance.destroy(this);
  }

  public store(): void {
    Canvas.instance.add(this);
  }
}

export default Entity;
