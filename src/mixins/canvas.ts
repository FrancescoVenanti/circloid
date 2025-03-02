import Canvas from "../core/canvas";
import Entity from "../core/entity";

export default function CanvasMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any[]) {
      super(args);
    }
    protected get canvas() {
      return Canvas.instance;
    }
    protected get canvasShape() {
      return this.canvas.shape;
    }
    protected getByClassName<T extends Entity<any>>(base: Constructor<T>) {
      return this.canvas.getByConstructor(base);
    }
  };
}
