"use client";
import MovingEntity, { IMovingEntity } from "../core/moving-entity";
import Circle from "../core/shape/circle";
import Vector from "../core/vector";

export interface IBall extends Omit<IMovingEntity<Circle>, "shape"> {
  vect: Vector;
  radius: number;
}

class Ball extends MovingEntity<Circle> {
  constructor({ zIndex, key = "ball", angle, speed, vect, radius }: IBall) {
    const shape = new Circle({ vect, radius });
    super({ zIndex, shape, key, angle, speed });
  }
  public override update(): void {
    const vector = Vector.fromAngle(this.angle).mulScalar(this.speed);
    this.shape.vector.add(vector.clone());
  }
}

export default Ball;
