import Entity from "../core/entity";
import type Vector from "../core/vector";

class Environment extends Entity {
  constructor(zIndex: number, key: string, vector: Vector) {
    super(zIndex, vector);
  }

  public draw(): void {}
  public update(): void {}
}
