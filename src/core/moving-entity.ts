"use client";
import Entity from "./entity";
import type Shape from "./shape/shape";

abstract class MovingEntity<T extends Shape> extends Entity<T> {
  constructor(
    zIndex: number,
    shape: T,
    key: string,
    public angle: number,
    public speed: number
  ) {
    super(zIndex, shape, key);
  }
}

export default MovingEntity;
