export type Class<T> = new (...args: any[]) => any;

export function TestMixin<Base extends Class<Base>>(base: Base) {
  return class {
    isTest = false;
  };
}

class Test extends TestMixin(class {}) {
  constructor() {
    super();
    this.isTest = false;
  }
}
