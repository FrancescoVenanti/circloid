"use client";

import { CommandPalette } from "@/components/command-palette";
// import ProxyComponent from "@/components/proxy-component";
import canvas from "@/src/core/canvas";
import global from "@/src/core/global";
import BallEnemy from "@/src/entities/characters/ball-enemy";
import Constraint from "@/src/entities/characters/constraint";
import Player from "@/src/entities/characters/player";
import Highscore from "@/src/entities/highscore";
import { useEffect } from "react";

let beforeDelay = 0;
let counter = 0;
const fps = 60;

export default function Home() {
  useEffect(() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
    canvas.init();

    const highscore = new Highscore(1);
    highscore.store();
    global.use("buttonPosition", canvas.shape.bottomLeft.clone().addY(-100));
    global.use(
      "player",
      new Player({
        vect: canvas.shape.center,
        angle: 0,
        speed: 3,
        lives: 3,
      })
    );

    global.use(
      "constraint",
      new Constraint({ vect: canvas.shape.center, radius: 120 })
    );
    loop(0);
  }, []);
  return (
    <div id="app">
      <CommandPalette />
    </div>
  );
}

function loop(delay: number) {
  if (!global.use("running")) {
    requestAnimationFrame(loop);

    return;
  }
  const player = global.use("player");
  if (!player) {
    requestAnimationFrame(loop);
    return;
  }
  if (counter === 0) {
    BallEnemy.spawnAmount(
      1 + Math.floor(player.points / 50),
      player.points / 20
    );
    player.setScore();
  }
  global.use("fps", 1000 / (delay - beforeDelay));
  beforeDelay = delay;
  canvas.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop);
}
