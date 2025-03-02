import { Drawable } from "roughjs/bin/core";
import Shape, { IShape } from "../shape";

export interface ISketchyShape extends IShape {
  drawable: () => Drawable;
}

class SketchyShape extends Shape {
  private drawable: Drawable;
  constructor({ drawable, ...props }: ISketchyShape) {
    super(props);
    this.drawable = drawable();
  }
  public draw(): void {
    this.drawer.sketchy.draw(this.drawable);
  }
}

export default SketchyShape;
