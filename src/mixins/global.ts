import global, { Globals } from "../core/global";

export default function GlobalMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any[]) {
      super(...args);
    }
    protected global<T extends keyof Globals>(
      provider: T,
      newValue?: Globals[T] | ((oldValue: Globals[T]) => Globals[T])
    ): Globals[T] {
      return global.use(provider, newValue);
    }
  };
}
