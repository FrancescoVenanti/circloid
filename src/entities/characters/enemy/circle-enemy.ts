import Circle from "@/src/core/shape/circle";
import { inBetween, ROUND } from "@/src/utils";
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
    if (angle < 0) angle += ROUND;
    const distance = constraint.shape.vector.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius + this.shape.radius;
    const [start, end] = [constraint.wall.start, constraint.wall.end];

    return (
      inBetween(angle, start, end) &&
      Math.abs(distance - maxDistance) <= this.speed
    );
  }
  protected checkShieldCollisions(): boolean {
    const player = this.global("player");
    if (!player) return false;

    const start = player.shield.start;
    const end = player.shield.end;

    const distance = this.shape.vector.distance(player.shape.vector);
    const maxDistance = this.shape.radius + player.shape.radius;
    if (distance >= maxDistance) return false;

    let angle = player.shape.vector.angleFromVect(this.shape.vector);
    if (angle < start) angle += ROUND;
    return inBetween(angle, start, end);
  }
  protected checkCyclonCollisions(): boolean {
    const player = this.global("player");
    if (!player) return false;
    const shields = player.cyclone.getShields();
    for (const cyclone of shields) {
      if (cyclone.collide(this.shape)) {
        return true;
      }
    }
    return false;
  }
}

export default CircleEnemy;
