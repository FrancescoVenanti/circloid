"use client";

import { CommandPalette } from "@/components/command-palette";
// import ProxyComponent from "@/components/proxy-component";
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
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
    Canvas.instance.init();

    const highscore = new Highscore(1);
    highscore.store();
    GLOBAL(
      "buttonPosition",
      Canvas.instance.shape.bottomLeft.clone().addY(-100)
    );
    GLOBAL(
      "player",
      new Player({
        vect: Canvas.instance.shape.center,
        angle: 0,
        speed: 3,
        lives: 3,
      })
    );

    GLOBAL(
      "constraint",
      new Constraint({ vect: Canvas.instance.shape.center, radius: 120 })
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
  if (!GLOBAL("running")) {
    requestAnimationFrame(loop);

    return;
  }
  const player = GLOBAL("player");
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
  GLOBAL("fps", 1000 / (delay - beforeDelay));
  beforeDelay = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop);
}
