import Entity, { IEntity } from "@/src/core/entity";
import MovingEntity from "@/src/core/moving-entity";
import Shape from "@/src/core/shape/shape";
import BallEnemy from "./ball-enemy";

export interface IEnemy<T extends Shape> extends IEntity<T> {}

class Enemy<T extends Shape> extends Entity<T> {
  private enemies: ((speedMultiplier: number) => MovingEntity<any> | null)[] = [
    BallEnemy.spawn,
  ];
  constructor(props: IEnemy<T>) {
    super(props);
  }

  static spawn() {}
  static spawnAmount() {}

  public update(): void {}
}

export default Enemy;
