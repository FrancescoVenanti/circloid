export type Style = { [key: string]: Options & Record<string, any> };

export const styles: Style[] = [
  {
    // Default (Your Theme)
    canvas: { fillStyle: "black", fill: true },
    player: { fillStyle: "lightblue", lineWidth: 0, fill: true },
    speedUpgrade: { color: "green" },
    lifeUpgrade: { color: "red" },
    wallUpgrade: { color: "blue" },
    constraintUpgrade: { color: "palegreen" },
    shieldUpgrade: { color: "violet" },
    ballenemy: { fill: true, fillStyle: "coral" },
    constraint: { fill: false, strokeStyle: "palegreen" },
  },
  {
    // Dark Neon Theme
    canvas: { fillStyle: "rgb(10, 10, 30)", fill: true },
    player: {
      fillStyle: "cyan",
      strokeStyle: "white",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "lime" },
    lifeUpgrade: { color: "magenta" },
    wallUpgrade: { color: "dodgerblue" },
    constraintUpgrade: { color: "springgreen" },
    shieldUpgrade: { color: "deeppink" },
    ballenemy: { fill: true, fillStyle: "orangered" },
    constraint: { fill: false, strokeStyle: "deepskyblue" },
  },
  {
    // Pastel Dream Theme
    canvas: { fillStyle: "lavenderblush", fill: true },
    player: {
      fillStyle: "lightpink",
      strokeStyle: "mistyrose",
      lineWidth: 1,
      fill: true,
    },
    speedUpgrade: { color: "lightgreen" },
    lifeUpgrade: { color: "salmon" },
    wallUpgrade: { color: "lightblue" },
    constraintUpgrade: { color: "mintcream" },
    shieldUpgrade: { color: "plum" },
    ballenemy: { fill: true, fillStyle: "peachpuff" },
    constraint: { fill: false, strokeStyle: "thistle" },
  },
  {
    // Retro Arcade Theme
    canvas: { fillStyle: "black", fill: true },
    player: {
      fillStyle: "yellow",
      strokeStyle: "white",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "red" },
    lifeUpgrade: { color: "orange" },
    wallUpgrade: { color: "purple" },
    constraintUpgrade: { color: "cyan" },
    shieldUpgrade: { color: "pink" },
    ballenemy: { fill: true, fillStyle: "red" },
    constraint: { fill: false, strokeStyle: "white" },
  },
  {
    // Cyberpunk Theme
    canvas: { fillStyle: "rgb(10, 10, 20)", fill: true },
    player: {
      fillStyle: "magenta",
      strokeStyle: "yellow",
      lineWidth: 3,
      fill: true,
    },
    speedUpgrade: { color: "electricblue" },
    lifeUpgrade: { color: "hotpink" },
    wallUpgrade: { color: "neonpurple" },
    constraintUpgrade: { color: "limegreen" },
    shieldUpgrade: { color: "cyan" },
    ballenemy: { fill: true, fillStyle: "neonred" },
    constraint: { fill: false, strokeStyle: "brightyellow" },
  },
  {
    // Fire & Ice Theme
    canvas: { fillStyle: "midnightblue", fill: true },
    player: {
      fillStyle: "deepskyblue",
      strokeStyle: "white",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "goldenrod" },
    lifeUpgrade: { color: "firebrick" },
    wallUpgrade: { color: "navy" },
    constraintUpgrade: { color: "snow" },
    shieldUpgrade: { color: "crimson" },
    ballenemy: { fill: true, fillStyle: "orangered" },
    constraint: { fill: false, strokeStyle: "powderblue" },
  },
  {
    // Soft Creamy Light Theme
    canvas: { fillStyle: "#f5f0e1", fill: true },
    player: {
      fillStyle: "#c9b59d",
      strokeStyle: "#e1d6b1",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "#9a9b64" },
    lifeUpgrade: { color: "#d05353" },
    wallUpgrade: { color: "#7c8c5a" },
    constraintUpgrade: { color: "#d0c3b0" },
    shieldUpgrade: { color: "#a892d4" },
    ballenemy: { fill: true, fillStyle: "#c1a183" },
    constraint: { fill: false, strokeStyle: "#b1a99e" },
  },
  {
    // Gruvbox Theme
    canvas: { fillStyle: "#282828", fill: true },
    player: {
      fillStyle: "#ebdbb2",
      strokeStyle: "#fe8019",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "#fabd2f" },
    lifeUpgrade: { color: "#cc241d" },
    wallUpgrade: { color: "#689d6a" },
    constraintUpgrade: { color: "#b16286" },
    shieldUpgrade: { color: "#d79921" },
    ballenemy: { fill: true, fillStyle: "#fb4934" },
    constraint: { fill: false, strokeStyle: "#d5c4a1" },
  },
  {
    // Monokai Theme (VSCode-like)
    canvas: { fillStyle: "#272822", fill: true },
    player: {
      fillStyle: "#f8f8f2",
      strokeStyle: "#f92672",
      lineWidth: 2,
      fill: true,
    },
    speedUpgrade: { color: "#a6e22e" },
    lifeUpgrade: { color: "#f92672" },
    wallUpgrade: { color: "#66d9ef" },
    constraintUpgrade: { color: "#f4bf75" },
    shieldUpgrade: { color: "#ae81ff" },
    ballenemy: { fill: true, fillStyle: "#f92672" },
    constraint: { fill: false, strokeStyle: "#f8f8f2" },
  },
];
