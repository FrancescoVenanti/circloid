import Drawer from "../../core/drawer";
import MultipleShapes from "../../core/shape/multiple-shapes";
import { IShape } from "../../core/shape/shape";
import Ball from "../ball";

export interface IBallParticles extends IShape {
  amount: number;
  radius: number;
  speed: number;
  decreasingSpeed: number;
}

class MutlipleBalls extends MultipleShapes<Ball> {
  private radius: number;
  private decreasingSpeed: number;
  constructor({ radius, decreasingSpeed, ...props }: IBallParticles) {
    super(props);
    this.radius = radius;
    this.decreasingSpeed = decreasingSpeed;
  }
  generate(): Ball {
    const angle = Math.PI * 2 * Math.random();
    return new Ball({
      zIndex: -1,
      radius: this.radius,
      vect: this.vector.clone(),
      angle,
      speed: (Math.random() * this.speed) / 2,
    });
  }

  protected drawShape(shape: Ball) {
    Drawer.instance.with(() => shape.draw(), {
      fill: true,
      fillStyle: "coral",
    });
    if (shape.shape.radius - this.decreasingSpeed <= 0) {
      shape.destroy();
    } else {
      shape.shape.radius -= this.decreasingSpeed;
      shape.update();
    }
  }
}

export default MutlipleBalls;
