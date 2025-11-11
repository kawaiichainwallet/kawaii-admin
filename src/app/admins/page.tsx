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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Search, Filter, MoreVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getAdminList,
  deleteAdmin,
  updateAdminStatus,
  type AdminListParams,
} from "@/lib/api/admin-users";
import type { AdminUser } from "@/lib/types/admin";

export default function AdminsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 查询参数状态
  const [params, setParams] = useState<AdminListParams>({
    page: 1,
    size: 20,
    status: undefined,
    keyword: "",
  });

  // 搜索关键词（本地状态，用于输入框）
  const [searchInput, setSearchInput] = useState("");

  // 获取管理员列表
  const { data, isLoading, error } = useQuery({
    queryKey: ["admins", params],
    queryFn: () => getAdminList(params),
  });

  // 删除管理员
  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("删除成功");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error: Error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  // 修改状态
  const updateStatusMutation = useMutation({
    mutationFn: ({
      adminId,
      status,
    }: {
      adminId: number;
      status: "active" | "inactive" | "suspended";
    }) => updateAdminStatus(adminId, status),
    onSuccess: () => {
      toast.success("状态修改成功");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (error: Error) => {
      toast.error(`状态修改失败: ${error.message}`);
    },
  });

  // 处理搜索
  const handleSearch = () => {
    setParams((prev) => ({ ...prev, page: 1, keyword: searchInput }));
  };

  // 处理状态筛选
  const handleStatusFilter = (
    status: "active" | "inactive" | "suspended" | undefined
  ) => {
    setParams((prev) => ({ ...prev, page: 1, status }));
  };

  // 处理分页
  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  // 处理删除
  const handleDelete = (adminId: number, username: string) => {
    if (
      confirm(`确定要删除管理员 "${username}" 吗？此操作不可恢复。`)
    ) {
      deleteMutation.mutate(adminId);
    }
  };

  // 处理状态切换
  const handleStatusChange = (
    adminId: number,
    newStatus: "active" | "inactive" | "suspended"
  ) => {
    updateStatusMutation.mutate({ adminId, status: newStatus });
  };

  // 状态显示映射
  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "正常", variant: "default" as const },
      inactive: { label: "停用", variant: "secondary" as const },
      suspended: { label: "封禁", variant: "destructive" as const },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.active;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">管理员管理</h2>
            <p className="text-muted-foreground">管理系统中的所有管理员账户</p>
          </div>
          <Button onClick={() => router.push("/admins/create")}>
            <UserPlus className="mr-2 h-4 w-4" />
            添加管理员
          </Button>
        </div>

        {/* 统计概览 */}
        {data && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总管理员数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.total}</div>
                <p className="text-xs text-muted-foreground">
                  当前页显示 {data.records.length} 条
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">正常账户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.records.filter((a) => a.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">本页统计</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">超级管理员</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.records.filter((a) => a.isSuperAdmin).length}
                </div>
                <p className="text-xs text-muted-foreground">拥有最高权限</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">总页数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.pages}</div>
                <p className="text-xs text-muted-foreground">
                  第 {data.current} 页
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 管理员列表 */}
        <Card>
          <CardHeader>
            <CardTitle>管理员列表</CardTitle>
            <CardDescription>系统中所有管理员的详细信息</CardDescription>
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="搜索用户名、邮箱..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="max-w-sm"
                />
                <Button onClick={handleSearch} size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  搜索
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    状态筛选
                    {params.status && (
                      <Badge variant="secondary" className="ml-2">
                        {getStatusBadge(params.status).label}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>选择状态</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleStatusFilter(undefined)}>
                    全部
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusFilter("active")}>
                    正常
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusFilter("inactive")}
                  >
                    停用
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusFilter("suspended")}
                  >
                    封禁
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            ) : data && data.records.length > 0 ? (
              <div className="space-y-4">
                {data.records.map((admin: AdminUser) => (
                  <div
                    key={admin.adminId}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {admin.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{admin.username}</p>
                          {admin.isSuperAdmin && (
                            <Badge variant="default" className="text-xs">
                              超管
                            </Badge>
                          )}
                          {admin.twoFactorEnabled && (
                            <Badge variant="outline" className="text-xs">
                              2FA
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {admin.email}
                        </p>
                        {admin.realName && (
                          <p className="text-xs text-muted-foreground">
                            {admin.realName} • {admin.department || "未设置部门"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant={getStatusBadge(admin.status).variant}>
                          {getStatusBadge(admin.status).label}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {admin.roles && admin.roles.length > 0
                            ? admin.roles.map((r) => r.roleName).join(", ")
                            : "无角色"}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground w-32">
                        {formatDate(admin.createdAt)}
                      </span>
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
                            onClick={() => router.push(`/admins/${admin.adminId}/edit`)}
                          >
                            编辑信息
                          </DropdownMenuItem>
                          <DropdownMenuItem>分配角色</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {admin.status !== "active" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(admin.adminId, "active")
                              }
                            >
                              启用账户
                            </DropdownMenuItem>
                          )}
                          {admin.status === "active" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(admin.adminId, "inactive")
                              }
                            >
                              停用账户
                            </DropdownMenuItem>
                          )}
                          {admin.status !== "suspended" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(admin.adminId, "suspended")
                              }
                              className="text-destructive"
                            >
                              封禁账户
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(admin.adminId, admin.username)
                            }
                            disabled={
                              admin.isSuperAdmin || deleteMutation.isPending
                            }
                            className="text-destructive"
                          >
                            {deleteMutation.isPending ? "删除中..." : "删除账户"}
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

            {/* 分页 */}
            {data && data.pages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  共 {data.total} 条记录，第 {data.current} / {data.pages} 页
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.current - 1)}
                    disabled={data.current <= 1}
                  >
                    上一页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(data.current + 1)}
                    disabled={data.current >= data.pages}
                  >
                    下一页
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
