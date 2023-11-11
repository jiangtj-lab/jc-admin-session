import { Client } from './client';

export { Client };

export default class JCloudClient {
  constructor(client) {
    this.client = client || new Client();
  }

  setClient(newClient) {
    this.client = newClient;
  }

  request(method, url, config = {}, skipCheck = false) {
    return this.client.request(method, url, config, skipCheck);
  }

  post(url, data = {}) {
    return this.request('post', url, { data });
  }

  get(url, params = {}) {
    return this.request('get', url, { params });
  }

  put(url, data = {}) {
    return this.request('put', url, { data });
  }

  del(url, params = {}) {
    return this.request('delete', url, { params });
  }
}
