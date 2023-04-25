import { Client } from './client';

export { Client };

export default class JCloudClient {
  client: Client;

  constructor(client?: Client) {
    this.client = client || new Client();
  }

  setClient(newClient: Client) {
    this.client = newClient;
  }

  request<T = any>(method: string, url: string, config = {}, skipCheck = false): Promise<T> {
    return this.client.request(method, url, config, skipCheck)
  }

  post<T = any>(url: string, data = {}): Promise<T> {
    return this.request('post', url, { data });
  }

  get(url: string, params = {}) {
    return this.request('get', url, { params });
  }

  put(url: string, data = {}) {
    return this.request('put', url, { data });
  }

  del(url: string, params = {}) {
    return this.request('delete', url, { params });
  }

}

