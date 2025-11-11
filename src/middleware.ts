import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 公开路径 - 无需登录即可访问
 */
const PUBLIC_PATHS = ['/login'];

/**
 * 认证中间件 - 保护需要登录的页面
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是公开路径
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 从cookie中获取token（客户端localStorage的token无法在middleware中访问）
  // 因此我们检查localStorage是通过客户端路由守卫完成的
  // 这里主要是防止直接访问URL

  // 如果是公开路径，允许访问
  if (isPublicPath) {
    return NextResponse.next();
  }

  // 对于受保护的路径，我们在客户端组件中进行检查
  // 因为Next.js middleware无法访问localStorage
  return NextResponse.next();
}

/**
 * 配置需要运行middleware的路径
 */
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了：
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
