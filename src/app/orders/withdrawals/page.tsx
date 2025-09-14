import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpFromLine, Eye, Check, X, Clock, AlertTriangle, User, Coins } from "lucide-react";

export default function WithdrawalsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">提现订单管理</h2>
            <p className="text-muted-foreground">
              审核和管理用户提现申请
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="mr-1 h-3 w-3" />
              8 笔待审核
            </Badge>
          </div>
        </div>

        {/* 提现统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日提现</CardTitle>
              <ArrowUpFromLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                总金额 ¥2,345,678
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审核</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <p className="text-xs text-muted-foreground">
                需要人工审核
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">审核通过率</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">95.8%</div>
              <p className="text-xs text-muted-foreground">
                本月通过率
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">风险拦截</CardTitle>
              <X className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">12</div>
              <p className="text-xs text-muted-foreground">
                今日拦截笔数
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 待审核订单 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              待审核订单
            </CardTitle>
            <CardDescription>
              需要人工审核的提现订单
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "WD202403150001",
                  user: "张三",
                  userId: "U123456",
                  amount: "¥50,000",
                  fee: "¥25",
                  address: "1A1zP1...Bhu5vN",
                  coin: "BTC",
                  time: "2024-03-15 14:30:25",
                  riskLevel: "high",
                  reason: "大额提现"
                },
                {
                  id: "WD202403150002",
                  user: "李四",
                  userId: "U789012",
                  amount: "¥30,000",
                  fee: "¥15",
                  address: "0x742d...4686",
                  coin: "ETH",
                  time: "2024-03-15 14:25:10",
                  riskLevel: "medium",
                  reason: "新地址提现"
                },
                {
                  id: "WD202403150003",
                  user: "王五",
                  userId: "U345678",
                  amount: "¥20,000",
                  fee: "¥10",
                  address: "bc1qxy...xyz",
                  coin: "BTC",
                  time: "2024-03-15 14:20:05",
                  riskLevel: "medium",
                  reason: "异地登录提现"
                },
              ].map((order) => (
                <div key={order.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                        <ArrowUpFromLine className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge
                            variant={
                              order.riskLevel === 'high' ? 'destructive' :
                              order.riskLevel === 'medium' ? 'secondary' : 'default'
                            }
                          >
                            {order.riskLevel === 'high' ? '高风险' :
                             order.riskLevel === 'medium' ? '中风险' : '低风险'}
                          </Badge>
                          <Badge variant="outline">{order.coin}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          用户：{order.user} ({order.userId}) | {order.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-lg font-bold">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">手续费：{order.fee}</p>
                    </div>
                  </div>

                  <div className="pl-13 space-y-2">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-muted-foreground">提现地址：</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">{order.address}</code>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-muted-foreground">风险原因：</span>
                      <span className="text-red-600">{order.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      查看详情
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <X className="mr-2 h-4 w-4" />
                      拒绝
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      批准
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 最近处理的订单 */}
        <Card>
          <CardHeader>
            <CardTitle>最近处理记录</CardTitle>
            <CardDescription>
              近期已审核的提现订单
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "WD202403140056",
                  user: "赵六",
                  amount: "¥8,000",
                  status: "approved",
                  processor: "管理员A",
                  time: "2024-03-14 16:45:30"
                },
                {
                  id: "WD202403140055",
                  user: "孙七",
                  amount: "¥15,000",
                  status: "rejected",
                  processor: "管理员B",
                  time: "2024-03-14 16:30:15"
                },
                {
                  id: "WD202403140054",
                  user: "周八",
                  amount: "¥3,500",
                  status: "approved",
                  processor: "管理员A",
                  time: "2024-03-14 16:15:20"
                },
              ].map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{record.id}</p>
                      <p className="text-sm text-muted-foreground">
                        用户：{record.user} | 处理人：{record.processor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{record.amount}</p>
                      <p className="text-xs text-muted-foreground">{record.time}</p>
                    </div>
                    <Badge
                      variant={record.status === 'approved' ? 'default' : 'destructive'}
                    >
                      {record.status === 'approved' ? (
                        <>
                          <Check className="mr-1 h-3 w-3" />
                          已批准
                        </>
                      ) : (
                        <>
                          <X className="mr-1 h-3 w-3" />
                          已拒绝
                        </>
                      )}
                    </Badge>
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