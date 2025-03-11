import GlobalMixin from "../mixins/global";
import { styles } from "../style";

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
    this.audio(filename).play();
  }
  public audio(filename: keyof typeof this.sounds) {
    return new Audio(
      `./${Object.keys(styles)[this.global("style")]}/${
        this.sounds[filename]
      }.mp3`
    );
  }
}

export default Sound.instance;
