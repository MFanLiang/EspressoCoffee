import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import createRouteGuard from './guard';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress Configuration
NProgress.configure({ easing: 'ease', speed: 1500, showSpinner: false });

// 定义路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,

  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
});

// 加载路由首位防护能力
createRouteGuard(router);

export default router;
