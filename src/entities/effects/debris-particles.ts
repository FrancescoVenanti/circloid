import MultipleShapes, {
  IMultipleShapes,
} from "../../core/shape/multiple-shapes";
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
    const stile: Options = { fillStyle: "white", fill: true, lineWidth: 2 };
    console.log("stile before " + stile.fillStyle);
    return new Debris({
      zIndex: -1,
      radius: this.radius,
      vect: this.vector.clone(),
      angle,
      angles: 7,
      rotation: Math.random() * 0.2 - 0.1,
      speed: (Math.random() * this.speed) / 2,
      style: stile,
    });
  }
  private generateColor(): string {
    const colors = ["lightblue", "coral"];
    const index = Math.random() * colors.length;
    return colors[Math.floor(index)];
  }
}

export default DebrisParticles;
