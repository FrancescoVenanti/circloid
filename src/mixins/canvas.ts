import canvas from "../core/canvas";
import SEntity from "../core/entity/sentity";

export default function CanvasMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any[]) {
      super(args);
    }
    protected get canvas() {
      return canvas;
    }
    protected get canvasShape() {
      return this.canvas.shape;
    }
    protected getByClassName<T extends SEntity<any>>(base: Constructor<T>) {
      return this.canvas.getByConstructor(base);
    }
  };
}
