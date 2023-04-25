import "element-plus/dist/index.css";
import 'uno.css'
import './main.scss';

import log from 'loglevel';
import { createApp } from 'vue';
import App from './app.vue';
import router from './route/router';
import ElementPlus from 'element-plus';
import apis from './api/apis';
import { admin } from '~/api/store';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';
// import { registerSW } from 'virtual:pwa-register';
import myComponent from './mycomponents';

import CustomClient from './api/httpr';
import systemView from './views/system';
import axios from 'axios';

log.setLevel(import.meta.env.VITE_LOG_LEVEL);

const app = createApp(App);
app.config.globalProperties.$api = apis;

app.use(router)
  .use(ElementPlus, { locale })
  .use(myComponent);

app.mount('#app');

apis.getLoginInfo().then(resp => {
  admin.value = resp
});

systemView.register(new CustomClient(axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 500000 // 请求超时时间
})));

