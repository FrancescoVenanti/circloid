type NonAbstractConstructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;
type Constructor<T> = NonAbstractConstructor<T> | AbstractConstructor<T>;
type Increment<N extends number> = [...Array<N>, unknown]["length"];
type Options = {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  globalAlpha?: number;
  shadowColor?: string;
  shadowBlur?: number;
  fill?: boolean;
  textAlign?: CanvasTextAlign;
  // reset?: boolean;
};
