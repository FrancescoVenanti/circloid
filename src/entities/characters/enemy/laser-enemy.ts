import { IMovingEntity } from "@/src/core/moving-entity";
import Line from "@/src/core/shape/line";
import sound from "@/src/core/sound";
import Vector from "@/src/core/vector";
import Enemy from "./enemy";

interface ILaser extends Omit<IMovingEntity<Line>, "key" | "shape"> {
  end: Vector;
  vect: Vector;
  frames: number;
}

class Laser extends Enemy {
  private frames: number;
  constructor({ frames, end, vect, ...props }: ILaser) {
    const shape = new Line({ end, vect });
    super({ ...props, shape, key: "laserEnemy" });
    this.frames = frames;
  }

  public static spawn(speedMultiplier: number, vect: Vector, angle: number) {
    const end = Vector.fromAngle(angle).mulScalar(700).add(vect);
    return new Laser({ end, vect, angle, speed: 0, frames: 120 });
  }

  public update(): void {
    if (this.frames <= 0) return this.destroy();
    this.checkPlayerCollision();
    this.frames--;
  }
  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return;
    const {
      shape: { vector, radius: maxDistance },
    } = player;
    if (this.shape.vector.distance(vector) < maxDistance) {
      this.remove();
      return;
    }
    if (this.shape.end.distance(vector) < maxDistance) {
      this.remove();
      return;
    }
    const angle = -1 / Math.tan(this.shape.angle);
    const end = Vector.fromAngle(angle).add(vector).mulScalar(2);
    const intersection = (this.shape as Line).intersection(
      new Line({ vect: vector, end })
    );
    if (!intersection) return;
    if (intersection.distance(vector) < maxDistance) {
      this.remove();
    }
  }
  private remove() {
    console.log("dai");
    const player = this.global("player")!;

    this.explode(this.shape.end, player.style.fillStyle || "");
    player.decreaseLife();
    sound.play("hit");
    this.destroy();
  }
}

export default Laser;
