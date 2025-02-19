import Drawer from "../drawer";
import Vector from "../vector";
import Shape from "./shape";

class Circle extends Shape {
  constructor(vector: Vector, public radius: number) {
    super(vector);
  }

  draw(): void {
    Drawer.instance.circle(this.vector, this.radius);
  }

  public tangentsFromVector(
    v: Vector,
    padding?: number
  ): [number | null, number | null] {
    const distance = v.distance(this.vector);
    const radius = this.radius - (padding || 0);
    if (distance < radius) return [null, null];

    const alpha = v.delta(this.vector).atan2();

    if (distance === radius) return [alpha + Math.PI, alpha + Math.PI];
    const theta = Math.asin(radius / distance);
    return [alpha - theta + Math.PI, alpha + theta + Math.PI];
  }

  public randomPointFromBorder(): Vector {
    const randomAngle = Math.random() * Math.PI * 2;
    return Vector.fromAngle(randomAngle).mulScalar(this.radius);
  }
}

export default Circle;
