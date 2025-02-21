"use client";
import Drawer from "../../core/drawer";
import Entity from "../../core/entity";
import Circle from "../../core/shape/circle";
import type Vector from "../../core/vector";

class Constraint extends Entity<Circle> {
  constructor(zIndex: number, vector: Vector, radius: number) {
    super(zIndex, new Circle(vector, radius), "constraint");
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
