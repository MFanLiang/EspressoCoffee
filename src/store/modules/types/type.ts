// 定义仓库数据 state 类型
import type { RouteRecordRaw } from 'vue-router';
import type { userInfo } from '@/apis/user/type';

export interface UserState {
  /** 用户唯一标识 token */
  token: string | null;

  /** 存储生成菜单的路由树 */
  menuRoutes: RouteRecordRaw[];

  /** 登录页面的登录按钮加载态 */
  loginBtnLoading: boolean;

  /** 登录页面的注册按钮加载态 */
  registryBtnLoading: boolean;

  /** 个人信息的抽屉打开和收起 */
  userInfoDrawerVisible: boolean;

  /** 存储当前登录的用户信息 */
  currentUserInfo: userInfo;
}

export interface SettingState {
  /** 控制菜单展开收起切换状态 */
  fold: boolean;

  /** 刷新标识 */
  refresh: boolean;

  /** 系统暗黑模式 */
  sysSettingDrawerVisible: boolean;
}
