import Shape, { IShape } from "@/src/core/shape/shape";
import Entity from "../entity";

export interface IMultipleShapes extends IShape {
  amount: number;
  speed: number;
}

abstract class MultipleShapes<T extends Entity<any>> extends Shape {
  public particles: T[] = [];
  protected speed: number;
  constructor({ amount, speed, ...props }: IMultipleShapes) {
    super(props);
    this.speed = speed;
    this.initialize(amount);
  }

  private initialize(amount: number) {
    for (let i = 0; i < amount; i++) {
      const shape = this.generate();
      shape.store();
      this.particles.push(shape);
      console.log(this.particles[0].style);
    }
  }

  public draw(): void {}

  protected abstract generate(): T;
}

export default MultipleShapes;
