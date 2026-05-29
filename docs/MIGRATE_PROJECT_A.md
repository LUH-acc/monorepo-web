# 将已上线的项目 A 迁入 Monorepo

## 步骤

1. **备份** 原 A 项目仓库或目录。
2. **复制源码** 到 `apps/project-a/`，保留该项目的 `package.json` 依赖列表（可与本模板合并）。
3. **抽取共享代码** 到 `packages/core`（或新建 `packages/ui` 等）：
   - 工具函数、HTTP 客户端、常量、类型定义
   - 多个项目都会用的 React 组件
4. **改 import**：将原来的相对路径改为 `@repo/core` 等 workspace 包名。
5. **端口与部署**：生产环境仍按 A 独立部署；monorepo 只影响开发与构建组织方式。

## 若 A 不是 Node/TypeScript

- 仍可将 A 放在 `apps/project-a/`，在根 `package.json` 用脚本调用原构建命令，例如 `"dev:a": "cd apps/project-a && python manage.py runserver"`。
- 共享层可用 `packages/core` 仅放 JSON 配置、OpenAPI 生成的类型等，或改为 Python package `packages/py_core`。

## 上线后

- CI 可为每个 app 配置独立 job，仅当 `apps/project-a/**` 或 `packages/**` 变更时构建 A。
- B、C 开发时不影响 A 的生产构建（路径过滤）。
