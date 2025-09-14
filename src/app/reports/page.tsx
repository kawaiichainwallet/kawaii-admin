import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, BarChart3, PieChart, Users, CreditCard } from "lucide-react";

export default function ReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">数据报表</h2>
            <p className="text-muted-foreground">
              查看和分析系统的各项数据指标
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              选择时间
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              导出报表
            </Button>
          </div>
        </div>

        {/* 快速统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月新增用户</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                比上月增长 +12%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">交易总额</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥12.34M</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                比上月增长 +8.5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">手续费收入</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥123.4K</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                比上月增长 +15.3%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃度</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
                比上月提升 +2.1%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 报表列表 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 用户报表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                用户报表
              </CardTitle>
              <CardDescription>
                用户注册、活跃度等相关数据分析
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "用户注册趋势",
                  description: "按时间统计用户注册情况",
                  period: "最近30天",
                  status: "ready"
                },
                {
                  name: "用户活跃度分析",
                  description: "用户登录和操作频次统计",
                  period: "最近7天",
                  status: "ready"
                },
                {
                  name: "用户地域分布",
                  description: "按地区统计用户分布情况",
                  period: "当前月",
                  status: "generating"
                },
                {
                  name: "用户年龄结构",
                  description: "用户年龄段分布分析",
                  period: "当前月",
                  status: "ready"
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <Badge variant="outline" className="text-xs">{report.period}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                      {report.status === 'ready' ? '可下载' : '生成中'}
                    </Badge>
                    <Button variant="outline" size="sm" disabled={report.status !== 'ready'}>
                      <FileText className="mr-2 h-4 w-4" />
                      查看
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 交易报表 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                交易报表
              </CardTitle>
              <CardDescription>
                交易额、成功率等交易相关数据分析
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "交易量统计",
                  description: "按时间统计交易数量和金额",
                  period: "最近30天",
                  status: "ready"
                },
                {
                  name: "交易成功率分析",
                  description: "统计交易成功失败情况",
                  period: "最近7天",
                  status: "ready"
                },
                {
                  name: "支付方式分布",
                  description: "不同支付方式使用情况",
                  period: "当前月",
                  status: "ready"
                },
                {
                  name: "手续费收入统计",
                  description: "按时间统计手续费收入",
                  period: "当前月",
                  status: "generating"
                },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <Badge variant="outline" className="text-xs">{report.period}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.status === 'ready' ? 'default' : 'secondary'}>
                      {report.status === 'ready' ? '可下载' : '生成中'}
                    </Badge>
                    <Button variant="outline" size="sm" disabled={report.status !== 'ready'}>
                      <FileText className="mr-2 h-4 w-4" />
                      查看
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 图表展示区域 */}
        <Card>
          <CardHeader>
            <CardTitle>数据可视化</CardTitle>
            <CardDescription>
              关键指标的图表化展示
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>用户增长趋势图</p>
                  <p className="text-xs">图表组件待集成</p>
                </div>
              </div>
              <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mx-auto mb-2" />
                  <p>交易分布饼图</p>
                  <p className="text-xs">图表组件待集成</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}