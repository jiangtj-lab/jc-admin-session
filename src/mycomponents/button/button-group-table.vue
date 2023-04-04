<template>
  <div class="button-group-table">
    <slot />
  </div>
</template>

<style lang="scss">
.button-group-table {
  .el-button {
    margin: 0;
    padding: 5px;
  }
  .el-button + .el-button{
    margin-left:5px;
  }
}
</style>
