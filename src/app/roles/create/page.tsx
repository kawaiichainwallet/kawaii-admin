"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { RoleForm, type RoleFormData } from "@/components/role-form";
import { toast } from "sonner";
import { createRole } from "@/lib/api/roles";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateRolePage() {
  const router = useRouter();

  // 创建角色Mutation
  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      toast.success(`角色 "${data.roleName}" 创建成功`);
      router.push("/roles");
    },
    onError: (error: Error) => {
      toast.error(`创建失败: ${error.message}`);
    },
  });

  const handleSubmit = (data: RoleFormData) => {
    // 转换表单数据为API请求格式
    const requestData = {
      roleName: data.roleName,
      roleCode: data.roleCode!,
      description: data.description || undefined,
      permissions: [], // 可以后续扩展为权限选择
      menuPermissions: [], // 可以后续扩展为菜单权限选择
      isActive: data.isActive !== undefined ? data.isActive : true,
    };

    createMutation.mutate(requestData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">创建角色</h2>
            <p className="text-muted-foreground">添加新的角色到系统</p>
          </div>
        </div>

        {/* 表单 */}
        <RoleForm
          mode="create"
          isLoading={createMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
