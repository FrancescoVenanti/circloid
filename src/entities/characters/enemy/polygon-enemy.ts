import Polygon from "@/src/core/shape/polygon";
import { inBetween } from "@/src/utils";
import Enemy, { IEnemy } from "./enemy";

class PolygonEnemy extends Enemy<Polygon> {
  constructor(props: IEnemy<Polygon>) {
    super(props);
  }
  protected checkPlayerCollision(): boolean {
    const player = this.global("player");
    if (!player) return false;
    const lines = this.shape.getLines();
    for (const line of lines) {
      if (line.distance(player.shape.vector) < player.shape.radius) return true;
    }
    return false;
  }
  protected checkConstraintCollision(): boolean {
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
  protected checkShieldCollisions(): boolean {
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

export default PolygonEnemy;
