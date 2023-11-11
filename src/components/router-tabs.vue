<template>
  <div>
    <el-tabs
      :model-value="route.name"
      type="card"
      class="main-router-tabs"
      @edit="handleTabsEdit"
      @tab-click="tabClick"
      @contextmenu="handleContextMenu($event)">
      <el-tab-pane
        v-for="item in data"
        :key="item.index"
        :label="item.name"
        :name="item.index"
        :closable="item.index !== 'dashboard'" />
    </el-tabs>

    <el-tooltip
      ref="tooltipRef"
      :visible="visible"
      effect="light"
      :popper-options="{
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              enabled: false,
            },
          },
        ],
      }"
      :virtual-ref="buttonRef"
      virtual-triggering
      popper-class="singleton-tooltip">
      <template #content>
        <div @mouseleave="visible = false">
          <el-row @click="closeLeft()" v-if="tooltipPaneName !== 'dashboard'">
            <el-text>
              <el-icon><Back /></el-icon>关闭左侧
            </el-text>
          </el-row>
          <el-row @click="closeRight()">
            <el-text>
              <el-icon><Right /></el-icon>关闭右侧
            </el-text>
          </el-row>
          <el-row @click="closeOther()">
            <el-text>
              <el-icon><Close /></el-icon>关闭其他
            </el-text>
          </el-row>
          <el-row @click="closeAll()">
            <el-text>
              <el-icon><CircleCloseFilled /></el-icon>关闭全部
            </el-text>
          </el-row>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Right, Back, CircleCloseFilled, Close } from '@element-plus/icons-vue';
import { getRoute } from '../core/router';

const router = useRouter();
const route = useRoute();
const lastRecords = ref(new Set());

const pushLastRecord = (name) => {
  lastRecords.value.add(name);
};

const initLastRecord = () => {
  lastRecords.value = new Set();
  lastRecords.value.add('dashboard');
};

initLastRecord();
if (route.name !== 'login') {
  lastRecords.value.add(route.name);
}

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    initLastRecord();
  } else {
    pushLastRecord(to.name);
  }
  next();
});

const data = computed(() => {
  let arr = [];
  lastRecords.value.forEach((item) => {
    arr.push({
      index: item,
      name: getRoute(item).meta.name,
    });
  });
  return arr;
});

const getPosition = (name) => {
  for (let index = 0; index < data.value.length; index++) {
    const element = data.value[index];
    if (element.index === name) {
      return index;
    }
  }
};

const tabClick = ({ paneName }) => {
  router.push({ name: paneName });
};

const tooltipPaneName = ref();
const buttonRef = ref();
const tooltipRef = ref();
const visible = ref(false);
const handleContextMenu = (e) => {
  let paneName = e.target.id;
  if (paneName) {
    console.log(e);
    buttonRef.value = e.target;
    visible.value = true;
    tooltipPaneName.value = paneName.replace('tab-', '');
    console.log(tooltipPaneName.value);
    e.preventDefault();
  }
};
const closeLeft = () => {
  let index = getPosition(tooltipPaneName.value);
  router.push({ name: data.value[index].index });
  let arr = data.value.map((item) => item.index);
  arr.slice(1, index).forEach((item) => {
    lastRecords.value.delete(item);
  });
};
const closeRight = () => {
  let index = getPosition(tooltipPaneName.value);
  router.push({ name: data.value[index].index });
  let arr = data.value.map((item) => item.index);
  arr.slice(index + 1, arr.length).forEach((item) => {
    lastRecords.value.delete(item);
  });
};
const closeOther = () => {
  router.push({ name: tooltipPaneName.value });
  initLastRecord();
  lastRecords.value.add(tooltipPaneName.value);
};
const closeAll = () => {
  router.push({ name: 'dashboard' });
  initLastRecord();
};

const handleTabsEdit = (targetName, action) => {
  if (action === 'remove') {
    if (targetName === route.name) {
      let index = getPosition(targetName);
      let lastIndex = data.value.length - 1;
      if (index === lastIndex) {
        router.push({ name: data.value[lastIndex - 1].index });
      } else {
        router.push({ name: data.value[index + 1].index });
      }
    }
    lastRecords.value.delete(targetName);
  }
};
</script>
<style lang="scss">
.el-tabs--card > .el-tabs__header {
  border-top: 1px solid var(--el-border-color-light);
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0 !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0 !important;
  border-top: 0 !important;
  border-left: 0 !important;
}

.singleton-tooltip {
  padding: 5px 0 !important;
  .el-row {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}

.main-router-tabs {
  height: var(--el-tabs-header-height);
}
</style>
