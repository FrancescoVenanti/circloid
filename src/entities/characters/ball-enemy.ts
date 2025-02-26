"use client";
import Drawer from "@/src/core/drawer";
import GLOBAL from "@/src/core/global";
import Canvas from "../../core/canvas";
import Vector from "../../core/vector";
import Ball, { IBall } from "../ball";

interface IBallEnemy extends Omit<IBall, "key"> {}

class BallEnemy extends Ball {
  constructor(props: IBallEnemy) {
    super({ ...props, key: "ballenemy" });
  }

  public static spawnAmount(amount: number, speedMultiplier: number): void {
    for (let i = 0; i < amount; i++) {
      const ball = BallEnemy.spawn(speedMultiplier);
      ball && ball.store();
    }
  }

  public static spawn(speedMultiplier: number): BallEnemy | null {
    const constraint = GLOBAL("constraint");
    if (!constraint) return null;

    const vect = Canvas.instance.rect.randomPointFromBorder();

    const [min, max] = constraint.shape.tangentsFromVector(vect, 50);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    const vector = Vector.fromAngle(angle);
    console.log(vector.x, vector.y);
    return new BallEnemy({
      vect,
      angle,
      radius: 10,
      speed: 6 + speedMultiplier,
    });
  }

  public override draw(): void {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "coral",
      strokeStyle: "coral",
      fill: true,
    });
  }

  public override update(): void {
    if (!Canvas.instance.rect.containsVector(this.shape.vector, -10))
      return this.destroy();
    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);

    this.shape.vector.add(direction);
  }
}

export default BallEnemy;
