<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import type { userInfoType, DataType } from './type';

const formData = reactive<userInfoType>({
  firstName: '张',
  lastName: '小武',
});

const formDataSource = reactive<userInfoType>({
  firstName: '陆',
  lastName: '飞',
});

const keyword = ref<string>('');

const searchData = computed(() => {
  return data.filter((os: DataType) => {
    return os.name.includes(keyword.value);
  });
});

// 选项式写法
const userFullName = computed<string>({
  get() {
    return formData.firstName + ' - ' + formData.lastName;
  },
  set(newVal) {
    [formData.firstName, formData.lastName] = newVal.split('-');
  },
});

// 函数式写法
const userFullNameTwo = computed<string>(
  () => formDataSource.firstName + '-' + formDataSource.lastName,
);

/** 修改姓名的函数实体 */
const handleUserInfo = () => {
  userFullName.value = '司马-战歌';
};

const handleUserInfoTwo = () => {
  formDataSource.firstName = '王';
  formDataSource.lastName = '小湖';
};

const data = reactive<DataType[]>([
  {
    id: '0',
    name: '咖啡',
    price: 100,
    num: 50,
  },
  {
    id: '1',
    name: '滤纸',
    price: 1400,
    num: 10,
  },
  {
    id: '2',
    name: '温度计',
    price: 500,
    num: 90,
  },
]);

const total = computed(() => {
  return data.reduce((prev, next) => {
    return prev + next.num * next.price;
  }, 0);
});

const handleDecrement = (row: DataType) => {
  if (row.num > 0) {
    row.num--;
  } else {
    return null;
  }
};

const handleIncrement = (row: DataType) => {
  if (row.num < 100) {
    row.num++;
  } else {
    return null;
  }
};

const handleDelDataItem = (index: number) => data.splice(index, 1);
</script>

<template>
  <div>
    <el-card
      style="margin-bottom: 10px"
      shadow="hover"
    >
      <template #header>
        <span class="title1">概念</span>
      </template>
      Computed计算属性：当依赖的属性的值发生变化时，才会触发它的更新，如果依赖的值未变化，使用的是缓存中的属性值。
    </el-card>

    <el-card
      shadow="hover"
      style="margin-bottom: 10px"
    >
      <template #header>
        <span class="title2">选项式写法</span>
      </template>
      <el-form
        v-model="formData"
        label-width="70px"
        label-position="right"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item
              prop="age"
              label="姓"
            >
              <el-input
                v-model="formData.firstName"
                placeholder="Please input FirstName"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              prop="age"
              label="名"
            >
              <el-input
                v-model="formData.lastName"
                placeholder="Please input LastName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item
              prop="age"
              label="全名"
            >
              <el-input
                v-model="userFullName"
                placeholder="Please input userFullName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="handleUserInfo"
        >
          修改姓名
        </el-button>
      </div>
    </el-card>

    <el-card
      shadow="hover"
      style="margin-bottom: 10px"
    >
      <template #header>
        <span class="title2">函数式写法</span>
      </template>
      <el-form
        v-model="formDataSource"
        label-width="70px"
        label-position="right"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item
              prop="age"
              label="姓"
            >
              <el-input
                v-model="formDataSource.firstName"
                placeholder="Please input FirstName"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              prop="age"
              label="名"
            >
              <el-input
                v-model="formDataSource.lastName"
                placeholder="Please input LastName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item
              prop="age"
              label="全名"
            >
              <el-input
                v-model="userFullNameTwo"
                placeholder="Please input userFullName"
                autocomplete="off"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="handleUserInfoTwo"
        >
          修改姓名
        </el-button>
      </div>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span class="title2">计算属性案例</span>
      </template>
      <el-input
        v-model="keyword"
        placeholder="Please input search value"
        clearable
      />
      <div style="margin-top: 20px">
        <table
          border
          width="500"
          cellpadding="0"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>物品名称</th>
              <th>物品单价</th>
              <th>物品数量</th>
              <th>物品总价</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in searchData"
              :key="item.id"
            >
              <td align="center">{{ item.name }}</td>
              <td align="center">{{ item.price }}</td>
              <td align="center">
                <el-button
                  type="success"
                  size="small"
                  :icon="Minus"
                  circle
                  @click="() => handleDecrement(item)"
                />
                {{ item.num }}
                <el-button
                  type="success"
                  size="small"
                  :icon="Plus"
                  circle
                  @click="() => handleIncrement(item)"
                />
              </td>
              <td align="center">{{ item.num * item.price }}</td>
              <td align="center">
                <el-button
                  type="danger"
                  round
                  @click="() => handleDelDataItem(index)"
                >
                  删除
                </el-button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                colspan="5"
                align="right"
              >
                总价：{{ total }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.title1 {
  text-align: center;
  padding: 5px;
  display: block;
  background-color: #888;
  font-size: 18px;
  width: 130px;
  color: #ccc;
  text-shadow:
    -1px -1px #fff,
    1px 1px #333;
  border-radius: 16px;
}

.title2 {
  text-align: center;
  padding: 5px;
  display: block;
  background-color: #888;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 18px;
  width: 130px;
  color: #666;
  text-shadow:
    0px 0px #000,
    -1px -1px #333,
    0px 0px #fff,
    1px 1px #eee;
  border-radius: 16px;
}

.btnGroup {
  text-align: right;
}
</style>
