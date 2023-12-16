<script setup lang="ts">
// to系列全家桶 - toRef | toRefs | toRaw
import { toRef, reactive, toRaw } from 'vue';

const man = reactive({
  name: '脏兮兮',
  age: 10,
  likes: '台球',
});

// toRef 只能修改响应式对象的值，非响应式的值所对应的视图不会发生变化

// toRef 接收两个参数，第一个参数为普通对象，第二个参数为对象的 key 值
const ageRef = toRef(man, 'age');

// 手写实现 toRefs 逻辑 (实用场景：解构赋值)
const MytoRefs = <T extends object>(object: T) => {
  const map: any = {};
  for (let key in object) {
    map[key] = toRef(object, key);
  }
  return map;
};

const change = () => {
  man.age = 190;
  console.log('ageRef :>> ', ageRef);
};

let { name, age, likes } = MytoRefs(man);
const handleToRefs = () => {
  name.value = '小脏';
  age.value = 80000;
  likes.value = '咖啡';
  console.log('name :>> ', name);
  console.log('age :>> ', age);
  console.log('likes :>> ', likes);
};

const handleToRaw = () => {
  // toRaw可以将响应式对象还原成普通对象，因此不会数据的改变不会触发视图的修改
  console.log('toRaw(man) :>>>', toRaw(man));
};
</script>

<template>
  <div>
    <p>{{ man }}</p>
    <hr />
    <p>toRefs: {{ name }} -- {{ age }} -- {{ likes }}</p>
    <div>
      <button @click="change">修改</button>
      <button @click="handleToRefs">修改toRefs</button>
      <button @click="handleToRaw">响应对象修改为普通对象</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
