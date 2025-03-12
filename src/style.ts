export type Style = { [key: string]: Options & Record<string, any> };

export const styles: Record<string, Style> = {
  default: {
    canvas: { fillStyle: "#FFFDF0", fill: true },
    player: {
      fillStyle: "#D9DFC6",
      lineWidth: 0,
      fill: true,
      credits: {
        fillStyle: "black",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "coral",
      },
    },
    highscore: { fillStyle: "black" },
    speedUpgrade: { color: "green", fillStyle: "black" },
    lifeUpgrade: { color: "red", fillStyle: "black" },
    wallUpgrade: { color: "blue", fillStyle: "black" },
    constraintUpgrade: { color: "palegreen", fillStyle: "black" },
    cycloneUpgrade: { color: "violet", fillStyle: "black" },
    shieldUpgrade: { color: "lightblue", fillStyle: "black" },
    ballenemy: { fill: true, fillStyle: "#83c5be" },
    constraint: { fill: false, strokeStyle: "#ADB2D4" },
    squareEnemy: { fill: true, fillStyle: "#83c5be" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 255, 255, 0.1)",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 0, 0, 0.6)",
    },
    environment: {
      fill: true,
      fillStyle: "coral",
    },
  },
  light: {
    // Default (Your Theme)
    canvas: { fillStyle: "#FFFDF0", fill: true },
    player: {
      fillStyle: "#D9DFC6",
      lineWidth: 0,
      fill: true,
      credits: {
        fillStyle: "black",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "coral",
      },
    },
    highscore: { fillStyle: "black" },
    speedUpgrade: { color: "green", fillStyle: "black" },
    lifeUpgrade: { color: "red", fillStyle: "black" },
    wallUpgrade: { color: "blue", fillStyle: "black" },
    constraintUpgrade: { color: "palegreen", fillStyle: "black" },
    cycloneUpgrade: { color: "violet", fillStyle: "black" },
    shieldUpgrade: { color: "lightblue", fillStyle: "black" },
    ballenemy: { fill: true, fillStyle: "#83c5be" },
    constraint: { fill: false, strokeStyle: "#ADB2D4" },
    squareEnemy: { fill: true, fillStyle: "#83c5be" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 255, 255, 0.1)",
      shadowBlur: 5,
      shadowColor: "black",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 0, 0, 0.6)",
      shadowBlur: 5,
      shadowColor: "black",
    },
    environment: {
      fill: true,
      fillStyle: "coral",
    },
  },
  dark: {
    // Default (Inverted Dark Theme)
    canvas: { fillStyle: "#00020F", fill: true },
    player: {
      fillStyle: "#262039",
      lineWidth: 0,
      fill: true,
      credits: {
        fillStyle: "white",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "coral",
      },
    },
    highscore: { fillStyle: "white" },
    speedUpgrade: { color: "lightgreen", fillStyle: "white" },
    lifeUpgrade: { color: "lightcoral", fillStyle: "white" },
    wallUpgrade: { color: "lightblue", fillStyle: "white" },
    constraintUpgrade: { color: "darkgreen", fillStyle: "white" },
    cycloneUpgrade: { color: "purple", fillStyle: "white" },
    shieldUpgrade: { color: "purple", fillStyle: "white" },
    ballenemy: { fill: true, fillStyle: "coral" },
    constraint: { fill: false, strokeStyle: "#525D2B" },
    squareEnemy: { fill: true, fillStyle: "coral" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(0, 0, 0, 0.9)",
      shadowBlur: 5,
      shadowColor: "white",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(0, 255, 255, 0.6)",
      shadowBlur: 5,
      shadowColor: "white",
    },
    environment: {
      fill: true,
      fillStyle: "#FFFDF0",
    },
  },
  underwater: {
    // Default (Inverted Dark Theme)
    canvas: { fillStyle: "#0f5e9c", fill: true },
    player: {
      fillStyle: "#FF4400",
      lineWidth: 0,
      fill: true,
      credits: {
        fillStyle: "white",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "palegreen",
      },
    },
    highscore: { fillStyle: "white" },
    speedUpgrade: { color: "lightgreen" },
    lifeUpgrade: { color: "lightcoral" },
    wallUpgrade: { color: "lightblue" },
    constraintUpgrade: { color: "darkgreen" },
    cycloneUpgrade: { color: "purple" },
    shieldUpgrade: { color: "purple" },
    ballenemy: { fill: true, fillStyle: "#EC058E" },
    constraint: { fill: false, strokeStyle: "#525D2B" },
    squareEnemy: { fill: true, fillStyle: "#EC058E" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#F8F1C3",
      shadowBlur: 5,
      shadowColor: "yellow",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#FFFBFC",
      shadowBlur: 5,
      shadowColor: "palegreen",
    },
    environment: {
      fill: false,
      strokeStyle: "#BCE3E6",
    },
  },
  francy: {
    // Gruvbox Theme
    canvas: { fillStyle: "#e4c1f9", fill: true },
    player: {
      fillStyle: "#ff99c8",
      strokeStyle: "#ff99c8",
      lineWidth: 2,
      fill: true,
      credits: {
        fillStyle: "black",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "coral",
      },
    },
    highscore: { fillStyle: "black" },
    speedUpgrade: { color: "#fabd2f", fillStyle: "black" },
    lifeUpgrade: { color: "#cc241d", fillStyle: "black" },
    wallUpgrade: { color: "#689d6a", fillStyle: "black" },
    constraintUpgrade: { color: "#b16286", fillStyle: "black" },
    cycloneUpgrade: { color: "#d79921", fillStyle: "black" },
    shieldUpgrade: { color: "purple", fillStyle: "black" },
    ballenemy: { fill: true, fillStyle: "#fcf6bd" },
    constraint: { fill: false, strokeStyle: "#1b263b" },
    squareEnemy: { fill: true, fillStyle: "fcf6bd" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#d65d0e",
      shadowBlur: 5,
      shadowColor: "palegreen",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#cc241d",
      shadowBlur: 5,
      shadowColor: "red",
    },
    environment: {
      fill: true,
      fillStyle: "#faf0ca",
      strokeStyle: "#faf0ca",
      lineWidth: 0,
    },
  },
  monokai: {
    // monokai Theme
    canvas: { fillStyle: "#282828", fill: true },
    player: {
      fillStyle: "#ebdbb2",
      strokeStyle: "#fe8019",
      lineWidth: 2,
      fill: true,
      credits: {
        fillStyle: "white",
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "coral",
      },
    },
    highscore: { fillStyle: "white" },
    speedUpgrade: { color: "#fabd2f", fillStyle: "white" },
    lifeUpgrade: { color: "#cc241d", fillStyle: "white" },
    wallUpgrade: { color: "#689d6a", fillStyle: "white" },
    constraintUpgrade: { color: "#b16286", fillStyle: "white" },
    cycloneUpgrade: { color: "#d79921", fillStyle: "white" },
    ballenemy: { fill: true, fillStyle: "#fb4934" },
    constraint: { fill: false, strokeStyle: "#d5c4a1" },
    squareEnemy: { fill: true, fillStyle: "coral" },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#d65d0e",
      shadowBlur: 5,
      shadowColor: "red",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "#cc241d",
      shadowBlur: 5,
      shadowColor: "yellow",
    },
    environment: {
      fill: true,
      fillStyle: "#FFFDF0",
    },
  },
  satik: {
    // Default (Your Theme)
    canvas: {
      fillStyle: "#0F4D8F",
      fill: true,
    },
    player: {
      fillStyle: "#FF99FF",
      lineWidth: 0,
      fill: true,
      credits: {
        fillStyle: "#FFFFFF",
        shadowBlur: 10,
      },
      lifes: {
        fill: true,
        lineWidth: 0,
        fillStyle: "#39FF14",
        shadowBlur: 10,
      },
    },
    highscore: {
      fillStyle: "#FFFFFF",
      shadowColor: "red",
      shadowBlur: 10,
    },
    speedUpgrade: {
      color: "#E7080E",
      shadowBlur: 10,
    },
    lifeUpgrade: {
      color: "#E7920E",
      shadowBlur: 10,
    },
    wallUpgrade: {
      color: "#E7EE0E",
      shadowBlur: 10,
    },
    constraintUpgrade: {
      color: "#2FEE0E",
      shadowBlur: 10,
    },
    cycloneUpgrade: {
      color: "#0192F4",
      shadowBlur: 10,
    },
    shieldUpgrade: {
      color: "#5D36F4",

      shadowBlur: 10,
    },
    ballenemy: {
      fill: true,
      fillStyle: "#FF1493",
      shadowBlur: 15,
    },
    constraint: {
      fill: false,
      strokeStyle: "#ADB2D4",
    },
    squareEnemy: {
      fill: true,
      fillStyle: "#FF69B4",
      shadowBlur: 15,
    },
    warningLine: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 255, 255, 0.1)",
    },
    arrowEnemy: {
      fill: false,
      lineWidth: 5,
      strokeStyle: "rgba(255, 0, 0, 0.6)",
    },
    environment: {
      fill: true,
      fillStyle: "#FFD700",
      shadowBlur: 20,
    },
  },
};
