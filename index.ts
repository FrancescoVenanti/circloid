import Canvas from "./src/core/canvas";
import Ball from "./src/entities/characters/ball";
import Constraint from "./src/entities/characters/constraint";
import Player from "./src/entities/characters/player";

let delay1 = 0;
let delay2 = 0;
let counter = 0;
const fps = 60;
function loop(delay: number, player: Player) {
  if (counter === 0) {
    Ball.spawn(player.points / 10);
    player.points++;
    player.credits++;
  }
  delay2 = delay1;
  delay1 = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame((newDelay) => loop(newDelay, player)); // Passa il player correttamente
}

document.addEventListener("DOMContentLoaded", () => {
  Canvas.instance.init();

  const player = new Player(1, Canvas.instance.rect.center, 0, 2, 3, 0, 0);
  new Constraint(1, Canvas.instance.rect.center, 120);

  loop(0, player);
});
