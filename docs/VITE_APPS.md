# B / C 项目（Vite + Vue）说明

## 常用命令

在仓库根目录：

```bash
pnpm dev:b          # 开发
pnpm build:b        # 构建 → apps/project-b/dist
pnpm --filter project-b preview   # 预览构建结果
pnpm --filter project-b typecheck # Vue 类型检查
```

项目 C 将 `b` 换成 `c` 即可。

## 目录约定

```
apps/project-b/
├── index.html          # Vite 入口 HTML
├── vite.config.ts      # 端口、alias、@vitejs/plugin-vue
├── src/
│   ├── main.ts
│   ├── App.vue         # 业务从这里扩展（script setup）
│   └── index.css
└── dist/               # build 产出（已 gitignore）
```

## 引用共享模块

```vue
<script setup lang="ts">
import { formatAppTitle, createHealthResponse } from "@repo/core";
</script>
```

- 仅使用 `@repo/core`（浏览器安全）
- **不要**在前端 import `@repo/core/node`（含 Node http 服务）

## 调整端口

修改对应 `vite.config.ts` 里的 `server.port` / `preview.port`。
