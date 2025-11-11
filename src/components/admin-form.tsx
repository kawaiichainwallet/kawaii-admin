"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { AdminUser } from "@/lib/types/admin";

// 创建管理员表单验证模式
const createAdminSchema = z.object({
  username: z
    .string()
    .min(3, "用户名至少3个字符")
    .max(50, "用户名最多50个字符")
    .regex(/^[a-zA-Z0-9_-]+$/, "用户名只能包含字母、数字、下划线和连字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  password: z
    .string()
    .min(8, "密码至少8个字符")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  realName: z.string().min(1, "请输入真实姓名"),
  employeeId: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
  position: z.string().optional().or(z.literal("")),
  isSuperAdmin: z.boolean().optional(),
});

// 更新管理员表单验证模式（密码和用户名不必填）
const updateAdminSchema = createAdminSchema.extend({
  username: z.string().optional(),
  password: z.string().optional().or(z.literal("")),
  realName: z.string().optional().or(z.literal("")),
});

export type AdminFormData = z.infer<typeof createAdminSchema>;

interface AdminFormProps {
  mode: "create" | "edit";
  admin?: AdminUser;
  isLoading?: boolean;
  onSubmit: (data: AdminFormData) => void;
  onCancel: () => void;
}

export function AdminForm({
  mode,
  admin,
  isLoading = false,
  onSubmit,
  onCancel,
}: AdminFormProps) {
  const schema = mode === "create" ? createAdminSchema : updateAdminSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminFormData>({
    resolver: zodResolver(schema),
    defaultValues: admin
      ? {
          username: admin.username,
          email: admin.email,
          phone: admin.phone || "",
          realName: admin.realName || "",
          employeeId: admin.employeeId || "",
          department: admin.department || "",
          position: admin.position || "",
          isSuperAdmin: admin.isSuperAdmin || false,
          password: "",
        }
      : {
          username: "",
          email: "",
          password: "",
          phone: "",
          realName: "",
          employeeId: "",
          department: "",
          position: "",
          isSuperAdmin: false,
        },
  });

  // 当admin数据变化时重置表单
  useEffect(() => {
    if (admin) {
      reset({
        username: admin.username,
        email: admin.email,
        phone: admin.phone || "",
        realName: admin.realName || "",
        employeeId: admin.employeeId || "",
        department: admin.department || "",
        position: admin.position || "",
        isSuperAdmin: admin.isSuperAdmin || false,
        password: "",
      });
    }
  }, [admin, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>管理员的账户基本信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                用户名 {mode === "create" && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="username"
                {...register("username")}
                placeholder="请输入用户名"
                disabled={mode === "edit"}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                邮箱 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="请输入邮箱"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                密码 {mode === "create" && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                placeholder={
                  mode === "create" ? "请输入密码（至少8位）" : "留空表示不修改密码"
                }
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="请输入手机号"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 个人信息 */}
      <Card>
        <CardHeader>
          <CardTitle>个人信息</CardTitle>
          <CardDescription>管理员的详细个人信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="realName">
                真实姓名 {mode === "create" && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id="realName"
                {...register("realName")}
                placeholder="请输入真实姓名"
              />
              {errors.realName && (
                <p className="text-sm text-destructive">{errors.realName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">工号</Label>
              <Input
                id="employeeId"
                {...register("employeeId")}
                placeholder="请输入工号"
              />
              {errors.employeeId && (
                <p className="text-sm text-destructive">{errors.employeeId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">部门</Label>
              <Input
                id="department"
                {...register("department")}
                placeholder="请输入部门"
              />
              {errors.department && (
                <p className="text-sm text-destructive">{errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">职位</Label>
              <Input
                id="position"
                {...register("position")}
                placeholder="请输入职位"
              />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 权限设置 */}
      {mode === "create" && (
        <Card>
          <CardHeader>
            <CardTitle>权限设置</CardTitle>
            <CardDescription>配置管理员的系统权限</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input
                id="isSuperAdmin"
                type="checkbox"
                {...register("isSuperAdmin")}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isSuperAdmin" className="cursor-pointer">
                设置为超级管理员（拥有系统最高权限）
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          取消
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "create" ? "创建管理员" : "保存修改"}
        </Button>
      </div>
    </form>
  );
}
