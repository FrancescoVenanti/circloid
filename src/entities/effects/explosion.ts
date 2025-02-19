import Entity from "../../core/entity";
import type Vector from "../../core/vector";
import Particles from "./particles";

class Explosion extends Entity<Particles> {
  constructor(vect: Vector) {
    super(-1, new Particles(vect, 100, 10, 20));
  }
  public override update(): void {
    if (this.shape.particles.length == 0) this.destroy();
  }
}

export default Explosion;
