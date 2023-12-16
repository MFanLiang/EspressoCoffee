<script setup lang="ts">
// 渲染二级路由组件的出口

import { ref, watch, nextTick } from 'vue';
import useUserStore from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/layout';

const userStore = useUserStore();
const LayOutSettingStore = useLayOutSettingStore();

/** 控制当前组件是否销毁重建 */
const flag = ref<boolean>(true);

watch(
  () => LayOutSettingStore.refresh,
  () => {
    // 监听刷新标识
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div>
    <!-- 使用转场，并对导航进行动画处理 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component
          :is="Component"
          v-if="flag"
        />
      </transition>
    </router-view>

    <el-drawer
      v-model="userStore.userInfoDrawerVisible"
      title="个人信息"
      size="35%"
    >
      <div>个人信息展示</div>
      <p>姓名：{{ userStore.currentUserInfo.userFullName }}</p>
      <p>电话号码：{{ userStore.currentUserInfo.tel }}</p>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
/* 过渡动画的设定代码 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.4s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
