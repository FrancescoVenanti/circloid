import rough from "roughjs";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable, Options as ROptions } from "roughjs/bin/core";
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
      size?.end || Math.PI * 2,
      false
    );
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
}

export default Sketchy;
