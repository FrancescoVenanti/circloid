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

    const alpha = this.vector.delta(v).atan2();
    const angle = this.vector.angle(v);
    if (distance === radius) return [alpha, alpha];
    const theta = Math.asin(radius / distance);
    return [alpha - theta, alpha + theta];
  }

  public randomPointFromBorder(): Vector {
    const randomAngle = Math.random() * Math.PI * 2;
    return Vector.fromAngle(randomAngle).mulScalar(this.radius);
  }
}

export default Circle;
