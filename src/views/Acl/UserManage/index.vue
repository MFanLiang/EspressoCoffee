<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  Search,
  RefreshLeft,
  Plus,
  Delete,
  Picture as IconPicture,
} from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import UserInfoPoper from './components/UserInfoPoper.vue';
import { ElMessage } from 'element-plus';
import type { PropsType } from '@/components/BaseDialog/type';
import {
  getAllUserInformation,
  fuzzyquery,
  delPointerUser,
  editPointerUser,
} from '@/apis/user/index';
import type { userInfo } from '@/apis/user/type';
import type { paginationType } from './type.ts';

const params = ref<Partial<PropsType>>({});

/** 对话框是否开启 */
const userInfoPopoerVisible = ref<boolean>(false);

/** 表格数据源 */
const tableData = ref<userInfo[] | []>();
const loading = ref<boolean>(true);

/** 用户新增/编辑 对话框实例 */
const uesrInfoPoper = ref();

const paginationConfig = ref<paginationType>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const indexMethod = (index: number) => {
  return index + 1;
};

/** 高级搜索表单 */
const searchFormData = ref<{ username: string }>({
  username: '',
});

const searchSingleUser = async () => {
  // 调用模糊搜索接口
  const rs = await fuzzyquery({ search: searchFormData.value.username });
  if (rs.code === 200) {
    tableData.value = rs.data as any;
  }
};

const handleReset = async () => {
  searchFormData.value = { username: '' };
  await initDataSource();
};

const handleClose = (dark: boolean) => {
  userInfoPopoerVisible.value = dark;
};

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

/** 用户权限tag颜色 */
const userRoleTypeTag = (val: number) => {
  switch (val) {
    case 1:
      return '';
    case 2:
      return 'success';
    case 3:
      return 'success';
    case 4:
      return 'danger';
    case 5:
      return 'warning';
    default:
      return '';
  }
};

/** 用户角色下拉枚举值 */
const options: any = {
  1: {
    value: 1,
    label: '超级管理员',
    disabled: false,
  },
  2: {
    value: 2,
    label: '普通用户',
    disabled: false,
  },
  3: {
    value: 3,
    label: '运营用户',
    disabled: false,
  },
  4: {
    value: 4,
    label: '访客用户',
    disabled: false,
  },
  5: {
    value: 5,
    label: '临时用户',
    disabled: false,
  },
};

/** 添加新用户 */
const addNewUser = () => {
  if (uesrInfoPoper.value) {
    uesrInfoPoper.value?.echoFormData('add');
  }
  userInfoPopoerVisible.value = true;
  params.value = {
    title: '新增用户',
    width: '60%',
    successBtnText: '确认',
    closeBtnText: '取消',
    isDraggable: true,
    fullscreen: false,
    useType: 'add',
  };
};

/** 编辑指定用户项 */
const handleEditUser = (_index: number, row: userInfo) => {
  if (uesrInfoPoper.value) {
    uesrInfoPoper.value?.echoFormData('edit', row);
  }
  userInfoPopoerVisible.value = true;
  params.value = {
    title: '编辑用户',
    width: '60%',
    successBtnText: '确认',
    closeBtnText: '取消',
    isDraggable: true,
    fullscreen: false,
    useType: 'edit',
  };
};

const handleDeleteUser = async (_index: number, row: userInfo) => {
  const res = await delPointerUser(row.id);
  if (res.code === 200) {
    initDataSource();
    ElMessage({
      message: `用户【 ${row.username} 】删除成功`,
      type: 'success',
    });
  }
};

const switchStatus = async (_val: boolean, row: userInfo) => {
  await editPointerUser(row)
    .then((res) => {
      if (res.code === 200) {
        ElMessage({
          message: `用户【 ${row.username} 】已${_val ? '启用' : '禁用'}`,
          type: 'success',
        });
      }
    })
    .catch((err: Error) => {
      console.log('err :>> ', err);
      ElMessage({
        message: `${err || '网络异常，请稍后再试'}`,
        type: 'error',
      });
    });
};

