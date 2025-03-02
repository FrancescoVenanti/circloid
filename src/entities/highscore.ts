"use client";
import { getTopScores } from "@/lib/actions";
import Canvas from "../core/canvas";
import Entity from "../core/entity";
import Rect from "../core/shape/rect";
import Vector from "../core/vector";

class Highscore extends Entity<any> {
  private scores: any[] = [];
  constructor(zIndex: number) {
    const shape = new Rect({
      vect: Canvas.instance.shape.topLeft.clone().addX(60).addY(140),
      width: 120,
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
      this.with(() => this.drawScore(vect.addY(40), i), {
        fillStyle: "white",
      });
    }
  }

  private drawScore(vect: Vector, index: number) {
    this.text(
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
