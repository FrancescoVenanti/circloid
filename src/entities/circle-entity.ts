import Entity from "../core/entity";
import type Vector from "../core/vector";

class CircleEntity extends Entity {
  constructor(
    zIndex: number,
    public radius: Number,
    vector: Vector,
    public direction: Vector
  ) {
    super(zIndex, vector);
  }
  public draw(): void {}
  public update(): void {}
}

export default CircleEntity;
