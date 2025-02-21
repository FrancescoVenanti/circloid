export function generateKey(name: string): string {
  return name + Math.random().toString(36).substring(4);
}
