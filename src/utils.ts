export function generateKey(name?: string): string {
  return (name || "") + Math.random().toString(36).substring(4);
}
export function inBetween(value: number, min: number, max: number) {
  return value > min && value < max;
}