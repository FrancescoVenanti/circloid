import Vector from "../vector";
import Shape from "./shape";

class EmptyShape extends Shape {
  public static instance: EmptyShape = new EmptyShape();
  private constructor() {
    super({ vect: Vector.zero });
  }
  public draw(): void {}
}

export default EmptyShape;
