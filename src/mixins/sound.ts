import sound from "@/src/core/sound";

export default function SoundMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    protected sound = sound;
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
