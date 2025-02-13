import type Vector from "../vector";

abstract class Shape {
  constructor(public vector: Vector) {}

  public abstract draw(): void;
}

export default Shape;
