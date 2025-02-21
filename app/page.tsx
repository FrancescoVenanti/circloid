"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Player from "@/src/entities/characters/player";
import Canvas from "@/src/core/canvas";
import Highscore from "@/src/entities/highscore";
import Constraint from "@/src/entities/characters/constraint";
import BallEnemy from "@/src/entities/characters/ball-enemy";
import GLOBAL from "@/src/core/global";

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
        zIndex: 1,
        vector: Canvas.instance.rect.center,
        angle: 0,
        speed: 3,
        lives: 3,
        points: 0,
        credits: 0,
        upgrades: [],
      })
    );

    new Constraint(1, Canvas.instance.rect.center, 120);
    loop(0);
  }, []);
  return <div id="app"></div>;
}

function loop(delay: number) {
  const player = GLOBAL("player");
  if (!player || !(player instanceof Player)) return;
  if (counter === 0) {
    BallEnemy.spawnAmount(
      1 + Math.round(player.getPoints() / 30),
      player.getPoints() / 20
    );
    player.setScore();
  }
  GLOBAL("fps", 1000 / (delay - beforeDelay));
  beforeDelay = delay;
  Canvas.instance.render();
  counter = (counter + 1) % fps;

  requestAnimationFrame(loop);
}
