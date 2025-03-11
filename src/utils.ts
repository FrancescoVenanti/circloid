import global from "./core/global";
import Upgrade from "./entities/upgrades/upgrades";
import { styles } from "./style";

export const DEGREE = Math.PI / 180;

export function generateKey(name?: string): string {
  return (name || "") + "-" + Math.random().toString(36).substring(4);
}
export function inBetween(value: number, min: number, max: number) {
  return value > min && value < max;
}

export function getUpgrades() {
  const result: Upgrade<any>[] = [];
  const p = global.use("player");
  const c = global.use("constraint");
  if (p) {
    result.push(p.cyclone, p.livesUpgrade, p.speedUpgrade);
  }
  if (c) {
    result.push(c.radiusUpgrade, c.wall);
  }
  return result;
}

export function currentStyle() {
  return styles[Object.keys(styles)[global.use("style")]];
}
