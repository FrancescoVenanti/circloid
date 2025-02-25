"use client";
import { generateKey } from "../utils";
import Canvas from "./canvas";
import Drawer from "./drawer";
import type Shape from "./shape/shape";

export interface IEntity<T extends Shape> {
  zIndex?: number;
  shape: T;
  key?: string;
  style?: Options;
}

abstract class Entity<T extends Shape> {
  public key: string;
  public zIndex: number;
  public shape: T;
  public style: Options;

  public get active() {
    return Canvas.instance.has(this);
  }

  constructor({ key, zIndex = 1, shape, style }: IEntity<T>) {
    this.key = generateKey(key || "entity");
    this.zIndex = zIndex;
    this.shape = shape;
    this.style = style || {};
  }

  public abstract update(): void;

  public draw(): void {
    Drawer.instance.with(() => this.shape.draw(), this.style);
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
