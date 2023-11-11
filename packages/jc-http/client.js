import axios from 'axios';
import log from 'loglevel';
import lodash from 'lodash';

export class Client {
  constructor(inst) {
    this.inst =
      inst ||
      axios.create({
        headers: {
          'Content-Type': 'application/json',
        },
      });
    this.timeoutCache = new Map();
  }

  // 加载中
  loading(requestId) {}

  // 完成加载
  cancelLoading(requestIdf) {}

  startLoading(requestId, method) {
    if (method === 'get') {
      let x = setTimeout(() => {
        this.loading(requestId);
        this.timeoutCache.delete(requestId);
      }, 1000);
      this.timeoutCache.set(requestId, x);
    } else {
      this.loading(requestId);
    }
  }

  endLoading(requestId) {
    let x = this.timeoutCache.get(requestId);
    if (x) {
      clearTimeout(x);
      this.timeoutCache.delete(requestId);
      return;
    }
    this.cancelLoading(requestId);
  }

  request(method, url, config = {}, skipCheck = false) {
    let requestId = lodash.uniqueId();
    this.startLoading(requestId, method);

    const innerConfig = Object.assign({ url, method }, config);
    return this.inst(innerConfig)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        log.error(error.response);
        this.handleCatchStatus(error);
        return Promise.reject(error);
      })
      .finally(() => {
        this.endLoading(requestId);
      });
  }

  handleCatchStatus(error) {
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

  handleUnknownError(error) {}

  handleClientError(status, data) {}

  handleServerError(status, data) {}
}
