<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
// @ts-ignore
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { Eleme } from '@element-plus/icons-vue';
import { addNewUser, editPointerUser } from '@/apis/user/index';
import type { userSelectType } from '../type';

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
  username: '',
  password: '',
  userFullName: '',
  userRole: '',
};

const btnLoading = ref<boolean>(false);

const formData = ref(JSON.parse(JSON.stringify(FormDataSource)));

/** 表单控制实例 */
const ruleFormRef = ref();

/** 用户角色下拉枚举值 */
const options = ref<userSelectType[]>([
  {
    value: 1,
    label: '超级管理员',
    disabled: false,
  },
  {
    value: 2,
    label: '普通用户',
    disabled: false,
  },
  {
    value: 3,
    label: '运营用户',
    disabled: false,
  },
  {
    value: 4,
    label: '访客用户',
    disabled: false,
  },
  {
    value: 5,
    label: '临时用户',
    disabled: false,
  },
]);

/** 表单的校验规则 */
const rules = reactive({
  username: [
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
  btnLoading.value = false;
};

/** 确认按钮点击事件处理函数 */
const handleConfirmBtn = () => {
  btnLoading.value = true;
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid: any) => {
    if (valid) {
      switch (props.params.useType) {
        case 'add':
          const res = await addNewUser(formData.value);
          if (res.code === 200) {
            emits('initDataSource');
            ElMessage({
              message: `新用户 ${formData.value.username} 创建成功`,
              type: 'success',
            });
            handleBeforeClose();
          }
          break;
        case 'edit':
          const res1 = await editPointerUser(formData.value);
          if (res1.code === 200) {
            emits('initDataSource');
            ElMessage({
              message: `用户 ${formData.value.username} 修改成功`,
              type: 'success',
            });
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
    // 在此处，如果编辑的是普通用户，则把用户角色下拉枚举值的管理员选项禁用调用，不允许选择
    options.value = options.value?.map((item: userSelectType) => {
      if (item.value === 1) {
        return {
          ...item,
          disabled: row.userRole !== 1,
        };
      } else {
        return { ...item };
      }
    });
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
        label-width="auto"
        :model="formData"
        :rules="rules"
        label-position="right"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              prop="username"
              label="姓名"
            >
              <el-input
                v-model="formData.username"
                placeholder="Please input username"
                autocomplete="off"
                clearable
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
                clearable
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="props.params.useType === 'add'"
          >
            <el-form-item
              prop="password"
              label="密码"
            >
              <el-input
                v-model="formData.password"
                placeholder="Please input password"
                autocomplete="off"
                show-password
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="userFullName"
              label="用户全名"
            >
              <el-input
                v-model="formData.userFullName"
                placeholder="Please input userFullName"
                autocomplete="off"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              prop="tel"
              label="手机号码"
            >
              <el-input
                :formatter="
                  (value: string) => value.replace(/^\.+|[^\d.]/g, '')
                "
                v-model="formData.tel"
                placeholder="Please input tel"
                autocomplete="off"
                clearable
                :maxlength="11"
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
            :loading-icon="Eleme"
            :loading="btnLoading"
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
