import Drawer from "@/src/core/drawer";
import Vector from "@/src/core/vector";
import Ball, { IBall } from "../ball";

export interface IDebris extends IBall {
  angles: number;
  rotation?: number;
}

class Debris extends Ball {
  private rotationAngle = 0;
  private randomRadius: number[] = [];
  private rotation: number;
  constructor({ angles, rotation = 0, ...props }: IDebris) {
    super({ ...props, key: "debris" });
    this.shape.radius = 10;
    this.rotation = rotation;
    this.randomRadius = this.generateRandomRadius(angles);
  }

  private generateRandomRadius(length: number): number[] {
    if (length < 3) throw new Error("angles must be greater than 3!");
    const randomRadius: number[] = [];
    for (let i = 0; i < length; i++) {
      randomRadius.push(Math.random() * 0.5);
    }
    return randomRadius;
  }

  public update(): void {
    for (let i = 0; i < this.randomRadius.length; i++) {
      if (this.randomRadius[i] >= 0.8) {
        this.destroy();
        return;
      }
      this.randomRadius[i] += 0.01;
    }
    this.rotationAngle = (this.rotationAngle + this.rotation) % (Math.PI * 2);

    this.shape.vector.translate(this.angle, this.speed);
  }

  public draw(): void {
    const center = this.shape.vector.clone();
    const lines: Vector[] = [];
    const radius = this.shape.radius;

    for (let i = 0; i < this.randomRadius.length; i++) {
      const line = center.clone();
      line.translate(
        (i * 2 * Math.PI) / this.randomRadius.length + this.rotationAngle,
        radius - this.randomRadius[i] * radius
      );
      lines.push(line.clone());
    }

    if (lines.length > 0) lines.push(lines[0].clone());

    Drawer.instance.with(() => Drawer.instance.polygon(lines), this.style);
  }
}

export default Debris;
