import Drawer from "../drawer";
import Vector from "../vector";
import Shape, { IShape } from "./shape";

export interface IRect extends IShape {
  witdh: number;
  height: number;
}

class Rect extends Shape {
  public width: number;
  public height: number;

  public static get zero() {
    return new Rect({ vect: Vector.zero, witdh: 0, height: 0 });
  }
  public get center(): Vector {
    return new Vector(
      this.vector.x + this.width / 2,
      this.vector.y + this.height / 2
    );
  }

  public get topLeft(): Vector {
    return new Vector(this.vector.x, this.vector.y);
  }
  public get topRight(): Vector {
    return new Vector(this.vector.x + this.width, this.vector.y);
  }
  public get bottomLeft(): Vector {
    return new Vector(this.vector.x, this.vector.y + this.height);
  }
  public get bottomRight(): Vector {
    return new Vector(this.vector.x + this.width, this.vector.y + this.height);
  }

  constructor({ height, witdh, ...props }: IRect) {
    super(props);
    this.width = witdh;
    this.height = height;
  }

  draw(): void {
    Drawer.instance.rect(this);
  }

  public randomPointFromBorder() {
    const start = [
      this.topLeft,
      this.topRight,
      this.bottomRight,
      this.bottomLeft,
    ];
    const end = [
      this.topRight,
      this.bottomRight,
      this.bottomLeft,
      this.topLeft,
    ];

    const randomSegment = Math.floor(Math.random() * 2) + 2;
    console.log(randomSegment);
    return start[randomSegment]
      .clone()
      .randomVectorFromSegment(end[randomSegment].clone());
  }

  public inBetween(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
  }

  public containsVector(vect: Vector, padding: number = 0): boolean {
    return (
      this.inBetween(
        vect.x,
        this.vector.x + padding,
        this.bottomRight.x - padding
      ) &&
      this.inBetween(
        vect.y,
        this.vector.y + padding,
        this.bottomRight.y - padding
      )
    );
  }
}

export default Rect;
