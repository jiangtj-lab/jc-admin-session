import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '../views/layout.vue';
import views from '../views';
import log from 'loglevel';

const menuRoutes = views
  .map(item => {
    if (item.items) {
      return item.items;
    }
    return item;
  })
  .flat()
  .map(item => {
    return {
      name: item.meta.index,
      path: item.meta.route,
      component: item,
      meta: { menu: item.meta }
    };
  });
log.info(menuRoutes);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: menuRoutes
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !token.isLogin()) next({ name: 'login' });
//   else next();
// });

export default router;
