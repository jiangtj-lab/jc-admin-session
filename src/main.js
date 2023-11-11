import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import 'uno.css';
import './main.scss';
import log from 'loglevel';
import { createApp, ref } from 'vue';
import App from './app.vue';
import router from './core/router';
import ElementPlus from 'element-plus';
import apis from './api/apis.js';
import { admin } from '~/api/store';
import token from './utils/permission';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/es/locale/lang/zh-cn';
import myComponent from './components';
import mainViews from './layout/main-views';

log.setLevel(import.meta.env.VITE_LOG_LEVEL);

const app = createApp(App);
app.config.globalProperties.$api = apis;

const views = ref([]);
const addView = (view) => {
  views.value.push(view);
};
app.provide('views', { views, addView });

app.use(ElementPlus, { locale }).use(mainViews).use(router).use(myComponent);

app.mount('#app');

apis.getLoginInfo().then((resp) => {
  admin.value = resp;
});
