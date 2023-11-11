import { defineView } from '@/core/helper';
import menu from './menu.vue';
import user from './user.vue';

export default {
  install: defineView((helper) => {
    helper.defineMenu('system', menu);
    helper.defineRoute({
      index: 'system-user',
      name: '账号管理',
      component: user,
    });
  }),
};
