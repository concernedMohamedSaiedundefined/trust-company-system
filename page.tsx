"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Truck,
  Package,
  Ship,
  FileText,
  Calculator,
  Warehouse,
  UserCheck,
  Scale,
  Shield,
  Receipt,
  Settings,
  PieChart,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Building2,
  FolderOpen,
  BarChart3,
  Plus,
  Edit,
  Eye,
  Download,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  User,
  Activity,
  Target,
  Globe,
  Layers,
  ArrowUp,
  ChevronRight,
  Sparkles,
  Save,
  Trash2,
  MapPin,
  CreditCard,
  Briefcase,
  MessageCircle,
  Bell,
  Clock,
} from "lucide-react"
import type {
  Customer,
  Supplier,
  Product,
  Shipment,
  Employee,
  Sale,
  Purchase,
  Notification,
  User as UserType,
} from "@/types"
import { AccountingIntegration } from "@/components/accounting/accounting-integration"
import { SupplierManagement } from "@/components/modules/supplier-management"
import { ProductsManagement } from "@/components/modules/products-management"
import { ShipmentsManagement } from "@/components/modules/shipments-management"
import { HRManagement } from "@/components/modules/hr-management"
import { InvoiceManagement } from "@/components/modules/invoice-management"
import { WarehouseManagement } from "@/components/modules/warehouse-management"
import { ReportsAnalytics } from "@/components/modules/reports-analytics"
import { FilesManagement } from "@/components/modules/files-management"
import { BankManagement } from "@/components/modules/bank-management"
import { InventoryManagement } from "@/components/modules/inventory-management"
import { PurchaseManagement } from "@/components/modules/purchase-management"
import { SalesManagement } from "@/components/modules/sales-management"
import { UserManagement } from "@/components/modules/user-management"
import { ExpensesManagement } from "@/components/modules/expenses-management"
import { ChatSystem } from "@/components/chat/chat-system"
import { LegalManagement } from "@/components/modules/legal-management"
import { FoodSafetyManagement } from "@/components/modules/food-safety-management"
import { CustomsManagement } from "@/components/modules/customs-management"
import { SettingsManagement } from "@/components/modules/settings-management"
import { ProjectsManagement } from "@/components/modules/projects-management"
import { TasksManagement } from "@/components/modules/tasks-management"
import { TimeTracking } from "@/components/modules/time-tracking"
import { ActivityTracking } from "@/components/modules/activity-tracking"

