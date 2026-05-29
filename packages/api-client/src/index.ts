/**
 * @reddit/api-client 对外入口：业务 app 只从此文件 import
 */
export { Api } from "./generated/Api.js";
export { HttpClient } from "./generated/http-client.js";
export type {
  HttpClientConfig,
  CustomFetch,
  RequestParams,
} from "./generated/http-client.js";
