type EventCallback = (...args: any) => void;

export function EventMixin<Base extends Constructor>(base: Base) {
  return class extends base {
    private listeners: Map<string[], EventCallback[]> = new Map();
    public on(event: string[], callback: EventCallback) {
      this.listeners.set(event, [
        ...(this.listeners.get(event) || []),
        callback,
      ]);
    }
    public emit(event: string[], ...args: any) {
      if (!this.listeners.has(event)) return;
      const callbacks = this.listeners.get(event)!;

      callbacks.forEach((c) => c(...args));
    }
  };
}
