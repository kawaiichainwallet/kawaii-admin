import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  Building2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "总用户数",
      value: "12,345",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "比上月增长 1,234 人"
    },
    {
      title: "今日交易",
      value: "2,468",
      change: "+8.5%",
      trend: "up",
      icon: CreditCard,
      description: "交易总额 ¥1,234,567"
    },
    {
      title: "活跃商户",
      value: "456",
      change: "-2.1%",
      trend: "down",
      icon: Building2,
      description: "本月新增 23 个商户"
    },
    {
      title: "系统收入",
      value: "¥123,456",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      description: "手续费收入"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "user_register",
      title: "新用户注册",
      description: "用户 user123 完成注册",
      time: "5分钟前",
      status: "success"
    },
    {
      id: 2,
      type: "merchant_review",
      title: "商户审核",
      description: "商户 ABC公司 提交认证申请",
      time: "15分钟前",
      status: "pending"
    },
    {
      id: 3,
      type: "transaction",
      title: "大额交易",
      description: "交易金额 ¥50,000 已完成",
      time: "1小时前",
      status: "success"
    },
    {
      id: 4,
      type: "system",
      title: "系统更新",
      description: "安全补丁已安装完成",
      time: "2小时前",
      status: "info"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 欢迎区域 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">欢迎回来，管理员</h2>
            <p className="text-muted-foreground">
              这里是您的 KawaiiChain 管理控制台
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            <Activity className="mr-1 h-3 w-3" />
            系统正常运行
          </Badge>
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 最近活动 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
              <CardDescription>
                系统最近的重要操作和事件
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'pending' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
              <CardDescription>
                常用的管理功能快捷入口
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <Users className="h-4 w-4 mb-2" />
                  <p className="text-sm font-medium">用户管理</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <CreditCard className="h-4 w-4 mb-2" />
                  <p className="text-sm font-medium">交易记录</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <Building2 className="h-4 w-4 mb-2" />
                  <p className="text-sm font-medium">商户审核</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <TrendingUp className="h-4 w-4 mb-2" />
                  <p className="text-sm font-medium">数据报表</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
