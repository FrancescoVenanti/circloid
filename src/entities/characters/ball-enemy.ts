"use client";
import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import Circle from "../../core/shape/circle";
import Vector from "../../core/vector";
import Ball from "../ball";

class BallEnemy extends Ball {
  constructor(
    zIndex: number,
    radius: number,
    vector: Vector,
    angle: number,
    speed: number
  ) {
    super(zIndex, radius, vector, angle, speed);
    // this.key = "ball";
  }

  public static spawnAmount(amount: number, speedMultiplier: number): void {
    for (let i = 0; i < amount; i++) {
      const ball = BallEnemy.spawn(speedMultiplier);
      ball && ball.store();
    }
  }

  public static spawn(speedMultiplier: number): BallEnemy | null {
    const constraint = Canvas.instance.get("constraint");
    if (!constraint || !(constraint.shape instanceof Circle)) return null;

    const randomPoint = Canvas.instance.rect.randomPointFromBorder();

    const [min, max] = constraint.shape.tangentsFromVector(randomPoint, 10);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    return new BallEnemy(0, 10, randomPoint, angle, 6 + speedMultiplier);
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
