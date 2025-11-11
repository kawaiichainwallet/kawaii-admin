"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { AdminRole } from "@/lib/types/admin";

// 创建角色表单验证模式
const createRoleSchema = z.object({
  roleName: z
    .string()
    .min(2, "角色名称至少2个字符")
    .max(50, "角色名称最多50个字符"),
  roleCode: z
    .string()
    .min(2, "角色编码至少2个字符")
    .max(50, "角色编码最多50个字符")
    .regex(/^[A-Z_]+$/, "角色编码只能包含大写字母和下划线"),
  description: z.string().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
});

// 更新角色表单验证模式（角色编码不可修改）
const updateRoleSchema = createRoleSchema.extend({
  roleCode: z.string().optional(),
});

export type RoleFormData = z.infer<typeof createRoleSchema>;

interface RoleFormProps {
  mode: "create" | "edit";
  role?: AdminRole;
  isLoading?: boolean;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
}

export function RoleForm({
  mode,
  role,
  isLoading = false,
  onSubmit,
  onCancel,
}: RoleFormProps) {
  const schema = mode === "create" ? createRoleSchema : updateRoleSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(schema),
    defaultValues: role
      ? {
          roleName: role.roleName,
          roleCode: role.roleCode,
          description: role.description || "",
          isActive: role.isActive,
        }
      : {
          roleName: "",
          roleCode: "",
          description: "",
          isActive: true,
        },
  });

  // 当role数据变化时重置表单
  useEffect(() => {
    if (role) {
      reset({
        roleName: role.roleName,
        roleCode: role.roleCode,
        description: role.description || "",
        isActive: role.isActive,
      });
    }
  }, [role, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>角色的基本配置信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">
                角色名称 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="roleName"
                {...register("roleName")}
                placeholder="请输入角色名称，如：系统管理员"
              />
              {errors.roleName && (
                <p className="text-sm text-destructive">
                  {errors.roleName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleCode">
                角色编码{" "}
                {mode === "create" && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="roleCode"
                {...register("roleCode")}
                placeholder="请输入角色编码，如：SYSTEM_ADMIN"
                disabled={mode === "edit"}
              />
              {errors.roleCode && (
                <p className="text-sm text-destructive">
                  {errors.roleCode.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {mode === "create"
                  ? "角色编码用于系统内部识别，只能包含大写字母和下划线"
                  : "角色编码创建后不可修改"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">角色描述</Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="请输入角色描述"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md"
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 权限配置 */}
      <Card>
        <CardHeader>
          <CardTitle>权限配置</CardTitle>
          <CardDescription>
            配置角色的功能权限和菜单权限（暂未实现权限选择器）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            权限配置功能将在后续版本中完善，届时您可以通过可视化界面选择具体的功能权限和菜单权限。
          </div>
        </CardContent>
      </Card>

      {/* 状态设置 */}
      <Card>
        <CardHeader>
          <CardTitle>状态设置</CardTitle>
          <CardDescription>配置角色的启用状态</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              id="isActive"
              type="checkbox"
              {...register("isActive")}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              启用此角色（停用后管理员将无法使用此角色的权限）
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          取消
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "create" ? "创建角色" : "保存修改"}
        </Button>
      </div>
    </form>
  );
}
