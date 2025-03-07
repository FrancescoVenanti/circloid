import { IEntity } from "@/src/core/entity";
import Enemy from "./enemy";
import Line from "@/src/core/shape/line";
import { IMovingEntity } from "@/src/core/moving-entity";
import Vector from "@/src/core/vector";
import Circle from "@/src/core/shape/circle";

interface IArrowEnemy extends Omit<IMovingEntity<Line>, "shape" | "key"> {
  vect: Vector;
  length: number;
}

class ArrowEnemy extends Enemy {
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

    this.shape.vector.add(direction);
    this.shape.end.add(direction);

    this.checkConstraintCollision();
    this.checkShieldCollisions();
    this.checkPlayerCollision();
  }

  public draw(): void {
    const line = this.shape as Line;
    this.with(() => this.polygon([line.vector, line.end]), this.style);
  }

  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return false;
    const line = this.shape as Line;
    const d1 = player.shape.vector.distance(line.vector);
    const d2 = player.shape.vector.distance(line.end);
    if (d1 >= player.shape.radius) return;
    if (d2 >= player.shape.radius) return;

    if (!line.collide(player.shape)) return;
    const nextLine = new Line({
      vect: line.vector,
      end: line.vector
        .clone()
        .add(Vector.fromAngle(this.angle).mulScalar(this.speed)),
    });
    const movedShape = new Circle({
      vect: player.shape.vector,
      radius: player.shape.radius + player.speed,
    });

    if (!nextLine.collide(movedShape)) return;

    this.explode(line.vector, player.style.fillStyle || "");
    this.destroy();
    this.sound.play("hit");
  }
}

export default ArrowEnemy;
