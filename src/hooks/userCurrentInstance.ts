import { ComponentInternalInstance, getCurrentInstance } from "vue";

/** 获取当前组件内所绑定的全部 refs 实例 */
export default function useCurrentInstance() {
  // vue3 自带可返回当前组件实例对象的函数 getCurrentInstance，通过该函数可获取当前组件内包含的所有绑定的 refs 元素节点
  const pageInstance = getCurrentInstance() as ComponentInternalInstance;
  const pageInstanceAllRefs = pageInstance.refs;
  return {
    pageInstanceAllRefs
  }
};
