<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  iconName: {
    type: String,
    default: 'vue',
  },
  iconColor: {
    type: String,
    default: '',
  },
  customStyle: {
    type: Object,
    default: {
      width: '16px',
      height: '16px',
    },
  },
});
</script>

<template>
  <svg :style="{ ...customStyle }">
    <use
      :xlink:href="prefix + iconName"
      :fill="iconColor"
    ></use>
  </svg>
</template>

<style scoped lang="less"></style>
