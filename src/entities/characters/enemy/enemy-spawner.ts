import SEntity from "@/src/core/entity/sentity";
import Vector from "@/src/core/vector";
import CanvasMixin from "@/src/mixins/canvas";
import GlobalMixin from "@/src/mixins/global";
import BallEnemy from "./ball-enemy";
import SquareEnemy from "./square-enemy";
import WarningLine from "./warning-line";

type SpawnFunc = (
  speedMultiplier: number,
  vect: Vector,
  angle: number
) => SEntity<any> | null;

class EnemySpawner extends CanvasMixin(GlobalMixin(class {})) {
  public static instance = new EnemySpawner();

  private options: Record<number, [SpawnFunc, number]> = {
    0: [BallEnemy.spawn, 6],
    30: [SquareEnemy.spawn, 3],
    60: [WarningLine.spawn, 1],
  };

  private counter = 0;
  private constructor() {
    super();
  }
  public spawn(speedMultiplier: number) {
    const player = this.global("player")!;
    this.counter++;
    const amount = Math.ceil(player.points / 30);
    const fps = this.global("fps") * 2;
    let delay = 1;
    if (player.points == 0) return;
    if (amount > 0) {
      delay = parseInt((fps / amount).toString());
    }

    if (delay - this.counter > 1) return;
    this.storeEnemy(speedMultiplier);
    this.counter = 0;
  }
  private getEnemies(): [SpawnFunc, number][] {
    const result: [SpawnFunc, number][] = [];
    const points = this.global("player")?.points || 0;
    for (const key in this.options) {
      const value = parseInt(key);
      if (points >= value) {
        result.push(this.options[key]);
      }
    }
    return result;
  }
  private storeEnemy(speedMultiplier: number) {
    const enemies = this.getEnemies();
    let amount = enemies.reduce((acc, [_, p]) => acc + p, 0);
    const rand = Math.floor(Math.random() * amount);
    const constraint = this.global("constraint");
    if (!constraint) return null;

    const vect = this.canvas.shape.randomPointFromBorder();
    const [min, max] = constraint.shape.tangentsFromVector(vect, 50);

    if (!min) return null;

    let angle = min;
    if (max) {
      angle = Math.random() * (max - min) + min;
    }

    const func = this.getEnemyFunc(rand, enemies);
    if (!func) return;
    let entity = func(speedMultiplier, vect, angle);
    if (entity) entity.store();
  }
  private getEnemyFunc(
    rand: number,
    enemies: [SpawnFunc, number][]
  ): SpawnFunc | null {
    let cumulative = 0;
    for (const [f, p] of enemies) {
      cumulative += p;
      if (rand < cumulative) return f;
    }
    if (enemies.length === 0) return null;
    return enemies[enemies.length - 1][0];
  }
}

export default EnemySpawner.instance;
