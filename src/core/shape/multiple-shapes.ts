import Shape, { IShape } from "@/src/core/shape/shape";
import SEntity from "../entity/sentity";

export interface IMultipleShapes extends IShape {
  amount: number;
  speed: number;
}

abstract class MultipleShapes<T extends SEntity<any>> extends Shape {
  public particles: T[] = [];
  protected speed: number;
  constructor({ amount, speed, ...props }: IMultipleShapes) {
    super(props);
    this.speed = speed;
    // this.initialize(amount);
  }

  protected initialize(amount: number) {
    for (let i = 0; i < amount; i++) {
      const shape = this.generate();
      shape.store();
      this.particles.push(shape);
    }
  }

  public draw(): void {}

  protected abstract generate(): T;
}

export default MultipleShapes;
