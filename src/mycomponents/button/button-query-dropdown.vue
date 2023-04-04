<template>
  <el-dropdown>
    <el-button size="small" type="primary">
      查看<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <slot />
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'ButtonQueryDropdown'
};
</script>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
</script>
