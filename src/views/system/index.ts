
import user from './user.vue';
import { Setting } from '@element-plus/icons-vue';
import { markRaw } from 'vue';

export default {
  meta: {
    name: '系统设置',
    index: 'system',
    icon: markRaw(Setting)
  },
  items: [user]
};
