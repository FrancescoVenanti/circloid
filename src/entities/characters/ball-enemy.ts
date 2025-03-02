"use client";
import GLOBAL from "@/src/core/global";
import GlobalMixin from "@/src/mixins/global";
import { inBetween } from "@/src/utils";
import Canvas from "../../core/canvas";
import Vector from "../../core/vector";
import Ball, { IBall } from "../ball";
import Explosion from "../effects/explosion";

interface IBallEnemy extends Omit<IBall, "key"> {}

class BallEnemy extends GlobalMixin(Ball) {
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

    const vect = Canvas.instance.shape.randomPointFromBorder();

    const [min, max] = constraint.shape.tangentsFromVector(vect, 50);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    const vector = Vector.fromAngle(angle);
    // console.log(vector.x, vector.y);
    return new BallEnemy({
      vect,
      angle,
      radius: 10,
      speed: 6 + speedMultiplier,
    });
  }

  public override draw(): void {
    this.with(() => this.shape.draw(), {
      fillStyle: "coral",
      strokeStyle: "coral",
      fill: true,
    });
  }

  public override update(): void {
    if (!this.canvasShape.containsVector(this.shape.vector, -10))
      return this.destroy();

    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);

    this.shape.vector.add(direction);
    this.checkPlayerCollision();
    this.checkConstraintCollision();
  }

  private checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return;
    const distance = player.shape.vector.distance(this.shape.vector);
    const maxDistance = player.shape.radius + this.shape.radius;
    if (distance < maxDistance) {
      this.destroy();
      player.decreaseLife();
      this.explode("lightblue");
    }
  }
  private checkConstraintCollision() {
    const constraint = this.global("constraint");
    if (!constraint) return;
    let angle = constraint.shape.vector.angleFromVect(this.shape.vector);
    if (angle < 0) angle += Math.PI * 2;
    const distance = constraint.shape.vector.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius + this.shape.radius;
    const [start, end] = [constraint.wall.start, constraint.wall.end];
    console.log(inBetween(angle, start, end));

    if (
      inBetween(angle, start, end) &&
      Math.abs(distance - maxDistance) <= this.speed
    ) {
      this.destroy();
      this.explode("blue");
    }
  }
  public explode(...extraColors: string[]) {
    new Explosion(this.shape.vector, ["coral", ...extraColors]).store();
  }
}

export default BallEnemy;
