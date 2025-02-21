"use client";
import MovingEntity from "../core/moving-entity";
import Circle from "../core/shape/circle";
import Vector from "../core/vector";

interface IBall extends MovingEntity<Circle> {}

class Ball extends MovingEntity<Circle> {
  constructor({ zIndex, radius, vector: Vector, key: string, angle, speed }) {
    const shape = new Circle(vector, radius);
    super({ zIndex, shape, key, angle, speed });
  }
  public override update(): void {
    const vector = Vector.fromAngle(this.angle).mulScalar(this.speed);
    this.shape.vector.add(vector.clone());
  }
}

export default Ball;
