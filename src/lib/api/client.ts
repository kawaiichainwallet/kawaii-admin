import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { toast } from 'sonner';
import type { ApiResponse } from '@/lib/types/api';

/**
 * API基础URL - 通过网关访问
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8090';

/**
 * 创建axios实例
 */
export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/kawaii-admin`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器 - 自动添加Token
 */
apiClient.interceptors.request.use(
  (config) => {
    // 从localStorage获取accessToken
    const token = localStorage.getItem('admin_access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器 - 统一处理响应和错误
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const apiResponse = response.data;

    // 检查业务状态码
    if (apiResponse.code !== 200) {
      // 业务失败，显示错误消息
      toast.error(apiResponse.msg || '操作失败');
      return Promise.reject(new Error(apiResponse.msg || '操作失败'));
    }

    // 业务成功，返回完整的响应数据
    return apiResponse;
  },
  async (error: AxiosError<ApiResponse>) => {
    // 处理HTTP错误
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token无效或过期，清除本地存储并跳转到登录页
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          localStorage.removeItem('admin_user');

          // 避免在登录页重复跳转
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }

          toast.error('登录已过期，请重新登录');
          break;

        case 403:
          toast.error('您没有权限访问该资源');
          break;

        case 404:
          toast.error('请求的资源不存在');
          break;

        case 500:
          toast.error('服务器错误，请稍后重试');
          break;

        default:
          // 显示后端返回的错误消息
          toast.error(data?.msg || '请求失败，请稍后重试');
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      toast.error('网络错误，请检查您的网络连接');
    } else {
      // 请求配置出错
      toast.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

/**
 * 导出类型化的API调用方法
 */
export const api = {
  get: <T>(url: string, params?: unknown) =>
    apiClient.get<unknown, ApiResponse<T>>(url, { params }),

  post: <T>(url: string, data?: unknown) =>
    apiClient.post<unknown, ApiResponse<T>>(url, data),

  put: <T>(url: string, data?: unknown) =>
    apiClient.put<unknown, ApiResponse<T>>(url, data),

  delete: <T>(url: string) =>
    apiClient.delete<unknown, ApiResponse<T>>(url),
};
