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
    this.audio(filename).play();
  }
  public audio(filename: keyof typeof this.sounds) {
    return new Audio(`./sounds/${this.sounds[filename]}.mp3`);
  }
}

export default Sound.instance;
