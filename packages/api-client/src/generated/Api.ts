import { HttpClient } from "./http-client.js";

/** 由 OpenAPI/Swagger 生成的业务 API 聚合类 */
export class Api {
  private readonly httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  GetUserInfo = () =>
    this.httpClient.request({
      url: "/api/user/info",
      method: "GET",
    });
}
