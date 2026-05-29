/** 三个子项目在 monorepo 内的标识 */
export type AppId = "project-a" | "project-b" | "project-c";

export interface HealthPayload {
  appId: AppId;
  status: "ok";
  timestamp: string;
}
