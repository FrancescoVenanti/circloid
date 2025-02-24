"use client";
import Drawer from "./drawer";
import Entity from "./entity";
import Rect from "./shape/rect";
import type Shape from "./shape/shape";
import Vector from "./vector";

class Canvas {
  public static instance: Canvas = new Canvas();

  private entities: Map<string, Entity<any>> = new Map();
  private canvas: HTMLCanvasElement | null = null;

  public rect: Rect = Rect.zero;

  private constructor() {}

  public init() {
    this.canvas = document.createElement("canvas");
    document.getElementById("app")?.appendChild(this.canvas);
    Drawer.instance.init(this.canvas.getContext("2d")!);
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize() {
    this.canvas!.width = window.innerWidth;
    this.canvas!.height = window.innerHeight;
    this.rect.width = this.canvas!.width;
    this.rect.height = this.canvas!.height;
  }

  public add(entity: Entity<any>): void {
    this.entities.set(entity.key, entity);
  }

  public destroy(entity: Entity<any>): void {
    this.entities.delete(entity.key);
  }

  public render(): void {
    Drawer.instance.fillRect(
      new Rect({
        vect: new Vector(0, 0),
        witdh: this.canvas?.width || 0,
        height: this.canvas?.height || 0,
      }),
      "black"
    );
    this.entities.forEach((e) => {
      e.update();
      e.draw();
    });
  }

  public get<T extends Shape>(key: string): Entity<T> | undefined {
    return this.startsWith(key)[0];
  }

  public getByConstructor<T extends Entity<any>>(
    base: new (...args: any[]) => T
  ): T[] {
    return Array.from(this.entities.values()).filter(
      (e): e is T => e instanceof base
    );
  }

  public has(entity: Entity<any>) {
    return this.entities.has(entity.key);
  }

  public startsWith(key: string) {
    const entities: Entity<any>[] = [];
    this.entities.forEach((e) => {
      if (e.key.toLowerCase().startsWith(key.toLowerCase())) {
        entities.push(e);
      }
    });
    return entities;
  }
}

export default Canvas;
