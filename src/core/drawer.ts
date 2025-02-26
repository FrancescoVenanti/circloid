"use client";
import type Rect from "./shape/rect";
import type Vector from "./vector";

class Drawer {
  public static instance = new Drawer();

  private reset: boolean = true;
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
    options?: {
      style?: string;
      font?: string;
      textAlign?: CanvasTextAlign;
      reset?: boolean;
    }
  ) {
    if (!this.context) return;
    if (options) {
      if (options.font) this.context.font = options.font;
      if (options.style) this.context.fillStyle = options.style;
      if (options.textAlign) this.context.textAlign = options.textAlign;
    }
    this.context.fillText(label, vector.x, vector.y);
    this.context.stroke();

    this.reset && this.setDefault();
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
      if (options.textAlign !== undefined)
        this.context.textAlign = options.textAlign;
    }

    callback(this.context);

    if (options?.fill) {
      this.context.fill();
    } else {
      this.context.stroke();
    }
    this.reset && this.setDefault();
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

  public polygon(lines: Vector[]) {
    if (!this.context) return;
    if (lines.length < 2) return;
    const ctx = this.context;
    ctx.beginPath();

    ctx.moveTo(lines[0].x, lines[0].y);
    for (let i = 1; i < lines.length; i++) {
      ctx.lineTo(lines[i].x, lines[i].y);
    }
    ctx.stroke();
  }
  public sketchyCircle(
    { x, y }: Vector,
    radius: number,
    roughness: number = 5,
    points: number = 100
  ) {
    if (!this.context) return;
    const ctx = this.context;
    ctx.beginPath();

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const offset = Math.random() * roughness - roughness / 2;
      const px = x + (radius + offset) * Math.cos(angle);
      const py = y + (radius + offset) * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.closePath();
    ctx.stroke();
  }

  private setDefault() {
    const ctx = this.context!;
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.textAlign = "start";
    ctx.textBaseline = "top"; // Setting a default text baseline

    // Set a default stroke style (optional)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    // Reset transformations (if any)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  public startReset() {
    this.reset = true;
  }
  public stopReset() {
    this.reset = false;
  }
}

export default Drawer;
