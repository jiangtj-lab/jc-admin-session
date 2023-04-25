<template>
  <el-container class="app-container">
    <el-aside width="auto">
      <el-scrollbar class="scrollbar-menu">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="main-menu-aside"
          :default-active="$route.name" :collapse="isCollapse" unique-opened router @select="handleSelect">
          <template v-for="rootMenu in menus" :key="rootMenu">
            <el-sub-menu v-if="rootMenu.items" :index="rootMenu.index">
              <template #title>
                <el-icon>
                  <component :is="rootMenu.icon" />
                </el-icon>
                <span>{{ rootMenu.name }}</span>
              </template>
              <el-menu-item v-for="menuItem in rootMenu.items" :key="menuItem" :index="menuItem.index"
                :route="{ name: menuItem.index }">
                {{ menuItem.name }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="rootMenu.index" :route="{ name: rootMenu.index }">
              <el-icon>
                <component :is="rootMenu.icon" />
              </el-icon>
              <template #title>{{ rootMenu.name }}</template>
            </el-menu-item>
          </template>

          <!-- <el-submenu index="system">
        <template #title>
          <i class="el-icon-location" />
          <span>系统管理</span>
        </template>
        <el-menu-item index="userList" :route="{ name: 'userList' }">管理员</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-submenu index="1-4">
          <template #title>选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu> -->
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="main-header" height="40px">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-row type="flex" class="row-bg">
              <el-button :icon="Expand" v-if="isCollapse" @click="isCollapse = false" />
              <el-button :icon="Fold" v-if="!isCollapse" @click="isCollapse = true" />
              <el-button :icon="HomeFilled" v-if="$route.name !== 'dashboard'"
                @click="$router.push({ name: 'dashboard' })" />
              <el-button type="text" class="main-header-name">{{ route.meta.menu.name }}</el-button>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" class="row-bg" justify="end">
              <el-dropdown trigger="click">
                <el-button :icon="UserFilled">{{ admin.username }}</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logout">登出</el-dropdown-item>
                    <el-dropdown-item @click="passwordDialog.visitable = true">修改密码</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :route="{ path: '/' }">home</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in menuPath" :key="item">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-scrollbar>
        <el-main>
          <router-view />
        </el-main>
      </el-scrollbar>
      <el-footer style="height: 20px;">&copy; 2021</el-footer>
    </el-container>
  </el-container>


  <el-dialog custom-class="main-el-dialog" title="修改密码" v-model="passwordDialog.visitable" width="600px">
    <el-form :model="passwordDialog.form" ref="passwordForm" label-width="80px">
      <el-form-item label="旧密码" prop="old" :rules="[
        { required: true, message: '不能为空', trigger: 'blur' }
      ]">
        <el-input v-model="passwordDialog.form.old" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="password" :rules="[
        { required: true, message: '不能为空', trigger: 'blur' }
      ]">
        <el-input v-model="passwordDialog.form.password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="passwordDialog.visitable = false">取消</el-button>
        <el-button type="primary" @click="submitPassword">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, DefineComponent } from 'vue';
import { useRouter, useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Fold, Expand, HomeFilled, UserFilled } from '@element-plus/icons-vue';
import isMobile from 'ismobilejs';
import apis from '~/api/apis';
import { admin } from '~/api/store';
import menus from '~/route/menu';

const router = useRouter();
const route = useRoute()

const check = isMobile(window.navigator);
const isCollapse = ref(check.phone || check.tablet);
const menuPath: Ref<Array<string>> = ref([]);
const passwordDialog = reactive({
  visitable: false,
  form: { old: '', password: '' }
});

const handleSelect = (key: Ref<string>, keyPath: Ref<Array<string>>) => {
  console.log(key, keyPath);
  menuPath.value = keyPath.value;
};
const logout = () => {
  router.push('/login');
};

const passwordForm: Ref<DefineComponent | null> = ref(null);
const submitPassword = () => {
  if (passwordForm.value === null) return;
  passwordForm.value.validate().then(() => {
    apis.updateAdminUserPassword(passwordDialog.form)
      .then(() => {
        ElMessage.success('操作成功');
        passwordDialog.visitable = false;
        logout();
      });
  });
};
</script>

<style lang='scss'>
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
    color: #303133;
    cursor: default;
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
