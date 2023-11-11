import JCloudClient from '@jiangtj/jc-http';
import { Admin } from '~/api/store';

export const client = new JCloudClient();

const apis = {
  // 登录
  login(data: any): Promise<Admin> {
    return client.request('post', '/login', { data }, true);
  },
  getLoginInfo() {
    return client.get('/login/info');
  },

  // admin user
  getAdminUserPage(data: any) {
    return client.get('/system/user/page', data);
  },
  getAdminUser(data: any) {
    return client.get('/system/user', data);
  },
  createAdminUser(data: any) {
    return client.post('/system/user', data);
  },
  updateAdminUser(data: any) {
    return client.put('/system/user', data);
  },
  deleteAdminUser(id: any) {
    return client.del('/system/user', { id });
  },
  updateAdminUserPassword(data: any) {
    return client.post('/system/user/password', data);
  }

};

export default apis;
