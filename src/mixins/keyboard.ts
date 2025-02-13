import { EventMixin } from "./events";

class KeyboardEvent extends EventMixin() {
  public constructor() {
    super();
    window.addEventListener("keydown", (e) => this.emit(["keydown"], e));
  }
}

export const KeyboardMixin = () => KeyboardEvent;
