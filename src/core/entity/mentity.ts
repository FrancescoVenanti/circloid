import DrawerMixin from "@/src/mixins/drawer";
import Shape from "../shape/shape";
import Entity, { IEntity } from "./entity";

export interface IMEntity extends IEntity {
  length: number;
}

abstract class MEntity<T extends Shape> extends Entity {
  public shapes: T[];
  constructor({ length, ...props }: IMEntity) {
    super(props);
    this.shapes = Array.from({ length }, (_, i) => this.generate(i));
  }
  protected abstract generate(index: number): T;

  public draw() {
    this.with(() => this.drawShapes(), this.style);
  }
  protected drawShapes() {
    for (const shape of this.shapes) {
      shape.draw();
    }
  }
}
export default MEntity;
