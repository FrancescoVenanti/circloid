import { ROUND } from "@/src/utils";
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
    this.arc(this.vector, this.radius);
  }

  public tangentsFromVector(
    v: Vector,
    padding?: number
  ): [number | null, number | null] {
    const distance = v.distance(this.vector);
    const radius = this.radius - (padding || 0);
    if (distance < radius) return [null, null];

    const alpha = v.angleFromVect(this.vector);

    const theta = Math.asin(radius / distance);
    return [alpha - theta, alpha + theta];
  }

  public randomPointFromBorder(): Vector {
    const randomAngle = Math.random() * ROUND;
    return Vector.fromAngle(randomAngle).mulScalar(this.radius);
  }

  public collide(other: Circle) {
    const distance = this.vector.distance(other.vector);
    const maxDistance = this.radius + other.radius;
    return distance < maxDistance;
  }
}

export default Circle;
