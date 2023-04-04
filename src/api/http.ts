import axios, { AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import { handleCatchStatus } from './handler';
import log from 'loglevel';

axios.defaults.withCredentials = true;

function loadingMsg(): { close: () => void } { // 使用Element loading-close 方法
  return ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

interface Loading {
  timeout?: NodeJS.Timeout;
  inst?: { close: () => void };
  cancel: () => void;
}

function startLoading(method: string) {
  const loading: Loading = {
    cancel: () => {
      if (loading.inst) {
        loading.inst.close();
      }
      if (loading.timeout) {
        clearTimeout(loading.timeout);
      }
    }
  };

  if (method === 'get') {
    loading.timeout = setTimeout(() => {
      loading.inst = loadingMsg();
      loading.timeout = undefined;
    }, 1000);
  } else {
    loading.inst = loadingMsg();
  }
  return loading;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 500000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Access-Control-Allow-Origin'] = true;
  config.headers['content-type'] = 'application/json';
  return config;
}, error => {
  Promise.reject(error);
});

export function httpRequest<T = any>(method: string, url: string, config = {}, skipCheck = false): Promise<T> {

  const loading = startLoading(method);
  const innerConfig = Object.assign({ url, method }, config);
  return service(innerConfig)
    .then(response => {
      loading.cancel();
      return response.data;
    })
    .catch(error => {
      log.error(error.response);
      loading.cancel();
      handleCatchStatus(error);
      return Promise.reject(error.response);
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function post<T = any>(url: string, data = {}): Promise<T> {
  return httpRequest('post', url, { data });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function get(url: string, params = {}) {
  return httpRequest('get', url, { params });
}

/**
 * put 与 post 类似
 */
export function put(url: string, data = {}) {
  return httpRequest('put', url, { data });
}

/**
 * delete 与 get 类似
 */
export function del(url: string, params = {}) {
  return httpRequest('delete', url, { params });
}
