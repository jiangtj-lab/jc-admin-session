import { get, post, put, del, httpRequest } from './http';
import { Admin } from '~/api/store';

const apis = {
  // 登录
  login(data: any): Promise<Admin> {
    return httpRequest('post', '/login', { data }, true);
  },
  getLoginInfo() {
    return get('/login/info');
  },

  // admin user
  getAdminUserPage(data: any) {
    return get('/system/admin/user/page', data);
  },
  getAdminUser(data: any) {
    return get('/system/admin/user', data);
  },
  createAdminUser(data: any) {
    return post('/system/admin/user', data);
  },
  updateAdminUser(data: any) {
    return put('/system/admin/user', data);
  },
  deleteAdminUser(id: any) {
    return del('/system/admin/user', { id });
  },
  updateAdminUserPassword(data: any) {
    return post('/system/admin/user/password', data);
  }

};
export default apis;
