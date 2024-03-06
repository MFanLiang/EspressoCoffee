<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { getInvoiceList } from '@/apis/coffeeList';
import type { coffeeItem } from '@/apis/coffeeList/type';
import type { paginationType } from './type.ts';

/** 表格数据源 */
const tableData = ref<coffeeItem[] | []>([]);

const paginationConfig = ref<paginationType>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const indexMethod = (index: number) => {
  return index + 1;
};

const addNewCoffee = () => {};

const handleSelectionChange = (val: coffeeItem[]) => {
  console.log('val :>> ', val);
};

const initData = async () => {
  try {
    const res = await getInvoiceList();
    if (res.code === 200) {
      tableData.value = res.data;
      paginationConfig.value = {
        currentPage: res.currentPage,
        pageSize: res.pageSize,
        total: res.total,
      };
    }
  } catch (err) {
    if (err) {
      console.log('err :>> ', err);
    }
  }
};

onMounted(() => {
  initData();
});
</script>

<template>
  <div>
    <el-card :body-style="{ padding: '12px', height: 'calc(100vh - 146px)' }">
      <div class="btn_action">
        <el-button
          type="primary"
          :icon="Plus"
          @click="addNewCoffee"
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
            prop="name"
            label="咖啡具名称"
            align="center"
            width="100"
          />
          <el-table-column
            prop="color"
            label="颜色"
            align="center"
            width="180"
          />
          <el-table-column
            prop="count"
            label="数量"
            align="center"
            width="100"
          />
          <el-table-column
            prop="price"
            label="价格"
            align="center"
            width="140"
          />
          <el-table-column
            prop="description"
            label="描述信息"
            align="center"
            width="180"
          />
          <el-table-column
            prop="类型"
            label="type"
            width="180"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isFlush"
            label="是否需要冲洗"
            width="220"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isHot"
            label="是否会变热"
            width="220"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            label="Operations"
            width="220"
            fixed="right"
          >
            <template #default="scope">
              <!-- @click="handleClick" -->
              <el-button
                link
                type="primary"
                size="small"
              >
                查看
              </el-button>
               <!-- @click="handleEditUser(scope.$index, scope.row)" -->
              <el-button
                link
                type="primary"
                size="small"
              >
                编辑
              </el-button>
              <!--  @click="handleDeleteUser(scope.$index, scope.row)" -->
              <el-button
                link
                type="danger"
                size="small"
                :disabled="scope.row.userRole === 1"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--  @size-change="handleSizeChange" -->
        <!-- @current-change="handleCurrentChange" -->
        <el-pagination
          v-model:current-page="paginationConfig.currentPage"
          v-model:page-size="paginationConfig.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          :disabled="false"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationConfig.total"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.btn_action {
  text-align: right;
  margin-bottom: 10px;
}
</style>
