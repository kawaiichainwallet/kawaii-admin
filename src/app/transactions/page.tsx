import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, CreditCard, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function TransactionsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">交易记录</h2>
            <p className="text-muted-foreground">
              查看和管理所有交易记录
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出数据
          </Button>
        </div>

        {/* 交易统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日交易</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,468</div>
              <p className="text-xs text-muted-foreground">
                交易总额 ¥1,234,567
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">成功率</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">
                比昨天提升 +0.3%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                需要人工审核
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">手续费收入</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥12,345</div>
              <p className="text-xs text-muted-foreground">
                今日收入
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 交易列表 */}
        <Card>
          <CardHeader>
            <CardTitle>交易列表</CardTitle>
            <CardDescription>
              系统中所有交易记录的详细信息
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
                {
                  id: "TXN001234",
                  user: "张三",
                  type: "充值",
                  amount: "¥1,000.00",
                  status: "success",
                  time: "2024-03-15 14:30:25",
                  fee: "¥2.00"
                },
                {
                  id: "TXN001235",
                  user: "李四",
                  type: "转账",
                  amount: "¥500.00",
                  status: "pending",
                  time: "2024-03-15 14:28:15",
                  fee: "¥1.50"
                },
                {
                  id: "TXN001236",
                  user: "王五",
                  type: "提现",
                  amount: "¥2,000.00",
                  status: "success",
                  time: "2024-03-15 14:25:10",
                  fee: "¥5.00"
                },
                {
                  id: "TXN001237",
                  user: "赵六",
                  type: "支付",
                  amount: "¥350.00",
                  status: "failed",
                  time: "2024-03-15 14:20:05",
                  fee: "¥0.00"
                },
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{transaction.id}</p>
                        <Badge variant="outline">{transaction.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        用户：{transaction.user} | 时间：{transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-right">
                    <div>
                      <p className="font-medium">{transaction.amount}</p>
                      <p className="text-xs text-muted-foreground">手续费：{transaction.fee}</p>
                    </div>
                    <Badge
                      variant={
                        transaction.status === 'success' ? 'default' :
                        transaction.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {transaction.status === 'success' ? '成功' :
                       transaction.status === 'pending' ? '处理中' : '失败'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      详情
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