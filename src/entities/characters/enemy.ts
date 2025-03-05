import Entity, { IEntity } from "@/src/core/entity";
import MovingEntity from "@/src/core/moving-entity";
import Shape from "@/src/core/shape/shape";
import BallEnemy from "./ball-enemy";
import GlobalMixin from "@/src/mixins/global";
import SquareEnemy from "./square-enemy";
import GLOBAL from "@/src/core/global";

export interface IEnemy<T extends Shape> extends IEntity<T> {}

class Enemy extends GlobalMixin(class {}) {
  private static enemies: ((
    speedMultiplier: number
  ) => MovingEntity<any> | null)[] = [BallEnemy.spawn];
  constructor() {
    super();
  }

  static spawn(speedMultiplier: number) {
    this.addEnemies();
    const rand = Math.floor(Math.random() * this.enemies.length);
    const entity = this.enemies[rand](speedMultiplier);

    console.log(entity);
    if (entity != null) entity.store();
  }
  static spawnAmount() {}

  static addEnemies() {
    const player = GLOBAL.use("player");
    if (!player) return;
    if (player.points > 50) {
      this.enemies.push(SquareEnemy.spawn);
    }
  }

  static update(): void {}
}

export default Enemy;
