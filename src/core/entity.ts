"use client";
import CanvasMixin from "../mixins/canvas";
import DrawerMixin from "../mixins/drawer";
import { generateKey } from "../utils";
import type Shape from "./shape/shape";

export interface IEntity<T extends Shape> {
  zIndex?: number;
  shape: T;
  key?: string;
  style?: Options;
}

abstract class Entity<T extends Shape> extends CanvasMixin(
  DrawerMixin(class {})
) {
  public key: string;
  public zIndex: number;
  public shape: T;
  public style: Options;

  public get active() {
    return this.canvas.has(this);
  }

  constructor({ key, zIndex = 1, shape, style }: IEntity<T>) {
    super();
    this.key = generateKey(key || "entity");
    this.zIndex = zIndex;
    this.shape = shape;
    this.style = style || {};
  }

  public abstract update(): void;

  public draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }

  public destroy(): void {
    this.canvas.destroy(this);
  }

  public store(): void {
    this.canvas.add(this);
  }
}

export default Entity;
