import Entity from "../../core/entity";
import type Vector from "../../core/vector";
import DebrisParticles from "./debris-particles";

class Explosion extends Entity<DebrisParticles> {
  constructor(vect: Vector) {
    const shape = new DebrisParticles({
      vect,
      amount: 10,
      radius: 10,
      speed: 10,
    });
    super({ shape, key: "explosion" });
  }
  public override update(): void {
    if (
      this.shape.particles.length === 0 ||
      this.shape.particles.every((p) => !p.active)
    )
      this.destroy();
  }
}

export default Explosion;
