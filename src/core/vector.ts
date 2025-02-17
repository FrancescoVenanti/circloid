class Vector {
  public static generateRandom(): Vector {
    //todo add params
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    return new Vector(x, y);
  }

  public static fromAngle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  constructor(public x: number, public y: number) {}

  public add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  public mul(vector: Vector) {
    this.x *= vector.x;
    this.y *= vector.y;
  }

  public moveTo(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  public translate(angle: number, distance: number) {
    this.x += Math.cos(angle) * distance;
    this.y += Math.sin(angle) * distance;
  }

  public distance(vector: Vector): number {
    return Math.sqrt(
      Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2)
    );
  }

  public middle(vector: Vector): Vector {
    return new Vector((this.x + vector.x) / 2, (this.y + vector.y) / 2);
  }

  public angleFromVect(vect: Vector) {
    return Math.atan2(vect.y - this.y, vect.x - this.x);
  }
}

export default Vector;
