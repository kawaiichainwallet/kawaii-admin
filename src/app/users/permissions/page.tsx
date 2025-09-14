import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Settings, Eye } from "lucide-react";

export default function PermissionsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">权限管理</h2>
            <p className="text-muted-foreground">
              管理用户角色和权限设置
            </p>
          </div>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            创建角色
          </Button>
        </div>

        {/* 角色统计 */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">管理员角色</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                拥有完整系统权限
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">普通用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,340</div>
              <p className="text-xs text-muted-foreground">
                基础功能权限
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">商户用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">
                商户管理权限
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 角色列表 */}
        <Card>
          <CardHeader>
            <CardTitle>系统角色</CardTitle>
            <CardDescription>
              管理系统中的所有用户角色和对应权限
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "超级管理员",
                  description: "拥有系统所有权限",
                  userCount: 2,
                  permissions: ["用户管理", "系统设置", "数据管理", "安全设置"],
                  color: "destructive"
                },
                {
                  name: "管理员",
                  description: "拥有大部分管理权限",
                  userCount: 3,
                  permissions: ["用户管理", "交易管理", "商户管理"],
                  color: "default"
                },
                {
                  name: "运营人员",
                  description: "负责日常运营管理",
                  userCount: 8,
                  permissions: ["用户查看", "交易查看", "数据报表"],
                  color: "secondary"
                },
                {
                  name: "客服人员",
                  description: "处理用户问题和咨询",
                  userCount: 12,
                  permissions: ["用户查看", "问题处理"],
                  color: "secondary"
                },
              ].map((role, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{role.name}</h3>
                        <Badge variant="outline">{role.userCount} 用户</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {role.permissions.map((permission, permIndex) => (
                          <Badge key={permIndex} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      查看
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
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