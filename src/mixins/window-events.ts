export default function WindowEventMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any) {
      super(args);
    }
    protected addEventListener(
      type: keyof WindowEventMap,
      listen: EventListenerOrEventListenerObject
    ) {
      window.addEventListener(type, listen);
    }
    protected removeEventListener(
      type: keyof WindowEventMap,
      listen: EventListenerOrEventListenerObject
    ) {
      window.removeEventListener(type, listen);
    }
  };
}
