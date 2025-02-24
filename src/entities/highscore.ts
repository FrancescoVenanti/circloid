"use client";
import { getTopScores } from "@/actions";
import Canvas from "../core/canvas";
import Drawer from "../core/drawer";
import Entity from "../core/entity";
import Rect from "../core/shape/rect";
import Vector from "../core/vector";

class Highscore extends Entity<any> {
  private scores: any[] = [];
  constructor(zIndex: number) {
    const shape = new Rect({
      vect: Canvas.instance.rect.topLeft.clone().addX(60).addY(140),
      witdh: 120,
      height: 200,
    });
    super({
      zIndex,
      shape,
      key: "highscore",
    });
    this.loadScores();
  }

  private async loadScores() {
    const res = await getTopScores();
    this.scores = res;
  }

  public draw(): void {
    const vect = this.shape.vector.clone();
    for (let i = 0; i < this.scores.length; i++) {
      Drawer.instance.with(() => this.drawScore(vect.addY(40), i), {
        fillStyle: "white",
      });
    }
  }

  private drawScore(vect: Vector, index: number) {
    Drawer.instance.text(
      index +
        1 +
        ": " +
        this.scores[index]["name"] +
        " - " +
        this.scores[index]["score"],
      vect
    );
  }

  public override update() {}
}

export default Highscore;
