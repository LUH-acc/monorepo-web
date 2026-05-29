import http from "node:http";
import type { AppId } from "../types.js";
import { createHealthResponse } from "../api/health.js";
import { formatAppTitle } from "../utils/format.js";

/**
 * 开发用最小 HTTP 服务：各 app 传入自己的 appId 与端口即可独立启动
 * 上线后 A/B/C 可替换为各自框架（Next、Vite 等），仍复用 @repo/core 中的业务模块
 */
export function createDevServer(appId: AppId, port: number): http.Server {
  const server = http.createServer((req, res) => {
    const url = req.url ?? "/";

    if (url === "/health" || url.startsWith("/health?")) {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(createHealthResponse(appId)));
      return;
    }

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${formatAppTitle(appId, "运行中")}\n访问 /health 查看状态`);
  });

  server.listen(port, () => {
    console.log(`[${appId}] 已启动 → http://localhost:${port}`);
  });

  return server;
}
