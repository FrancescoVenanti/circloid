import Canvas from "../core/canvas";
import Drawer from "../core/drawer";
import Entity from "../core/entity";
import Rect from "../core/shape/rect";
import Vector from "../core/vector";

class Highscore extends Entity<any> {
  private scores: any[] = [];
  constructor(zIndex: number) {
    super(zIndex, new Rect(Canvas.instance.rect.topLeft, 100, 200));
    this.loadScores();
  }

  private async loadScores() {
    const res = await fetch("/score", { method: "get" });
    this.scores = await res.json();
  }

  public draw(): void {
    const vect = this.shape.vector.clone();
    for (const score in this.scores) {
      Drawer.instance.with(() => this.drawScore(score, vect.addY(100)), {});
    }
  }

  private drawScore(score: any, vect: Vector) {
    Drawer.instance.text(JSON.stringify(score), vect);
  }

  public override update() {}
}

export default Highscore;
