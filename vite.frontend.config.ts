import * as path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { config } from "dotenv";

config();

export default defineConfig({
  root: path.join(__dirname, "src", "frontend"),
  build: {
    outDir: path.join(__dirname, "dist", "static"),
    emptyOutDir: true,
  },
  plugins: [
    svelte({
      configFile: path.join(__dirname, "svelte.config.js"),
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5174",
      },
    },
    open: true,
  },
});
