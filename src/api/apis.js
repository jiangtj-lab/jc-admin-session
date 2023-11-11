import { get, post, put, del, httpRequest } from './http';

const apis = {
  // 登录
  login(data) {
    return httpRequest('post', '/login', { data }, true);
  },
  getLoginInfo() {
    return get('/login/info');
  },

  // admin user
  getAdminUserPage(data) {
    return get('/system/user/page', data);
  },
  getAdminUser(data) {
    return get('/system/user', data);
  },
  createAdminUser(data) {
    return post('/system/user', data);
  },
  updateAdminUser(data) {
    return put('/system/user', data);
  },
  deleteAdminUser(id) {
    return del('/system/user', { id });
  },
  updateAdminUserPassword(data) {
    return post('/system/user/password', data);
  },
};
export default apis;
