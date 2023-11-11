import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export function handleCatchStatus(error) {
  const response = error.response;
  // if (response.status === 200 || response.status === 204) {
  //   return response.data
  // }
  // 400/403/404 提醒错误
  if (response.status === 400 || response.status === 403 || response.status === 404) {
    ElMessage.error(response.data.detail || response.data.title);
    return response.data;
  }
  // 401 应该跳转到登录
  if (response.status === 401) {
    console.log(response);
    const router = useRouter();
    router.push({ name: 'login' });
    return response.data;
  }
  // 这是需要处理的异常
  ElMessage.error('系统错误');
  console.log(response);
  return response.data;
}
