import Animation from "../core/entity/animate";

export default function AnimationMixin<T extends Constructor<any>>(base: T) {
  return class extends base {
    constructor(...args: any[]) {
      super(...args);
    }
    public animate() {
      const animation = new Animation();
      animation.store();
      return animation;
    }
  };
}
