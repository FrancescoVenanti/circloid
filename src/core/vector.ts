class Vector {
  constructor(public x: number, public y: number) {}

  public static generateRandom(): Vector {
    //todo add params
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    return new Vector(x, y);
  }
}

export default Vector;
