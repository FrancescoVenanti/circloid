import { inBetween } from "@/src/utils";
import Vector from "../vector";
import Shape, { IShape } from "./shape";

export interface IRect extends IShape {
  width: number;
  height: number;
}

class Rect extends Shape {
  public width: number;
  public height: number;

  public static get zero() {
    return new Rect({ vect: Vector.zero, width: 0, height: 0 });
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

  constructor({ height, width: witdh, ...props }: IRect) {
    super(props);
    this.width = witdh;
    this.height = height;
  }

  draw(): void {
    this.rect(this);
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

    const randomSegment = Math.floor(Math.random() * 4);
    // console.log(randomSegment);
    return start[randomSegment].randomVectorFromSegment(end[randomSegment]);
  }

  public containsVector(vect: Vector, padding: number = 0): boolean {
    return (
      inBetween(
        vect.x,
        this.vector.x + padding,
        this.bottomRight.x - padding
      ) &&
      inBetween(vect.y, this.vector.y + padding, this.bottomRight.y - padding)
    );
  }
}

export default Rect;
