import type { AppId } from "../types.js";

/** 统一的应用标题格式，便于日志与页面展示 */
export function formatAppTitle(appId: AppId, suffix?: string): string {
  const base = appId.replace("project-", "项目 ").toUpperCase();
  return suffix ? `${base} — ${suffix}` : base;
}
