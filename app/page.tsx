"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Player from "@/src/entities/characters/player";
import Canvas from "@/src/core/canvas";
import Highscore from "@/src/entities/highscore";
import Constraint from "@/src/entities/characters/constraint";
import BallEnemy from "@/src/entities/characters/ball-enemy";

declare global {
  interface Window {
    player: Player;
    fps: number;
  }
}

let beforeDelay = 0;
let counter = 0;
const fps = 60;

export default function Home() {
  useEffect(() => {
    Canvas.instance.init();

    const highscore = new Highscore(1);
    highscore.store();

    window.player = new Player(1, Canvas.instance.rect.center, 0, 2, 3, 0, 0);

    new Constraint(1, Canvas.instance.rect.center, 120);
    loop(0);
  }, []);
  return <div id="app"></div>;
}

function loop(delay: number) {
  const player = window.player;
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

  requestAnimationFrame(loop);
}
