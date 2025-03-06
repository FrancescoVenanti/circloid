import { List } from "lucide-react";
import GlobalMixin from "../mixins/global";

// interface ISound {
//   id: number,
//   name:string,
//   state:boolean
// }

class Sound extends GlobalMixin(class {}) {
  static instance = new Sound();
  private constructor() {
    super();
  }

  public playBg() {
    const audioBg = this.play("bg_funky");
    audioBg.play();
  }

  public play(filename: string) {
    return new Audio(`./sounds/${filename}.mp3`);
  }
}

export default Sound.instance;
