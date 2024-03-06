import useLocalStorage from '@/hooks/useLocalStorage.ts';
import { reqUserInfo } from '@/apis/user';
import NProgress from 'nprogress';
import setting from '@/setting.ts';
import type { Router } from 'vue-router';

const { getLocalStorage, clearLocalStorage } = useLocalStorage();;

/** 用户登录的路由前置守卫配置 */
export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    document.title = `${setting.labelTitle} - ${to.meta.title}`;
    NProgress.start();

    const jwt = getLocalStorage('espresso_token');

    if (jwt) {
      if (Object.keys(from.query).length === 0) {
        next();
      } else {
        // 如果来源路由有query
        if (to.fullPath === from.query.redirect) { // 为了防止路由循环重定向问题
          next();
        } else {
          // 跳转到目的路由
          // @ts-ignore
          next({ path: from.query.redirect, replace: true });
        }
      }

      const { id } = JSON.parse(getLocalStorage('user_info'));
      if (id) {
        try {
          await reqUserInfo(id);
        } catch (error) {
          // token 过期
          // 用户手动修改本地token
          // 此时强制清空本地的所有存储，让系统主动刷新已完成退出到登录页面的操作
          clearLocalStorage();
          next({ path: '/login', query: { redirect: to.path } });
          setTimeout(() => { window.location.reload() }, 1500);
        }
      }
    } else {
      if (to.path === '/login') {
        next();
        return;
      }
      next({ path: '/login', query: { redirect: to.path } })
    }

  });

  router.afterEach(async () => {
    NProgress.done();
  });
};

// 路由鉴权
// 用户未登录情况：可以访问login，其他页面不能访问
// 用户登录成功情况：不可以访问login，其他页正常业务页面可以访问
