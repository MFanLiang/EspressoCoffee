<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
// @ts-ignore
import type { FormInstance, FormRules } from 'element-plus';
import { addNewUser, editPointerUser } from '@/apis/user/index';

const emits = defineEmits(['userInfoPoperVisible', 'initDataSource']);

const props = defineProps({
  userInfoPopoerVisible: {
    type: Boolean,
    required: true,
  },
  params: {
    type: Object,
    default: {
      title: '标题',
      width: '45%',
      successBtnText: 'Confirm',
      closeBtnText: 'Close',
      isDraggable: true,
      fullscreen: false,
    },
  },
});

const visible = computed({
  get() {
    return props.userInfoPopoerVisible;
  },
  set(value) {
    return value;
  },
});

const dialogEnterParams = computed({
  get() {
    return props.params;
  },
  set(value) {
    return value;
  },
});

const FormDataSource = {
  userName: '',
  password: '',
  userFullName: '',
  userRole: '',
};

const formData = ref(JSON.parse(JSON.stringify(FormDataSource)));

/** 表单控制实例 */
const ruleFormRef = ref();

/** 用户角色下拉枚举值 */
const options = [
  {
    value: '1',
    label: '超级管理员',
  },
  {
    value: '2',
    label: '普通用户',
  },
  {
    value: '3',
    label: '运营用户',
  },
  {
    value: '4',
    label: '访客用户',
  },
  {
    value: '5',
    label: '临时用户',
  },
];

/** 表单的校验规则 */
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
  tel: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
  ],
});

const handleBeforeClose = () => {
  emits('userInfoPoperVisible', false);
  ruleFormRef.value.resetFields();
  formData.value = {};
};

/** 确认按钮点击事件处理函数 */
const handleConfirmBtn = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      switch (props.params.useType) {
        case 'add':
          const res = await addNewUser(formData.value);
          if (res.code === 200) {
            emits('initDataSource');
            handleBeforeClose();
          }
          break;
        case 'edit':
          const res1 = await editPointerUser(formData.value);
          if (res1.code === 200) {
            emits('initDataSource');
            handleBeforeClose();
          }
          break;
        default:
          break;
      }
    }
  });
};

const echoFormData = (type: 'add' | 'edit', row?: any) => {
  if (type === 'edit' && row) {
    formData.value = { ...row };
  }
};

defineExpose({
  echoFormData,
});
</script>

<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="dialogEnterParams.title"
      :width="dialogEnterParams.width"
      :draggable="true"
      :fullscreen="false"
      append-to-body
      :before-close="handleBeforeClose"
      :close="handleBeforeClose"
    >
      <el-form
        ref="ruleFormRef"
        label-width="70px"
        :model="formData"
        :rules="rules"
        label-position="right"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="userName"
              label="姓名"
            >
              <el-input
                v-model="formData.userName"
                placeholder="Please input userName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="password"
              label="密码"
            >
              <el-input
                v-model="formData.password"
                placeholder="Please input password"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="userFullName"
              label="用户全名"
            >
              <el-input
                v-model="formData.userFullName"
                placeholder="Please input userFullName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="userRole"
              label="用户角色"
            >
              <el-select
                style="width: 100%"
                v-model="formData.userRole"
                placeholder="Please select userRole"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="tel"
              label="手机号码"
            >
              <el-input
                v-model="formData.tel"
                placeholder="Please input tel"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="handleConfirmBtn"
          >
            {{ dialogEnterParams.successBtnText }}
          </el-button>
          <el-button @click="handleBeforeClose">
            {{ dialogEnterParams.closeBtnText }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
