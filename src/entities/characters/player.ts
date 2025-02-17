import Canvas from "../../core/canvas";
import Drawer from "../../core/drawer";
import Entity from "../../core/entity";
import Circle from "../../core/shape/circle";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";
import { EventMixin } from "../../mixins/events";

class Player extends EventMixin(Entity) {
  private counter = 0;
  constructor(
    zIndex: number,
    vector: Vector,
    public angle: number,
    public speed: number
  ) {
    super(zIndex, new Circle(vector, 10));
    this.angle = angle;
    this.speed = speed;
    this.listenKeyboard();
  }

  private listenKeyboard() {
    window.addEventListener("keydown", (e) => {
      const keys = new Set(["w", "a", "s", "d"]);
      if (keys.has(e.key)) {
        this.keyMap.add(e.key);
      }
    });
    window.addEventListener("keyup", (e) => {
      this.keyMap.delete(e.key);
    });
  }

  private keyMap: Set<String> = new Set();

  private move() {
    const x = ["a", "d"];
    const y = ["w", "s"];
    const newDirection = new Vector(0, 0);
    if (this.keyMap.has(x[0])) {
      newDirection.x = -1;
    }
    if (this.keyMap.has(x[1])) {
      newDirection.x += 1;
    }
    if (this.keyMap.has(y[0])) {
      newDirection.y = -1;
    }
    if (this.keyMap.has(y[1])) {
      newDirection.y += 1;
    }

    if (newDirection.y === 0 && newDirection.x === 0) return;
    this.preventEscape(newDirection);
    // if (newDirection.y === 0 && newDirection.x === 0) return;
    this.angle = Math.atan2(newDirection.y, newDirection.x);

    const direction = Vector.fromAngle(this.angle);
    direction.mul(new Vector(this.speed, this.speed));
    this.shape.vector.add(direction);
  }

  private preventEscape(direction: Vector) {
    const constraint = Canvas.instance.get("constraint");
    if (!constraint) return;
    if (
      !(this.shape instanceof Circle) ||
      !(constraint.shape instanceof Circle)
    )
      return;

    const position = constraint.shape.vector;
    const distance = position.distance(this.shape.vector);
    const maxDistance = constraint.shape.radius - this.shape.radius; // Distanza massima consentita

    if (distance >= maxDistance) {
      // Riporta il Player al bordo esatto
      const angle = position.angleFromVect(this.shape.vector);
      direction.x = position.x + maxDistance * Math.cos(angle);
      direction.y = position.y + maxDistance * Math.sin(angle);

      // direction.x = 0;
      // direction.y = 0;
    }
  }

  public update(): void {
    this.move();
  }
  public override draw(): void {
    Drawer.instance.text(
      "Player",
      this.shape.vector.moveTo(new Vector(-15, 10)),
      {
        font: "bold 10px Arial",
        style: "white",
      }
    );
    Drawer.instance.circle(this.shape.vector, 10);
  }
}

export default Player;
