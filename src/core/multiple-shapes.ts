import Shape, { IShape } from "@/src/core/shape/shape";
import Ball from "../entities/ball";

export interface IMultipleShapes extends IShape {
  amount: number;
  speed: number;
}

abstract class MultipleShapes<T extends Ball> extends Shape {
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
    }
  }

  public draw(): void {
    this.particles.forEach(this.drawShape);
  }

  protected abstract drawShape(shape: T): void;

  protected abstract generate(): T;
}

export default MultipleShapes;
