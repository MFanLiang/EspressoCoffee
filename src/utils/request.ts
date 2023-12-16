// axios 的二次封装
// 官方网址：https://www.axios-http.cn/
// 顺便再贴上一条掘金的文档 https://juejin.cn/post/7084163923552780319
import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';
import useLocalStorage from '@/hooks/useLocalStorage.ts';

const { getLocalStorage } = useLocalStorage();

/** 创建 axios 请求实例 */
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 基础路径携带 /api 前缀儿
  timeout: 5000, // 请求超时时间
  withCredentials: true, // 允许跨域请求时发送 Cookie
});

// 请求拦截器，处理一些 开始进度条，请求头携带公共参数等场景
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求前做些什么
    const token = getLocalStorage('espresso_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器，处理一些 进度条结束，简化服务器返回的数据，处理 http 网络请求错误等场景
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let message = ''
    const errMsg = error.toJSON();
    if (errMsg) {
      switch (errMsg.status) {
        case 400:
          message = '错误请求';
          break;
        case 401:
          message = '未授权';
          message = error.response?.data?.message || '未授权';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误,未找到该资源';
          break;
        case 405:
          message = '请求方法未允许';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器端出错';
          break;
        case 501:
          message = '网络未实现';
          break;
        case 502:
          message = '网络错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网络超时';
          break;
        case 505:
          message = 'http版本不支持该请求';
          break;
        default:
          message = `连接错误${errMsg.status}`;
      }
    }
    if (message) {
      ElNotification({
        message: message || 'Request Error',
        duration: 3 * 1000,
        type: 'error',
      });
    }
    return Promise.reject(error);
  }
);

export default service;
