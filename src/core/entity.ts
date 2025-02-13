import type Vector from "./vector";

interface IEntity {
  init(): void;
  draw(): void;
  destroy(): void;
  update(): void;
  isColliding(entity: Entity): boolean;
}

abstract class Entity implements IEntity {
  public init(): void {}
  public abstract draw(): void;
  public destroy(): void {}
  public abstract update(): void;
  public abstract isColliding(entity: Entity): boolean;

  constructor(
    public zIndex: number,
    public key: string,
    public position: Vector
  ) {}
}

export default Entity;
