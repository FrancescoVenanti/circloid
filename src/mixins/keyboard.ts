"use client";

export function KeyboardMixin<Base extends Constructor<any>>(base: Base) {
  return class extends base {
    protected keyPressed = new Set<string>();

    private onKeyDownBound = (e: KeyboardEvent) => this.onKeyDown(e);
    private onKeyUpBound = (e: KeyboardEvent) => this.onKeyUp(e);

    public constructor(...args: any[]) {
      super(...args);

      if (typeof window !== "undefined") {
        window.addEventListener("keydown", this.onKeyDownBound);
        window.addEventListener("keyup", this.onKeyUpBound);
      }
    }

    public onKeyDown(e: KeyboardEvent) {
      this.keyPressed.add(e.key);
    }

    public onKeyUp(e: KeyboardEvent) {
      this.keyPressed.delete(e.key);
    }

    public destroyListeners() {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", this.onKeyDownBound);
        window.removeEventListener("keyup", this.onKeyUpBound);
      }
    }
  };
}
