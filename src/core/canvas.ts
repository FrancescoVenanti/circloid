import type Entity from "./entity";

class Canvas {
  private static instance: Canvas = new Canvas();
  private entities: Map<String, Entity> = new Map();
  context: CanvasRenderingContext2D;
  private constructor() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    this.context = canvas.getContext("2d")!;
  }

  public add(entity: Entity): void {
    this.entities.set(entity.key, entity);
  }
  public destroy(entity: Entity): void {
    this.entities.delete(entity.key);
  }
  public render(): void {
    this.entities.forEach((e) => {
      e.draw();
    });
  }
}

export default Canvas;
