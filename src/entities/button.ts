import Canvas from "../core/canvas";
import Drawer from "../core/drawer";
import Entity from "../core/entity";
import type Shape from "../core/shape/shape";
import Vector from "../core/vector";
import Ball from "./characters/ball";

class Button extends Entity {
  constructor(zIndex: number, shape: Shape, public position: Vector) {
    super(zIndex, shape);
  }
  public update(): void {}
  public static spawn(): void {
    new Ball(2, 10, new Vector(100, 100), 0, 0).store();
  }
  public override draw(): void {
    Drawer.instance.with(() => this.shape.draw(), {
      fillStyle: "white",
      strokeStyle: "white",
      style: "white",
    });
  }
  public upgrade(entity: Entity, property: keyof Entity): void {
    entity[property]++;
  }
}

export default Button;
