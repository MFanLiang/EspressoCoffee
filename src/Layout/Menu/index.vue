<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  menuList: {
    type: Object,
    required: true,
  },
});

/** 点击菜单进行路由的跳转 */
const goRouterPath = (v: any) => {
  router.push({
    path: v.index,
  });
};
</script>

<script lang="ts">
export default {
  name: 'Menu',
};
</script>

<template>
  <template
    v-for="item in menuList"
    :key="item.path"
  >
    <!-- 判断当前路由是否显示 -->
    <template v-if="!item.children">
      <!-- 没有子路由的情况下 -->
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRouterPath"
      >
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 判断当前路由是否显示 -->
    <template v-if="item.children && item.children.length === 1">
      <!-- 有子路由并且子路由只有一个的情况下 -->
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRouterPath"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由并且子路由大于一个的情况下 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menu-list="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss"></style>
