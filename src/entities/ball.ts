"use client";
import MovingEntity from "../core/moving-entity";
import Circle from "../core/shape/circle";
import Vector from "../core/vector";

class Ball extends MovingEntity<Circle> {
  constructor(
    zIndex: number,
    radius: number,
    vector: Vector,
    angle: number,
    speed: number
  ) {
    super(zIndex, new Circle(vector, radius), angle, speed);
  }
  public override update(): void {
    const vector = Vector.fromAngle(this.angle).mulScalar(this.speed);
    this.shape.vector.add(vector.clone());
  }
}

export default Ball;
