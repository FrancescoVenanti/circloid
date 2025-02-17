import Drawer from "../drawer";
import type Vector from "../vector";
import Shape from "./shape";

class Circle extends Shape {
  constructor(vector: Vector, public radius: number) {
    super(vector);
  }

  draw(): void {
    Drawer.instance.circle(this.vector, this.radius);
  }

  public tangentsFromVector(v: Vector): [number | null, number | null] {
    const distance = v.distance(this.vector);
    if(distance < this.radius) return [null, null];
    
    const alpha = v.delta(this.vector).atan2();
    
    if (distance === this.radius) return [alpha + Math.PI, alpha + Math.PI];
    const theta = Math.asin(this.radius / distance);
    return [alpha - theta + Math.PI, alpha + theta + Math.PI]
  }
}

export default Circle;
