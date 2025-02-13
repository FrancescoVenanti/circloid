import Drawer from "../drawer";
import Vector from "../vector";
import Shape from "./shape";

class Rect extends Shape {
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

  constructor(vector: Vector, public width: number, public height: number) {
    super(vector);
  }

  draw(): void {
    Drawer.instance.rect(this);
  }
}

export default Rect;
