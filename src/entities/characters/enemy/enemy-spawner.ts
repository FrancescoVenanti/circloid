import MovingEntity from "@/src/core/moving-entity";
import Vector from "@/src/core/vector";
import CanvasMixin from "@/src/mixins/canvas";
import GlobalMixin from "@/src/mixins/global";
import BallEnemy from "./ball-enemy";
import Laser from "./laser-enemy";
import SquareEnemy from "./square-enemy";

class EnemySpawner extends CanvasMixin(GlobalMixin(class {})) {
  public static instance = new EnemySpawner();

  private counter = 0;
  private enemies: ((
    speedMultiplier: number,
    vect: Vector,
    angle: number
  ) => MovingEntity<any> | null)[] = [
    BallEnemy.spawn,
    SquareEnemy.spawn,
    Laser.spawn,
  ];
  private constructor() {
    super();
  }
  public spawn(speedMultiplier: number) {
    const player = this.global("player")!;
    this.counter++;
    const amount = Math.ceil(player.points / 50);
    const fps = this.global("fps");
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

export default EnemySpawner.instance;
