import MovingEntity, { IMovingEntity } from "@/src/core/moving-entity";
import global from "@/src/core/global";
import sound from "@/src/core/sound";
import Polygon from "@/src/core/shape/polygon";
import canvas from "../../core/canvas";
import Vector from "@/src/core/vector";
import { inBetween } from "@/src/utils";
import Explosion from "../effects/explosion";

class SquareEnemy extends MovingEntity<Polygon> {
  constructor(props: IMovingEntity<Polygon>) {
    super({ ...props, key: "squareEnemy" });
  }
  public draw(): void {
    this.with(() => this.shape.draw(), this.style);
  }
  public static spawn(speedMultiplier: number) {
    const constraint = global.use("constraint");
    if (!constraint) return null;

    const vect = canvas.shape.randomPointFromBorder();
    const [min, max] = constraint.shape.tangentsFromVector(vect, 50);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    return new SquareEnemy({
      angle,
      speed: 2,
      shape: new Polygon({
        angles: 4,
        radius: 20 + speedMultiplier * 2,
        vect,
      }),
    });
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
    this.shape.rotationAngle += Math.PI / 360;
    this.shape.rotationAngle %= Math.PI * 2;
  }

  private checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return;
    const distance = player.shape.vector.distance(this.shape.vector);
    const maxDistance = player.shape.radius + this.shape.radius;
    if (distance < maxDistance) {
      sound.play("hit").play();
      this.destroy();
      player.decreaseLife();
      this.explode(player.style.fillStyle || "");
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

    if (
      inBetween(angle, start, end) &&
      Math.abs(distance - maxDistance) <= this.speed
    ) {
      this.destroy();
      this.explode(constraint.wall.color);
    }
  }
  private checkShieldCollisions() {
    const player = this.global("player");
    if (!player) return;
    const shields = player.shield.getShields();
    for (const shield of shields) {
      if (shield.collide(this.shape)) {
        this.destroy();
        this.explode(player.shield.color);
      }
    }
  }
  public explode(...extraColors: string[]) {
    new Explosion(this.shape.vector, [
      this.style.fillStyle || "",
      ...extraColors,
    ]).store();
  }
}
export default SquareEnemy;
