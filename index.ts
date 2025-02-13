import Canvas from "./src/core/canvas";
import Ball from "./src/entities/characters/ball";
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
  Ball.spawn(10);
  const topCenter = Canvas.instance.rect.topLeft.middle(
    Canvas.instance.rect.topRight
  );
  const player = new Player(1, topCenter);

  player.store();

  loop(0);
});
