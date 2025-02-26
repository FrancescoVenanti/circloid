import MultipleShapes, {
  IMultipleShapes,
} from "../../core/shape/multiple-shapes";
import Debris from "./debris";

interface IDebrisParticles extends IMultipleShapes {
  radius: number;
  colors: string[];
}

class DebrisParticles extends MultipleShapes<Debris> {
  private radius: number;
  private colors: string[];
  constructor({ radius, colors, ...props }: IDebrisParticles) {
    super(props);
    this.radius = radius;
    this.colors = colors;
    this.initialize(props.amount);
  }

  protected generate(): Debris {
    const angle = Math.PI * 2 * Math.random();
    return new Debris({
      zIndex: -1,
      radius: this.radius,
      vect: this.vector.clone(),
      angle,
      angles: 7,
      rotation: Math.random() * 0.2 - 0.1,
      speed: (Math.random() * this.speed) / 2,
      style: { fillStyle: this.generateColor(), fill: true, lineWidth: 0 },
    });
  }
  private generateColor(): string {
    const index = Math.random() * this.colors.length;
    return this.colors[Math.floor(index)];
  }
}

export default DebrisParticles;
