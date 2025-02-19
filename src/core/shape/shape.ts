import type Vector from "../vector";

abstract class Shape {
  constructor(public vector: Vector) {}

  public abstract draw(): void;

  public randomPointFromBorder(): Vector {
    throw new Error("Unimplemented error");
  }
}

export default Shape;
