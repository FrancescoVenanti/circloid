// import MEntity from "../core/entity/mentity";
// import Circle from "../core/shape/circle";
// import Shape from "../core/shape/shape";
// import Vector from "../core/vector";
// import CanvasMixin from "../mixins/canvas";

// class Environment extends CanvasMixin(MEntity) {
//   constructor(length: number) {
//     super({ key: "environment", length });
//   }
//   protected generate(index: number): Shape {
//     return new Circle({ radius: 1, vect: this.canvasShape.randomVect() });
//   }

//   public update(): void {}

//   public draw(): void {
//     const constraint = this.global("constraint");
//     const player = this.global("player");
//     if (!player || !constraint) return;
//     const vec = player.shape.vector.clone().add(constraint.shape.vector.invert);
//     // this.with(() => this.drawShapesWithOffset(vec), {
//     //   fill: true,
//     //   fillStyle: "white",
//     // });
//   }

//   protected drawShapesWithOffset(offset: Vector): void {
//     for (const shape of this.shapes) {
//       this.drawShape(shape, offset);
//     }
//   }

//   private drawShape(shape: Shape, offset: Vector) {
//     const prev = shape.vector;
//     shape.vector = prev.clone().add(offset);
//     shape.draw();
//     shape.vector = prev;
//   }
// }

// export default Environment;
