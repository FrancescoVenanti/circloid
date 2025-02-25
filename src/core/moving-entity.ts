"use client";
import Entity, { IEntity } from "./entity";
import type Shape from "./shape/shape";

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
}

export default MovingEntity;
