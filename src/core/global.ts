import Player from "../entities/characters/player";
import Canvas from "./canvas";

interface Globals {
  player: Player | null;
  fps: number;
}

const globals: Globals = {
  player: null,
  fps: 60,
};

function GLOBAL<T extends keyof typeof globals>(
  provider: T,
  newValue?:
    | (typeof globals)[T]
    | ((oldValue: (typeof globals)[T]) => (typeof globals)[T])
): (typeof globals)[T] {
  if (!newValue) return globals[provider];
  if (typeof newValue === "function") {
    globals[provider] = newValue(globals[provider]);
  } else {
    globals[provider] = newValue;
  }
  return globals[provider];
}

export default GLOBAL;
