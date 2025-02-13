import Entity from "../core/entity";
import type Shape from "../core/shape/shape";

class Environment extends Entity {
  constructor(zIndex: number, shape: Shape) {
    super(zIndex, shape);
  }

  public update(): void {}
}

export default Environment;