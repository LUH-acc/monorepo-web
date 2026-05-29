/**
 * 外层共享模块入口：业务无关的通用能力放这里，各 app 通过 @repo/core 引用
 */
/** 浏览器与 Node 均可使用的共享模块（Vite 项目默认引用此入口） */
export { formatAppTitle } from "./utils/format.js";
export { createHealthResponse } from "./api/health.js";
export type { AppId, HealthPayload } from "./types.js";
