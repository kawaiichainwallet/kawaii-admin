"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { AdminForm, type AdminFormData } from "@/components/admin-form";
import { toast } from "sonner";
import { createAdmin } from "@/lib/api/admin-users";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateAdminPage() {
  const router = useRouter();

  // 创建管理员Mutation
  const createMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      toast.success(`管理员 "${data.username}" 创建成功`);
      router.push("/admins");
    },
    onError: (error: Error) => {
      toast.error(`创建失败: ${error.message}`);
    },
  });

  const handleSubmit = (data: AdminFormData) => {
    // 转换表单数据为API请求格式
    const requestData = {
      username: data.username!,
      email: data.email,
      password: data.password || undefined,
      phone: data.phone || undefined,
      realName: data.realName!,
      employeeId: data.employeeId || undefined,
      department: data.department || undefined,
      position: data.position || undefined,
      isSuperAdmin: data.isSuperAdmin,
      roleIds: [], // 可以后续扩展为多选角色
      permissions: [], // 可以后续扩展为权限选择
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
            <h2 className="text-3xl font-bold tracking-tight">创建管理员</h2>
            <p className="text-muted-foreground">添加新的管理员账户到系统</p>
          </div>
        </div>

        {/* 表单 */}
        <AdminForm
          mode="create"
          isLoading={createMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
