"use client";
import Canvas from "./canvas";
import type Shape from "./shape/shape";

abstract class Entity<T extends Shape> {
  public key: string;

  constructor(public zIndex: number, public shape: T) {
    this.key =
      this.constructor.name + "_" + Math.random().toString(36).substring(6);
  }

  public abstract update(): void;

  public draw(): void {
    this.shape.draw();
  }

  protected init(): void {
    Canvas.instance.add(this);
  }

  public destroy(): void {
    Canvas.instance.destroy(this);
  }

  public store(): void {
    Canvas.instance.add(this);
  }
}

export default Entity;
