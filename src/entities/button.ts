// import Canvas from "../core/canvas";
// import Drawer from "../core/drawer";
// import Entity from "../core/entity";
// import type Shape from "../core/shape/shape";
// import Vector from "../core/vector";
// import BallEnemy from "./characters/ball";
// import Player from "./characters/player";

// class Button extends Entity {
//   constructor(
//     zIndex: number,
//     shape: Shape,
//     public position: Vector,
//     public pressedKey: string
//   ) {
//     super(zIndex, shape);
//   }
//   public update(): void {}
//   public static spawn(): void {
//     new BallEnemy(2, 10, new Vector(100, 100), 0, 0).store();
//   }
//   public override draw(): void {
//     Drawer.instance.with(() => this.shape.draw(), {
//       fillStyle: "white",
//       strokeStyle: "white",
//       style: "white",
//     });
//   }

//   public upgradePlayer<T extends Entity>(
//     entity: Player,
//     property: keyof Player
//   ): void {
//     window.addEventListener("keydown", (e) => {
//       if (e.key === this.pressedKey) {
//         entity.speed++;
//       }
//     });
//   }
// }

// export default Button;
