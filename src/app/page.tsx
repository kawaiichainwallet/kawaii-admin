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
  Activity,
  AlertTriangle,
  Shield,
  UserCheck,
  ArrowUpFromLine,
  Coins
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "平台总资产",
      value: "¥12.34M",
      change: "+2.3%",
      trend: "up",
      icon: Users,
      description: "热钱包 10% | 冷钱包 90%",
      urgent: false
    },
    {
      title: "待审核提现",
      value: "8",
      change: "+3",
      trend: "up",
      icon: CreditCard,
      description: "总金额 ¥456,789",
      urgent: true
    },
    {
      title: "风控拦截",
      value: "15",
      change: "+5",
      trend: "up",
      icon: Building2,
      description: "今日拦截可疑交易",
      urgent: true
    },
    {
      title: "KYC 待审核",
      value: "12",
      change: "-3",
      trend: "down",
      icon: TrendingUp,
      description: "平均审核时间 2.5h",
      urgent: false
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "risk_alert",
      title: "风控预警",
      description: "检测到可疑大额提现 ¥50,000",
      time: "5分钟前",
      status: "urgent"
    },
    {
      id: 2,
      type: "kyc_review",
      title: "KYC审核",
      description: "用户张三提交L2级认证申请",
      time: "15分钟前",
      status: "pending"
    },
    {
      id: 3,
      type: "withdrawal",
      title: "提现审核",
      description: "用户李四提现¥30,000已批准",
      time: "1小时前",
      status: "success"
    },
    {
      id: 4,
      type: "cold_wallet",
      title: "冷热转移",
      description: "热钱包资金转移至冷钱包",
      time: "2小时前",
      status: "success"
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
              <Card
                key={stat.title}
                className={stat.urgent ? "border-red-200 bg-red-50/50" : ""}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${stat.urgent ? "text-red-700" : ""}`}>
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {stat.urgent && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                    <Icon className={`h-4 w-4 ${stat.urgent ? "text-red-500" : "text-muted-foreground"}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.urgent ? "text-red-600" : ""}`}>
                    {stat.value}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className={`mr-1 h-3 w-3 ${stat.urgent ? "text-red-500" : "text-green-500"}`} />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    <span className={stat.trend === "up" && stat.urgent ? "text-red-500" : stat.trend === "up" ? "text-green-500" : "text-green-500"}>
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
                    activity.status === 'urgent' ? 'bg-red-500 animate-pulse' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm font-medium ${activity.status === 'urgent' ? 'text-red-600' : ''}`}>
                      {activity.title}
                    </p>
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
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border-red-200 bg-red-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <ArrowUpFromLine className="h-4 w-4 text-red-500" />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-red-700">提现审核</p>
                  <p className="text-xs text-red-600">8笔待处理</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border-yellow-200 bg-yellow-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <UserCheck className="h-4 w-4 text-yellow-600" />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-yellow-700">KYC审核</p>
                  <p className="text-xs text-yellow-600">12笔待处理</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border-red-200 bg-red-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-sm font-medium text-red-700">风控审核</p>
                  <p className="text-xs text-red-600">15笔高风险</p>
                </div>
                <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <Coins className="h-4 w-4 mb-2 text-blue-500" />
                  <p className="text-sm font-medium">资金管理</p>
                  <p className="text-xs text-muted-foreground">查看钱包</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
