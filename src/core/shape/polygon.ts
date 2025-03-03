import Vector from "../vector";
import Circle, { ICircle } from "./circle";

interface IPolygon extends ICircle {
  angles: number;
}

class Polygon extends Circle {
  private points: number[];
  public rotationAngle: number = 0;
  constructor(props: IPolygon) {
    super(props);
    this.points = this.generateRadius(props.angles);
  }
  private generateRadius(angles: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < angles; i++) {
      result.push(Math.random() * this.radius);
    }
    return result;
  }
  public draw(): void {
    this.polygon(this.getLines());
  }
  private getLines(): Vector[] {
    let result: Vector[] = [];
    let vect = Vector.zero;
    const angle = (Math.PI * 2) / this.points.length;
    for (let i = 0; i < this.points.length; i++) {
      vect = Vector.fromAngle(angle * i + this.rotationAngle);
      result.push(vect.mulScalar(this.points[i]));
    }
    return result;
  }
}

export default Polygon;
