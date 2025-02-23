import Drawer from "@/src/core/drawer";
import Vector from "@/src/core/vector";
import Ball, { IBall } from "../ball";

export interface IDebris extends IBall {
  angles: number;
  variants?: number;
  rotation?: number;
}

class Debris extends Ball {
  private rotationAngle = 0;
  private variants: number;
  private randomRadius: number[] = [];
  private rotation: number;
  constructor({ angles, variants = 0, rotation = 0, ...props }: IDebris) {
    super({ ...props, key: "debris" });
    this.variants = variants;
    this.rotation = rotation;
    this.randomRadius = this.generateRandomRadius(angles);
  }

  private generateRandomRadius(length: number): number[] {
    const variant = this.shape.radius * this.variants;
    const randomRadius: number[] = [];
    for (let i = 0; i < length; i++) {
      randomRadius.push(Math.random() * 15 + 5);
    }
    return randomRadius;
  }
  public update(): void {
    this.shape.vector.add(Vector.fromAngle(this.angle).mulScalar(this.speed));
    for (let i = 0; i < this.randomRadius.length; i++) {
      this.randomRadius[i] -= 0.2;
      if (this.randomRadius[i] <= 0) this.destroy();
    }
  }

  public draw(): void {
    this.drawLines();
  }

  private drawLines() {
    const center = this.shape.vector.clone();
    const lines: Vector[] = [];

    for (const distance of this.randomRadius) {
      const line = center.clone();
      line.translate(this.rotationAngle, distance);
      lines.push(line.clone());
    }

    if (lines.length > 0) lines.push(lines[0]);
    // lines.forEach((l) => Drawer.instance.circle(l, 10));
    Drawer.instance.line(lines);
  }
}

export default Debris;
