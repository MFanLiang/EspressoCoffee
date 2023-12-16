<script setup lang="ts">
import { watch } from 'vue';
import settingConfig from '@/setting.ts';
import useLayOutSettingStore from '@/store/modules/layout';

const LayOutSettingStore = useLayOutSettingStore();

const changeFooterBoxStyle = (flag) => {
  const footerDom = document.getElementById('footer_box');
  if (!footerDom) return null;
  if (flag) {
    footerDom.style.backgroundColor = '#000000';
  } else {
    footerDom.style.backgroundColor = '#e4e4e4';
  }
};

watch(
  () => LayOutSettingStore.sysSettingDrawerVisible,
  (val) => {
    changeFooterBoxStyle(val);
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div
    class="footer_box"
    id="footer_box"
  >
    <div>{{ settingConfig.footerCopyright }}</div>
  </div>
</template>

<style scoped lang="scss">
.footer_box {
  background-color: #e4e4e4;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
