import Canvas from "./src/core/canvas";
import Ball from "./src/entities/characters/ball";
import Constraint from "./src/entities/characters/constraint";
import Player from "./src/entities/characters/player";

let beforeDelay = 0;
let counter = 0;
const fps = 60;
function loop(delay: number) {
  const player = Canvas.instance.get("player");
  if (!player || !(player instanceof Player)) return;
  if (counter === 0) {
    Ball.spawnAmount(1 + Math.round(player.points / 30), player.points / 20);
    player.points++;
    player.credits++;
  }
  console.log(1000 / (delay - beforeDelay));
  beforeDelay = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop); // Passa il player correttamente
}

document.addEventListener("DOMContentLoaded", () => {
  Canvas.instance.init();

  const player = new Player(1, Canvas.instance.rect.center, 0, 2, 3, 0, 0);
  new Constraint(1, Canvas.instance.rect.center, 120);

  loop(0);
});
