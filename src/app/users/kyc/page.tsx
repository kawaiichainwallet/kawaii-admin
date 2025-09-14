import { AdminLayout } from "@/components/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Clock, Check, X, FileText, Camera, AlertTriangle } from "lucide-react";

export default function KYCPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">KYC 身份认证管理</h2>
            <p className="text-muted-foreground">
              审核用户身份认证申请和管理认证等级
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="animate-pulse">
              <Clock className="mr-1 h-3 w-3" />
              12 笔待审核
            </Badge>
          </div>
        </div>

        {/* KYC统计 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总认证用户</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,876</div>
              <p className="text-xs text-muted-foreground">
                认证率 78.5%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待审核</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <p className="text-xs text-muted-foreground">
                平均审核时间 2.5小时
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日通过</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-xs text-muted-foreground">
                通过率 89.2%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">高级认证</CardTitle>
              <UserCheck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3,456</div>
              <p className="text-xs text-muted-foreground">
                占比 35%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 待审核KYC申请 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-yellow-500" />
              待审核 KYC 申请
            </CardTitle>
            <CardDescription>
              需要人工审核的身份认证申请
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "KYC202403150001",
                  user: "张三",
                  userId: "U123456",
                  level: "L2",
                  idNumber: "110101199001010001",
                  submitTime: "2024-03-15 10:30:25",
                  riskLevel: "low",
                  documents: ["身份证正面", "身份证反面", "手持身份证"]
                },
                {
                  id: "KYC202403150002",
                  user: "李四",
                  userId: "U789012",
                  level: "L3",
                  idNumber: "320106199201020002",
                  submitTime: "2024-03-15 09:45:10",
                  riskLevel: "medium",
                  documents: ["身份证正面", "身份证反面", "手持身份证", "银行卡", "地址证明"]
                },
                {
                  id: "KYC202403150003",
                  user: "王五",
                  userId: "U345678",
                  level: "L2",
                  idNumber: "440105199303050003",
                  submitTime: "2024-03-15 08:20:45",
                  riskLevel: "high",
                  documents: ["身份证正面", "身份证反面", "手持身份证"]
                },
              ].map((kyc) => (
                <div key={kyc.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {kyc.level}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{kyc.user}</h3>
                          <Badge variant="outline">{kyc.userId}</Badge>
                          <Badge
                            variant={
                              kyc.riskLevel === 'high' ? 'destructive' :
                              kyc.riskLevel === 'medium' ? 'secondary' : 'default'
                            }
                          >
                            {kyc.riskLevel === 'high' ? '高风险' :
                             kyc.riskLevel === 'medium' ? '中风险' : '低风险'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          申请编号：{kyc.id} | {kyc.submitTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {kyc.level} 级认证
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        身份证：{kyc.idNumber.substring(0, 6)}****{kyc.idNumber.substring(-4)}
                      </p>
                    </div>
                  </div>

                  <div className="pl-13 space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">提交材料：</span>
                      <div className="flex flex-wrap gap-1">
                        {kyc.documents.map((doc, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Camera className="mr-1 h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      查看材料
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

        {/* 认证等级说明 */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-green-500" />
                L1 基础认证
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">手机号 + 邮箱认证</p>
              <div className="space-y-1 text-xs">
                <p>• 单笔限额：¥1,000</p>
                <p>• 日限额：¥5,000</p>
                <p>• 月限额：¥50,000</p>
              </div>
              <Badge variant="outline" className="text-xs">
                12,345 用户
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-blue-500" />
                L2 身份认证
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">身份证 + 人脸识别</p>
              <div className="space-y-1 text-xs">
                <p>• 单笔限额：¥10,000</p>
                <p>• 日限额：¥100,000</p>
                <p>• 月限额：¥1,000,000</p>
              </div>
              <Badge variant="outline" className="text-xs">
                6,531 用户
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-purple-500" />
                L3 高级认证
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">银行卡 + 地址证明</p>
              <div className="space-y-1 text-xs">
                <p>• 单笔限额：¥100,000</p>
                <p>• 日限额：¥1,000,000</p>
                <p>• 月限额：无限制</p>
              </div>
              <Badge variant="outline" className="text-xs">
                3,456 用户
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}