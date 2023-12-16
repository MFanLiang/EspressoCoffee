import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// 引入模版全局样式表
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from './App.vue'
// svg 插件所需要配置的代码
import 'virtual:svg-icons-register'
import GlobalComponents from '@/components/index'
import Particles from "particles.vue3";

// 创建应用唯一根实例
const app_root = createApp(App);

// 创建 pinia 数据状态管理库的实例
const pinia = createPinia();

// 注册路由
app_root.use(router)

// 注册 pinia 实例
app_root.use(pinia)

app_root.use(ElementPlus, {
  locale: zhCn,
});

// 注册粒子图插件
app_root.use(Particles);

// 注册并安装自定义插件，使用 use 注册后，即刻调用运行自定义插件内的 install 函数并安装
app_root.use(GlobalComponents);

// 挂载应用唯一根实例到 #app 所在 dom 节点下
app_root.mount('#app')
