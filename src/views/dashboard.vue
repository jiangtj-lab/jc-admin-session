<script lang="ts">
import { defineMenu } from '~/utils/views';
import { HomeFilled } from '@element-plus/icons-vue';
export default defineMenu({
  name: '首页',
  index: 'dashboard',
  route: '/',
  icon: HomeFilled
});
</script>

<template>
  <!-- <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <img src="https://wttr.in/杭州_0pq_transparency=200_lang=zh.png">
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <img src="https://wttr.in/嘉兴_0pq_transparency=200_lang=zh.png">
      </el-card>
    </el-col>
              <el-col :span="6">
                <el-card class="box-card">
                  <img src="https://wttr.in/马鞍山_0pq_transparency=200_lang=zh.png">
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="box-card">
                  <img src="https://wttr.in/下沙_0pq_transparency=200_lang=zh.png">
                </el-card>
              </el-col>
            </el-row> -->
  <HelloWorld msg="Hello World" />
</template>

<script setup lang="ts">
import HelloWorld from '@/mycomponents/HelloWorld.vue';
</script>
