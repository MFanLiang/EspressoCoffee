import type { Router } from 'vue-router';
import setupUserLoginInfoGuard from './userLoginInfo';

/** 创建路由守位防护 */
const createRouteGuard = (router: Router) => {
  setupUserLoginInfoGuard(router);
};

export default createRouteGuard;
