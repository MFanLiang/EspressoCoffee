<script setup lang="ts">
import { ref, isRef, unref, customRef } from 'vue';
import type { Ref } from 'vue';
import type { userType } from './type';

// ref 支持所有类型数据

/** 自定义自己的 ref ，名叫 MyRefEspresso，并且有防抖功能 */
function useDebounceRefEspresso<T>(value: T, delay = 300) {
  let timer: any = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newVal) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newVal;
          trigger();
        }, delay);
      },
    };
  });
}

const manRef = ref();
const year: Ref<string | number> = ref('2020');
const man = { name: '舞动青春' };
const divDom = ref<HTMLDivElement>();
const obj: Ref<Partial<userType>> = useDebounceRefEspresso(
  {
    userFullName: '张小武',
    age: 40,
  },
  3000,
);

/** 处理 isRef 的事件回调方法 */
const handleisRef = () => {
  console.log(
    '%c[检查某个值是否为 ref]',
    'background: orange; color: black',
    'isRef(manRef)',
    isRef(manRef),
  );
  console.log(
    '%c[检查某个值是否为 ref]',
    'background: orange; color: black',
    'isRef(man)',
    isRef(man),
  );
};

/** 处理 UnRef 的事件回调方法 */
const handleUnRef = () => {
  const manPar = unref(man);
  const yearPar = unref(year);
  console.log(
    '%c[如果参数是 ref，则返回内部值，否则返回参数本身]',
    'background: orange; color: black',
    'manPar',
    manPar,
  );
  console.log(
    '%c[如果参数是 ref，则返回内部值，否则返回参数本身]',
    'background: orange; color: black',
    'yearPar',
    yearPar,
  );
};

/** 获取 dom 元素 */
const handleGetDom = () => {
  // 在使用时需要注意，要等到 dom 元素渲染完毕之后，才能通过 ref 获取到指定的元素
  console.log(
    '%c[使用ref获取dom元素]',
    'background: orange; color: black',
    'divDom.value?.innerHTML',
    divDom.value?.innerHTML,
  );
};

/** 更改用户 */
const changeObj = () => {
  obj.value = {
    userFullName: '司马战歌',
    age: 90,
  };
};
</script>

<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="8">
        <el-card
          shadow="hover"
          body-class="isRef-style"
        >
          <!-- 标题内容 -->
          <template #header>
            <div class="isRef-style-header">
              <span>isRef的使用</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <div>
              <p>姓名：{{ man.name }}</p>
            </div>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="handleisRef">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          body-class="isRef-style"
        >
          <!-- 标题内容 -->
          <template #header>
            <div class="isRef-style-header">
              <span>unref的使用</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <div>
              <p>姓名：{{ man.name }}</p>
            </div>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="handleUnRef">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          body-class="isRef-style"
        >
          <!-- 标题内容 -->
          <template #header>
            <div class="isRef-style-header">
              <span>ref获取dom元素</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <div>
              <div ref="divDom">今天也是充满元气的一天</div>
            </div>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="handleGetDom">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="8"
      style="margin-top: 10px"
    >
      <el-col :span="8">
        <el-card shadow="hover">
          <!-- 标题内容 -->
          <template #header>
            <div class="isRef-style-header">
              <span>customRef的使用</span>
            </div>
          </template>
          <!-- 主体内容 -->
          <template #default>
            <div>
              <p>
                customRef 自定义一个属于自己的ref，创建一个自定义的
                ref，显式声明对其依赖追踪和更新触发的控制方式。
              </p>
              <br />
              <hr />
              <p>用户全名： {{ obj.userFullName }}</p>
              <br />
              <p>用户年龄： {{ obj.age }}</p>
            </div>
          </template>
          <!-- 页脚内容 -->
          <template #footer>
            <div class="isRef-style-footer">
              <el-button @click="changeObj">更改</el-button>
              <el-button @click="handleGetDom">日志输出</el-button>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
:deep(.isRef-style) {
  height: 40px;
}

.isRef-style-header {
  text-align: center;
}

.isRef-style-footer {
  text-align: right;
}
</style>
