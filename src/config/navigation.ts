import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  FileText,
  Settings,
  Shield,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  UserCheck,
  Eye,
  AlertTriangle,
  DollarSign,
  Calculator,
  Receipt,
  TrendingUp,
  Database,
  Key,
  Server,
  BarChart3,
  PieChart,
  Activity,
  Coins,
  HandCoins,
  ShieldCheck,
  Target,
  BookOpen,
  Gauge
} from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
  permission?: string; // 权限标识
  urgent?: boolean;    // 紧急标识
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    title: "运营概览",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "用户中心",
    href: "/users",
    icon: Users,
    children: [
      {
        title: "用户管理",
        href: "/users",
        icon: Users,
      },
      {
        title: "KYC 管理",
        href: "/users/kyc",
        icon: UserCheck,
        badge: "12",
      },
      {
        title: "用户资产",
        href: "/users/assets",
        icon: Wallet,
      },
    ],
  },
  {
    title: "订单中心",
    href: "/orders",
    icon: Receipt,
    children: [
      {
        title: "充值订单",
        href: "/orders/deposits",
        icon: ArrowDownToLine,
        badge: "5",
      },
      {
        title: "提现订单",
        href: "/orders/withdrawals",
        icon: ArrowUpFromLine,
        badge: "8",
        urgent: true,
      },
      {
        title: "转账记录",
        href: "/orders/transfers",
        icon: RefreshCw,
      },
      {
        title: "交易记录",
        href: "/orders/transactions",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "商户中心",
    href: "/merchants",
    icon: Building2,
    children: [
      {
        title: "商户管理",
        href: "/merchants",
        icon: Building2,
      },
      {
        title: "商户审核",
        href: "/merchants/review",
        icon: Eye,
        badge: "3",
      },
      {
        title: "商户资产",
        href: "/merchants/assets",
        icon: HandCoins,
      },
    ],
  },
  {
    title: "风控中心",
    href: "/risk",
    icon: Shield,
    permission: "risk_management",
    children: [
      {
        title: "风控审核",
        href: "/risk/audit",
        icon: AlertTriangle,
        badge: "15",
        urgent: true,
        permission: "risk_audit",
      },
      {
        title: "反洗钱管理",
        href: "/risk/aml",
        icon: ShieldCheck,
        badge: "2",
        permission: "aml_management",
      },
      {
        title: "安全管理",
        href: "/risk/security",
        icon: Shield,
        permission: "security_management",
      },
      {
        title: "规则配置",
        href: "/risk/rules",
        icon: Target,
        permission: "risk_rules",
      },
    ],
  },
  {
    title: "财务中心",
    href: "/finance",
    icon: DollarSign,
    permission: "finance_management",
    children: [
      {
        title: "资金管理",
        href: "/finance/funds",
        icon: Coins,
        permission: "fund_management",
      },
      {
        title: "对账中心",
        href: "/finance/reconciliation",
        icon: Calculator,
        permission: "reconciliation",
      },
      {
        title: "手续费管理",
        href: "/finance/fees",
        icon: Receipt,
        permission: "fee_management",
      },
      {
        title: "财务报表",
        href: "/finance/reports",
        icon: FileText,
        permission: "finance_reports",
      },
    ],
  },
  {
    title: "系统管理",
    href: "/system",
    icon: Settings,
    permission: "system_management",
    children: [
      {
        title: "权限管理",
        href: "/system/permissions",
        icon: UserCheck,
        permission: "permission_management",
      },
      {
        title: "系统配置",
        href: "/system/config",
        icon: Settings,
        permission: "system_config",
      },
      {
        title: "区块链管理",
        href: "/system/blockchain",
        icon: Server,
        permission: "blockchain_management",
      },
      {
        title: "API管理",
        href: "/system/api",
        icon: Key,
        permission: "api_management",
      },
    ],
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: BarChart3,
    children: [
      {
        title: "业务报表",
        href: "/analytics/business",
        icon: FileText,
      },
      {
        title: "运营分析",
        href: "/analytics/operations",
        icon: TrendingUp,
      },
      {
        title: "风险分析",
        href: "/analytics/risk",
        icon: Gauge,
        permission: "risk_analysis",
      },
    ],
  },
];