import { apiClient } from './client';
import type {
  AdminRole,
  CreateRoleRequest,
  UpdateRoleRequest,
} from '../types/admin';

/**
 * 获取所有激活的角色
 * @returns 激活状态的角色列表
 */
export const getActiveRoles = async (): Promise<AdminRole[]> => {
  const response = await apiClient.get<AdminRole[]>('/kawaii-admin/role/active');
  return response.data;
};

/**
 * 获取所有角色（包括未激活的）
 * @returns 所有角色列表
 */
export const getAllRoles = async (): Promise<AdminRole[]> => {
  const response = await apiClient.get<AdminRole[]>('/kawaii-admin/role/list');
  return response.data;
};

/**
 * 根据ID获取角色详情
 * @param roleId 角色ID
 * @returns 角色详细信息
 */
export const getRoleById = async (roleId: number): Promise<AdminRole> => {
  const response = await apiClient.get<AdminRole>(`/kawaii-admin/role/${roleId}`);
  return response.data;
};

/**
 * 创建角色
 * @param data 创建角色请求数据
 * @returns 创建成功的角色信息
 */
export const createRole = async (data: CreateRoleRequest): Promise<AdminRole> => {
  const response = await apiClient.post<AdminRole>('/kawaii-admin/role/create', data);
  return response.data;
};

/**
 * 更新角色信息
 * @param roleId 角色ID
 * @param data 更新数据
 * @returns 更新后的角色信息
 */
export const updateRole = async (
  roleId: number,
  data: UpdateRoleRequest
): Promise<AdminRole> => {
  const response = await apiClient.put<AdminRole>(`/kawaii-admin/role/${roleId}`, data);
  return response.data;
};

/**
 * 删除角色
 * @param roleId 角色ID
 */
export const deleteRole = async (roleId: number): Promise<void> => {
  await apiClient.delete(`/kawaii-admin/role/${roleId}`);
};

/**
 * 修改角色状态
 * @param roleId 角色ID
 * @param isActive 是否激活
 */
export const updateRoleStatus = async (
  roleId: number,
  isActive: boolean
): Promise<void> => {
  await apiClient.put(`/kawaii-admin/role/${roleId}/status`, null, {
    params: { isActive },
  });
};
