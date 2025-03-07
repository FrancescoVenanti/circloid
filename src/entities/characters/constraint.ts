"use client";
import Vector from "@/src/core/vector";
import GlobalMixin from "@/src/mixins/global";
import RotatingMixin from "@/src/mixins/rotating";
import Entity, { IEntity } from "../../core/entity";
import Circle from "../../core/shape/circle";
import ConstraintUpgrade from "../upgrades/constraint-upgrade";
import ConstraintWall from "../upgrades/constraint-wall";

interface IConstraint extends Omit<IEntity<Circle>, "shape"> {
  vect: Vector;
  radius: number;
}

class Constraint extends GlobalMixin(RotatingMixin(Entity<Circle>)) {
  public radiusUpgrade: ConstraintUpgrade;
  public wall: ConstraintWall;
  // private drawable: Drawable;
  constructor({ vect, radius, ...props }: IConstraint) {
    const shape = new Circle({ vect, radius });
    super({ ...props, shape, key: "constraint" });
    this.radiusUpgrade = new ConstraintUpgrade({
      level: 0,
      maxLevel: 10,
      cost: 10,
      costMultiplier: 1,
      vector: this.global("buttonPosition").clone().addX(100),
      label: "Constraint",
      keyPress: "2",
      initialValue: radius,
    });
    this.wall = new ConstraintWall({
      label: "Wall",
      keyPress: "4",
      cost: 10,
      vector: this.global("buttonPosition").clone().addX(300),
      costMultiplier: 2,
      initialValue: 0,
      maxLevel: 10,
      radiant: 36,
    });
    this.shape.radius = this.radiusUpgrade.value;
    this.store();
    this.radiusUpgrade.store();
    this.wall.store();
    // this.listenResize();
  }
  // private listenResize() {
  //   this.addEventListener("resize", () => {
  //     this.shape.vector = this.canvasShape.center;
  //   });
  // }

  public upgradeRadius(): boolean {
    const upgrade = this.radiusUpgrade.upgrade();
    this.shape.radius = this.radiusUpgrade.value;
    return upgrade;
  }

  public reset() {
    this.radiusUpgrade.reset();
    this.wall.reset();
    this.shape.radius = this.radiusUpgrade.value;
  }

  public update() {
    // this.rotation++;
  }
  public override draw() {
    this.with(() => this.shape.draw(), {
      ...this.style,
      lineWidth: 2,
      strokeStyle: "palegreen",
    });
  }
}

export default Constraint;
