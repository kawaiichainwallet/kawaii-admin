import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Thermometer, Snowflake, ArrowUpDown, Shield, AlertTriangle, TrendingUp, Eye } from "lucide-react";

export default function FundsManagementPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">资金管理中心</h2>
            <p className="text-muted-foreground">
              监控和管理平台资金，包括热钱包、冷钱包资产
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="default">
              <Shield className="mr-1 h-3 w-3" />
              资金安全
            </Badge>
          </div>
        </div>

        {/* 资金概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平台总资产</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥12,345,678</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                比昨日 +2.3%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">热钱包余额</CardTitle>
              <Thermometer className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">¥1,234,567</div>
              <p className="text-xs text-muted-foreground">
                占比 10% | 安全范围内
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">冷钱包余额</CardTitle>
              <Snowflake className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">¥11,111,111</div>
              <p className="text-xs text-muted-foreground">
                占比 90% | 安全存储
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日资金流动</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥2,456,789</div>
              <p className="text-xs text-muted-foreground">
                流入 ¥1.5M | 流出 ¥956K
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 钱包地址管理 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 热钱包 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="mr-2 h-5 w-5 text-red-500" />
                热钱包管理
              </CardTitle>
              <CardDescription>
                用于日常交易的在线钱包
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    coin: "BTC",
                    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                    balance: "12.34567890 BTC",
                    value: "¥456,789",
                    status: "active",
                    threshold: 85
                  },
                  {
                    coin: "ETH",
                    address: "0x742d35Cc6634C0532925a3b8D404c686d3b1AD23",
                    balance: "123.456789 ETH",
                    value: "¥234,567",
                    status: "active",
                    threshold: 92
                  },
                  {
                    coin: "USDT",
                    address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
                    balance: "543,210.00 USDT",
                    value: "¥543,210",
                    status: "warning",
                    threshold: 95
                  },
                ].map((wallet, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {wallet.coin}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{wallet.coin}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {wallet.address.substring(0, 10)}...{wallet.address.substring(-6)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">{wallet.balance}</p>
                      <p className="text-xs text-muted-foreground">{wallet.value}</p>
                      <div className="flex items-center space-x-1">
                        {wallet.threshold >= 95 && (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                        <Badge
                          variant={
                            wallet.status === 'warning' ? 'destructive' :
                            wallet.status === 'active' ? 'default' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {wallet.threshold}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  执行冷热转移
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 冷钱包 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Snowflake className="mr-2 h-5 w-5 text-blue-500" />
                冷钱包管理
              </CardTitle>
              <CardDescription>
                离线存储的安全钱包
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    coin: "BTC",
                    address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
                    balance: "567.89012345 BTC",
                    value: "¥21,056,789",
                    status: "secure",
                    lastUpdate: "2024-03-14"
                  },
                  {
                    coin: "ETH",
                    address: "0x8ba1f109551bD432803012645Hac136c22b25E",
                    balance: "2,345.678901 ETH",
                    value: "¥4,456,789",
                    status: "secure",
                    lastUpdate: "2024-03-14"
                  },
                  {
                    coin: "USDT",
                    address: "14qViLJfdGaP4EeHnDyJbEGQysnCpwk3gd",
                    balance: "5,600,000.00 USDT",
                    value: "¥5,600,000",
                    status: "secure",
                    lastUpdate: "2024-03-13"
                  },
                ].map((wallet, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {wallet.coin}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{wallet.coin}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {wallet.address.substring(0, 10)}...{wallet.address.substring(-6)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">{wallet.balance}</p>
                      <p className="text-xs text-muted-foreground">{wallet.value}</p>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-muted-foreground">
                          {wallet.lastUpdate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  查看详细记录
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 资金流动记录 */}
        <Card>
          <CardHeader>
            <CardTitle>今日资金流动记录</CardTitle>
            <CardDescription>
              平台资金的流入流出详细记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "FUND202403150001",
                  type: "流入",
                  source: "用户充值",
                  coin: "BTC",
                  amount: "+ 2.34567890 BTC",
                  value: "+ ¥87,654",
                  time: "2024-03-15 14:30:25",
                  status: "confirmed"
                },
                {
                  id: "FUND202403150002",
                  type: "流出",
                  source: "用户提现",
                  coin: "ETH",
                  amount: "- 12.345678 ETH",
                  value: "- ¥23,456",
                  time: "2024-03-15 13:45:10",
                  status: "confirmed"
                },
                {
                  id: "FUND202403150003",
                  type: "内部转移",
                  source: "热钱包 → 冷钱包",
                  coin: "USDT",
                  amount: "100,000.00 USDT",
                  value: "¥100,000",
                  time: "2024-03-15 12:20:05",
                  status: "pending"
                },
                {
                  id: "FUND202403150004",
                  type: "流入",
                  source: "手续费收入",
                  coin: "Multiple",
                  amount: "手续费",
                  value: "+ ¥12,345",
                  time: "2024-03-15 11:15:30",
                  status: "confirmed"
                },
              ].map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      record.type === '流入' ? 'bg-green-500' :
                      record.type === '流出' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      <ArrowUpDown className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{record.id}</p>
                        <Badge variant="outline">{record.type}</Badge>
                        <Badge variant="outline">{record.coin}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {record.source} | {record.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className={`font-medium ${
                      record.type === '流入' ? 'text-green-600' :
                      record.type === '流出' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {record.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">{record.value}</p>
                    <Badge
                      variant={record.status === 'confirmed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {record.status === 'confirmed' ? '已确认' : '处理中'}
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