<template>
  <el-button type="primary">
    <el-icon>
      <search />
    </el-icon>
    查询
  </el-button>
</template>

<script>
export default {
  name: 'ButtonQuery'
};
</script>

<script setup>
import { Search } from '@element-plus/icons-vue';
</script>
