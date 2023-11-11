<template>
  <div class="main">
    <el-card class="main-form">
      <template #header>
        <div class="clearfix">
          <div class="title">J Cloud Admin</div>
        </div>
      </template>
      <el-form :model="formInline" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="formInline.user" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formInline.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item style="margin-left: 70px">
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="main-form" />
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import apis from '@/api/apis';
import { admin } from '~/api/store';
import permission from '../utils/permission';
import ribbon from '@jiangtj/ribbon.js';

const router = useRouter();

const formInline = reactive({
  user: '',
  password: '',
});

const onSubmit = () => {
  const parm = {
    username: formInline.user,
    password: formInline.password,
  };
  apis.login(parm).then((data) => {
    ElMessage.success({
      message: '登录成功',
      type: 'success',
    });
    admin.value = data;
    router.push('/');
  });
};

onMounted(() => {
  ribbon({ s: 300, target: '.main' });
  permission.logout();
});
</script>

<style scoped>
.main {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.el-card__header {
  padding: 0;
}

.title-banner {
  width: 400px;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
}

.main-form {
  width: 400px;
  margin: 150px auto 0;
  opacity: 0.9;
}
</style>
