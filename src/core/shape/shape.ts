import DrawerMixin from "@/src/mixins/drawer";
import type Vector from "../vector";

export interface IShape {
  vect: Vector;
}

abstract class Shape extends DrawerMixin(class {}) {
  public vector: Vector;
  constructor({ vect }: IShape) {
    super();
    this.vector = vect;
  }

  public abstract draw(): void;

  public randomPointFromBorder(): Vector {
    throw new Error("Unimplemented error");
  }
}

export default Shape;
