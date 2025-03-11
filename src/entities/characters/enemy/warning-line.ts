import canvas from "@/src/core/canvas";
import SEntity from "@/src/core/entity/sentity";
import { IMovingEntity } from "@/src/core/moving-entity";
import Line from "@/src/core/shape/line";
import Vector from "@/src/core/vector";
import ArrowEnemy from "./arrow-enemy";

interface IWarningLine extends Omit<IMovingEntity<Line>, "key" | "shape"> {
  end: Vector;
  vect: Vector;
  frames: number;
  blinking: number;
}

class WarningLine extends SEntity<Line> {
  private frames: number;
  private blinking: [number, number, boolean];

  constructor({ frames, blinking, end, vect, ...props }: IWarningLine) {
    const shape = new Line({ end, vect });
    super({ ...props, shape, key: "warningLine" });
    this.frames = frames;
    this.blinking = [0, blinking, true];
  }

  public static spawn(speedMultiplier: number, vect: Vector, angle: number) {
    const end = Vector.fromAngle(angle)
      .mulScalar(canvas.shape.diagonal)
      .add(vect);
    return new WarningLine({
      end,
      vect,
      angle,
      speed: 0,
      frames: 120,
      blinking: 24,
    });
  }

  private generateArrow() {
    const line = this.shape as Line;
    this.destroy();
    const arrow = new ArrowEnemy({
      vect: line.vector,
      angle: line.angle,
      speed: 50,
      length: 100,
    });
    arrow.store();
  }

  public update(): void {
    if (this.frames <= 0) {
      this.generateArrow();
      return;
    }
    this.frames--;

    if (this.blinking[0] >= this.blinking[1]) {
      this.blinking[0] = 0;
      this.blinking[2] = !this.blinking[2];
    }
    this.blinking[0]++;
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
      return false;
    }
    if (intersection.distance(vector) < maxDistance) {
      return true;
    }
  }

  public draw(): void {
    const lines = [this.shape.vector, this.shape.end];
    const [_, __, blink] = this.blinking;
    if (!blink) return;

    this.with(() => this.drawer.polygon(lines), this.style);
  }
}

export default WarningLine;
