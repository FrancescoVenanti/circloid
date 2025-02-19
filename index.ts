import Canvas from "./src/core/canvas";
import BallEnemy from "./src/entities/characters/ball-enemy";
import Constraint from "./src/entities/characters/constraint";
import Player from "./src/entities/characters/player";

declare global {
  interface Window {
    player: Player;
    fps: number;
  }
}

let beforeDelay = 0;
let counter = 0;
const fps = 60;
function loop(delay: number) {
  const player = Canvas.instance.get("player");
  if (!player || !(player instanceof Player)) return;
  if (counter === 0) {
    BallEnemy.spawnAmount(
      1 + Math.round(player.points / 30),
      player.points / 20
    );
    player.points++;
    player.credits++;
  }
  window.fps = 1000 / (delay - beforeDelay);
  beforeDelay = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop); // Passa il player correttamente
}
document.addEventListener("DOMContentLoaded", () => {
  Canvas.instance.init();

  window.player = new Player(1, Canvas.instance.rect.center, 0, 2, 3, 0, 0);
  new Constraint(1, Canvas.instance.rect.center, 120);

  loop(0);
});
