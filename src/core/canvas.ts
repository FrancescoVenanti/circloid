"use client";
import { KeyboardMixin } from "../mixins/keyboard";
import Drawer from "./drawer";
import Entity from "./entity";
import GLOBAL from "./global";
import Rect from "./shape/rect";
import type Shape from "./shape/shape";
import Vector from "./vector";

class Canvas extends KeyboardMixin(class {}) {
  public onPlay?: () => void;
  public onPause?: () => void;
  public onToggle?: (v: boolean) => void;
  public static instance: Canvas = new Canvas();

  private entities: Map<string, Entity<any>> = new Map();
  private canvas: HTMLCanvasElement | null = null;

  public rect: Rect = Rect.zero;

  private constructor() {
    super();
  }

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
        width: this.canvas?.width || 0,
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

  public play(): void {
    GLOBAL("running", true);
    if (!this.onPlay) return;
    console.log("play");
  }

  public pause(): void {
    GLOBAL("running", true);
    if (!this.onPause) return;
    this.onPause();
    console.log("pause");
  }

  public togglePause(): void {
    GLOBAL("running", (prev) => !prev);
    if (!this.onToggle) return;
    this.onToggle(GLOBAL("running"));
    console.log("toggle");
  }

  public override onKeyDown(e: KeyboardEvent): void {
    if (e.key == "Escape") {
      this.togglePause();
    }
  }
}

export default Canvas;
