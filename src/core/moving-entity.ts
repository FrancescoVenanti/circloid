"use client";
import Entity from "./entity";
import type Shape from "./shape/shape";

abstract class MovingEntity<T extends Shape> extends Entity<T> {
  constructor(
    zIndex: number,
    shape: T,
    public angle: number,
    public speed: number
  ) {
    super(zIndex, shape);
  }
}

export default MovingEntity;
