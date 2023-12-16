<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(['dialogSuccess', 'dialogClose']);
const props = defineProps({
  dialogEnterParams: {
    type: Object,
    default() {
      return {};
    },
  },
});

const visible = computed({
  get() {
    return props.dialogEnterParams.visible;
  },
  set(value) {
    return value;
  },
});
</script>

<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="dialogEnterParams.title"
      :width="dialogEnterParams.width"
      :draggable="dialogEnterParams.isDraggable"
      :fullscreen="dialogEnterParams.fullscreen"
    >
      <slot name="render-body"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="() => emits('dialogClose')">
            {{ dialogEnterParams.closeBtnText }}
          </el-button>
          <el-button
            type="primary"
            @click="() => emits('dialogSuccess')"
          >
            {{ dialogEnterParams.successBtnText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="css"></style>
