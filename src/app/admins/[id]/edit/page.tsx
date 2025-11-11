"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin-layout";
import { AdminForm, type AdminFormData } from "@/components/admin-form";
import { toast } from "sonner";
import { getAdminById, updateAdmin } from "@/lib/api/admin-users";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditAdminPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const adminId = Number(params.id);

  // 获取管理员详情
  const { data: admin, isLoading, error } = useQuery({
    queryKey: ["admin", adminId],
    queryFn: () => getAdminById(adminId),
    enabled: !isNaN(adminId),
  });

  // 更新管理员Mutation
  const updateMutation = useMutation({
    mutationFn: (data: AdminFormData) => {
      // 转换表单数据为API请求格式
      const requestData = {
        email: data.email || undefined,
        phone: data.phone || undefined,
        realName: data.realName || undefined,
        employeeId: data.employeeId || undefined,
        department: data.department || undefined,
        position: data.position || undefined,
      };

      // 过滤掉undefined的字段
      const filteredData = Object.fromEntries(
        Object.entries(requestData).filter(([_, v]) => v !== undefined)
      );

      return updateAdmin(adminId, filteredData);
    },
    onSuccess: (data) => {
      toast.success(`管理员 "${data.username}" 更新成功`);
      queryClient.invalidateQueries({ queryKey: ["admin", adminId] });
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      router.push("/admins");
    },
    onError: (error: Error) => {
      toast.error(`更新失败: ${error.message}`);
    },
  });

  const handleSubmit = (data: AdminFormData) => {
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

  if (error || !admin) {
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
                {error ? (error as Error).message : "管理员不存在"}
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
            <h2 className="text-3xl font-bold tracking-tight">编辑管理员</h2>
            <p className="text-muted-foreground">
              修改管理员 "{admin.username}" 的信息
            </p>
          </div>
        </div>

        {/* 表单 */}
        <AdminForm
          mode="edit"
          admin={admin}
          isLoading={updateMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}
