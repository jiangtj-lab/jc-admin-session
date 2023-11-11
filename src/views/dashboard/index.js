import { defineView } from '@/core/helper';
import dashboard from './dashboard.vue';

import { generateSingle } from '@/components/common-menu';
import { HomeFilled } from '@element-plus/icons-vue';

export default {
  install: defineView((helper) => {
    helper.defineMenu(generateSingle(HomeFilled, 'dashboard'));
    helper.defineRoute({
      index: 'dashboard',
      path: '/',
      name: '首页',
      component: dashboard,
    });
  }),
};
