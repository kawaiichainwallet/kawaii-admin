"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { RoleForm, type RoleFormData } from "@/components/role-form";
import { toast } from "sonner";
import { getRoleById, updateRole } from "@/lib/api/roles";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const roleId = Number(params.id);

  // 判断是否为预置角色
  const isPresetRole = (id: number) => {
    return id >= 700001 && id <= 700005;
  };

  // 获取角色详情
  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => getRoleById(roleId),
    enabled: !isNaN(roleId),
  });

  // 更新角色Mutation
  const updateMutation = useMutation({
    mutationFn: (data: RoleFormData) => {
      // 转换表单数据为API请求格式
      const requestData = {
        roleName: data.roleName || undefined,
        description: data.description || undefined,
        isActive: data.isActive,
        // permissions 和 menuPermissions 暂时不在表单中修改
      };

      // 过滤掉undefined的字段
      const filteredData = Object.fromEntries(
        Object.entries(requestData).filter(([_, v]) => v !== undefined)
      );

      return updateRole(roleId, filteredData);
    },
    onSuccess: (data) => {
      toast.success(`角色 "${data.roleName}" 更新成功`);
      queryClient.invalidateQueries({ queryKey: ["role", roleId] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      router.push("/roles");
    },
    onError: (error: Error) => {
      toast.error(`更新失败: ${error.message}`);
    },
  });

  const handleSubmit = (data: RoleFormData) => {
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  if (error || !role) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">加载失败</h2>
              <p className="text-muted-foreground text-destructive">
                {error ? (error as Error).message : "角色不存在"}
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // 预置角色不可编辑
  if (isPresetRole(role.roleId)) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">无法编辑</h2>
              <p className="text-muted-foreground text-destructive">
                系统预置角色不可编辑
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">编辑角色</h2>
            <p className="text-muted-foreground">
              修改角色 "{role.roleName}" 的信息
            </p>
          </div>
        </div>

        {/* 表单 */}
        <RoleForm
          mode="edit"
          role={role}
          isLoading={updateMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
