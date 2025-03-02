import Drawer from "../core/drawer";
import Rect from "../core/shape/rect";
import Vector from "../core/vector";

export default function DrawerMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any[]) {
      super(args);
    }
    protected get drawer() {
      return Drawer.instance;
    }
    protected with(
      callback: (ctx: CanvasRenderingContext2D) => void,
      options?: Options
    ) {
      this.drawer.with(callback, options);
    }
    protected clear() {
      this.drawer.clear();
    }
    protected fillRect(r: Rect, style?: string) {
      this.drawer.fillRect(r, style);
    }
    protected rect(r: Rect, style?: string) {
      this.drawer.rect(r, style);
    }
    protected arc(
      vect: Vector,
      radius: number,
      size?: { start?: number; end?: number }
    ) {
      const start = 0;
      const end = Math.PI * 2;
      if (!size) {
        size = { start, end };
      }
      !size.start && (size.start = start);
      !size.end && (size.end = end);
      this.drawer.arc(vect, radius, size);
    }
    protected text(label: string, vect: Vector, options?: TextOptions) {
      this.drawer.text(label, vect, options);
    }
    protected polygon(lines: Vector[]) {
      this.drawer.polygon(lines);
    }
  };
}
