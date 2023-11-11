<template>
  <el-sub-menu index="system">
    <template #title>
      <el-icon><Setting /></el-icon>
      <span>系统设置</span>
    </template>
    <el-menu-item-route index="system-user" />
  </el-sub-menu>
</template>

<script setup>
import ElMenuItemRoute from '@/components/el-menu-item-route.vue';
import { Setting } from '@element-plus/icons-vue';
</script>
