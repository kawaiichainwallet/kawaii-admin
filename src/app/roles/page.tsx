"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Shield, Plus, MoreVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getAllRoles,
  deleteRole,
  updateRoleStatus,
} from "@/lib/api/roles";
import type { AdminRole } from "@/lib/types/admin";

export default function RolesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 状态筛选
  const [showInactive, setShowInactive] = useState(false);

  // 获取角色列表
  const { data: allRoles, isLoading, error } = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });

  // 根据状态筛选角色
  const roles = allRoles?.filter((role) =>
    showInactive ? true : role.isActive
  );

  // 删除角色
  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: Error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  // 修改状态
  const updateStatusMutation = useMutation({
    mutationFn: ({ roleId, isActive }: { roleId: number; isActive: boolean }) =>
      updateRoleStatus(roleId, isActive),
    onSuccess: () => {
      toast.success("状态修改成功");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: Error) => {
      toast.error(`状态修改失败: ${error.message}`);
    },
  });

  // 处理删除
  const handleDelete = (roleId: number, roleName: string) => {
    if (confirm(`确定要删除角色 "${roleName}" 吗？此操作不可恢复。`)) {
      deleteMutation.mutate(roleId);
    }
  };

  // 处理状态切换
  const handleStatusToggle = (roleId: number, currentStatus: boolean) => {
    updateStatusMutation.mutate({ roleId, isActive: !currentStatus });
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN");
  };

  // 判断是否为预置角色
  const isPresetRole = (roleId: number) => {
    return roleId >= 700001 && roleId <= 700005;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">角色管理</h2>
            <p className="text-muted-foreground">管理系统中的所有角色和权限</p>
          </div>
          <Button onClick={() => router.push("/roles/create")}>
            <Plus className="mr-2 h-4 w-4" />
            创建角色
          </Button>
        </div>

        {/* 统计概览 */}
        {roles && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总角色数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allRoles?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  包含系统预置角色
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">激活角色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allRoles?.filter((r) => r.isActive).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">当前可用角色</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">预置角色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allRoles?.filter((r) => isPresetRole(r.roleId)).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">系统内置角色</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">自定义角色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allRoles?.filter((r) => !isPresetRole(r.roleId)).length || 0}
                </div>
                <p className="text-xs text-muted-foreground">用户创建角色</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 角色列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>角色列表</CardTitle>
                <CardDescription>系统中所有角色的详细信息</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInactive(!showInactive)}
              >
                {showInactive ? "隐藏停用角色" : "显示停用角色"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                加载失败: {error.message}
              </div>
            ) : roles && roles.length > 0 ? (
              <div className="space-y-4">
                {roles.map((role: AdminRole) => (
                  <div
                    key={role.roleId}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{role.roleName}</p>
                          <Badge variant="outline" className="text-xs">
                            {role.roleCode}
                          </Badge>
                          {isPresetRole(role.roleId) && (
                            <Badge variant="default" className="text-xs">
                              系统预置
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {role.description || "暂无描述"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            权限数: {role.permissions?.length || 0}
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            菜单权限数: {role.menuPermissions?.length || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={role.isActive ? "default" : "secondary"}>
                          {role.isActive ? "激活" : "停用"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(role.createdAt)}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>查看详情</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => router.push(`/roles/${role.roleId}/edit`)}
                            disabled={isPresetRole(role.roleId)}
                          >
                            编辑角色
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusToggle(role.roleId, role.isActive)
                            }
                            disabled={isPresetRole(role.roleId) || updateStatusMutation.isPending}
                          >
                            {role.isActive ? "停用" : "启用"}角色
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(role.roleId, role.roleName)}
                            disabled={
                              isPresetRole(role.roleId) || deleteMutation.isPending
                            }
                            className="text-destructive"
                          >
                            {deleteMutation.isPending ? "删除中..." : "删除角色"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
