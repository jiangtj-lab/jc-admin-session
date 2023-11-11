import JCloudClient from '@jiangtj/jc-http';

export const client = new JCloudClient();

const apis = {
  // 登录
  login(data) {
    return client.request('post', '/login', { data }, true);
  },
  getLoginInfo() {
    return client.get('/login/info');
  },

  // admin user
  getAdminUserPage(data) {
    return client.get('/system/user/page', data);
  },
  getAdminUser(data) {
    return client.get('/system/user', data);
  },
  createAdminUser(data) {
    return client.post('/system/user', data);
  },
  updateAdminUser(data) {
    return client.put('/system/user', data);
  },
  deleteAdminUser(id) {
    return client.del('/system/user', { id });
  },
  updateAdminUserPassword(data) {
    return client.post('/system/user/password', data);
  },
};

export default apis;
