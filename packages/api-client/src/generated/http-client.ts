/** HttpClient 构造参数 */
export interface HttpClientConfig {
  baseURL?: string;
  /** 自定义请求实现；不传则默认使用 fetch */
  customFetch?: CustomFetch;
}

export type CustomFetch = (
  url: string,
  options?: RequestInit,
) => Promise<unknown>;

/** 单次 request 参数（兼容 url 或 baseUrl + path） */
export interface RequestParams {
  url?: string;
  path?: string;
  baseUrl?: string;
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}


export class HttpClient {
  public baseURL = "";
  private readonly customFetch = (...params: Parameters<typeof fetch>) => fetch(...params);

  constructor(config: HttpClientConfig = {}) {
    Object.assign(this, config);
  }

  request<T>(params: RequestParams): Promise<T> {
    const base = params.baseUrl ?? this.baseURL ?? "";
    const requestUrl = params.url ?? `${base}${params.path ?? ""}`;
    const options: RequestInit = {
      method: params.method,
      headers: params.headers,
      body:
        params.body !== undefined ? JSON.stringify(params.body) : undefined,
    };

    // customFetch 可直接返回解析后的数据（见 project-b 的用法）
    return this.customFetch(requestUrl, options) as Promise<T>;
  }
}
