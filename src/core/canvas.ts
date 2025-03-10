"use client";
import DrawerMixin from "../mixins/drawer";
import GlobalMixin from "../mixins/global";
import { KeyboardMixin } from "../mixins/keyboard";
import { currentStyle } from "../utils";
import Entity from "./entity/entity";
import SEntity from "./entity/sentity";
import Rect from "./shape/rect";
import Vector from "./vector";

class Canvas extends DrawerMixin(KeyboardMixin(GlobalMixin(class {}))) {
  public onPlay?: () => void;
  public onPause?: () => void;
  public onToggle?: (v: boolean) => void;
  public static instance: Canvas = new Canvas();

  private entities: Map<string, SEntity<any>> = new Map();
  private canvas: HTMLCanvasElement | null = null;

  public shape: Rect = Rect.zero;

  private constructor() {
    super();
  }

  public init() {
    this.canvas = document.createElement("canvas");
    document.getElementById("app")?.appendChild(this.canvas);
    this.drawer.init(this.canvas);
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  private resize() {
    this.canvas!.width = window.innerWidth;
    this.canvas!.height = window.innerHeight;
    this.shape.width = this.canvas!.width;
    this.shape.height = this.canvas!.height;
  }

  public add(entity: Entity): void {
    this.entities.set(entity.key, entity as SEntity<any>);
  }

  public destroy(entity: Entity): void {
    this.entities.delete(entity.key);
  }

  public render(): void {
    this.fillRect(
      new Rect({
        vect: new Vector(0, 0),
        width: this.canvas?.width || 0,
        height: this.canvas?.height || 0,
      }),
      currentStyle().canvas.fillStyle
    );
    this.entities.forEach((e) => {
      e.update();
      e.draw();
    });
  }

  public reset() {
    this.entities.clear();
  }

  public get(key: string): Entity | undefined {
    return this.startsWith(key)[0];
  }

  public getByConstructor<T extends SEntity<any>>(base: Constructor<T>): T[] {
    return Array.from(this.entities.values()).filter(
      (e): e is T => e instanceof base
    );
  }

  public has(entity: Entity) {
    return this.entities.has(entity.key);
  }

  public startsWith(key: string) {
    const entities: Entity[] = [];
    this.entities.forEach((e) => {
      if (e.key.toLowerCase().startsWith(key.toLowerCase())) {
        entities.push(e);
      }
    });
    return entities;
  }

  public play(): void {
    this.global("running", true);
    if (!this.onPlay) return;
    this.onPlay();
  }

  public pause(): void {
    this.global("running", true);
    if (!this.onPause) return;
    this.onPause();
  }

  public togglePause(): void {
    this.global("running", (prev) => !prev);
    if (!this.onToggle) return;
    this.onToggle(this.global("running"));
  }

  public override onKeyDown(e: KeyboardEvent): void {
    if (e.key == "Escape") {
      this.togglePause();
    }
  }
}

export default Canvas.instance;
