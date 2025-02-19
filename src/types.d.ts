type NonAbstractConstructor<T = {}> = new (...args: any[]) => T;
type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;
type Constructor<T> = NonAbstractConstructor<T> | AbstractConstructor<T>;
type Increment<N extends number> = [...Array<N>, unknown]["length"];
