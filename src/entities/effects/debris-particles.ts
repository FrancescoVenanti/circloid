import Drawer from "@/src/core/drawer";
import MultipleShapes, { IMultipleShapes } from "../../core/multiple-shapes";
import Debris from "./debris";

interface IDebrisParticles extends IMultipleShapes {
  radius: number;
}

class DebrisParticles extends MultipleShapes<Debris> {
  private radius: number;
  constructor({ radius, ...props }: IDebrisParticles) {
    super(props);
    this.radius = radius;
  }

  protected generate(): Debris {
    const angle = Math.PI * 2 * Math.random();
    return new Debris({
      zIndex: -1,
      radius: this.radius,
      vect: this.vector.clone(),
      angle,
      angles: 7,
      speed: (Math.random() * this.speed) / 2,
    });
  }
  protected drawShape(shape: Debris): void {
    Drawer.instance.with(() => shape.draw(), {
      fillStyle: "red",
      fill: true,
      strokeStyle: "coral",
    });
  }
}

export default DebrisParticles;
