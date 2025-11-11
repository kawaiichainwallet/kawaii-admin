import { api } from './client';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
} from '@/lib/types/admin';

/**
 * 认证API
 */
export const authApi = {
  /**
   * 管理员登录
   */
  login: (data: AdminLoginRequest) =>
    api.post<AdminLoginResponse>('/auth/login', data),

  /**
   * 管理员登出
   */
  logout: () => api.post<void>('/auth/logout'),

  /**
   * 刷新Token
   */
  refreshToken: (refreshToken: string) =>
    api.post<AdminLoginResponse>('/auth/refresh', refreshToken),
};

/**
 * 存储Token到localStorage
 */
export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('admin_access_token', accessToken);
  localStorage.setItem('admin_refresh_token', refreshToken);
}

/**
 * 从localStorage获取Token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('admin_access_token');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('admin_refresh_token');
}

/**
 * 清除Token
 */
export function clearTokens() {
  localStorage.removeItem('admin_access_token');
  localStorage.removeItem('admin_refresh_token');
  localStorage.removeItem('admin_user');
}

/**
 * 存储用户信息
 */
export function saveUser(user: AdminLoginResponse) {
  localStorage.setItem('admin_user', JSON.stringify(user));
}

/**
 * 获取用户信息
 */
export function getUser(): AdminLoginResponse | null {
  const userStr = localStorage.getItem('admin_user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as AdminLoginResponse;
  } catch {
    return null;
  }
}
