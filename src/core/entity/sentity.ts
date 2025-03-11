"use client";
import AnimationMixin from "@/src/mixins/animation";
import type Shape from "../shape/shape";
import Entity, { IEntity } from "./entity";

export interface ISEntity<T extends Shape> extends IEntity {
  shape: T;
}

class SEntity<T extends Shape> extends AnimationMixin(Entity) {
  public shape: T;

  constructor({ key, zIndex = 1, shape, style }: ISEntity<T>) {
    super({ key, zIndex, style });
    this.shape = shape;
  }

  public inCanvas(padding: number = 0) {
    return this.canvasShape.containsVector(this.shape.vector, padding);
  }

  public draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }
}

export default SEntity;
