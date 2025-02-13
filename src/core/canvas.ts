import Drawer from "./drawer";
import Entity from "./entity";
import Rect from "./shape/rect";
import Vector from "./vector";

class Canvas {
  public static instance: Canvas = new Canvas();

  private entities: Map<String, Entity> = new Map();
  private canvas: HTMLCanvasElement | null = null;

  public rect: Rect = new Rect(new Vector(0, 0), 0, 0);

  private constructor() {}

  public init() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
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

  public add(entity: Entity): void {
    this.entities.set(entity.key, entity);
  }

  public destroy(entity: Entity): void {
    console.log("destroy", entity.constructor.name);
    this.entities.delete(entity.key);
  }

  public render(): void {
    Drawer.instance.fillRect(
      new Rect(
        new Vector(0, 0),
        this.canvas?.width || 0,
        this.canvas?.height || 0
      ),
      "black"
    );
    this.entities.forEach((e) => {
      e.update();
      e.draw();
    });
  }
}

export default Canvas;