// Login Component
function LoginPage({ onLogin }: { onLogin: (user: any) => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      onLogin({
        id: 1,
        name: "أحمد محمد",
        role: "مدير عام",
        department: "الإدارة العليا",
        permissions: ["all"],
        username: "ahmed",
        email: "ahmed@trust-export.com",
        lastLogin: new Date().toLocaleString("ar-EG"),
        status: "نشط",
        isOnline: true,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400 to-yellow-500 rounded-full opacity-10 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            شركة تراست للتصدير
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">نظام المحاسبة المتكامل ✨</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-right flex items-center">
                <User className="w-4 h-4 ml-2" />
                اسم المستخدم
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                dir="rtl"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-right flex items-center">
                <Shield className="w-4 h-4 ml-2" />
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                dir="rtl"
                className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              تسجيل الدخول
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Premium Dashboard Component
function PremiumDashboard({
  customers,
  suppliers,
  products,
  shipments,
  sales,
  purchases,
}: {
  customers: Customer[]
  suppliers: Supplier[]
  products: Product[]
  shipments: Shipment[]
  sales: Sale[]
  purchases: Purchase[]
}) {
  // Calculate financial metrics
  const totalSales = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0)
  const totalPurchases = purchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0)
  const totalExpenses = purchases.reduce((sum, p) => sum + (p.tax || 0), 0)
  const netProfit = totalSales - totalPurchases - totalExpenses

  // Monthly data for charts
  const monthlyData = [
    { month: "يناير", sales: 45000, purchases: 32000, expenses: 8000 },
    { month: "فبراير", sales: 52000, purchases: 38000, expenses: 9500 },
    { month: "مارس", sales: 48000, purchases: 35000, expenses: 8500 },
    { month: "أبريل", sales: 61000, purchases: 42000, expenses: 10000 },
    { month: "مايو", sales: 55000, purchases: 40000, expenses: 9000 },
    { month: "يونيو", sales: 67000, purchases: 45000, expenses: 11000 },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-2">لوحة التحكم الرئيسية</h1>
        <p className="text-gray-600 text-lg">نظام إدارة التصدير المتكامل - شركة تراست</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">إجمالي المبيعات</p>
              <p className="text-3xl font-bold gradient-text">{(totalSales / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm font-semibold">
            <ArrowUp className="w-4 h-4 ml-1" />
            +12.5% من الشهر الماضي
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">إجمالي المشتريات</p>
              <p className="text-3xl font-bold gradient-text">{(totalPurchases / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm font-semibold">
            {purchases.length} عملية شراء
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">المصروفات</p>
              <p className="text-3xl font-bold gradient-text">{(totalExpenses / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
              <Receipt className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm font-semibold">
            ضرائب وتكاليف إضافية
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">صافي الربح</p>
              <p className={`text-3xl font-bold ${netProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                {(netProfit / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm font-semibold ${netProfit > 0 ? "text-green-600" : "text-red-600"}`}>
            <CheckCircle className="w-4 h-4 ml-1" />
            الربح النظيف
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 chart-container">
          <h3 className="text-xl font-bold text-gray-800 mb-6">المبيعات والمشتريات الشهرية</h3>
          <div className="h-72 flex items-end justify-between gap-2">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end justify-center h-64">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-1/2 hover:from-blue-600 hover:to-blue-500 transition-all duration-200 shadow-lg"
                    style={{ height: `${(data.sales / 70000) * 100}%` }}
                    title={`المبيعات: ${data.sales}`}
                  ></div>
                  <div
                    className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg w-1/2 hover:from-purple-600 hover:to-purple-500 transition-all duration-200 shadow-lg"
                    style={{ height: `${(data.purchases / 70000) * 100}%` }}
                    title={`المشتريات: ${data.purchases}`}
                  ></div>
                </div>
                <p className="text-xs font-semibold text-gray-600">{data.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3 className="text-xl font-bold text-gray-800 mb-6">توزيع الإيرادات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <p className="text-sm font-medium text-gray-700">مبيعات محلية</p>
              </div>
              <p className="text-sm font-bold text-gray-900">35%</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <p className="text-sm font-medium text-gray-700">تصدير</p>
              </div>
              <p className="text-sm font-bold text-gray-900">45%</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium text-gray-700">خدمات إضافية</p>
              </div>
              <p className="text-sm font-bold text-gray-900">20%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <Users className="w-8 h-8 text-blue-600 mb-4" />
            <p className="font-semibold text-gray-800 mb-2">إدارة العملاء</p>
            <p className="text-sm text-gray-600">{customers.length} عميل</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <Truck className="w-8 h-8 text-purple-600 mb-4" />
            <p className="font-semibold text-gray-800 mb-2">إدارة الموردين</p>
            <p className="text-sm text-gray-600">{suppliers.length} مورد</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <Package className="w-8 h-8 text-green-600 mb-4" />
            <p className="font-semibold text-gray-800 mb-2">المنتجات</p>
            <p className="text-sm text-gray-600">{products.length} منتج</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white/80 backdrop-blur-md">
          <CardContent className="p-6">
            <Ship className="w-8 h-8 text-orange-600 mb-4" />
            <p className="font-semibold text-gray-800 mb-2">الشحنات</p>
            <p className="text-sm text-gray-600">{shipments.length} شحنة</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Dashboard Statistics (Legacy)
function DashboardStats({
  customers,
  suppliers,
  products,
  shipments,
  sales,
  purchases,
}: {
  customers: Customer[]
  suppliers: Supplier[]
  products: Product[]
  shipments: Shipment[]
  sales: Sale[]
  purchases: Purchase[]
}) {
  const stats = [
    {
      title: "إجمالي العملاء",
      value: customers.length.toString(),
      change: "+12%",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "إجمالي المبيعات",
      value: `$${sales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}`,
      change: "+8.5%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "الشحنات النشطة",
      value: shipments.filter((s) => s.status === "في الطريق").length.toString(),
      change: `${shipments.filter((s) => s.status === "جاهز للشحن").length} جاهز للشحن`,
      icon: Ship,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "قيمة المخزون",
      value: `$${products.reduce((sum, product) => sum + product.totalValue, 0).toLocaleString()}`,
      change: `${products.filter((p) => p.status === "متاح").length} منتج متاح`,
      icon: Package,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      title: "الموردين النشطين",
      value: suppliers.length.toString(),
      change: "+5 هذا الشهر",
      icon: Truck,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: "المنتجات المتاحة",
      value: products.filter((p) => p.status === "متاح").length.toString(),
      change: `${products.filter((p) => p.status === "قريب الانتهاء").length} قريب الانتهاء`,
      icon: Layers,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      title: "صافي الربح",
      value: `$${(sales.reduce((sum, sale) => sum + sale.totalAmount, 0) - purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0)).toLocaleString()}`,
      change: "+15.2%",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "المستحقات",
      value: `$${customers.reduce((sum, customer) => sum + customer.remaining, 0).toLocaleString()}`,
      change: `${customers.filter((c) => c.remaining > 0).length} عميل`,
      icon: AlertTriangle,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
              <p className="text-xs text-gray-500 flex items-center">
                <ArrowUp className="w-3 h-3 text-green-500 ml-1" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Sidebar Navigation
function Sidebar({
  activeModule,
  setActiveModule,
  notifications,
  onOpenChat,
}: {
  activeModule: string
  setActiveModule: (module: string) => void
  notifications: Notification[]
  onOpenChat: () => void
}) {
  const modules = [
    { id: "dashboard", name: "الرئيسية", icon: BarChart3, color: "text-blue-600" },
    { id: "projects", name: "إدارة المشاريع", icon: Briefcase, color: "text-indigo-600" },
    { id: "tasks", name: "إدارة المهام", icon: CheckCircle, color: "text-green-600" },
    { id: "timeTracking", name: "تتبع الوقت", icon: Clock, color: "text-orange-600" },
    { id: "activities", name: "تتبع النشاطات", icon: Activity, color: "text-red-600" },
    { id: "customers", name: "إدارة العملاء", icon: Users, color: "text-green-600" },
    { id: "suppliers", name: "إدارة الموردين", icon: Truck, color: "text-purple-600" },
    { id: "products", name: "المنتجات والمحاصيل", icon: Package, color: "text-orange-600" },
    { id: "shipments", name: "الشحنات والتصدير", icon: Ship, color: "text-cyan-600" },
    { id: "invoices", name: "إدارة الفواتير", icon: FileText, color: "text-blue-700" },
    { id: "customs", name: "التخليص الجمركي", icon: FileText, color: "text-indigo-600" },
    { id: "accounting", name: "الحسابات العامة", icon: Calculator, color: "text-red-600" },
    { id: "warehouse", name: "إدارة المخازن", icon: Warehouse, color: "text-yellow-600" },
    { id: "hr", name: "الموارد البشرية", icon: UserCheck, color: "text-pink-600" },
    { id: "legal", name: "الشؤون القانونية", icon: Scale, color: "text-gray-600" },
    { id: "safety", name: "سلامة الغذاء", icon: Shield, color: "text-emerald-600" },
    { id: "expenses", name: "النثريات والتأمينات", icon: Receipt, color: "text-teal-600" },
    { id: "users", name: "إدارة المستخدمين", icon: Settings, color: "text-slate-600" },
    { id: "sales", name: "إدارة المبيعات", icon: TrendingUp, color: "text-lime-600" },
    { id: "purchases", name: "إدارة المشتريات", icon: ShoppingCart, color: "text-violet-600" },
    { id: "inventory", name: "إدارة الجرد", icon: Layers, color: "text-rose-600" },
    { id: "banks", name: "إدارة البنوك", icon: Building2, color: "text-blue-700" },
    { id: "files", name: "الملفات والمرفقات", icon: FolderOpen, color: "text-amber-600" },
    { id: "reports", name: "التقارير والتحليلات", icon: PieChart, color: "text-fuchsia-600" },
    { id: "settings", name: "الإعدادات", icon: Settings, color: "text-purple-600" },
  ]

  const getModuleNotificationCount = (moduleId: string) => {
    return notifications.filter((n) => n.module === moduleId && !n.isRead).length
  }

  return (
    <div className="w-72 bg-white border-r border-gray-100 h-screen overflow-y-auto shadow-lg">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              تراست للتصدير
            </h2>
            <p className="text-sm text-gray-500 flex items-center">
              <Sparkles className="w-3 h-3 ml-1" />
              نظام المحاسبة المتكامل
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button
            onClick={onOpenChat}
            size="sm"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            <MessageCircle className="w-4 h-4 ml-1" />
            المحادثات
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Bell className="w-4 h-4 ml-1" />
            الإشعارات
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <Badge className="mr-1 bg-red-500 text-white">{notifications.filter((n) => !n.isRead).length}</Badge>
            )}
          </Button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = activeModule === module.id
          const notificationCount = getModuleNotificationCount(module.id)

          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center justify-between space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-right transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : module.color} transition-colors`} />
                <span className="text-sm font-medium flex-1">{module.name}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {notificationCount > 0 && <Badge className="bg-red-500 text-white text-xs">{notificationCount}</Badge>}
                {isActive && <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// Customer Management Module
function CustomerManagement({
  customers,
  setCustomers,
  sales,
  onAddNotification,
  onBack,
}: {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  sales: Sale[]
  onAddNotification: (notification: Omit<Notification, "id">) => void
  onBack: () => void
}) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: "",
    phone: "",
    country: "",
    city: "",
    email: "",
    address: "",
    businessActivity: "",
    totalInvoices: 0,
    paid: 0,
    remaining: 0,
    invoiceCount: 0,
    paymentType: "نقدي",
    lastDeal: new Date().toISOString().split("T")[0],
    creditLimit: 0,
    accountBalance: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer: Customer = {
      ...(formData as Customer),
      id: customers.length + 1,
      remaining: (formData.totalInvoices || 0) - (formData.paid || 0),
      accountBalance: (formData.paid || 0) - (formData.totalInvoices || 0),
    }
    const updatedCustomers = [...customers, newCustomer]
    setCustomers(updatedCustomers)
    localStorage.setItem("customers", JSON.stringify(updatedCustomers))

    onAddNotification({
      userId: 1,
      title: "عميل جديد",
      message: `تم إضافة العميل ${newCustomer.name} بنجاح`,
      type: "success",
      module: "customers",
      relatedId: newCustomer.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setFormData({
      name: "",
      phone: "",
      country: "",
      city: "",
      email: "",
      address: "",
      businessActivity: "",
      totalInvoices: 0,
      paid: 0,
      remaining: 0,
      invoiceCount: 0,
      paymentType: "نقدي",
      lastDeal: new Date().toISOString().split("T")[0],
      creditLimit: 0,
      accountBalance: 0,
    })
    setShowAddForm(false)
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const customerStats = {
    totalCustomers: customers.length,
    totalInvoices: customers.reduce((sum, customer) => sum + customer.totalInvoices, 0),
    totalPaid: customers.reduce((sum, customer) => sum + customer.paid, 0),
    totalRemaining: customers.reduce((sum, customer) => sum + customer.remaining, 0),
    activeCustomers: customers.filter((c) => c.remaining > 0).length,
    completedCustomers: customers.filter((c) => c.remaining === 0).length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي العملاء</p>
                <p className="text-3xl font-bold">{customerStats.totalCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">إجمالي الفواتير</p>
                <p className="text-3xl font-bold">${customerStats.totalInvoices.toLocaleString()}</p>
              </div>
              <FileText className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">المبلغ المحصل</p>
                <p className="text-3xl font-bold">${customerStats.totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">المستحقات</p>
                <p className="text-3xl font-bold">${customerStats.totalRemaining.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <Users className="w-8 h-8 text-blue-600 ml-3" />
            إدارة العملاء
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع عملاء الشركة مع تتبع المدفوعات والمستحقات</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة عميل جديد"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في العملاء بالاسم، الهاتف، أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl"
                dir="rtl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
            >
              <Filter className="w-4 h-4 ml-2" />
              فلترة متقدمة
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-blue-600" />
              إضافة عميل جديد
            </CardTitle>
            <CardDescription>أدخل بيانات العميل الجديد بدقة لضمان المتابعة الصحيحة</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 ml-2" />
                  المعلومات الأساسية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium">
                  <Building2 className="w-4 h-4 ml-2" />
                  اسم العميل / الشركة *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="اسم العميل أو الشركة"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm font-medium">
                  <Phone className="w-4 h-4 ml-2" />
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20123456789"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium">
                  <Mail className="w-4 h-4 ml-2" />
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@company.com"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center text-sm font-medium">
                  <Globe className="w-4 h-4 ml-2" />
                  الدولة *
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="مصر"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 ml-2" />
                  المدينة *
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="القاهرة"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessActivity" className="flex items-center text-sm font-medium">
                  <Briefcase className="w-4 h-4 ml-2" />
                  النشاط التجاري
                </Label>
                <Input
                  id="businessActivity"
                  value={formData.businessActivity}
                  onChange={(e) => setFormData({ ...formData, businessActivity: e.target.value })}
                  placeholder="استيراد وتوزيع"
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  المعلومات المالية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalInvoices" className="flex items-center text-sm font-medium">
                  <FileText className="w-4 h-4 ml-2" />
                  إجمالي الفواتير
                </Label>
                <Input
                  id="totalInvoices"
                  type="number"
                  value={formData.totalInvoices}
                  onChange={(e) => setFormData({ ...formData, totalInvoices: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paid" className="flex items-center text-sm font-medium">
                  <CheckCircle className="w-4 h-4 ml-2" />
                  المبلغ المدفوع
                </Label>
                <Input
                  id="paid"
                  type="number"
                  value={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditLimit" className="flex items-center text-sm font-medium">
                  <CreditCard className="w-4 h-4 ml-2" />
                  الحد الائتماني
                </Label>
                <Input
                  id="creditLimit"
                  type="number"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentType" className="flex items-center text-sm font-medium">
                  <CreditCard className="w-4 h-4 ml-2" />
                  نوع الدفع
                </Label>
                <Select
                  value={formData.paymentType}
                  onValueChange={(value) => setFormData({ ...formData, paymentType: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                    <SelectValue placeholder="اختر نوع الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نقدي">نقدي</SelectItem>
                    <SelectItem value="آجل">آجل</SelectItem>
                    <SelectItem value="مختلط">مختلط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center text-sm font-medium">
                    <MapPin className="w-4 h-4 ml-2" />
                    العنوان التفصيلي
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="العنوان التفصيلي للعميل"
                    dir="rtl"
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    rows={3}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 rounded-xl"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ العميل
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Users className="w-6 h-6 ml-2 text-blue-600" />
                قائمة العملاء
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي العملاء: {filteredCustomers.length} | نشط: {customerStats.activeCustomers} | مكتمل:{" "}
                {customerStats.completedCustomers}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {customerStats.activeCustomers} عميل لديه مستحقات
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <CheckCircle className="w-3 h-3 ml-1" />
                {customerStats.completedCustomers} عميل مسدد بالكامل
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">العميل</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الهاتف</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الدولة/المدينة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">إجمالي الفواتير</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المدفوع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المتبقي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">رصيد الحساب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">نوع الدفع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">آخر تعامل</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 ml-1" />
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Phone className="w-4 h-4 ml-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Globe className="w-4 h-4 ml-2 text-gray-400" />
                        {customer.country} / {customer.city}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-blue-600">${customer.totalInvoices.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${customer.paid.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${customer.remaining > 0 ? "text-red-600" : "text-green-600"}`}>
                        ${customer.remaining.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${customer.accountBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${customer.accountBalance.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={customer.paymentType === "نقدي" ? "default" : "secondary"}
                        className={
                          customer.paymentType === "نقدي"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }
                      >
                        {customer.paymentType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {customer.lastDeal}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCustomer(customer)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main App Component
export default function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [activeModule, setActiveModule] = useState("dashboard")
  const [showChat, setShowChat] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Data states
  const [customers, setCustomers] = useState<Customer[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const [purchases, setPurchases] = useState<Purchase[]>([])

  const handleBackToDashboard = () => {
    setActiveModule("dashboard")
  }

  useEffect(() => {
    // Initialize demo data
    const initializeData = () => {
      // Initialize customers with account balance
      const demoCustomers: Customer[] = [
        {
          id: 1,
          name: "شركة الأهرام للتجارة",
          phone: "+20123456789",
          country: "مصر",
          city: "القاهرة",
          email: "info@ahram-trade.com",
          address: "شارع التحرير، القاهرة",
          businessActivity: "استيراد وتوزيع",
          totalInvoices: 125000,
          paid: 95000,
          remaining: 30000,
          invoiceCount: 15,
          paymentType: "آجل",
          lastDeal: "2024-01-15",
          creditLimit: 50000,
          accountBalance: -30000,
        },
        {
          id: 2,
          name: "مؤسسة الخليج التجارية",
          phone: "+966501234567",
          country: "السعودية",
          city: "الرياض",
          email: "gulf@trade.sa",
          address: "حي الملك فهد، الرياض",
          businessActivity: "تجارة المواد الغذائية",
          totalInvoices: 89000,
          paid: 89000,
          remaining: 0,
          invoiceCount: 8,
          paymentType: "نقدي",
          lastDeal: "2024-01-20",
          creditLimit: 30000,
          accountBalance: 0,
        },
      ]

      // Initialize suppliers with account balance
      const demoSuppliers: Supplier[] = [
        {
          id: 1,
          name: "مزرعة الوادي الأخضر",
          supplyType: "خضروات وفواكه",
          phone: "+20101234567",
          email: "info@greenvalley.com",
          address: "الوادي الجديد، مصر",
          commercialRegister: "CR123456789",
          taxNumber: "TAX987654321",
          totalSupplies: 250000,
          paid: 200000,
          remaining: 50000,
          paymentType: "آجل",
          discounts: 5000,
          bonuses: 2000,
          contracts: ["contract1.pdf", "contract2.pdf"],
          invoices: ["invoice1.pdf", "invoice2.pdf"],
          qualityTests: ["test1.pdf", "test2.pdf"],
          accountBalance: 50000,
        },
        {
          id: 2,
          name: "شركة النيل للمنتجات الزراعية",
          supplyType: "محاصيل زراعية",
          phone: "+20109876543",
          email: "supplies@nileagri.com",
          address: "دمياط، مصر",
          commercialRegister: "CR456789123",
          taxNumber: "TAX123456789",
          totalSupplies: 180000,
          paid: 180000,
          remaining: 0,
          paymentType: "نقدي",
          discounts: 3000,
          bonuses: 1500,
          contracts: ["contract3.pdf"],
          invoices: ["invoice3.pdf", "invoice4.pdf"],
          qualityTests: ["test3.pdf"],
          accountBalance: 0,
        },
      ]

      // Initialize products with enhanced pricing
      const demoProducts: Product[] = [
        {
          id: 1,
          name: "طماطم طازجة",
          category: "خضروات",
          type: "طماطم",
          origin: "مصر",
          quantity: 500,
          unit: "كيلو",
          pricePerUnit: 2.5,
          totalValue: 1250,
          expiryDate: "2024-02-15",
          qualityGrade: "A+",
          supplier: "مزرعة الوادي الأخضر",
          location: "مخزن رقم 1",
          status: "متاح",
          costPrice: 2.0,
          sellingPrice: 3.0,
          profitMargin: 1.0,
        },
        {
          id: 2,
          name: "بطاطس",
          category: "خضروات",
          type: "بطاطس",
          origin: "مصر",
          quantity: 50,
          unit: "كيلو",
          pricePerUnit: 1.8,
          totalValue: 90,
          expiryDate: "2024-03-01",
          qualityGrade: "A",
          supplier: "شركة النيل للمنتجات الزراعية",
          location: "مخزن رقم 2",
          status: "قريب الانتهاء",
          costPrice: 1.5,
          sellingPrice: 2.2,
          profitMargin: 0.7,
        },
      ]

      // Initialize shipments with enhanced costs
      const demoShipments: Shipment[] = [
        {
          id: 1,
          shipmentNumber: "SH-2024-001",
          customer: "شركة الأهرام للتجارة",
          destination: "القاهرة، مصر",
          products: ["طماطم طازجة", "بطاطس"],
          totalValue: 15000,
          weight: 2500,
          status: "في الطريق",
          shippingDate: "2024-01-10",
          estimatedArrival: "2024-01-12",
          transportCompany: "شركة النقل السريع",
          trackingNumber: "TRK123456789",
          documents: ["فاتورة.pdf", "بوليصة شحن.pdf"],
          shippingCost: 500,
          insuranceCost: 200,
          customsCost: 300,
          totalCost: 1000,
        },
        {
          id: 2,
          shipmentNumber: "SH-2024-002",
          customer: "مؤسسة الخليج التجارية",
          destination: "الرياض، السعودية",
          products: ["خضروات مشكلة"],
          totalValue: 25000,
          weight: 3000,
          status: "جاهز للشحن",
          shippingDate: "2024-01-15",
          estimatedArrival: "2024-01-18",
          transportCompany: "شركة الشحن الدولي",
          trackingNumber: "TRK987654321",
          documents: ["فاتورة.pdf", "شهادة منشأ.pdf"],
          shippingCost: 800,
          insuranceCost: 300,
          customsCost: 400,
          totalCost: 1500,
        },
      ]

      // Initialize sales
      const demoSales: Sale[] = [
        {
          id: 1,
          saleNumber: "SAL-2024-001",
          customer: "شركة الأهرام للتجارة",
          customerId: 1,
          products: [{ productId: 1, productName: "طماطم طازجة", quantity: 100, unitPrice: 3.0, total: 300 }],
          subtotal: 300,
          discount: 10,
          tax: 15,
          totalAmount: 305,
          paymentMethod: "آجل",
          saleDate: "2024-01-15",
          salesperson: "فاطمة أحمد",
          status: "مكتمل",
          paidAmount: 200,
          remainingAmount: 105,
        },
        {
          id: 2,
          saleNumber: "SAL-2024-002",
          customer: "مؤسسة الخليج التجارية",
          customerId: 2,
          products: [{ productId: 2, productName: "بطاطس", quantity: 50, unitPrice: 2.2, total: 110 }],
          subtotal: 110,
          discount: 5,
          tax: 5.25,
          totalAmount: 110.25,
          paymentMethod: "نقدي",
          saleDate: "2024-01-20",
          salesperson: "أحمد محمد",
          status: "مكتمل",
          paidAmount: 110.25,
          remainingAmount: 0,
        },
      ]

      // Initialize purchases
      const demoPurchases: Purchase[] = [
        {
          id: 1,
          purchaseNumber: "PUR-2024-001",
          supplier: "مزرعة الوادي الأخضر",
          supplierId: 1,
          products: [{ productId: 1, productName: "طماطم طازجة", quantity: 500, unitPrice: 2.0, total: 1000 }],
          subtotal: 1000,
          discount: 50,
          tax: 47.5,
          totalAmount: 997.5,
          paymentMethod: "آجل",
          purchaseDate: "2024-01-05",
          buyer: "عمر حسن",
          status: "مكتمل",
          paidAmount: 800,
          remainingAmount: 197.5,
        },
        {
          id: 2,
          purchaseNumber: "PUR-2024-002",
          supplier: "شركة النيل للمنتجات الزراعية",
          supplierId: 2,
          products: [{ productId: 2, productName: "بطاطس", quantity: 100, unitPrice: 1.5, total: 150 }],
          subtotal: 150,
          discount: 10,
          tax: 7,
          totalAmount: 147,
          paymentMethod: "نقدي",
          purchaseDate: "2024-01-08",
          buyer: "سارة علي",
          status: "مكتمل",
          paidAmount: 147,
          remainingAmount: 0,
        },
      ]

      // Initialize notifications
      const demoNotifications: Notification[] = [
        {
          id: 1,
          userId: 1,
          title: "شحنة جديدة",
          message: "تم إضافة شحنة جديدة رقم SH-2024-001",
          type: "info",
          module: "shipments",
          relatedId: 1,
          timestamp: "2024-01-20 10:30",
          isRead: false,
          priority: "medium",
        },
        {
          id: 2,
          userId: 1,
          title: "مستحقات عميل",
          message: "العميل شركة الأهرام للتجارة لديه مستحقات $30,000",
          type: "warning",
          module: "customers",
          relatedId: 1,
          timestamp: "2024-01-20 09:15",
          isRead: false,
          priority: "high",
        },
      ]

      setCustomers(demoCustomers)
      setSuppliers(demoSuppliers)
      setProducts(demoProducts)
      setShipments(demoShipments)
      setSales(demoSales)
      setPurchases(demoPurchases)
      setNotifications(demoNotifications)

      // Save to localStorage
      localStorage.setItem("customers", JSON.stringify(demoCustomers))
      localStorage.setItem("suppliers", JSON.stringify(demoSuppliers))
      localStorage.setItem("products", JSON.stringify(demoProducts))
      localStorage.setItem("shipments", JSON.stringify(demoShipments))
      localStorage.setItem("sales", JSON.stringify(demoSales))
      localStorage.setItem("purchases", JSON.stringify(demoPurchases))
      localStorage.setItem("notifications", JSON.stringify(demoNotifications))
    }

    // Load data from localStorage or initialize with demo data
    const savedCustomers = localStorage.getItem("customers")
    const savedSuppliers = localStorage.getItem("suppliers")
    const savedProducts = localStorage.getItem("products")
    const savedShipments = localStorage.getItem("shipments")
    const savedSales = localStorage.getItem("sales")
    const savedPurchases = localStorage.getItem("purchases")
    const savedNotifications = localStorage.getItem("notifications")

    if (savedCustomers && savedSuppliers && savedProducts && savedShipments && savedSales && savedPurchases) {
      setCustomers(JSON.parse(savedCustomers))
      setSuppliers(JSON.parse(savedSuppliers))
      setProducts(JSON.parse(savedProducts))
      setShipments(JSON.parse(savedShipments))
      setSales(JSON.parse(savedSales))
      setPurchases(JSON.parse(savedPurchases))
      setNotifications(savedNotifications ? JSON.parse(savedNotifications) : [])
    } else {
      initializeData()
    }
  }, [])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification: Notification = {
      ...notification,
      id: notifications.length + 1,
    }
    const updatedNotifications = [newNotification, ...notifications]
    setNotifications(updatedNotifications)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  }

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <PremiumDashboard
            customers={customers}
            suppliers={suppliers}
            products={products}
            shipments={shipments}
            sales={sales}
            purchases={purchases}
          />
        )
      case "projects":
        return <ProjectsManagement onAddNotification={addNotification} />
      case "tasks":
        return <TasksManagement onAddNotification={addNotification} />
      case "timeTracking":
        return <TimeTracking onAddNotification={addNotification} />
      case "activities":
        return <ActivityTracking onAddNotification={addNotification} />
      case "customers":
        return (
          <CustomerManagement
            customers={customers}
            setCustomers={setCustomers}
            sales={sales}
            onAddNotification={addNotification}
            onBack={handleBackToDashboard}
          />
        )
      case "suppliers":
        return <SupplierManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "products":
        return <ProductsManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "shipments":
        return <ShipmentsManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "invoices":
        return <InvoiceManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "hr":
        return <HRManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "warehouse":
        return <WarehouseManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "banks":
        return <BankManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "inventory":
        return <InventoryManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "purchases":
        return <PurchaseManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "sales":
        return <SalesManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "users":
        return <UserManagement onAddNotification={addNotification} currentUser={user} onBack={handleBackToDashboard} />
      case "expenses":
        return <ExpensesManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "customs":
        return <CustomsManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "accounting":
        return (
          <AccountingIntegration
            customers={customers}
            suppliers={suppliers}
            sales={sales}
            purchases={purchases}
            shipments={shipments}
            onBack={handleBackToDashboard}
          />
        )
      case "legal":
        return <LegalManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "safety":
        return <FoodSafetyManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "files":
        return <FilesManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "reports":
        return <ReportsAnalytics onAddNotification={addNotification} onBack={handleBackToDashboard} />
      case "settings":
        return <SettingsManagement onAddNotification={addNotification} onBack={handleBackToDashboard} />
      default:
        return null
    }
  }

  return (
    <div className="dashboard-layout" dir="rtl">
      <div className="sidebar-fixed">
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          notifications={notifications}
          onOpenChat={() => setShowChat(true)}
        />
      </div>
      <main className="main-content overflow-x-hidden">
        {renderModule()}
      </main>
      {showChat && <ChatSystem currentUser={user} onClose={() => setShowChat(false)} />}
    </div>
  )
}
