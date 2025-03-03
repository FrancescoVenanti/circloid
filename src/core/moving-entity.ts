"use client";
import Entity, { IEntity } from "./entity";
import type Shape from "./shape/shape";
import Vector from "./vector";

export interface IMovingEntity<T extends Shape> extends IEntity<T> {
  angle: number;
  speed: number;
}

abstract class MovingEntity<T extends Shape> extends Entity<T> {
  public angle: number;
  public speed: number;
  constructor({
    zIndex = 1,
    shape,
    key,
    angle = 0,
    speed = 0,
    ...props
  }: IMovingEntity<T>) {
    super({ zIndex, shape, key, ...props });
    this.angle = angle;
    this.speed = speed;
  }
  public override update(): void {
    const direction = Vector.fromAngle(this.angle).mulScalar(this.speed);
    this.shape.vector.add(direction);
  }
}

export default MovingEntity;
