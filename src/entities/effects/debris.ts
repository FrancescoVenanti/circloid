import Drawer from "@/src/core/drawer";
import Vector from "@/src/core/vector";
import Ball, { IBall } from "../ball";

export interface IDebris extends IBall {
  angles: number;
  rotation?: number;
  deceleration?: number;
}

class Debris extends Ball {
  private rotationAngle = 0;
  private randomRadius: number[] = [];
  private rotation: number;
  private deceleration: number;
  constructor({ angles, rotation = 0, deceleration = 0, ...props }: IDebris) {
    super({ ...props, key: "debris" });
    this.shape.radius = 10;
    this.rotation = rotation;
    this.deceleration = deceleration;
    this.randomRadius = this.generateRandomRadius(angles);
  }

  private generateRandomRadius(length: number): number[] {
    const randomRadius: number[] = [];
    for (let i = 0; i < length; i++) {
      randomRadius.push(Math.random() * 0.6);
    }
    return randomRadius;
  }
  public update(): void {
    this.shape.vector.add(Vector.fromAngle(this.angle).mulScalar(this.speed));
    for (let i = 0; i < this.randomRadius.length; i++) {
      // this.randomRadius[i] -= 0.1;
      if (this.randomRadius[i] <= 0) this.destroy();
    }
  }

  public draw(): void {
    const center = this.shape.vector.clone();
    const lines: Vector[] = [];
    const radius = this.shape.radius;

    for (let i = 0; i < this.randomRadius.length; i++) {
      const line = center.clone();
      line.translate(
        (i * 2 * Math.PI) / this.randomRadius.length,
        radius - this.randomRadius[i] * radius
      );
      lines.push(line.clone());
    }

    if (lines.length > 0) lines.push(lines[0].clone());

    Drawer.instance.polygon(lines);
  }
}

export default Debris;
