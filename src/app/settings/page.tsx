import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, RefreshCw, Shield, Database, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">系统设置</h2>
            <p className="text-muted-foreground">
              配置和管理系统的基础设置
            </p>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            保存设置
          </Button>
        </div>

        {/* 设置分类 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 基础配置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                基础配置
              </CardTitle>
              <CardDescription>
                系统的基本运行参数设置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">系统名称</p>
                  <p className="text-sm text-muted-foreground">KawaiiChain 管理后台</p>
                </div>
                <Button variant="outline" size="sm">编辑</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">系统版本</p>
                  <p className="text-sm text-muted-foreground">v1.0.0</p>
                </div>
                <Badge variant="outline">最新</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">维护模式</p>
                  <p className="text-sm text-muted-foreground">系统维护状态设置</p>
                </div>
                <Badge variant="default">正常运行</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 安全设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                安全设置
              </CardTitle>
              <CardDescription>
                系统安全和权限相关配置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">登录超时</p>
                  <p className="text-sm text-muted-foreground">30 分钟无操作自动退出</p>
                </div>
                <Button variant="outline" size="sm">修改</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">密码策略</p>
                  <p className="text-sm text-muted-foreground">最少8位，包含数字和字母</p>
                </div>
                <Button variant="outline" size="sm">修改</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">双因素认证</p>
                  <p className="text-sm text-muted-foreground">管理员登录二次验证</p>
                </div>
                <Badge variant="default">已启用</Badge>
              </div>
            </CardContent>
          </Card>

          {/* 数据库设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                数据库设置
              </CardTitle>
              <CardDescription>
                数据存储和备份相关配置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">自动备份</p>
                  <p className="text-sm text-muted-foreground">每日凌晨2点自动备份</p>
                </div>
                <Badge variant="default">已启用</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">备份保留</p>
                  <p className="text-sm text-muted-foreground">保留最近30天的备份文件</p>
                </div>
                <Button variant="outline" size="sm">修改</Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">数据清理</p>
                  <p className="text-sm text-muted-foreground">自动清理90天前的日志</p>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  立即清理
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 通知设置 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                通知设置
              </CardTitle>
              <CardDescription>
                系统通知和告警相关配置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">邮件通知</p>
                  <p className="text-sm text-muted-foreground">重要事件邮件提醒</p>
                </div>
                <Badge variant="default">已启用</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">短信通知</p>
                  <p className="text-sm text-muted-foreground">紧急情况短信告警</p>
                </div>
                <Badge variant="default">已启用</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">系统监控</p>
                  <p className="text-sm text-muted-foreground">服务器状态实时监控</p>
                </div>
                <Badge variant="default">正常</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 系统信息 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              系统信息
            </CardTitle>
            <CardDescription>
              当前系统的运行状态和基本信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">系统运行时间</p>
                <p className="text-2xl font-bold">15 天 8 小时</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">CPU 使用率</p>
                <p className="text-2xl font-bold text-green-600">23%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">内存使用率</p>
                <p className="text-2xl font-bold text-blue-600">45%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}