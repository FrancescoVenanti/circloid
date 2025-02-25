"use client";
import Canvas from "@/src/core/canvas";
import Vector from "@/src/core/vector";
import Drawer from "../../core/drawer";
import Entity, { IEntity } from "../../core/entity";
import Circle from "../../core/shape/circle";
import ConstraintUpgrade from "../upgrades/constraint-upgrade";

interface IConstraint extends Omit<IEntity<Circle>, "shape"> {
  vect: Vector;
  radius: number;
}

class Constraint extends Entity<Circle> {
  private upgrade: ConstraintUpgrade;
  constructor({ vect, radius, ...props }: IConstraint) {
    const shape = new Circle({ vect, radius });
    super({ ...props, shape, key: "constraint" });
    this.upgrade = new ConstraintUpgrade({
      level: 0,
      maxLevel: 10,
      cost: 10,
      costMultiplier: 0.5,
      vector: Canvas.instance.rect.bottomLeft.moveTo(new Vector(100, -100)),
      initialValue: radius,
    });
    this.shape.radius = this.upgrade.valueOf;
    this.store();
  }

  public upgradeRadius() {
    this.upgrade.upgrade();
    this.shape.radius = this.upgrade.valueOf;
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
