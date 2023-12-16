<script setup lang="ts">
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import {
  ArrowRight,
  Refresh,
  FullScreen,
  Setting,
  Plus,
  CirclePlusFilled,
  CirclePlus,
  Check,
  SwitchButton,
} from '@element-plus/icons-vue';
import useUserStore from '@/store/modules/user';
import useLayOutSettingStore from '@/store/modules/layout';
import { useRouter, useRoute } from 'vue-router';
import useLocalStorage from '../../hooks/useLocalStorage';

const { clearLocalStorage } = useLocalStorage();
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const LayOutSettingStore = useLayOutSettingStore();

const sysThemeVisible = ref<boolean>(false);
const color = ref<string>('#1e90ff');
const predefineColors = ref<string[]>([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

/** 点击icon 图标 */
const changeIcon = () => (LayOutSettingStore.fold = !LayOutSettingStore.fold);

/** 刷新按钮函数 */
const handleActionRefresh = () =>
  (LayOutSettingStore.refresh = !LayOutSettingStore.refresh);

/** 全屏按钮函数 */
const fullscreenHandle = () => {
  // DOM 对象的一个属性：用来判断当前页面上的document节点是否为全屏模式 【全屏：true，非全屏：false】
  let fullFlag = document.fullscreenElement;
  if (!fullFlag) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

/** 控制个人信息抽屉展开收起按钮 */
const handleUserInfoDrawerBtn = () => {
  userStore.userInfoDrawerVisible = true;
};

/** 暗黑模式的胶囊的变化开关事件 */
const handleSysDarkModel = (val: boolean) => {
  const htmlDom = document.documentElement;
  val ? (htmlDom.className = 'dark') : (htmlDom.className = '');
  const tabbarDom = document.getElementById('tabbar');
  if (!tabbarDom) return null;
  if (val) {
    LayOutSettingStore.sysSettingDrawerVisible = true;
    tabbarDom.style.background = '#000000';
  } else {
    LayOutSettingStore.sysSettingDrawerVisible = false;
    tabbarDom.style.backgroundImage =
      'linear-gradient(to right, rgb(255, 255, 255), rgb(211, 211, 211), rgb(239, 239, 239), rgb(255, 255, 255))';
  }
};

/** 主题颜色设置 */
const handleColorTheme = (val: string) => {
  const htmlDom = document.documentElement;
  htmlDom.style.setProperty('--el-color-primary', val);
};

/** 登出函数处理 */
const logout = () => {
  clearLocalStorage();
  ElNotification({
    title: '您已退出系统',
    message: `欢迎下次使用`,
    duration: 3 * 1000,
    type: 'success',
  });
  router.push({
    name: 'Login',
  });
  window.location.reload();
};
</script>

<template>
  <div
    class="tabbar"
    id="tabbar"
  >
    <div class="tabbar-left">
      <el-icon
        class="expand-icon"
        @click="changeIcon"
      >
        <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'" />
      </el-icon>

      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in route.matched"
          :key="item.path"
          v-show="item.meta.title"
          :to="item.path"
        >
          <el-icon style="margin: 0 7px 0 0; transform: translate(0px, 2px)">
            <component :is="item.meta.icon" />
          </el-icon>
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar-right">
      <el-button
        :icon="Refresh"
        circle
        @click="handleActionRefresh"
      />
      <el-button
        :icon="FullScreen"
        circle
        @click="fullscreenHandle"
      />

      <el-popover
        :visible="sysThemeVisible"
        placement="bottom"
        title="系统主题设置"
        :width="300"
        trigger="hover"
      >
        <template #reference>
          <el-button
            :icon="Setting"
            circle
            @click="sysThemeVisible = true"
          />
        </template>
        <!-- 表单元素 -->
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              size="small"
              v-model="color"
              show-alpha
              :predefine="predefineColors"
              @change="handleColorTheme"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="LayOutSettingStore.sysSettingDrawerVisible"
              size="small"
              inline-prompt
              active-icon="Sunny"
              inactive-icon="Moon"
              @change="handleSysDarkModel"
            />
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin: 0">
          <el-button
            size="small"
            type="primary"
            @click="sysThemeVisible = false"
          >
            关闭
          </el-button>
        </div>
      </el-popover>

      <el-dropdown trigger="hover">
        <el-avatar
          class="avatar-item"
          :size="35"
          :src="userStore.currentUserInfo.avatar"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              :icon="Plus"
              @click="handleUserInfoDrawerBtn"
            >
              个人信息
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlusFilled">
              Action 2
            </el-dropdown-item>
            <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
            <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
            <el-dropdown-item
              @click="logout"
              :icon="SwitchButton"
              divided
            >
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  background-image: linear-gradient(
    to right,
    rgb(255, 255, 255),
    rgb(211, 211, 211),
    rgb(239, 239, 239),
    rgb(255, 255, 255)
  );
  width: 100%;
  height: 100%;
  display: flex;

  .tabbar-left {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .expand-icon {
      cursor: pointer;
      margin-right: 12px;
    }
  }

  .tabbar-right {
    margin-right: 20px;
    display: flex;
    align-items: center;
    margin-left: auto;

    .avatar-item {
      cursor: pointer;
      margin-left: 20px;
    }
  }
}
</style>
