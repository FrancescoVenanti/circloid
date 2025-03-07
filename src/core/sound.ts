import { List } from "lucide-react";
import GlobalMixin from "../mixins/global";

class Sound extends GlobalMixin(class {}) {
  static instance = new Sound();

  private sounds = {
    hit: "hit",
    hitShield: "hit_shield",
    laser: "laser",
    upgrade: "upgrade",
    background: "bg_funky",
    death: "death",
  } as const;
  private constructor() {
    super();
  }

  public playBg() {
    this.play("background");
  }

  public play(filename: keyof typeof this.sounds) {
    new Audio(`./sounds/${filename}.mp3`).play();
  }
}

export default Sound.instance;
