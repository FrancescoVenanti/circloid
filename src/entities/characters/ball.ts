import Canvas from "../../core/canvas";
import Entity from "../../core/entity";
import Vector from "../../core/vector";
import CircleEntity from "../circle-entity";

class Ball extends CircleEntity {
  constructor(
    zIndex: number,
    radius: number,
    vector: Vector,
    direction: Vector
  ) {
    super(zIndex, radius, vector, direction);
  }

  public static spawn(amount: number): void {
    for (let i = 0; i < amount; i++) {
      let vector = Vector.generateRandom();
      let ball = new Ball(1, 5, vector, new Vector(1, 1));
    }
  }
}
