"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/api/auth";

/**
 * 公开路径 - 无需登录即可访问
 */
const PUBLIC_PATHS = ["/login"];

/**
 * 认证守卫组件
 * 在客户端检查用户登录状态，未登录则重定向到登录页
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 检查是否是公开路径
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    if (isPublicPath) {
      return;
    }

    // 检查是否有access token
    const token = getAccessToken();

    if (!token) {
      // 未登录，重定向到登录页
      router.push("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
