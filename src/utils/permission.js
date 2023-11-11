// import apis from '../api/apis';

const token = {
  source: null,
  user: {},
  body: {},
  permission: [],
  init(newToken, user) {
    sessionStorage.token = newToken;
    sessionStorage.user = JSON.stringify(user);
    token.source = newToken;
    token.user = user;
    token.body = JSON.parse(atob(newToken.split('.')[1]));
    return Promise.resolve(token);
    // return apis.getAdminUserPermissions().then(data => {
    //   token.permission = data;
    // });
  },
  hasAny(...permission) {
    if (this.body.sub === '1') {
      return true;
    }
    for (const p of permission) {
      if (token.permission.includes(p)) {
        return true;
      }
    }
    return false;
  },
  isLogin() {
    return this.source != null && !token.isExp();
  },
  logout() {
    this.source = null;
    this.body = {};
    this.permission = [];
    sessionStorage.clear();
  },
  isExp() {
    return token.body.exp * 1000 < new Date().getTime();
  },
  isNeedRefresh() {
    const aa = token.body.exp * 1000;
    return aa < new Date().getTime() + 64800000; // 18*60*60*1000
  },
};

export default token;
