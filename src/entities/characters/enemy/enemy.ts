import MovingEntity, { IMovingEntity } from "@/src/core/moving-entity";
import sound from "@/src/core/sound";
import Vector from "@/src/core/vector";
import { inBetween } from "@/src/utils";
import Explosion from "../../effects/explosion";

class Enemy extends MovingEntity<any> {
  constructor(props: IMovingEntity<any>) {
    super(props);
  }

  public update(): void {
    if (!this.canvasShape.containsVector(this.shape.vector, -10))
      return this.destroy();

    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);

    this.shape.vector.add(direction);

    this.checkPlayerCollision();
    this.checkConstraintCollision();
    this.checkShieldCollisions();
  }

  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return;
    const distance = player.shape.vector.distance(this.shape.vector);
    const maxDistance = player.shape.radius + this.shape.radius;
    if (distance < maxDistance) {
      sound.play("hit").play();
      this.destroy();
      player.decreaseLife();
      this.explode(this.shape.vector, player.style.fillStyle || "");
    }
  }
  protected checkConstraintCollision() {
    const constraint = this.global("constraint");
    if (!constraint) return;
    let angle = constraint.shape.vector.angleFromVect(this.shape.vector);
    if (angle < 0) angle += Math.PI * 2;
    const distance = constraint.shape.vector.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius + this.shape.radius;
    const [start, end] = [constraint.wall.start, constraint.wall.end];

    if (
      inBetween(angle, start, end) &&
      Math.abs(distance - maxDistance) <= this.speed
    ) {
      this.destroy();
      this.explode(this.shape.vector, constraint.wall.color);
    }
  }
  protected checkShieldCollisions() {
    const player = this.global("player");
    if (!player) return;
    const shields = player.shield.getShields();
    for (const shield of shields) {
      if (shield.collide(this.shape)) {
        this.destroy();
        this.explode(this.shape.vector, player.shield.color);
      }
    }
  }
  public explode(vect: Vector, ...extraColors: string[]) {
    new Explosion(this.shape.vector, [
      this.style.fillStyle || "",
      ...extraColors,
    ]).store();
  }
}

export default Enemy;
