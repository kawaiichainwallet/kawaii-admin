import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, Check, X, Shield, Target, Activity, TrendingUp } from "lucide-react";

export default function RiskAuditPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">风控审核中心</h2>
            <p className="text-muted-foreground">
              监控和审核可疑交易，保障平台资金安全
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="mr-1 h-3 w-3" />
              15 笔高风险
            </Badge>
          </div>
        </div>

        {/* 风控统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日风控拦截</CardTitle>
              <Shield className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">45</div>
              <p className="text-xs text-muted-foreground">
                拦截金额 ¥2,345,678
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理案件</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">15</div>
              <p className="text-xs text-muted-foreground">
                高风险需审核
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">误报率</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">2.3%</div>
              <p className="text-xs text-muted-foreground">
                本月误报率
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">处理效率</CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">95.8%</div>
              <p className="text-xs text-muted-foreground">
                24小时内处理率
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 高风险交易 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              高风险交易审核
            </CardTitle>
            <CardDescription>
              需要人工审核的高风险可疑交易
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "RISK202403150001",
                  user: "张三",
                  userId: "U123456",
                  type: "提现",
                  amount: "¥50,000",
                  riskScore: 85,
                  riskReasons: ["大额提现", "新地址", "异常时间"],
                  time: "2024-03-15 02:30:25",
                  status: "pending"
                },
                {
                  id: "RISK202403150002",
                  user: "李四",
                  userId: "U789012",
                  type: "转账",
                  amount: "¥30,000",
                  riskScore: 78,
                  riskReasons: ["频繁转账", "多个接收地址"],
                  time: "2024-03-15 03:45:10",
                  status: "pending"
                },
                {
                  id: "RISK202403150003",
                  user: "王五",
                  userId: "U345678",
                  type: "充值",
                  amount: "¥100,000",
                  riskScore: 92,
                  riskReasons: ["单笔大额", "可疑来源地址", "短时间多笔"],
                  time: "2024-03-15 01:20:05",
                  status: "pending"
                },
              ].map((risk) => (
                <div key={risk.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        risk.riskScore >= 90 ? 'bg-red-500' :
                        risk.riskScore >= 70 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}>
                        {risk.riskScore}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{risk.id}</h3>
                          <Badge variant="destructive">{risk.type}</Badge>
                          <Badge
                            variant={
                              risk.riskScore >= 90 ? 'destructive' :
                              risk.riskScore >= 70 ? 'secondary' : 'outline'
                            }
                          >
                            {risk.riskScore >= 90 ? '极高风险' :
                             risk.riskScore >= 70 ? '高风险' : '中风险'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          用户：{risk.user} ({risk.userId}) | {risk.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">{risk.amount}</p>
                      <p className="text-xs text-muted-foreground">风险分数：{risk.riskScore}</p>
                    </div>
                  </div>

                  <div className="pl-15 space-y-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">风险原因：</span>
                      <div className="flex flex-wrap gap-1">
                        {risk.riskReasons.map((reason, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-red-600">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      详细分析
                    </Button>
                    <Button variant="outline" size="sm">
                      加入黑名单
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <X className="mr-2 h-4 w-4" />
                      拒绝交易
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      放行
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 风控规则触发统计 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>今日风控规则触发统计</CardTitle>
              <CardDescription>
                各类风控规则的触发情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rule: "大额交易预警", count: 28, level: "high" },
                  { rule: "异常地址检测", count: 15, level: "medium" },
                  { rule: "频繁操作预警", count: 12, level: "medium" },
                  { rule: "可疑时间交易", count: 8, level: "low" },
                  { rule: "黑名单地址", count: 3, level: "high" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        item.level === 'high' ? 'bg-red-500' :
                        item.level === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                      }`} />
                      <span className="text-sm">{item.rule}</span>
                    </div>
                    <Badge variant="outline">{item.count} 次</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>处理记录</CardTitle>
              <CardDescription>
                最近处理的风控案件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "RISK202403140089",
                    action: "放行",
                    processor: "风控专员A",
                    time: "2024-03-14 18:30",
                    result: "approved"
                  },
                  {
                    id: "RISK202403140088",
                    action: "拒绝",
                    processor: "风控专员B",
                    time: "2024-03-14 17:45",
                    result: "rejected"
                  },
                  {
                    id: "RISK202403140087",
                    action: "加入黑名单",
                    processor: "风控主管",
                    time: "2024-03-14 16:20",
                    result: "blacklisted"
                  },
                ].map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{record.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {record.processor} | {record.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        record.result === 'approved' ? 'default' :
                        record.result === 'rejected' ? 'destructive' : 'secondary'
                      }
                    >
                      {record.action}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}