const handleSelectionChange = (val: userInfo[]) => {
  console.log('val :>> ', val);
};

const handleClick = () => {};

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

const initDataSource = async () => {
  loading.value = true;
  try {
    const res = await getAllUserInformation();
    tableData.value = res.data;
    paginationConfig.value = {
      currentPage: res.currentPage,
      pageSize: res.pageSize,
      total: res.total,
    };
    loading.value = false;
  } catch (err) {
    if (err) {
      console.log('err :>> ', err);
      ElMessage({
        message: `网络异常，请稍后再试`,
        type: 'error',
      });
      loading.value = false;
    }
  }
};

onMounted(() => {
  initDataSource();
});
</script>

<template>
  <div>
    <el-card :body-style="{ padding: '16px 0px 0px 33px', height: '50px' }">
      <el-form
        :inline="true"
        class="form_inline"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="searchFormData.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :icon="Search"
            @click="searchSingleUser"
          >
            Search
          </el-button>
          <el-button
            plain
            :icon="RefreshLeft"
            @click="handleReset"
          >
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card
      style="margin-top: 10px"
      :body-style="{ padding: '12px', height: 'calc(100vh - 225px)' }"
    >
      <div class="btn_action">
        <el-button
          type="primary"
          :icon="Plus"
          @click="addNewUser"
        >
          Add
        </el-button>
        <el-button
          plain
          type="danger"
          :icon="Delete"
        >
          BatchDel
        </el-button>
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: end;
          flex-direction: column;
          height: 93%;
          gap: 15px;
        "
      >
        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="Loading..."
          :element-loading-spinner="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          element-loading-background="rgba(122, 122, 122, 0.5)"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          />
          <el-table-column
            fixed
            type="index"
            label="序号"
            width="70"
            align="center"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="用户姓名"
            align="center"
            width="140"
          />
          <el-table-column
            prop="userFullName"
            label="用户全名"
            align="center"
            width="180"
          />
          <el-table-column
            prop="userRole"
            label="用户角色"
            align="center"
            width="200"
          >
            <template #default="scope">
              <el-tag
                effect="dark"
                :type="userRoleTypeTag(scope.row.userRole)"
                disable-transitions
              >
                {{ options[scope.row.userRole]?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="用户状态"
            align="center"
            width="180"
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                :disabled="scope.row.userRole === 1"
                active-text="启用"
                inactive-text="禁用"
                inline-prompt
                style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                "
                @change="(status: boolean) => switchStatus(status, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="用户头像"
            align="center"
            width="200"
          >
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <el-image
                  style="width: 50px; height: 50px; border-radius: 5px"
                  :src="scope.row.avatar"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[scope.row.avatar]"
                  :initial-index="4"
                  fit="cover"
                  preview-teleported
                >
                  <template #error>
                    <div class="image-slot">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="tel"
            label="手机号码"
            align="center"
            width="220"
          />
          <el-table-column
            prop="createDate"
            label="创建时间"
            width="180"
            align="center"
          >
            <template #default="scope">
              <span>
                {{
                  scope.row.createDate
                    ? dayjs(scope.row.createDate).format('YYYY-MM-DD HH:mm:ss')
                    : '-'
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Operations"
            width="220"
            fixed="right"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleClick"
              >
                分配角色
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="handleEditUser(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                link
                type="danger"
                size="small"
                @click="handleDeleteUser(scope.$index, scope.row)"
                :disabled="scope.row.userRole === 1"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="paginationConfig.currentPage"
          v-model:page-size="paginationConfig.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          :disabled="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConfig.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <UserInfoPoper
      ref="uesrInfoPoper"
      :userInfoPopoerVisible="userInfoPopoerVisible"
      :params="params"
      @userInfoPoperVisible="handleClose"
      @initDataSource="initDataSource"
    />
  </div>
</template>

<style scoped lang="scss">
.form_inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn_action {
  text-align: right;
  margin-bottom: 10px;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
</style>
