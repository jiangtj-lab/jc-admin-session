
import axios, { AxiosInstance } from 'axios';
import log from 'loglevel';
import lodash from 'lodash';

export class Client {
  inst: AxiosInstance;

  constructor(inst?: AxiosInstance) {
    this.inst = inst || axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // 加载中
  loading(requestId: string) {

  }

  // 完成加载
  cancelLoading(requestId: string) {

  }

  startLoading(requestId: string, method: string) {
    let timeout: (NodeJS.Timeout | null);

    if (method === 'get') {
      timeout = setTimeout(() => {
        this.loading(requestId);
        timeout = null;
      }, 1000);
    } else {
      this.loading(requestId);
    }
  }

  request<T = any>(method: string, url: string, config = {}, skipCheck = false): Promise<T> {
    let requestId = lodash.uniqueId()
    this.startLoading(requestId, method);

    const innerConfig = Object.assign({ url, method }, config);
    return this.inst(innerConfig)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        log.error(error.response);
        this.handleCatchStatus(error);
        return Promise.reject(error);
      })
      .finally(() => {
        this.cancelLoading(requestId);
      });
  }

  handleCatchStatus(error: any) {
    const response = error.response;
    if (!response) {
      this.handleUnknownError(error);
      return;
    }
    // if (response.status === 200 || response.status === 204) {
    //   return response.data
    // }
    // 400/403/404 提醒错误
    let flag = response.status - 400;
    if (flag >= 0 || flag < 100) {
      this.handleClientError(response.status, response.data);
      return;
    }
    this.handleServerError(response.status, response.data);
  }

  handleUnknownError(error: any) {

  }

  handleClientError(status: number, data: any) {

  }

  handleServerError(status: number, data: any) {

  }

}
