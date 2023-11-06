import axios, { AxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '../modules/common/consts/app-keys.const';

export class HttpService {
  private baseUrl: string | undefined;

  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  private addAuthorizationHeader(config: AxiosRequestConfig, withAuth: boolean) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.TOKEN)}`
      };
    }
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/api/${url}`;
  }

  // auth is required by default, use false to disable
  private async sendRequest(method: string, config: AxiosRequestConfig, withAuth: boolean) {
    this.addAuthorizationHeader(config, withAuth);
    const fullUrl = this.getFullApiUrl(config.url as string);

    const response = await axios.request({
      method,
      url: fullUrl,
      data: config.data,
      headers: config.headers
    });

    return response;
  }

  async get(config: AxiosRequestConfig, withAuth = true) {
    return this.sendRequest('get', config, withAuth);
  }

  async post(config: AxiosRequestConfig, withAuth = true) {
    return this.sendRequest('post', config, withAuth);
  }

  async put(config: AxiosRequestConfig, withAuth = true) {
    return this.sendRequest('put', config, withAuth);
  }

  async patch(config: AxiosRequestConfig, withAuth = true) {
    return this.sendRequest('patch', config, withAuth);
  }

  async delete(config: AxiosRequestConfig, withAuth = true) {
    return this.sendRequest('delete', config, withAuth);
  }
}
