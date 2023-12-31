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
  reqUserInfo,
  delPointerUser,
} from '@/apis/user/index';
import { userInfo } from '@/apis/user/type';
import type { paginationType } from './type.ts';

const params = ref<Partial<PropsType>>({});

/** 对话框是否开启 */
const userInfoPopoerVisible = ref<boolean>(false);

/** 表格数据源 */
const tableData = ref<userInfo[] | []>([]);

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
const searchFormData = ref<{ userName: string }>({
  userName: '',
});

const searchSingleUser = async () => {
  const rs = await reqUserInfo(searchFormData.value.userName);
  if (rs.code === 200) {
    tableData.value = rs.data;
  }
};

const handleReset = async () => {
  searchFormData.value = { userName: '' };
  await initDataSource();
};

const handleClose = (dark: boolean) => {
  userInfoPopoerVisible.value = dark;
};

/** 添加新用户 */
const addNewUser = () => {
  if (uesrInfoPoper.value) {
    uesrInfoPoper.value?.echoFormData('add');
  }
  userInfoPopoerVisible.value = true;
  params.value = {
    title: '新增用户',
    width: '45%',
    successBtnText: '确认',
    closeBtnText: '取消',
    isDraggable: true,
    fullscreen: false,
    useType: 'add'
  };
};

/** 编辑指定用户项 */
const handleEditUser = (index, row) => {
  if (uesrInfoPoper.value) {
    uesrInfoPoper.value?.echoFormData('edit', row);
  }
  userInfoPopoerVisible.value = true;
  params.value = {
    title: '编辑用户',
    width: '45%',
    successBtnText: '确认',
    closeBtnText: '取消',
    isDraggable: true,
    fullscreen: false,
    useType: 'edit'
  };
};

const handleDeleteUser = async (index, row) => {
  const res = await delPointerUser(row.id);
  if (res.code === 200) {
    initDataSource();
    ElMessage({
      message: `用户【 ${row.userName} 】删除成功`,
      type: 'success',
    });
  }
};

const handleSelectionChange = (val: userInfo[]) => {
  console.log('val :>> ', val);
};

const handleClick = () => {};

const handleSizeChange = () => {};

const handleCurrentChange = () => {};

const initDataSource = async () => {
  try {
    const res = await getAllUserInformation();
    tableData.value = res.data;
    paginationConfig.value = {
      currentPage: res.currentPage,
      pageSize: res.pageSize,
      total: res.total,
    };
  } catch (err) {
    if (err) {
      console.log('err :>> ', err);
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
            v-model="searchFormData.userName"
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
      :body-style="{ padding: '12px' }"
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
      <div>
        <el-table
          :data="tableData"
          stripe
          :height="540"
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
            prop="userName"
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
          />
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
