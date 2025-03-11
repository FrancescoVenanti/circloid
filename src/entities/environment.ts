import MEntity from "../core/entity/mentity";
import Circle from "../core/shape/circle";
import Shape from "../core/shape/shape";
import Vector from "../core/vector";
import CanvasMixin from "../mixins/canvas";

class Environment extends MEntity<Circle> {
  private offsets: number[] = [];
  constructor(length: number) {
    super({ key: "environment", length, zIndex: -100 });
    this.offsets = Array.from({ length }, (_, i) => this.shapes[i].radius / 8);
  }
  protected generate(index: number): Circle {
    const vect = this.canvasShape.randomVect();
    return new Circle({ radius: Math.random() * 3 + 1, vect });
  }

  public update(): void {}

  public draw(): void {
    const constraint = this.global("constraint");
    const player = this.global("player");
    if (!player || !constraint) return;
    const vec = player.shape.vector.clone().add(constraint.shape.vector.invert);
    this.drawShapesWithOffset(vec);
  }

  protected drawShapesWithOffset(offset: Vector): void {
    console.log(this.shapes.length);
    for (let i = 0; i < this.shapes.length; i++) {
      this.with(
        () =>
          this.drawShape(
            this.shapes[i],
            offset.clone().mulScalar(this.offsets[i]).invert
          ),
        this.style
      );
    }
  }

  private drawShape(shape: Shape, offset: Vector) {
    const prev = shape.vector.clone();
    shape.vector = prev.clone().add(offset);
    shape.draw();
    shape.vector = prev;
  }
}

export default Environment;
