import { IMovingEntity } from "@/src/core/moving-entity";
import Line from "@/src/core/shape/line";
import Vector from "@/src/core/vector";
import { inBetween } from "@/src/utils";
import Enemy from "./enemy";

interface IArrowEnemy extends Omit<IMovingEntity<Line>, "shape" | "key"> {
  vect: Vector;
  length: number;
}

class ArrowEnemy extends Enemy<Line> {
  constructor({ vect, length, ...props }: IArrowEnemy) {
    const end = vect
      .clone()
      .add(Vector.fromAngle(props.angle).mulScalar(length));
    const shape = new Line({ vect, end });
    super({ ...props, key: "arrowEnemy", shape });
  }

  public update(): void {
    if (!this.canvasShape.containsVector(this.shape.end)) {
      this.destroy();
      return;
    }
    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);
    direction.mulScalar(this.global("fps"));

    this.shape.vector.add(direction);
    this.shape.end.add(direction);

    this.checkConstraintCollision();
    this.checkShieldCollisions();
    if (this.checkPlayerCollision()) {
      this.remove();
    }
  }

  public draw(): void {
    const line = this.shape as Line;
    this.with(() => this.polygon([line.vector, line.end]), this.style);
  }

  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return false;
    const line = this.shape;
    const d1 = player.shape.vector.distance(line.vector);
    const d2 = player.shape.vector.distance(line.end);
    if (d1 < player.shape.radius || d2 < player.shape.radius) {
      return true;
    }

    if (!line.collide(player.shape)) return false;

    const nextLine = new Line({
      vect: line.vector,
      end: line.end
        .clone()
        .add(Vector.fromAngle(this.angle).mulScalar(this.speed)),
    });

    if (!nextLine.collide(player.shape)) return false;
    return true;
  }
  protected checkConstraintCollision(): boolean {
    const constraint = this.global("constraint");
    if (!constraint) return false;
    const angle = this.shape.vector.angleFromVect(constraint.shape.vector);
    const [s, e] = [constraint.wall.start, constraint.wall.end];
    if (!inBetween(angle, s, e)) return false;

    return false;
  }
  protected checkShieldCollisions(): boolean {
    const player = this.global("player");
    if (!player) return false;
    const shields = player.cyclone.getShields();
    for (const cyclone of shields) {
      if (this.shape.collide(cyclone)) return true;
    }
    return false;
  }

  protected checkCyclonCollisions(): boolean {
    const player = this.global("player");
    if (!player) return false;
    const shields = player.cyclone.getShields();
    for (const cyclone of shields) {
      if (this.shape.collide(cyclone)) return true;
    }
    return false;
  }

  protected remove() {
    const line = this.shape;
    const player = this.global("player")!;
    this.explode(line.end, player.style.fillStyle || "");
    this.destroy();
    player.decreaseLife();
    this.sound.play("hit");
  }
}

export default ArrowEnemy;
