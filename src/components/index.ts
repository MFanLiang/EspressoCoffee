// 自定义插件
import SvgIcon from '@/components/SvgIcon/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { App } from 'vue';

// 全局组件存储到对象内
const allGlobalCompoents: any = { SvgIcon };

export default {
  install(app_root: App<Element>) {
    // 自动遍历所有组件并注册为全局组件
    Object.keys(allGlobalCompoents).forEach(key => {
      app_root.component(key, allGlobalCompoents[key])
    });

    // 自动遍历所有图标组件并注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app_root.component(key, component)
    }
  }
}
