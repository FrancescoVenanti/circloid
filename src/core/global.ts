import Constraint from "../entities/characters/constraint";
import Player from "../entities/characters/player";
import Vector from "./vector";

export interface Globals {
  player: Player | null;
  constraint: Constraint | null;
  fps: number;
  buttonPosition: Vector;
  running: boolean;
  style: number;
  counter: number;
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
      style: this.getInitialStyle(),
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
      localStorage.setItem(provider, this.globals[provider]!.toString());
    }
    return this.globals[provider];
  }
  private getInitialStyle() {
    if (typeof window === "undefined") return 0;
    const style = localStorage.getItem("style");
    if (!style) return 0;
    return parseInt(style);
  }
}

export default Global.instance;
