import Polygon from "@/src/core/shape/polygon";
import Enemy, { IEnemy } from "./enemy";

class PolygonEnemy extends Enemy<Polygon> {
  constructor(props: IEnemy<Polygon>) {
    super(props);
  }
  protected checkPlayerCollision(): boolean {
    const player = this.global("player");
    if (!player) return false;
    const lines = this.shape.getLines();
    for (const line of lines) {
      if (line.distance(player.shape.vector) < player.shape.radius) return true;
    }
    return false;
  }
  protected checkConstraintCollision(): boolean {
    return false;
  }
  protected checkShieldCollisions(): boolean {
    return false;
  }
}
