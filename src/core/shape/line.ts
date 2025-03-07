import Vector from "../vector";
import Circle from "./circle";
import Shape, { IShape } from "./shape";

export interface ILine extends IShape {
  end: Vector;
}

class Line extends Shape {
  public end: Vector;
  constructor({ end, ...props }: ILine) {
    super(props);
    this.end = end;
  }

  public draw(): void {
    this.polygon([this.vector, this.end]);
  }

  public get angle() {
    return this.vector.angleFromVect(this.end);
  }
  public get intercept() {
    return this.vector.y - this.vector.x * Math.tan(this.angle);
  }

  public get length() {
    return this.vector.distance(this.end);
  }

  public intersection(other: Line) {
    const m1 = Math.tan(this.angle);
    const m2 = Math.tan(other.angle);
    const q1 = this.intercept;
    const q2 = other.intercept;
    if (m1 == m2) return null;
    const x = (q2 - q1) / (m1 - m2);
    const y = m1 * x + q1;
    return new Vector(x, y);
  }

  public contains(v: Vector): boolean {
    const m1 = Math.tan(this.angle);
    const other = new Line({ vect: this.vector, end: v });
    const m2 = Math.tan(other.angle);
    if (m1 !== m2) return false;

    const d1 = this.vector.distance(v);
    const d2 = this.end.distance(v);
    const length = this.length;

    if (d1 > length) return false;
    if (d2 > length) return false;

    return true;
  }

  public collide({ vector, radius: maxDistance }: Circle) {
    if (this.vector.distance(vector) < maxDistance) {
      return true;
    }
    if (this.end.distance(vector) < maxDistance) {
      return true;
    }
    const angle = -1 / Math.tan(this.angle);
    const end = Vector.fromAngle(angle).add(vector).mulScalar(2);
    const intersection = this.intersection(new Line({ vect: vector, end }));
    if (!intersection) return false;
    if (!this.contains(intersection)) {
      return false;
    }
    if (intersection.distance(vector) < maxDistance) {
      return true;
    }
  }
}

export default Line;
