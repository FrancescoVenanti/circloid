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
}

const globals: Globals = {
  player: null,
  fps: 60,
  constraint: null,
  buttonPosition: Vector.zero,
  running: true,
  style: 0,
};

function GLOBAL<T extends keyof typeof globals>(
  provider: T,
  newValue?: Globals[T] | ((oldValue: Globals[T]) => Globals[T])
): Globals[T] {
  if (!newValue) return globals[provider];
  if (typeof newValue === "function") {
    globals[provider] = newValue(globals[provider]);
  } else {
    globals[provider] = newValue;
  }
  return globals[provider];
}

export default GLOBAL;
