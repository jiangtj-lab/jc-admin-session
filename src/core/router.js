import { createRouter, createWebHashHistory } from 'vue-router';
import mainContainer from '@/layout/main-container.vue';
import loginContainer from '@/layout/login-container.vue';
import log from 'loglevel';
import token from '@/utils/permission';

const innerRoutes = [];
const nameToR = new Map();
export const addRoute = (r) => {
  innerRoutes.push(r);
  nameToR.set(r.name, r);
};

export const getRoute = (name) => {
  return nameToR.get(name);
};

export default {
  install: (app) => {
    log.info(innerRoutes);
    const routes = [
      {
        path: '/',
        name: 'layout',
        component: mainContainer,
        children: innerRoutes,
      },
      {
        path: '/login',
        name: 'login',
        component: loginContainer,
      },
    ];

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    // router.beforeEach((to, from, next) => {
    //   if (to.name !== 'login' && !token.isLogin()) next({ name: 'login' });
    //   else next();
    // });
    app.use(router);
  },
};
