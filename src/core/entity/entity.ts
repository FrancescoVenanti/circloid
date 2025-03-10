import canvas from "@/src/core/canvas";
import global from "@/src/core/global";
import { Style, styles } from "@/src/style";
import { generateKey } from "@/src/utils";

export interface IEntity {
  zIndex?: number;
  key?: string;
  style?: Options;
}

class Entity {
  private _key: string;
  public zIndex: number;
  public style: Options;

  public get key() {
    return this._key;
  }

  public get options() {
    return styles[global.use("style")];
  }

  constructor({ key, zIndex, style }: IEntity) {
    console.log(key);
    this._key = generateKey(key || "entity");
    this.zIndex = zIndex || 0;
    this.style = style || {};
    this.style = { ...this.getCurrentStyle(), ...this.style };
  }
  protected getCurrentStyle(): Style[string] {
    const key = this.key.split("-")[0];
    if (key in this.options) {
      return this.options[key as keyof Style];
    }
    return {};
  }

  public draw(): void {}
  public update(): void {}
  public get active() {
    return canvas.has(this);
  }
  public destroy(): void {
    canvas.destroy(this);
  }

  public store(): void {
    canvas.add(this);
  }
}

export default Entity;
