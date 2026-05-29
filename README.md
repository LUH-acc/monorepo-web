# Reddit Monorepo（三项目统一管理）

一个仓库内管理 **项目 A / B / C**：各自可独立启动，共享功能放在 `packages/`。

## 目录结构

```
reddit/
├── apps/
│   ├── project-a/     # 已上线 → 将现有代码迁入此目录
│   ├── project-b/     # Vite + Vue（端口 3002）
│   └── project-c/     # Vite + Vue（端口 3003）
├── packages/
│   └── core/          # 跨项目共享模块（工具、类型、API 封装等）
├── package.json       # 根脚本：dev:a / dev:b / dev:c
└── pnpm-workspace.yaml
```

## 快速开始

```bash
# 安装 pnpm：https://pnpm.io/installation
pnpm install

# 独立启动
pnpm dev:a   # 项目 A（Node，默认 3001）
pnpm dev:b   # 项目 B（Vite，默认 3002）
pnpm dev:c   # 项目 C（Vite，默认 3003）

# 生产构建（B、C）
pnpm build:b
pnpm build:c
```

访问地址：

- A：http://localhost:3001/health
- B：http://localhost:3002（Vite 页面）
- C：http://localhost:3003（Vite 页面）

B、C 在 `apps/project-b` / `apps/project-c` 内使用 **Vite + Vue 3 + TypeScript**，共享逻辑通过 `@repo/core` 引用（勿在前端引用 `@repo/core/node`）。

## 设计原则

| 放哪里 | 内容 |
|--------|------|
| `apps/project-*` | 仅该项目独有的页面、路由、部署配置 |
| `packages/core` | 两个及以上项目都会用到的逻辑 |
| `packages/*`（可扩展） | 如 `ui`、`auth`、`api-client` 等独立包 |

新增共享包：在 `packages/` 下新建目录，在对应 app 的 `package.json` 里写 `"@repo/xxx": "workspace:*"`。

## 迁移已上线的项目 A

详见 [docs/MIGRATE_PROJECT_A.md](./docs/MIGRATE_PROJECT_A.md)。

## 环境变量

各 app 可通过 `PORT` 覆盖端口，例如：

```bash
cd apps/project-a && PORT=4001 pnpm dev
```
