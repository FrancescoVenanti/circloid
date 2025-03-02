import Entity from "../../core/entity";
import type Vector from "../../core/vector";
import DebrisParticles from "./debris-particles";

class Explosion extends Entity<DebrisParticles> {
  constructor(vect: Vector, colors: string[] = []) {
    const shape = new DebrisParticles({
      vect,
      amount: 20,
      radius: 50,
      speed: 10,
      colors,
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
