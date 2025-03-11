import EmptyShape from "../shape/empty";
import SEntity from "./sentity";

type Callback = () => void;

class Animation extends SEntity<any> {
  private callbacks: [number, Callback][];
  constructor() {
    super({ shape: EmptyShape.instance });
    this.callbacks = [];
  }

  public update(): void {
    if (this.callbacks.length === 0) return this.destroy();
    const first = this.callbacks[0];
    if (first[0] > 0) {
      first[0]--;
      return;
    }
    const callback = this.callbacks.shift();
    if (!callback) return;
    callback[1]();
  }

  public after(callback: Callback, frames: number = 100) {
    this.callbacks.push([frames, callback]);
    return this;
  }
}
export default Animation;
