// 统一管理用户相关接口
import service from '@/utils/request';
import type { loginFormType, loginResponseData, allUserInfoType, userInfo } from './type';

// 定义管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/pointer-info',
}

/** 注册新用户 */
const addNewUser = (data: userInfo) => {
  return service<any, loginResponseData>({
    url: '/user/register',
    method: 'POST',
    data
  });
};

/** 用户登录 */
const reqLogin = (data: loginFormType) => {
  return service<any, loginResponseData>({
    method: 'POST',
    url: API.LOGIN_URL,
    data
  });
};

/** 获取指定用户基本信息 */
const reqUserInfo = (params: string) => {
  return service<any, loginResponseData>({
    method: 'GET',
    url: API.USERINFO_URL,
    params: {
      id: params
    }
  });
};

/** 模糊搜索指定用户 */
const fuzzyquery = (data: any) => {
  return service<any, allUserInfoType>({
    url: '/user/fuzzyquery',
    method: 'POST',
    data,
  })
};

/** 获取所有用户信息 */
const getAllUserInformation = () => {
  return service<any, allUserInfoType>({
    method: 'POST',
    url: '/user/user-all-info',
  })
};

/** 删除指定用户 */
const delPointerUser = (id: string) => {
  return service<any, {
    code: number;
    data: userInfo | null;
    message: string;
  }>({
    method: 'DELETE',
    url: '/user',
    data: {
      id
    }
  })
};

/** 编辑指定用户 */
const editPointerUser = (data: userInfo) => {
  return service<any, {
    code: number;
    data: userInfo | null;
    message: string;
  }>({
    method: 'PUT',
    url: '/user',
    data,
  });
};

export {
  addNewUser,
  reqLogin,
  reqUserInfo,
  getAllUserInformation,
  editPointerUser,
  delPointerUser,
  fuzzyquery
};
