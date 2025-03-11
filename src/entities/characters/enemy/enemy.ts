import MovingEntity, { IMovingEntity } from "@/src/core/moving-entity";
import Shape from "@/src/core/shape/shape";
import Vector from "@/src/core/vector";
import Explosion from "../../effects/explosion";

export interface IEnemy<T extends Shape> extends IMovingEntity<T> {}

abstract class Enemy<T extends Shape> extends MovingEntity<T> {
  constructor(props: IEnemy<T>) {
    super(props);
  }

  public update(): void {
    if (!this.canvasShape.containsVector(this.shape.vector, -10)) {
      return this.destroy();
    }

    const direction = Vector.fromAngle(this.angle);

    direction.mulScalar(this.speed);

    this.shape.vector.add(direction);

    this.checkCollisions();
  }

  protected checkCollisions() {
    const player = this.global("player");
    const constraint = this.global("constraint");
    if (this.checkShieldCollisions()) {
      this.remove(player?.shield.color || "");
      this.sound.play("hitShield");
    } else if (this.checkPlayerCollision()) {
      this.sound.play("hit");
      player?.decreaseLife();
      this.remove(player?.style.fillStyle || "");
    } else if (this.checkConstraintCollision()) {
      this.sound.play("hitShield");
      this.remove(constraint?.wall.style.strokeStyle || "");
    } else if (this.checkCyclonCollisions()) {
      this.sound.play("hitShield");
      this.remove(player?.cyclone.style.fillStyle || "");
    }
  }

  protected abstract checkPlayerCollision(): boolean;
  protected abstract checkConstraintCollision(): boolean;
  protected abstract checkShieldCollisions(): boolean;
  protected abstract checkCyclonCollisions(): boolean;

  protected remove(...extraColors: string[]) {
    this.explode(this.shape.vector, ...extraColors);
    this.destroy();
  }
  public explode(vect: Vector, ...extraColors: string[]) {
    new Explosion(vect, [
      this.style.fillStyle || this.style.strokeStyle || "",
      ...extraColors,
    ]).store();
  }
}

export default Enemy;
