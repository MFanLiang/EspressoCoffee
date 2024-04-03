/** 用户相关的数据仓库 */

import { defineStore } from 'pinia';
import { reqLogin, addNewUser } from '@/apis/user/index';
import constantRoute from '@/router/routes';
import useLocalStorage from '@/hooks/useLocalStorage.ts';
import type { loginFormType, registryInfoType } from '@/apis/user/type';
import type { UserState } from './types/type';

const { setLocalStorage, getLocalStorage } = useLocalStorage();

const useUserStore = defineStore("user", {
  // 数据
  state: (): UserState => {
    return {
      token: getLocalStorage('espresso_token'),
      menuRoutes: constantRoute,
      loginBtnLoading: false,
      registryBtnLoading: false,
      userInfoDrawerVisible: false,
      currentUserInfo: getLocalStorage('user_info') && JSON.parse(getLocalStorage('user_info')),
    }
  },

  // 异步方法
  actions: {
    /** 用户登录的方法实例 */
    async userLogin(data: loginFormType) {
      this.loginBtnLoading = true;
      const { username, password } = data;
      return await new Promise((resolve, reject) => {
        reqLogin({ username, password }).then((response) => {
          if (response.code === 200) {
            this.currentUserInfo = response.data;
            this.token = response.token || '';
            // 本地存储持久化
            setLocalStorage('espresso_token', response.token || '');
            setLocalStorage('user_info', JSON.stringify(response.data));
            this.loginBtnLoading = false;
            return resolve(response.data);
          } else {
            this.loginBtnLoading = false;
            return reject(response.message);
          }
        })
      });
    },

    /** 用户注册的方法实例 */
    async userRegistryAction(data: registryInfoType) {
      this.registryBtnLoading = true;
      return await new Promise((resolve, reject) => {
        addNewUser({ ...data }).then((response) => {
          if (response.code === 200) {
            this.registryBtnLoading = false;
            return resolve(response.data);
          } else {
            this.registryBtnLoading = false;
            return reject(response.message);
          }
        })
      })
    }
  },

  getters: {}
});

export default useUserStore;
