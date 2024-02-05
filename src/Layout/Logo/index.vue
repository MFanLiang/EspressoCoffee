<script setup lang="ts">
import settingConfig from '@/setting.ts';
import useLayOutSettingStore from '@/store/modules/layout';
import { useRouter } from 'vue-router';

const router = useRouter();
const LayOutSettingStore = useLayOutSettingStore();
</script>

<template>
  <div class="logo">
    <div
      v-if="settingConfig.logoHidden"
      class="logo-imgbox"
      @click="
        () => {
          router.push({
            path: '/home',
          });
        }
      "
    >
      <img
        :src="settingConfig.logoImg"
        alt=""
      />
    </div>

    <p v-if="!LayOutSettingStore.fold">{{ settingConfig.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  margin-bottom: 10px;
  padding: 10px 0 0 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: $base_menu_logo_height;

  .logo-imgbox {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    cursor: pointer;
    transition: transform 80ms ease-in;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(1.25);
    }

    &:focus {
      outline: none;
    }

    img {
      display: block;
      box-shadow: 0 0 14px rgba(8, 7, 16, 0.6);
      border-radius: 50%;
      animation: App-logo-spin infinite 20s linear;
      width: 100%;
      height: 100%;
    }
  }

  p {
    user-select: none;
    color: #fff;
    font-size: $base_menu_logo_title_fontsize;
    white-space: nowrap;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
