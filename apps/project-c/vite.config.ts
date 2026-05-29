
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
    },
  },
  server: {
    port: 3003,
  },
  preview: {
    port: 3003,
  },
});
