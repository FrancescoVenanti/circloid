import Canvas from "./src/core/canvas";
import Ball from "./src/entities/characters/ball";
import Constraint from "./src/entities/characters/constraint";
import Player from "./src/entities/characters/player";

let delay1 = 0;
let delay2 = 0;
function loop(delay: number) {
  delay2 = delay1;
  delay1 = delay;
  Canvas.instance.render();
  requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", () => {
  Canvas.instance.init();

  new Player(1, Canvas.instance.rect.center, 0, 2);
  new Constraint(1, Canvas.instance.rect.center, 100);

  Ball.spawnAmount(10);

  loop(0);
});
