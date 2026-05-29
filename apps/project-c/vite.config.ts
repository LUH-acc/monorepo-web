import path from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@reddit/core": path.resolve(appDir, "../../packages/core/src/index.ts"),
    },
  },
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
  },
});
