"use client";

import BuyMeACoffee from "@/components/buymeacoffee";
import { CommandPalette } from "@/components/command-palette";
import GithubButton from "@/components/github";
import SponsorCarousel from "@/components/sponsor-carusel";
// import ProxyComponent from "@/components/proxy-component";
import canvas from "@/src/core/canvas";
import Animation from "@/src/core/entity/animate";
import global from "@/src/core/global";
import Constraint from "@/src/entities/characters/constraint";
import spawner from "@/src/entities/characters/enemy/enemy-spawner";
import Player from "@/src/entities/characters/player";
import Environment from "@/src/entities/environment";
import Highscore from "@/src/entities/highscore";
import { useEffect } from "react";

let beforeDelay = 0;
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
        speed: 2,
        lives: 3,
        zIndex: 10000,
      })
    );
    global.use(
      "constraint",
      new Constraint({ vect: canvas.shape.center, radius: 140 })
    );
    const animation = new Animation();
    animation.store();

    global.use("environment", new Environment(150));
    global.use("environment")?.store();
    loop(0);
  }, []);
  return (
    <div id="app" className="relative">
      <SponsorCarousel />
      <CommandPalette />
      <div className="absolute bottom-0 right-0 p-6 flex gap-2">
        <GithubButton />
        <BuyMeACoffee />
      </div>
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

  spawner.spawn(player.points / 20);

  if (global.use("counter") === 0) {
    player.setScore();
  }
  global.use("fps", 60 / (1000 / (delay - beforeDelay)));
  beforeDelay = delay;
  canvas.render();
  global.use("counter", (prev) => (prev + 1) % fps);

  requestAnimationFrame(loop);
}
