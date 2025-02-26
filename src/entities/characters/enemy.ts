import Entity, { IEntity } from "@/src/core/entity";
import Shape from "@/src/core/shape/shape";

export interface IEnemy<T extends Shape> extends IEntity<T> {}

class Enemy<T extends Shape> extends Entity<T> {
  constructor(props: IEnemy<T>) {
    super(props);
  }

  static spawn() {}
  static spawnAmount() {}

  public update(): void {}
}

export default Enemy;
