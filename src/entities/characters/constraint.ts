"use client";
import Vector from "@/src/core/vector";
import Drawer from "../../core/drawer";
import Entity, { IEntity } from "../../core/entity";
import Circle from "../../core/shape/circle";

interface IConstraint extends Omit<IEntity<Circle>, "shape"> {
  vect: Vector;
  radius: number;
}

class Constraint extends Entity<Circle> {
  constructor({ vect, radius, ...props }: IConstraint) {
    const shape = new Circle({ vect, radius });
    super({ ...props, shape, key: "constraint" });
    this.store();
  }
  public update() {}
  public override draw() {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "palegreen",
      lineWidth: 5,
      strokeStyle: "palegreen",
    });
  }
}

export default Constraint;
