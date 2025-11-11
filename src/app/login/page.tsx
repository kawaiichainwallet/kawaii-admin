"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi, saveTokens, saveUser } from "@/lib/api/auth";
import type { AdminLoginRequest } from "@/lib/types/admin";

/**
 * 登录表单验证规则
 */
const loginSchema = z.object({
  identifier: z.string().min(1, "请输入用户名或邮箱"),
  password: z.string().min(1, "请输入密码"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await authApi.login(data as AdminLoginRequest);

      // 检查响应是否成功（拦截器已经检查过，这里做二次确认）
      if (response.code === 200 && response.data) {
        // 保存Token和用户信息
        saveTokens(response.data.accessToken, response.data.refreshToken);
        saveUser(response.data);

        // 显示成功消息
        toast.success(`欢迎回来，${response.data.realName || response.data.username}！`);

        // 跳转到首页
        setTimeout(() => {
          router.push("/");
        }, 500); // 延迟500ms，让用户看到成功提示
      } else {
        // 理论上不会到这里（拦截器已处理），但作为保险
        toast.error(response.msg || '登录失败，请重试');
      }
    } catch (error) {
      // 错误已在axios拦截器中处理并显示toast
      console.error("登录失败:", error);
      // 不需要再次显示错误，因为拦截器已经处理了
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">KawaiiChain 管理后台</CardTitle>
          <CardDescription>
            请输入您的用户名或邮箱和密码登录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">用户名/邮箱</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="请输入用户名或邮箱"
                disabled={isLoading}
                {...register("identifier")}
              />
              {errors.identifier && (
                <p className="text-sm text-red-500">{errors.identifier.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
