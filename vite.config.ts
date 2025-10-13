import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/", // Correct for szymoncz.github.io
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // If using aliases
    },
  },
});
