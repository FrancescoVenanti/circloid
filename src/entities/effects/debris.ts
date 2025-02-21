import Ball, { IBall } from "../ball";

export interface IDebris extends IBall {
  angles: number;
  variants: number;
}

class Debris extends Ball {
  public angles: number;
  public variants: number;
  constructor(props: IDebris) {
    super(props);
    this.angles = props.angles;
    this.variants = props.variants;
  }

  public update(): void {}

  public draw(): void {}
}

export default Debris;
