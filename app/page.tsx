"use client";

import Canvas from "@/src/core/canvas";
import GLOBAL from "@/src/core/global";
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
    Canvas.instance.init();

    const highscore = new Highscore(1);
    highscore.store();

    GLOBAL(
      "player",
      new Player({
        vect: Canvas.instance.rect.center,
        angle: 0,
        speed: 3,
        lives: 3,
      })
    );

    new Constraint({ vect: Canvas.instance.rect.center, radius: 120 });
    loop(0);
  }, []);
  return <div id="app"></div>;
}

function loop(delay: number) {
  const player = GLOBAL("player");
  if (!player || !(player instanceof Player)) return;
  if (counter === 0) {
    BallEnemy.spawnAmount(
      1 + Math.round(player.points / 30),
      player.points / 20
    );
    player.setScore();
  }
  GLOBAL("fps", 1000 / (delay - beforeDelay));
  beforeDelay = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop);
}
