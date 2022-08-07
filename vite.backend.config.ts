import * as path from "path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  root: path.join(__dirname, "src", "backend"),
  build: {
    outDir: path.join(__dirname, "dist"),
    emptyOutDir: false
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "app.ts",
      exportName: "viteNodeApp",
      tsCompiler: "esbuild"
    })
  ],
  server: {
    port: 5174
  }
});
