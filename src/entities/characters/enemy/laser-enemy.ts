import { IMovingEntity } from "@/src/core/moving-entity";
import Line from "@/src/core/shape/line";
import sound from "@/src/core/sound";
import Vector from "@/src/core/vector";
import { Drawable } from "roughjs/bin/core";
import Enemy from "./enemy";

interface ILaser extends Omit<IMovingEntity<Line>, "key" | "shape"> {
  end: Vector;
  vect: Vector;
  frames: number;
  warning: number;
}

class Laser extends Enemy {
  private frames: number;
  private warning: number;
  private line: Drawable;
  constructor({ warning, frames, end, vect, ...props }: ILaser) {
    const shape = new Line({ end, vect });
    super({ ...props, shape, key: "laserEnemy" });
    this.frames = frames;
    this.warning = warning;
    this.line = this.drawer.sketchy.line(shape);
  }

  public static spawn(speedMultiplier: number, vect: Vector, angle: number) {
    const end = Vector.fromAngle(angle).mulScalar(700).add(vect);
    return new Laser({
      end,
      vect,
      angle,
      speed: 0,
      frames: 120,
      warning: 120,
      zIndex: -100000,
    });
  }

  public update(): void {
    if (this.warning > 0) {
      this.warning--;
      return;
    }
    if (this.frames <= 0) return this.destroy();
    this.checkPlayerCollision() && this.remove();
    this.frames--;
  }
  protected checkPlayerCollision() {
    const player = this.global("player");
    if (!player) return false;
    const line = this.shape as Line;
    const {
      shape: { vector, radius: maxDistance },
    } = player;
    if (line.vector.distance(vector) < maxDistance) {
      return true;
    }
    if (line.end.distance(vector) < maxDistance) {
      return true;
    }
    const angle = -1 / Math.tan(line.angle);
    const end = Vector.fromAngle(angle).add(vector).mulScalar(2);
    const intersection = line.intersection(new Line({ vect: vector, end }));
    if (!intersection) return false;
    if (!line.contains(intersection)) {
      console.log("interseca ma non contiene");
      return false;
    }
    if (intersection.distance(vector) < maxDistance) {
      return true;
    }
  }

  public draw(): void {
    if (this.warning > 0) {
      this.with(() => this.drawer.sketchy.draw(this.line), {
        ...this.style,
        strokeStyle: "yellow",
      });
      return;
    }
    this.with(() => this.drawer.sketchy.draw(this.line), this.style);
  }

  private remove() {
    console.log("dai");
    const player = this.global("player")!;

    this.explode(this.shape.end, player.style.fillStyle || "");
    player.decreaseLife();
    sound.play("hit").play();
    this.destroy();
  }
}

export default Laser;
