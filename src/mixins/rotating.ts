import Entity from "../core/entity";
import Circle from "../core/shape/circle";

export default function RotatingMixin<T extends Constructor<Entity<Circle>>>(
  base: T
) {
  return class extends base {
    protected rotation: number = 0;
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
