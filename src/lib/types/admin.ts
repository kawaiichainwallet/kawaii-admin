/**
 * 管理员状态
 */
export type AdminStatus = 'active' | 'inactive' | 'suspended';

/**
 * 管理员登录请求
 */
export interface AdminLoginRequest {
  identifier: string; // 用户名或邮箱
  password: string;
}

/**
 * 管理员登录响应
 */
export interface AdminLoginResponse {
  adminId: number;
  username: string;
  email: string;
  realName: string;
  isSuperAdmin: boolean;
  roles: string[];
  permissions: string[];
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * 管理员用户信息
 */
export interface AdminUser {
  adminId: number;
  username: string;
  email: string;
  phone?: string;
  realName: string;
  employeeId?: string;
  department?: string;
  position?: string;
  status: AdminStatus;
  twoFactorEnabled: boolean;
  isSuperAdmin: boolean;
  roles?: AdminRole[];
  permissions?: string[];
  loginAttempts: number;
  lockedUntil?: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 管理员角色
 */
export interface AdminRole {
  roleId: number;
  roleName: string;
  roleCode: string;
  description?: string;
  permissions: string[];
  menuPermissions?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * 创建管理员请求
 */
export interface CreateAdminRequest {
  username: string;
  email: string;
  phone?: string;
  password?: string;
  realName: string;
  employeeId?: string;
  department?: string;
  position?: string;
  isSuperAdmin?: boolean;
  roleIds?: number[];
  permissions?: string[];
}

/**
 * 更新管理员请求
 */
export interface UpdateAdminRequest {
  email?: string;
  phone?: string;
  realName?: string;
  employeeId?: string;
  department?: string;
  position?: string;
}
