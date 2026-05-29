/**
 * Node 环境专用导出（含 http 等），仅供 project-a 等后端/脚本使用
 * Vite 前端项目请只 import @repo/core，不要引用此入口
 */
export { createDevServer } from "./server/createDevServer.js";
