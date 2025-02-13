import Canvas from "./canvas";
import type Vector from "./vector";

abstract class Entity {
  constructor(public zIndex: number, public position: Vector) {
    this.key = crypto.randomUUID();
  }
  protected init(): void {
    Canvas.instance.add(this);
  }
  public abstract draw(): void;
  protected destroy(): void {
    Canvas.instance.destroy(this);
  }
  public abstract update(): void;
  public key: string;
}

export default Entity;
