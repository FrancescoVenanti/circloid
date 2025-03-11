import { ROUND } from "@/src/utils";
import Vector from "../vector";
import Circle, { ICircle } from "./circle";

interface IPolygon extends ICircle {
  angles: number;
  variance?: number;
}

class Polygon extends Circle {
  private _points: number[];
  public rotationAngle: number = 0;
  public get points() {
    return this._points;
  }
  constructor(props: IPolygon) {
    super(props);
    this._points = this.generateRadius(props.angles, props.variance || 0);
  }
  private generateRadius(angles: number, variance: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < angles; i++) {
      result.push(this.radius - Math.random() * variance * this.radius);
    }
    return result;
  }
  public draw(): void {
    this.polygon(this.getLines());
  }
  public getLines(): Vector[] {
    let result: Vector[] = [];
    let vect = Vector.zero;
    const angle = ROUND / this._points.length;
    for (let i = 0; i < this._points.length; i++) {
      vect = Vector.fromAngle(angle * i + this.rotationAngle);
      result.push(vect.mulScalar(this._points[i]).add(this.vector));
    }
    return result;
  }
}

export default Polygon;
