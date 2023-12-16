<script setup lang="ts">
import { reactive } from 'vue';
import type { listItemType } from './type';
import { getInvoiceList } from '@/apis/coffeeList';

// reactive 只支持对象类型 ， type --> object
const userInfo = reactive({
  meta: {
    name: '路飞',
    age: 100,
  },
});

// react proxy 不能直接复制 否则会破坏响应式对象
// 解决方案：数组 --> 使用push + 解构，添加一个对象，把数组作为一个属性去解决
const list = reactive<listItemType[]>([]);
const list2 = reactive<{ arrs: listItemType[] }>({
  arrs: [],
});

const handleUserInfo = () => {
  userInfo.meta = {
    name: 'tom',
    age: 400,
  };
};

const outLog = () => {
  console.log(
    '%c[日志输出]',
    'background: orange; color: black',
    'userInfo :>> ',
    userInfo,
  );
};

const handleAdd = () => {
  // list.push('234')
};

const handleAddAsync = async () => {
  const responseData = await getInvoiceList();
  list.push(...responseData.data);
};

const handleAddAsync2 = async () => {
  const responseData = await getInvoiceList();
  list2.arrs = responseData.data;
};
</script>

<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8">
        <el-card shadow="hover">
          <!-- 标题内容 -->
          <template #header>
            <div>
              <span>reactive存储对象结构数据</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <el-form
              label-width="70px"
              :model="userInfo.meta"
              label-position="right"
            >
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item
                    prop="name"
                    label="姓名"
                  >
                    <el-input
                      v-model="userInfo.meta.name"
                      placeholder="Please input name"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item
                    prop="age"
                    label="年龄"
                  >
                    <el-input
                      v-model="userInfo.meta.age"
                      placeholder="Please input age"
                      autocomplete="off"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="handleUserInfo">更改</el-button>
              <el-button @click="outLog">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <!-- 标题内容 -->
          <template #header>
            <div>
              <span>reactive存储数组结构数据</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <div
              v-for="item in list"
              :key="item.espresso_id"
            >
              <p>{{ item.name }}</p>
            </div>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="handleAdd">新增</el-button>
              <el-button @click="handleAddAsync">新增(异步写法1)</el-button>
              <el-button @click="handleAddAsync2">新增(异步写法2)</el-button>
              <el-button @click="() => {}">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
