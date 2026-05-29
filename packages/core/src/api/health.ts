import type { AppId, HealthPayload } from "../types.js";

/** 各 app 健康检查可复用的响应结构 */
export function createHealthResponse(appId: AppId): HealthPayload {
  return {
    appId,
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
