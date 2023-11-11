<template>
  <el-container class="app-container">
    <el-aside width="auto">
      <el-scrollbar class="scrollbar-menu">
        <main-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          class="main-menu-aside"
          :default-active="$route.name"
          :collapse="isCollapse"
          unique-opened
          router />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="main-header" height="70px">
        <el-row type="flex" class="main-header-des" justify="space-between">
          <el-col :span="12">
            <el-row type="flex" class="row-bg">
              <el-button :icon="Expand" v-if="isCollapse" @click="isCollapse = false" />
              <el-button :icon="Fold" v-if="!isCollapse" @click="isCollapse = true" />
              <el-button
                :icon="HomeFilled"
                v-if="$route.name !== 'dashboard'"
                @click="$router.push({ name: 'dashboard' })" />
              <el-button link class="main-header-name">
                <el-text class="mx-1">{{ $route.meta.name }}</el-text>
              </el-button>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" class="row-bg" justify="end">
              <el-dropdown trigger="click">
                <el-button :icon="UserFilled">{{ adminUser.username }}</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    <el-dropdown-item @click="passwordDialog.visibled = true">修改密码</el-dropdown-item>
                    <el-dropdown-item @click="changeLogDialog.visibled = true">更新日志</el-dropdown-item>
                    <el-dropdown-item @click="showVersion()">关于</el-dropdown-item>
                    <el-dropdown-item @click="toggleDark()">亮/暗</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <router-tabs />
          </el-col>
        </el-row>
      </el-header>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :route="{ path: '/' }">home</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in menuPath" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-scrollbar>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-scrollbar>
      <el-footer style="height: 20px">&copy; 2021</el-footer>
    </el-container>
  </el-container>

  <el-dialog class="main-el-dialog" title="修改密码" v-model="passwordDialog.visibled" width="600px">
    <el-form :model="passwordDialog.form" ref="passwordForm" label-width="80px">
      <el-form-item label="旧密码" prop="old" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
        <el-input v-model="passwordDialog.form.old" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="password" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
        <el-input v-model="passwordDialog.form.password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialog.visibled = false">取消</el-button>
        <el-button type="primary" @click="submitPassword">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog class="main-el-dialog" title="系统信息" v-model="versionDialog.visibled" width="600px">
    <el-row :gutter="20">
      <el-col :span="6"><b>服务端</b></el-col>
      <el-col :span="18"
        >{{ versionDialog.server.version }} （基于 Spring Boot {{ versionDialog.server.springBootVersion }}）</el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><b>构建时间</b></el-col>
      <el-col :span="18">{{ versionDialog.server.buildTime }}</el-col>
    </el-row>
    <el-row :gutter="20"><el-col :span="4">&nbsp;</el-col></el-row>
    <el-row :gutter="20">
      <el-col :span="6"><b>客户端</b></el-col>
      <el-col :span="18"
        >{{ versionDialog.client.version }} （基于 Vue {{ versionDialog.client.dependencies.vue.substr(1) }} &
        ElementPlus {{ versionDialog.client.dependencies['element-plus'].substr(1) }}）</el-col
      >
    </el-row>
  </el-dialog>

  <el-dialog class="main-el-dialog" title="更新日志" v-model="changeLogDialog.visibled" width="600px">
    <el-timeline>
      <el-timeline-item v-for="val in changeLogDialog.logs" :key="val.v" :timestamp="val.v" placement="top">
        <el-card>
          <div class="change-log" v-html="val.md" />
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Fold, Expand, HomeFilled, UserFilled } from '@element-plus/icons-vue';
import isMobile from 'ismobilejs';
import apis from '@/api/apis';
import permission from '@/utils/permission';
import pkg from '../../package.json';
import { useDark, useToggle } from '@vueuse/core';

// import marked from 'marked';
import MainMenu from './main-menu.vue';
import RouterTabs from '@/components/router-tabs.vue';

const router = useRouter();
const isDark = useDark();
const toggleDark = useToggle(isDark);

const adminUser = permission.user;
const check = isMobile(window.navigator);
const isCollapse = ref(check.phone || check.tablet);
const passwordDialog = reactive({
  visibled: false,
  form: {},
});
const versionDialog = reactive({
  visibled: false,
  server: {},
  client: pkg,
});
const changeLogDialog = reactive({
  visibled: false,
  logs: [
    // {v: '1.1', md: marked(md1_1)},
    // {v: '1.0', md: marked(md1_0)}
  ],
});

const logout = () => {
  permission.logout();
  router.push('/login');
};

const passwordForm = ref(null);
const submitPassword = () => {
  passwordForm.value.validate().then(() => {
    apis.updateAdminUserPassword(passwordDialog.form).then(() => {
      ElMessage.success('操作成功');
      passwordDialog.visibled = false;
      logout();
    });
  });
};
const showVersion = () => {
  apis.getAppInfo().then((data) => {
    versionDialog.server = data;
    versionDialog.visibled = true;
  });
};
</script>

<style lang="scss">
.app-container {
  overflow: hidden;
  height: 100%;
}

.main-menu-aside {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  border: 0;
}

.main-menu-aside:not(.el-menu--collapse) {
  width: 200px;
}

.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
}

.main-header {
  padding: 0;

  .main-header-name {
    cursor: default;
  }

  .main-header-des,
  .el-button {
    background-color: var(--el-border-color-light);
  }
  .el-button:hover {
    background-color: var(--el-border-color);
  }
}

.main-header .el-button {
  margin: 0;
  border-radius: 0;
  border-width: 0;
  padding: 12px;
}

.el-breadcrumb {
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 14px;
  margin-left: 20px;
}
</style>
