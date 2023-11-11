import { Client } from '@jiangtj/jc-http'
import { ElMessage, ElLoading } from 'element-plus';
import router from '~/route/router';

const cache = new Map();

export default class CustomClient extends Client {

  loading(requestId) {
    let msg = ElLoading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    console.log("start")
    console.log(requestId)
    console.log(msg)
    cache.set(requestId, msg);
  }

  cancelLoading(requestId) {
    let msg = cache.get(requestId);
    console.log("end")
    console.log(requestId)
    console.log(msg)
    if (msg) {
      msg.close();
      cache.delete(requestId);
    }
  }

  handleClientError(status, data) {
    if (status === 401) {
      console.log(data);
      router.push({ name: 'login' });
      return;
    }
    ElMessage.error(data.detail || data.title);
  }

  handleServerError(status, data) {
    ElMessage.error("系统错误");
    console.log(status);
    console.log(data);
  }

  handleUnknownError(error) {
    ElMessage.error("未知错误");
  }
}
