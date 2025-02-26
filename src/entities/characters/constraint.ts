"use client";
import Canvas from "@/src/core/canvas";
import Vector from "@/src/core/vector";
import Drawer from "../../core/drawer";
import Entity, { IEntity } from "../../core/entity";
import Circle from "../../core/shape/circle";
import ConstraintUpgrade from "../upgrades/constraint-upgrade";
import GLOBAL from "@/src/core/global";

interface IConstraint extends Omit<IEntity<Circle>, "shape"> {
  vect: Vector;
  radius: number;
}

class Constraint extends Entity<Circle> {
  public radiusUpgrade: ConstraintUpgrade;
  constructor({ vect, radius, ...props }: IConstraint) {
    const shape = new Circle({ vect, radius });
    super({ ...props, shape, key: "constraint" });
    this.radiusUpgrade = new ConstraintUpgrade({
      level: 0,
      maxLevel: 10,
      cost: 10,
      costMultiplier: 1,
      vector: GLOBAL("buttonPosition").clone().addX(100),
      label: "Constraint",
      keyPress: "2",
      initialValue: radius,
    });
    this.shape.radius = this.radiusUpgrade.value;
    this.store();
    this.radiusUpgrade.store();
  }

  public upgradeRadius(): boolean {
    const upgrade = this.radiusUpgrade.upgrade();
    this.shape.radius = this.radiusUpgrade.value;
    return upgrade;
  }
  public reset() {
    this.radiusUpgrade.reset();
    this.shape.radius = this.radiusUpgrade.value;
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
