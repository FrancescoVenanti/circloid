import Enemy, { IEnemy } from "../enemy/enemy";
import Upgrade from "../../upgrades/upgrades";
import Shape from "@/src/core/shape/shape";

export interface IBonus<T extends Shape, V> extends IEnemy<T> {
  upgrade: Upgrade<V>;
}

abstract class Bonus<S extends Shape, T> extends Enemy<S> {
  private upgrade: Upgrade<T>;
  constructor(props: IBonus<S, T>) {
    super(props);
    this.upgrade = props.upgrade;
  }

  public draw(): void {
    this.with(() => this.shape.draw(), {
      ...this.style,
      fillStyle: this.upgrade.color,
    });
  }

  public override remove(...extraColors: string[]): void {
    this.destroy();
    this.upgrade.upgrade();
  }
}
export default Bonus;
