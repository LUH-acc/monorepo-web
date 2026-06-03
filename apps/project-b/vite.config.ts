import path from "node:path";
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import UnoCSS from 'unocss/vite'

const appDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    // 开发时直接指向 core 源码，改共享模块无需先 build
    alias: {
      "@reddit/core": path.resolve(appDir, "../../packages/core/src/index.ts"),
      "@reddit/api-client": path.resolve(
        appDir,
        "../../packages/api-client/src/index.ts",
      ),
    },
  },
  server: {
    port: 3002,
  },
  preview: {
    port: 3002,
  },
});
