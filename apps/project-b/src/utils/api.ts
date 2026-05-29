import { Api, HttpClient } from "@reddit/api-client";

/** 项目 B 的 API 实例：按环境变量配置后端地址 */
const http = new HttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  customFetch: async (url, options) => {
    const data =  await fetch(url, options).then((response) => {
      return response.json();
    });
    return data
  },
});
// 在这里面可以访问到 api-client 的 Api 类
// 然后可以访问到 Api 类中的方法
export const api = new Api(http);
