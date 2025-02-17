import Entity from "../../core/entity";
import Circle from "../../core/shape/circle";
import type Vector from "../../core/vector";

class Constraint extends Entity {
  constructor(zIndex: number, vector: Vector, radius: number) {
    super(zIndex, new Circle(vector, radius));
    this.key = "constraint";
    this.store();
  }
  public update() {}
}

export default Constraint;
