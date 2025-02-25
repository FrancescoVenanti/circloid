import Entity from "../core/entity";

export function KeyboardMixin<Base extends Constructor<Entity<any>>>(
  base: Base
) {
  return class extends base {
    protected keyPressed = new Set<string>();
    public constructor(...args: any[]) {
      super(...args);
      window.addEventListener("keydown", (e) => this.keyPressed.add(e.key));
      window.addEventListener("keyup", (e) => this.keyPressed.delete(e.key));
    }
  };
}
