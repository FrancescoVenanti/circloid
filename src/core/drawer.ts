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
    options?: Options
  ) {
    if (!this.context) return;
    this.context.beginPath();
    if (options) {
      if (options.fillStyle) this.context.fillStyle = options.fillStyle;
      if (options.strokeStyle) this.context.strokeStyle = options.strokeStyle;
      if (options.lineWidth !== undefined)
        this.context.lineWidth = options.lineWidth;
      if (options.globalAlpha !== undefined)
        this.context.globalAlpha = options.globalAlpha;
      if (options.shadowColor) this.context.shadowColor = options.shadowColor;
      if (options.shadowBlur !== undefined)
        this.context.shadowBlur = options.shadowBlur;
    }

    callback(this.context);

    if (options?.fill) {
      this.context.fill();
    } else {
      this.context.stroke();
    }
  }
  public drawHeart({ x, y }: Vector, size: number) {
    const ctx = this.context!;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size);
    ctx.bezierCurveTo(
      x,
      y + size,
      x + size / 2,
      y + size / 2,
      x + size / 2,
      y + size / 4
    );
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.closePath();
  }
}

type Options = {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  globalAlpha?: number;
  shadowColor?: string;
  shadowBlur?: number;
  fill?: boolean;
};

export default Drawer;
