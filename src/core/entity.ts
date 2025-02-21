"use client";
import { generateKey } from "../utils";
import Canvas from "./canvas";
import type Shape from "./shape/shape";

export interface IEntity<T extends Shape> {
  zIndex: number;
  shape: T;
  key: string;
}

abstract class Entity<T extends Shape> {
  public key: string;
  public zIndex: number;
  public shape: T;

  constructor({ key, zIndex = 1, shape }: IEntity<T>) {
    this.key = generateKey(key);
    this.zIndex = zIndex;
    this.shape = shape;
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
