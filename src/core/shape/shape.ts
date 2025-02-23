import type Vector from "../vector";

export interface IShape {
  vect: Vector;
}

abstract class Shape {
  public vector: Vector;
  constructor({ vect }: IShape) {
    this.vector = vect;
  }

  public abstract draw(): void;

  public randomPointFromBorder(): Vector {
    throw new Error("Unimplemented error");
  }
}

export default Shape;
