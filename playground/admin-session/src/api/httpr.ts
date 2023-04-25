import { Client } from '@jiangtj/jc-http'
import { ElMessage } from 'element-plus';
import router from '~/route/router';

export default class CustomClient extends Client {

  handleClientError(status: number, data: any): void {
    if (status === 401) {
      console.log(data);
      router.push({ name: 'login' });
      return;
    }
    ElMessage.error(data.detail || data.title);
  }

  handleServerError(status: number, data: any): void {
    ElMessage.error("系统错误");
    console.log(status);
    console.log(data);
  }

  handleUnknownError(error: any): void {
    ElMessage.error("未知错误");
  }
}
