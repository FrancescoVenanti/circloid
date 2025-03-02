import Shape, { IShape } from "../../core/shape/shape";
import Ball from "../ball";

interface IParticles extends IShape {
  amount: number;
  radius: number;
  speed: number;
}

class Particles extends Shape {
  public particles: Ball[] = [];
  private radius: number;
  private speed: number;

  constructor({ vect, amount, radius, speed }: IParticles) {
    super({ vect });
    this.radius = radius;
    this.speed = speed;
    this.initialize(amount);
  }

  private initialize(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.particles.push(this.generate());
    }
  }
  private generate(): Ball {
    const angle = Math.PI * 2 * Math.random();
    return new Ball({
      zIndex: -1,
      radius: this.radius,
      vect: this.vector.clone(),
      key: "ballparticle",
      angle,
      speed: (Math.random() * this.speed) / 2,
    });
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
    this.with(() => ball.draw(), {
      fill: true,
      fillStyle: "coral",
    });
    ball.update();
  }
}

export default Particles;
