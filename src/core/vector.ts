"use client";
class Vector {
  public static fromAngle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }
  public static scalar(s: number) {
    return new Vector(s, s);
  }

  public static get zero() {
    return new Vector(0, 0);
  }

  public get invert() {
    return new Vector(-this.x, -this.y);
  }

  constructor(public x: number, public y: number) {}

  public clone(): Vector {
    return new Vector(this.x, this.y);
  }

  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  public set(v: Vector) {
    this.x = v.x;
    this.y = v.y;
  }

  public add(vector: Vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  public addScalar(num: number) {
    this.x += num;
    this.y += num;
    return this;
  }

  public addX(num: number) {
    this.x += num;
    return this;
  }

  public addY(num: number) {
    this.y += num;
    return this;
  }

  public delta(vector: Vector): Vector {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }
  public atan2() {
    return Math.atan2(this.y, this.x);
  }

  public mul(vector: Vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }

  public mulScalar(scalar: number) {
    return this.mul(new Vector(scalar, scalar));
  }

  public moveTo(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  public translate(angle: number, distance: number) {
    this.x += Math.cos(angle) * distance;
    this.y += Math.sin(angle) * distance;
    return this;
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

  public abs(): Vector {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  public angle(v: Vector) {
    return Vector.fromAngle(this.angleFromVect(v));
  }

  public randomVectorFromSegment(v: Vector) {
    const distance = this.distance(v);
    const random = Math.random() * distance;
    return this.angle(v).mulScalar(random);
  }
}

export default Vector;
