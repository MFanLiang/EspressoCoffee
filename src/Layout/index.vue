<script setup lang="ts">
import { computed } from 'vue';
import Logo from './Logo/index.vue';
import Menu from './Menu/index.vue';
import Main from './Main/index.vue';
import Footer from './Footer/index.vue';
import Tabbar from './Tabbar/index.vue';
import useUseStorage from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/layout';
import settingConfig from '@/setting.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUseStorage();
const LayOutSettingStore = useLayOutSettingStore();

// 获取当前所在的路由地址 path，计算属性
const currentRouterPath = computed(() => router.currentRoute.value.path);
</script>

<template>
  <div class="layout_container">
    <!-- 左侧导航菜单 -->
    <div class="layout_slider" :style="`background: ${settingConfig.backGroundColor}`">
      <Logo />

      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          active-text-color="#ffd04b"
          class="el-menu-vertical-demo"
          text-color="#fff"
          :background-color="settingConfig.backGroundColor"
          :collapse="LayOutSettingStore.fold"
          :default-active="currentRouterPath"
          :unique-opened="false"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold }"
    >
      <Tabbar />
    </div>

    <!-- 内容展示区 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold }"
    >
      <!-- 渲染二级路由组件的入口 -->
      <Main />
    </div>

    <!-- 底部footer -->
    <div
      class="layout_footer"
      :class="{ fold: LayOutSettingStore.fold }"
    >
      <Footer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base_menu_width;
    height: 100vh;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base_menu_logo_height - 20px);

      .el-menu {
        border-right: transparent !important;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0px;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_tabbar_height;
    transition: all 0.3s;
    box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.3);
    z-index: 1;

    &.fold {
      width: calc(100vw - $base_menu_min_width);
      left: $base_menu_min_width;
    }
  }

  .layout_main {
    position: absolute;
    top: $base_tabbar_height;
    left: $base_menu_width;
    box-sizing: border-box;
    padding: 10px;
    overflow: auto;
    width: calc(100% - $base_menu_width);
    height: calc(100vh - $base_tabbar_height - $base_footer_height);
    transition: all 0.3s;
    background-color: #fff;

    &.fold {
      width: calc(100vw - $base_menu_min_width);
      left: $base_menu_min_width;
    }

    &::-webkit-scrollbar-track {
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #f90;
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
      );
    }
  }

  .layout_footer {
    position: absolute;
    bottom: 0px;
    left: $base_menu_width;
    width: calc(100% - $base_menu_width);
    height: $base_footer_height;

    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base_menu_min_width);
      left: $base_menu_min_width;
    }
  }
}
</style>
