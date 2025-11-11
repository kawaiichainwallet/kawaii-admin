import { apiClient } from './client';
import type {
  AdminUser,
  CreateAdminRequest,
  UpdateAdminRequest,
  AssignRolesRequest,
} from '../types/admin';

/**
 * 管理员列表查询参数
 */
export interface AdminListParams {
  page?: number;
  size?: number;
  status?: 'active' | 'inactive' | 'suspended';
  keyword?: string;
}

/**
 * 分页响应结构
 */
export interface PageResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

/**
 * 获取管理员列表
 * @param params 查询参数
 * @returns 分页的管理员列表
 */
export const getAdminList = async (
  params: AdminListParams = {}
): Promise<PageResponse<AdminUser>> => {
  const { page = 1, size = 20, status, keyword } = params;

  const response = await apiClient.get<PageResponse<AdminUser>>('/kawaii-admin/admin-user/list', {
    params: { page, size, status, keyword },
  });

  return response.data;
};

/**
 * 根据ID获取管理员详情
 * @param adminId 管理员ID
 * @returns 管理员详细信息
 */
export const getAdminById = async (adminId: number): Promise<AdminUser> => {
  const response = await apiClient.get<AdminUser>(`/kawaii-admin/admin-user/${adminId}`);
  return response.data;
};

/**
 * 创建管理员
 * @param data 创建管理员请求数据
 * @returns 创建成功的管理员信息
 */
export const createAdmin = async (data: CreateAdminRequest): Promise<AdminUser> => {
  const response = await apiClient.post<AdminUser>('/kawaii-admin/admin-user/create', data);
  return response.data;
};

/**
 * 更新管理员信息
 * @param adminId 管理员ID
 * @param data 更新数据
 * @returns 更新后的管理员信息
 */
export const updateAdmin = async (
  adminId: number,
  data: UpdateAdminRequest
): Promise<AdminUser> => {
  const response = await apiClient.put<AdminUser>(`/kawaii-admin/admin-user/${adminId}`, data);
  return response.data;
};

/**
 * 删除管理员
 * @param adminId 管理员ID
 */
export const deleteAdmin = async (adminId: number): Promise<void> => {
  await apiClient.delete(`/kawaii-admin/admin-user/${adminId}`);
};

/**
 * 修改管理员状态
 * @param adminId 管理员ID
 * @param status 新状态
 */
export const updateAdminStatus = async (
  adminId: number,
  status: 'active' | 'inactive' | 'suspended'
): Promise<void> => {
  await apiClient.put(`/kawaii-admin/admin-user/${adminId}/status`, null, {
    params: { status },
  });
};

/**
 * 为管理员分配角色
 * @param adminId 管理员ID
 * @param roleIds 角色ID列表
 */
export const assignRoles = async (
  adminId: number,
  roleIds: number[]
): Promise<void> => {
  const data: AssignRolesRequest = { roleIds };
  await apiClient.post(`/kawaii-admin/admin-user/${adminId}/roles`, data);
};

/**
 * ID生成器健康检查
 * @returns 健康检查消息
 */
export const checkIdGeneratorHealth = async (): Promise<string> => {
  const response = await apiClient.get<string>('/kawaii-admin/admin-user/id-generator/health');
  return response.data;
};
