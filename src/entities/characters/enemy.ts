import Entity, { IEntity } from "@/src/core/entity";
import MovingEntity from "@/src/core/moving-entity";
import Shape from "@/src/core/shape/shape";
import BallEnemy from "./ball-enemy";
import GlobalMixin from "@/src/mixins/global";
import SquareEnemy from "./square-enemy";
import global from "@/src/core/global";

export interface IEnemy<T extends Shape> extends IEntity<T> {}

class Enemy extends GlobalMixin(class {}) {
  private static counter = 0;
  private static enemies: ((
    speedMultiplier: number
  ) => MovingEntity<any> | null)[] = [BallEnemy.spawn, SquareEnemy.spawn];
  constructor() {
    super();
  }

  static spawn(speedMultiplier: number) {
    this.counter++;
    // this.addEnemies();
    const amount = Math.ceil(global.use("player")!.points / 30);
    const fps = global.use("fps");

    if (parseInt((fps / amount).toString()) - this.counter > 1) return;
    const rand = Math.floor(Math.random() * this.enemies.length);
    let entity = this.enemies[rand](speedMultiplier);

    console.log(entity);
    if (entity != null) entity.store();
    this.counter = 0;
  }

  // static addEnemies() {
  //   const player = GLOBAL.use("player");
  //   if (!player) return;

  //   if (player.points > 51) return;
  //   if (player.points > 50) {
  //     this.enemies.push(SquareEnemy.spawn);
  //   }
  // }

  static update(): void {}
}

export default Enemy;
