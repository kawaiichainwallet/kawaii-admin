import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  FileText,
  Settings,
  ShoppingBag,
  Shield,
  BarChart3,
  UserCheck,
  Activity,
  PieChart
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    title: "仪表盘",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "用户管理",
    href: "/users",
    icon: Users,
    children: [
      {
        title: "用户列表",
        href: "/users",
        icon: Users,
      },
      {
        title: "权限管理",
        href: "/users/permissions",
        icon: UserCheck,
      },
    ],
  },
  {
    title: "交易管理",
    href: "/transactions",
    icon: CreditCard,
    children: [
      {
        title: "交易记录",
        href: "/transactions",
        icon: CreditCard,
      },
      {
        title: "交易统计",
        href: "/transactions/statistics",
        icon: Activity,
      },
    ],
  },
  {
    title: "商户管理",
    href: "/merchants",
    icon: Building2,
    children: [
      {
        title: "商户列表",
        href: "/merchants",
        icon: Building2,
      },
      {
        title: "审核管理",
        href: "/merchants/review",
        icon: Shield,
        badge: "3",
      },
    ],
  },
  {
    title: "数据报表",
    href: "/reports",
    icon: FileText,
    children: [
      {
        title: "用户报表",
        href: "/reports/users",
        icon: BarChart3,
      },
      {
        title: "交易报表",
        href: "/reports/transactions",
        icon: PieChart,
      },
    ],
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
    children: [
      {
        title: "基础配置",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "安全设置",
        href: "/settings/security",
        icon: Shield,
      },
    ],
  },
];