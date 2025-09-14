import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, Filter, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

export default function MerchantsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">商户管理</h2>
            <p className="text-muted-foreground">
              管理系统中的所有商户信息
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加商户
          </Button>
        </div>

        {/* 商户统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总商户数</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <p className="text-xs text-muted-foreground">
                比上月增长 +23
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已认证</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">398</div>
              <p className="text-xs text-muted-foreground">
                认证率 87.3%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审核</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                需要人工审核
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃商户</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                本月有交易
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 商户列表 */}
        <Card>
          <CardHeader>
            <CardTitle>商户列表</CardTitle>
            <CardDescription>
              系统中所有商户的详细信息和状态
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
                  id: "M001",
                  name: "ABC科技公司",
                  contact: "张经理",
                  phone: "138****8888",
                  email: "abc@company.com",
                  status: "verified",
                  joinDate: "2024-01-15",
                  transactionCount: 1234,
                  revenue: "¥123,456"
                },
                {
                  id: "M002",
                  name: "XYZ商贸有限公司",
                  contact: "李总",
                  phone: "139****9999",
                  email: "xyz@trade.com",
                  status: "pending",
                  joinDate: "2024-03-10",
                  transactionCount: 0,
                  revenue: "¥0"
                },
                {
                  id: "M003",
                  name: "星空网络科技",
                  contact: "王总监",
                  phone: "137****7777",
                  email: "info@starnet.com",
                  status: "verified",
                  joinDate: "2023-12-20",
                  transactionCount: 2567,
                  revenue: "¥234,567"
                },
                {
                  id: "M004",
                  name: "未来电商平台",
                  contact: "赵主任",
                  phone: "136****6666",
                  email: "future@ecom.com",
                  status: "suspended",
                  joinDate: "2024-02-05",
                  transactionCount: 456,
                  revenue: "¥45,678"
                },
              ].map((merchant) => (
                <div key={merchant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{merchant.name}</h3>
                        <Badge variant="outline">{merchant.id}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        联系人：{merchant.contact} | {merchant.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {merchant.email} | 加入时间：{merchant.joinDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-right">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{merchant.transactionCount} 笔交易</p>
                      <p className="text-xs text-muted-foreground">收入：{merchant.revenue}</p>
                    </div>
                    <Badge
                      variant={
                        merchant.status === 'verified' ? 'default' :
                        merchant.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {merchant.status === 'verified' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {merchant.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {merchant.status === 'suspended' && <XCircle className="mr-1 h-3 w-3" />}
                      {merchant.status === 'verified' ? '已认证' :
                       merchant.status === 'pending' ? '待审核' : '已暂停'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      查看
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