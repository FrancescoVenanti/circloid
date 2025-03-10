import Circle from "@/src/core/shape/circle";
import { inBetween } from "@/src/utils";
import Enemy, { IEnemy } from "./enemy";

abstract class CircleEnemy extends Enemy<Circle> {
  constructor(props: IEnemy<Circle>) {
    super(props);
  }

  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return false;
    const distance = player.shape.vector.distance(this.shape.vector);
    const maxDistance = player.shape.radius + this.shape.radius;
    if (distance < maxDistance) {
      return true;
    }
    return false;
  }
  protected checkConstraintCollision() {
    const constraint = this.global("constraint");
    if (!constraint) return false;
    let angle = constraint.shape.vector.angleFromVect(this.shape.vector);
    if (angle < 0) angle += Math.PI * 2;
    const distance = constraint.shape.vector.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius + this.shape.radius;
    const [start, end] = [constraint.wall.start, constraint.wall.end];

    if (
      inBetween(angle, start, end) &&
      Math.abs(distance - maxDistance) <= this.speed
    ) {
      return true;
    }
    return false;
  }
  protected checkShieldCollisions() {
    const player = this.global("player");
    if (!player) return false;
    const shields = player.shield.getShields();
    for (const shield of shields) {
      if (shield.collide(this.shape)) {
        return true;
      }
    }
    return false;
  }
}

export default CircleEnemy;
