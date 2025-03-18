import SEntity from "@/src/core/entity/sentity";
import Vector from "@/src/core/vector";
import CanvasMixin from "@/src/mixins/canvas";
import GlobalMixin from "@/src/mixins/global";
import Upgrade from "../../upgrades/upgrades";
import { Globals } from "@/src/core/global";

class BonusSpawner extends CanvasMixin(GlobalMixin(class {})) {
  public static instance = new BonusSpawner();

  private counter = 0;
  private enemies: ((
    speedMultiplier: number,
    vect: Vector,
    angle: number
  ) => SEntity<any> | null)[] = [];
  private upgrades: Upgrade<any>[] = [];
  private constructor() {
    super();
    this.upgrades = (["constraint", "player"] as (keyof Globals)[])
      .map(this.global)
      .flatMap((obj) => this.getUpgradeProps(obj as object));
  }
  private getUpgradeProps(obj: object | null) {
    if (!obj) return [];
    const result: Upgrade<any>[] = [];
    for (const value in Object.values(obj)) {
      if (!value) continue;
      if (typeof value !== "object") continue;
      if ((value as object) instanceof Upgrade) {
        result.push(value);
      }
    }
    return result;
  }
  public spawn(speedMultiplier: number) {
    const player = this.global("player")!;
    this.counter++;
    const amount = Math.ceil(player.points / 30);
    const fps = (60 / this.global("fps")) * 2;
    let delay = 1;
    if (player.points == 0) return;
    if (amount > 0) {
      delay = parseInt((fps / amount).toString());
    }

    if (delay - this.counter > 1) return;
    this.storeEnemy(speedMultiplier);
    this.counter = 0;
  }
  private storeEnemy(speedMultiplier: number) {
    const rand = Math.floor(Math.random() * this.enemies.length);
    const constraint = this.global("constraint");
    if (!constraint) return null;

    const vect = this.canvas.shape.randomPointFromBorder();
    const [min, max] = constraint.shape.tangentsFromVector(vect, 50);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }
    let entity = this.enemies[rand](speedMultiplier, vect, angle);
    if (entity) entity.store();
  }
}

export default BonusSpawner.instance;
