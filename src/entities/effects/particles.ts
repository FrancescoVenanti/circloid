import Drawer from "../../core/drawer";
import Shape from "../../core/shape/shape";
import Vector from "../../core/vector";
import Ball from "../ball";

class Particles extends Shape {
  public particles: Ball[] = [];

  constructor(
    vect: Vector,
    public amount: number,
    public radius: number,
    public speed: number
  ) {
    super(vect);
    this.initialize();
  }

  private initialize() {
    for (let i = 0; i < this.amount; i++) {
      this.particles.push(this.generate());
    }
  }
  private generate(): Ball {
    const angle = Math.PI * 2 * Math.random();
    return new Ball(
      -1,
      this.radius,
      this.vector.clone(),
      "ballparticle",
      angle,
      (Math.random() * this.speed) / 2
    );
  }

  public override draw() {
    for (const particle of this.particles) {
      if (particle.shape.radius - 1 <= 0) {
        particle.destroy();
      } else {
        particle.shape.radius -= 0.2;
        this.drawParticle(particle);
      }
    }
  }

  private drawParticle(ball: Ball) {
    Drawer.instance.with(() => ball.draw(), {
      fill: true,
      fillStyle: "coral",
    });
    ball.update();
  }
}

export default Particles;
