"use client";
import CanvasMixin from "../mixins/canvas";
import DrawerMixin from "../mixins/drawer";
import GlobalMixin from "../mixins/global";
import { Style, styles } from "../style";
import { generateKey } from "../utils";
import type Shape from "./shape/shape";

export interface IEntity<T extends Shape> {
  zIndex?: number;
  shape: T;
  key?: string;
  style?: Options;
}

abstract class Entity<T extends Shape> extends CanvasMixin(
  GlobalMixin(DrawerMixin(class {}))
) {
  public key: string;
  public zIndex: number;
  public shape: T;
  public style: Options;

  public get active() {
    return this.canvas.has(this);
  }

  public get options() {
    return styles[this.global("style")];
  }

  constructor({ key, zIndex = 1, shape, style }: IEntity<T>) {
    super();
    this.key = generateKey(key || "entity");
    this.zIndex = zIndex;
    this.shape = shape;
    this.style = style || {};
    this.style = { ...this.getCurrentStyle(), ...this.style };
  }

  protected getCurrentStyle(): Style[string] {
    const key = this.key.split("-")[0];
    if (key in this.options) {
      return this.options[key as keyof Style];
    }
    return {};
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
