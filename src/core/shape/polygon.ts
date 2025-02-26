import Circle, { ICircle } from "./circle";

interface IPolygon extends ICircle {}

class Polygon extends Circle {
  constructor(props: IPolygon) {
    super(props);
  }
  public draw(): void {}
}

export default Polygon;
