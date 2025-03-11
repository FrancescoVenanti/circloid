"use client";
import Circle from "@/src/core/shape/circle";
import Vector from "../../../core/vector";
import { IBall } from "../../ball";
import CircleEnemy from "./circle-enemy";

class BallEnemy extends CircleEnemy {
  constructor({ radius, vect, ...props }: IBall) {
    const shape = new Circle({ radius, vect });
    super({ ...props, shape, key: "ballenemy" });
  }

  public static spawn(
    speedMultiplier: number,
    vect: Vector,
    angle: number
  ): BallEnemy {
    return new BallEnemy({
      vect,
      angle,
      radius: 8,
      speed: 4 + speedMultiplier,
    });
  }

  public override draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }
}

export default BallEnemy;
