import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Filter } from "lucide-react";

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 页面头部 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">用户管理</h2>
            <p className="text-muted-foreground">
              管理系统中的所有用户账户
            </p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            添加用户
          </Button>
        </div>

        {/* 统计概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                比上月增长 +12%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,234</div>
              <p className="text-xs text-muted-foreground">
                本月活跃用户
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">新增用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">
                本周新注册
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">认证用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,876</div>
              <p className="text-xs text-muted-foreground">
                已完成身份认证
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 用户列表 */}
        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
            <CardDescription>
              系统中所有用户的详细信息
            </CardDescription>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" />
                搜索
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                筛选
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: "张三", email: "zhangsan@example.com", status: "active", role: "用户", joinDate: "2024-01-15" },
                { id: 2, name: "李四", email: "lisi@example.com", status: "inactive", role: "商户", joinDate: "2024-02-20" },
                { id: 3, name: "王五", email: "wangwu@example.com", status: "active", role: "用户", joinDate: "2024-03-10" },
                { id: 4, name: "赵六", email: "zhaoliu@example.com", status: "suspended", role: "用户", joinDate: "2024-01-25" },
              ].map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={user.status === 'active' ? 'default' : user.status === 'inactive' ? 'secondary' : 'destructive'}>
                      {user.status === 'active' ? '活跃' : user.status === 'inactive' ? '非活跃' : '已暂停'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{user.role}</span>
                    <span className="text-sm text-muted-foreground">{user.joinDate}</span>
                    <Button variant="outline" size="sm">
                      编辑
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}