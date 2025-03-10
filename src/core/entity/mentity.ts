import DrawerMixin from "@/src/mixins/drawer";
import Shape from "../shape/shape";
import Entity, { IEntity } from "./entity";

export interface IMEntity extends IEntity {
  length: number;
}

abstract class MEntity extends DrawerMixin(Entity) {
  public shapes: Shape[];
  constructor({ length, ...props }: IMEntity) {
    super(props);
    this.shapes = Array.from({ length }, (_, i) => this.generate(i));
  }
  protected abstract generate(index: number): Shape;

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
