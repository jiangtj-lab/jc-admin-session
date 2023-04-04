<template>
  <el-form class="query-form" :inline="true" label-position="right">
    <el-row justify="space-between">
      <div>
        <slot />
      </div>
      <div>
        <slot name="end" />
      </div>
    </el-row>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'QueryForm'
});
</script>

<style lang="scss">
.query-form {
  .el-button {
    margin-bottom: 22px;
  }
}
</style>
