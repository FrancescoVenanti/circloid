import Vector from "@/src/core/vector";
import Ball from "../ball";

class Debris extends Ball {
  constructor(
    vect: Vector,
    radius: number,
    public angles: number,
    public variants: number
  ) {
    super(1, radius, vect, "debris", 0, 0);
  }

  public update(): void {}

  public draw(): void {}
}
