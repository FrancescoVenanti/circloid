import type Rect from "./shape/rect";
import type Vector from "./vector";

class Drawer {
  public static instance = new Drawer();

  private context: CanvasRenderingContext2D | null = null;

  private constructor() {}
  public init(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public circle(vect: Vector, radius: number) {
    if (!this.context) return;
    this.context.beginPath();
    this.context.arc(vect.x, vect.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
  }
  public rect(r: Rect, style?: string) {
    if (!this.context) return;
    if (style) this.context.fillStyle = style;
    this.context.rect(r.vector.x, r.vector.y, r.width, r.height);
    this.context.stroke();
  }

  public fillRect(r: Rect, style?: string) {
    if (!this.context) return;
    if (style) this.context.fillStyle = style;
    this.context.fillRect(r.vector.x, r.vector.y, r.width, r.height);
  }

  public clear() {
    if (!this.context) return;
    this.context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  public text(
    label: string,
    vector: Vector,
    options?: { style?: string; font?: string }
  ) {
    if (!this.context) return;
    if (options) {
      if (options.font) this.context.font = options.font;
      if (options.style) this.context.fillStyle = options.style;
    }
    this.context.fillText(label, vector.x, vector.y);
    this.context.stroke();
  }

  public stroke(): void {
    if (!this.context) return;
    this.context.stroke();
  }

  public with(
    callback: (ctx: CanvasRenderingContext2D) => void,
    options?: { fillStyle?: string; style?: string; strokeStyle?: string }
  ) {
    if (!this.context) return;
    if (options) {
      if (options.fillStyle) this.context.fillStyle = options.fillStyle;
      if (options.style) this.context.strokeStyle = options.style;
      if (options.strokeStyle) this.context.strokeStyle = options.strokeStyle;
    }
    callback(this.context);
    this.context.stroke();
  }
}

export default Drawer;
