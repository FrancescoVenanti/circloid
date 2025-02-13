import type CircleEntity from "../entities/circle-entity";
import type Entity from "./entity";
import type Vector from "./vector";

class Drawer {
  public static instance = new Drawer();
  private context: CanvasRenderingContext2D | null = null;
  private constructor() {}
  public init(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public circle(vect: Vector, radius: number) {
    if (!this.context) return;
    this.context.beginPath();
    this.context.arc(vect.x, vect.y, radius, 0, 2 * Math.PI);
    this.context.stroke();
  }
  private checkCtx() {
    if (!this.context)
      throw new Error("Context non esiste, devi eseguire init prima!!!");
  }
}

export default Drawer;
