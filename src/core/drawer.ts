"use client";
import { ROUND } from "../utils";
import type Rect from "./shape/rect";
import Sketchy from "./sketchy";
import Vector from "./vector";

class Drawer {
  public static instance = new Drawer();

  private reset: boolean = true;
  private context: CanvasRenderingContext2D | null = null;
  public sketchy: Sketchy = Sketchy.instance;

  private constructor() {}
  public init(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
    this.sketchy.init(canvas);
  }

  public arc(
    vect: Vector,
    radius: number,
    size?: { start?: number; end?: number }
  ) {
    if (!this.context) return;
    this.context.beginPath();
    this.context.arc(
      vect.x,
      vect.y,
      radius,
      size?.start || 0,
      size?.end || ROUND
    );
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

  public text(label: string, vector: Vector, options?: TextOptions) {
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

  private setDefault() {
    const ctx = this.context!;
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.textAlign = "start";
    ctx.textBaseline = "top";

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
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

export default Drawer.instance;
