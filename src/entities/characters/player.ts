import Drawer from "../../core/drawer";
import Entity from "../../core/entity";
import Rect from "../../core/shape/rect";
import Vector from "../../core/vector";
import { EventMixin } from "../../mixins/events";

class Player extends EventMixin(Entity) {
  public direction: Vector;
  private counter = 0;
  constructor(
    zIndex: number,
    vector: Vector,
    direction: Vector = new Vector(0, 0)
  ) {
    super(zIndex, new Rect(vector, 10, 10));
    this.direction = direction;
  }

  public update(): void {
    this.direction = Vector.fromAngle(this.counter % (Math.PI * 2));

    this.direction.mul(new Vector(10, 20));

    this.shape.vector.add(this.direction);
    // if (this.shape.vector.distance(Canvas.instance.rect.bottomRight) < 600) {
    //   this.destroy();
    // }
    this.counter += 0.05;
  }
  public override draw(): void {
    Drawer.instance.text(
      "lucia",
      this.shape.vector.moveTo(new Vector(0, -10)),
      {
        font: "bold 30px Arial",
        style: "white",
      }
    );
    Drawer.instance.fillRect(this.shape as Rect, "blue");
  }
}

export default Player;
