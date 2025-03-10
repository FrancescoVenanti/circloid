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

  public override update(): void {
    if (!this.canvasShape.containsVector(this.shape.vector, -10))
      return this.destroy();

    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);

    this.shape.vector.add(direction);

    const [player, wall, shield] = [
      this.checkPlayerCollision(),
      this.checkConstraintCollision(),
      this.checkShieldCollisions(),
    ];
    let extraColor = "";
    if (!player || !wall || !shield) return;
    if (player) {
      this.global("player")?.decreaseLife();
      extraColor = this.global("player")?.style.fillStyle || "";
    }
    if (wall) {
      extraColor = this.global("constraint")?.style.strokeStyle || "";
    }
    if (shield) {
      extraColor = this.global("player")?.style.fillStyle || "";
    }
    this.remove(extraColor);
  }
}

export default BallEnemy;
