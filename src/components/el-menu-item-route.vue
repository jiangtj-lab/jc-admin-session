<template>
  <el-menu-item :index="index" :route="{ name: index }">
    <slot>{{ r.meta.name }}</slot>
  </el-menu-item>
</template>

<script setup>
import { getRoute } from '@/core/router';

const props = defineProps({
  index: {
    type: String,
    required: true,
  },
});

const r = getRoute(props.index);
</script>
