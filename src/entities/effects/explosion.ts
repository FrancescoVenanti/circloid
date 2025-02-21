import Entity from "../../core/entity";
import type Vector from "../../core/vector";
import Particles from "./particles";

class Explosion extends Entity<Particles> {
  constructor(vect: Vector) {
    const shape = new Particles(vect, 10, 8, 10);
    super({ zIndex: 1, shape, key: "explosion" });
  }
  public override update(): void {
    if (this.shape.particles.length == 0) this.destroy();
  }
}

export default Explosion;
