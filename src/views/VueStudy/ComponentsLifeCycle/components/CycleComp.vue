<!-- 生命周期组件示例 -->
<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

const imgBoxDom = ref<HTMLDivElement>();

// beforeCreate created 在 setup 语法糖中没有这两个生命周期，在 vue3 中被 setup 替代掉

console.log('setup');

// 创建
onBeforeMount(() => {
  console.log('创建之前 ===', imgBoxDom.value);
});

onMounted(() => {
  console.log('创建完成 ===', imgBoxDom.value);
});

// 更新钩子
onBeforeUpdate(() => {
  console.log('更新之前 ===');
});

onUpdated(() => {
  console.log('更新完成 ===');
});

// 销毁钩子
onBeforeUnmount(() => {
  console.log('销毁之前 ===');
});

onUnmounted(() => {
  console.log('销毁完成 ===');
});
</script>

<template>
  <div>
    我只是负责渲染组件生命周期的示例组件
    <div
      class="imgBox"
      ref="imgBoxDom"
    >
      <img
        class="imgPic"
        src="@/assets/images/login_bgc.jpg"
        alt="图片未展示出来哦"
      />
    </div>
    <div class="xm-test">
      梭镖寺佛啊跑
      <div class="xm-test__inner">element元素文案</div>
      <button class="xm-test--danger">危险</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.imgBox {
  margin-top: 15px;
  margin-bottom: 30px;
  width: 120px;
  height: 120px;

  .imgPic {
    width: 100%;
    height: 100%;
  }
}

@include block(test) {
  color: orange;
  @include ele(inner) {
    margin: 10px 0;
    color: skyblue;
  }

  @include mod(danger) {
    color: red;
    font-size: 18px;
    width: 90px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: skyblue;
    cursor: pointer;
    transition: all ease-in 0.1s;
    &:active {
      transform: scale(0.89);
    }
  }
}
</style>
