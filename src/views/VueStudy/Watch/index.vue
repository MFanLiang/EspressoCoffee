<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';

const message = ref<string>('查词好，翻译快！');
const message2 = ref<number>(100);

const fly = ref<string>('飞机');
const fly2 = ref<string>('飞机上的水杯');

watch(
  () => [message, message2],
  (newVal, oldVal) => {
    console.log('newVal :>> ', newVal);
    console.log('oldVal :>> ', oldVal);
  },
  {
    deep: true, // 深度监视
    immediate: true, // 立即执行一次
    flush: 'pre', // pre 组件更新之前调用；sync 同步执行；post 组件更新之后执行
  },
);

const stop = watchEffect(async (onCleanup) => {
  onCleanup(() => {
    console.log('before, 清除一些事件');
  });
  console.log(
    '%c[watchEffect非惰性]',
    'background: orange; color: black',
    'fly.value',
    fly.value,
  );
  console.log(
    '%c[watchEffect非惰性]',
    'background: orange; color: black',
    'fly2.value',
    fly2.value,
  );
});

/** 停止监听事件 */
const stopWatchEffect = () => {
  stop();
};

watchEffect(
  async (onCleanup) => {
    onCleanup(() => {
      console.log('before, 清除一些事件');
    });
    const ip: HTMLInputElement = document.querySelector(
      '#ipTion',
    ) as HTMLInputElement;
    console.log('ip :>> ', ip);
  },
  { flush: 'post' },
);
</script>

<template>
  <div>
    <el-card
      style="margin-bottom: 10px"
      shadow="hover"
    >
      <template #header>
        <span class="title1">watch侦听器</span>
      </template>
      <el-input
        v-model="message"
        placeholder="Please input value"
        clearable
      />
      <hr />
      <el-input
        v-model="message2"
        placeholder="Please input value"
        clearable
      />
    </el-card>

    <el-card
      style="margin-bottom: 10px"
      shadow="hover"
    >
      <template #header>
        <span class="title1">watchEffect高级侦听器</span>
      </template>
      <el-input
        id="ipTion"
        v-model="fly"
        placeholder="Please input value"
        clearable
      />
      <hr />
      <el-input
        v-model="fly2"
        placeholder="Please input value"
        clearable
      />
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="stopWatchEffect"
        >
          停止监听
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.btnGroup {
  margin-top: 16px;
  text-align: right;
}
</style>
