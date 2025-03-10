import Constraint from "../entities/characters/constraint";
import Player from "../entities/characters/player";
import Environment from "../entities/environment";
import Vector from "./vector";

export interface Globals {
  player: Player | null;
  constraint: Constraint | null;
  fps: number;
  buttonPosition: Vector;
  running: boolean;
  style: number;
  counter: number;
  music: HTMLAudioElement | null;
  environment: Environment | null;
}

class Global {
  public static instance = new Global();

  private persistentValues: Set<keyof Globals>;
  private globals: Globals;

  private constructor() {
    this.globals = {
      player: null,
      fps: 60,
      counter: 0,
      constraint: null,
      buttonPosition: Vector.zero,
      running: true,
      music: null,
      style: this.getInitialStyle(),
      environment: null,
    };
    this.persistentValues = new Set(["style"]);
  }
  public use<T extends keyof Globals>(
    provider: T,
    newValue?: Globals[T] | ((oldValue: Globals[T]) => Globals[T])
  ): Globals[T] {
    if (!newValue) return this.globals[provider];
    if (typeof newValue === "function") {
      this.globals[provider] = newValue(this.globals[provider]);
    } else {
      this.globals[provider] = newValue;
    }
    if (this.persistentValues.has(provider)) {
      this.storeKey(provider);
    }
    return this.globals[provider];
  }

  private storeKey(key: keyof Globals) {
    const value = this.globals[key];
    let str: string = "";
    if (typeof value === "object") {
      str = JSON.stringify(value);
    } else {
      str = value.toString();
    }
    localStorage.setItem(key, str);
  }

  private getInitialStyle() {
    if (typeof window === "undefined") return 0;
    const style = localStorage.getItem("style");
    if (!style) return 0;
    return parseInt(style);
  }
}

export default Global.instance;
