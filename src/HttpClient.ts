import axios, { AxiosInstance, AxiosError } from "axios";
import {
  CrayApiException,
  CrayAuthenticationException,
  CrayTimeoutException,
  CrayValidationException,
} from "./exceptions";

export interface HttpClientConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  retries?: number;
}

export class HttpClient {
  private client: AxiosInstance;
  private retries: number;

  constructor(config: HttpClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout * 1000, // axios uses ms
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    this.retries = config.retries || 2;

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: any) => response,
      (error: any) => this.handleError(error)
    );
  }

  public async request<T>(
    method: string,
    url: string,
    data: any = null,
    params: any = null
  ): Promise<T> {
    let attempt = 0;
    while (attempt <= this.retries) {
      try {
        const response = await this.client.request<T>({
          method,
          url,
          data,
          params,
        });
        return response.data;
      } catch (error: any) {
        attempt++;
        if (attempt > this.retries || !this.isRetryable(error)) {
          throw error;
        }
        // Simple exponential backoff could go here
      }
    }
    throw new CrayTimeoutException("Request failed after retries."); // Should be unreachable due to re-throw
  }

  public async get<T>(url: string, params: any = null): Promise<T> {
    return this.request<T>("GET", url, null, params);
  }

  public async post<T>(url: string, data: any = null): Promise<T> {
    return this.request<T>("POST", url, data);
  }

  private isRetryable(error: any): boolean {
    // Retry on network errors or 5xx server errors
    if (!error.response) return true; // Network error
    return error.response.status >= 500 && error.response.status < 600;
  }

  private handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      const status = error.response.status;
      const data: any = error.response.data;
      const message = data?.message || error.message;

      if (status === 401) {
        return Promise.reject(new CrayAuthenticationException(message));
      }
      if (status === 400 || status === 422) {
        return Promise.reject(
          new CrayValidationException(message, data?.errors || null)
        );
      }
      if (status >= 500) {
        return Promise.reject(new CrayApiException(message, status));
      }
      return Promise.reject(new CrayApiException(message, status));
    } else if (error.code === "ECONNABORTED") {
      return Promise.reject(new CrayTimeoutException());
    }

    return Promise.reject(new CrayApiException(error.message, 0));
  }
}
