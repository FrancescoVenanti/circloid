import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist", // Output directory
    emptyOutDir: true, // Clears old build files
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Example alias
    },
  },
});
