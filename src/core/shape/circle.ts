import Drawer from "../drawer";
import Vector from "../vector";
import Shape, { IShape } from "./shape";

export interface ICircle extends IShape {
  radius: number;
}

class Circle extends Shape {
  public radius: number;
  constructor({ radius, ...props }: ICircle) {
    super(props);
    this.radius = radius;
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
