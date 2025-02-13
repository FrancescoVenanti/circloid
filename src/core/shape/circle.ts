import Drawer from "../drawer";
import type Vector from "../vector";
import Shape from "./shape";

class Circle extends Shape {
  constructor(vector: Vector, public radius: number) {
    super(vector);
  }

  draw(): void {
    Drawer.instance.circle(this.vector, this.radius);
  }
}

export default Circle;
