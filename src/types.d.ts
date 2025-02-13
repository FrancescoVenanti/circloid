type NonAbstractConstructor = new (...args: any) => any;
type AbstractConstructor = abstract new (...args: any) => any;
type Constructor = NonAbstractConstructor | AbstractConstructor;
type Increment<N extends number> = [...Array<N>, unknown]["length"];
