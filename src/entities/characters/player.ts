import Entity from "../../core/entity";
import type Vector from "../../core/vector";

class Player extends Entity {
  constructor(zIndex: number, key: string, vector: Vector) {
    super(zIndex, key, vector);
  }

  public init(): void {}
  public draw(): void {}
  public destroy(): void {}
  public update(): void {}
  public isColliding(entity: Entity): boolean {
    return false;
  }
}
