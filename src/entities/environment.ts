import MEntity from "../core/entity/mentity";
import Circle from "../core/shape/circle";
import Shape from "../core/shape/shape";
import Vector from "../core/vector";
import CanvasMixin from "../mixins/canvas";

class Environment extends MEntity {
  private offsets: number[] = [];
  constructor(length: number) {
    super({ key: "environment", length });
    this.offsets = Array.from({ length }, () => Math.random() * 0.5 + 0.7);
  }
  protected generate(index: number): Shape {
    const vect = this.canvasShape.randomVect();
    return new Circle({ radius: 1, vect });
  }

  public update(): void {}

  public draw(): void {
    const constraint = this.global("constraint");
    const player = this.global("player");
    if (!player || !constraint) return;
    const vec = player.shape.vector.clone().add(constraint.shape.vector);
    this.drawShapesWithOffset(vec);
  }

  protected drawShapesWithOffset(offset: Vector): void {
    console.log(this.shapes.length);
    for (let i = 0; i < this.shapes.length; i++) {
      this.with(
        () => this.drawShape(this.shapes[i], offset.mulScalar(this.offsets[i])),
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
