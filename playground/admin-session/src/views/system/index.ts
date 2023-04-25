
import user from './user.vue';
import { Setting } from '@element-plus/icons-vue';
import { markRaw } from 'vue';
import { Client } from '@jiangtj/jc-http';
import { client } from './apis';

export default {
  meta: {
    name: '系统设置',
    index: 'system',
    icon: markRaw(Setting)
  },
  items: [user],
  register: (newClient: Client) => {
    client.setClient(newClient);
  }
};
