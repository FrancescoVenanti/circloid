import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable, Options as ROptions } from "roughjs/bin/core";
import { ROUND } from "../utils";
import Line from "./shape/line";
import Rect from "./shape/rect";
import Vector from "./vector";

class Sketchy {
  public static instance = new Sketchy();
  private r: RoughCanvas | null = null;
  private constructor() {}
  public init(canvas: HTMLCanvasElement) {
    this.r = rough.canvas(canvas);
  }

  public arc(
    { vector: { x, y }, width, height }: Rect,
    size?: { start?: number; end?: number }
  ): Drawable {
    return this.r!.arc(
      x,
      y,
      width,
      height,
      size?.start || 0,
      size?.end || ROUND,
      false
    );
  }

  public moveTo(sketch: Drawable, { x, y }: Vector) {
    for (const s of sketch.sets) {
      if (s.size) {
        s.size = [x, y];
      }
    }
  }

  public circle({ x, y }: Vector, radius: number, opt?: ROptions): Drawable {
    return this.r!.circle(x, y, radius * 2, opt);
  }

  public rect(
    { vector: { x, y }, height, width }: Rect,
    opt?: ROptions
  ): Drawable {
    return this.r!.rectangle(x, y, width, height, opt);
  }
  public draw(shape: Drawable) {
    this.r?.draw(shape);
  }

  public line({ vector: s, end: e }: Line) {
    return this.r!.line(s.x, s.y, e.x, e.y);
  }
}

export default Sketchy;
