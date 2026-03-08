"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  BarChart3,
  TrendingUp,
  DollarSign,
  Download,
  Filter,
  Users,
  Package,
  Ship,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { Notification } from "@/types"

interface ReportsAnalyticsProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function ReportsAnalytics({ onAddNotification }: ReportsAnalyticsProps) {
  const [selectedReport, setSelectedReport] = useState("financial")
  const [timePeriod, setTimePeriod] = useState("month")

  // Financial Data
  const financialData = [
    { month: "يناير", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "فبراير", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "مارس", revenue: 48000, expenses: 33000, profit: 15000 },
    { month: "أبريل", revenue: 61000, expenses: 38000, profit: 23000 },
    { month: "مايو", revenue: 55000, expenses: 36000, profit: 19000 },
    { month: "يونيو", revenue: 67000, expenses: 40000, profit: 27000 },
  ]

  // Sales Data
  const salesData = [
    { name: "شركة الأهرام", value: 125000 },
    { name: "مؤسسة الخليج", value: 89000 },
    { name: "شركة النيل", value: 67000 },
    { name: "شركة الصفا", value: 54000 },
    { name: "مؤسسة الفجر", value: 43000 },
  ]

  // Inventory Data
  const inventoryData = [
    { category: "خضروات", value: 45000, items: 15 },
    { category: "فواكه", value: 38000, items: 12 },
    { category: "محاصيل", value: 52000, items: 18 },
    { category: "بقوليات", value: 29000, items: 8 },
  ]

  // Customer Distribution
  const customerData = [
    { country: "مصر", customers: 45 },
    { country: "السعودية", customers: 32 },
    { country: "الإمارات", customers: 28 },
    { country: "الكويت", customers: 15 },
    { country: "قطر", customers: 12 },
  ]

  // Shipments Data
  const shipmentsData = [
    { month: "يناير", shipments: 45, delivered: 42, pending: 3 },
    { month: "فبراير", shipments: 52, delivered: 50, pending: 2 },
    { month: "مارس", shipments: 48, delivered: 45, pending: 3 },
    { month: "أبريل", shipments: 61, delivered: 58, pending: 3 },
    { month: "مايو", shipments: 55, delivered: 52, pending: 3 },
    { month: "يونيو", shipments: 67, delivered: 65, pending: 2 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  const handleExport = (format: string) => {
    onAddNotification({
      userId: 1,
      title: "تصدير التقرير",
      message: `تم تصدير التقرير بصيغة ${format} بنجاح`,
      type: "success",
      module: "reports",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold">$328K</p>
                <p className="text-sm mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 ml-1" />
                  +12.5%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">صافي الربح</p>
                <p className="text-3xl font-bold">$114K</p>
                <p className="text-sm mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 ml-1" />
                  +8.3%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">إجمالي المصروفات</p>
                <p className="text-3xl font-bold">$214K</p>
                <p className="text-sm mt-1 flex items-center">
                  <ArrowDown className="w-3 h-3 ml-1" />
                  -3.2%
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">هامش الربح</p>
                <p className="text-3xl font-bold">34.8%</p>
                <p className="text-sm mt-1 flex items-center">
                  <ArrowUp className="w-3 h-3 ml-1" />
                  +2.1%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent flex items-center">
            <PieChart className="w-8 h-8 text-fuchsia-600 ml-3" />
            التقارير والتحليلات
          </h1>
          <p className="text-gray-600 mt-2">تقارير شاملة وتحليلات متقدمة لجميع عمليات الشركة</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="الفترة الزمنية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">اليوم</SelectItem>
              <SelectItem value="week">الأسبوع</SelectItem>
              <SelectItem value="month">الشهر</SelectItem>
              <SelectItem value="quarter">الربع</SelectItem>
              <SelectItem value="year">السنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 ml-2" />
            فلترة
          </Button>
          <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600" onClick={() => handleExport("PDF")}>
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Reports Tabs */}
      <Tabs value={selectedReport} onValueChange={setSelectedReport}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financial">التقارير المالية</TabsTrigger>
          <TabsTrigger value="sales">تقارير المبيعات</TabsTrigger>
          <TabsTrigger value="inventory">تقارير المخزون</TabsTrigger>
          <TabsTrigger value="customers">تقارير العملاء</TabsTrigger>
          <TabsTrigger value="shipments">تقارير الشحنات</TabsTrigger>
        </TabsList>

        {/* Financial Reports */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 ml-2" />
                  الإيرادات والمصروفات الشهرية
                </CardTitle>
                <CardDescription>مقارنة بين الإيرادات والمصروفات خلال الأشهر الستة الماضية</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3b82f6" name="الإيرادات" />
                    <Bar dataKey="expenses" fill="#ef4444" name="المصروفات" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 ml-2" />
                  تطور صافي الربح
                </CardTitle>
                <CardDescription>تتبع صافي الربح الشهري على مدار الفترة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="profit" stroke="#10b981" fill="#10b981" name="صافي الربح" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Reports */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 ml-2" />
                  توزيع المبيعات حسب العملاء
                </CardTitle>
                <CardDescription>أفضل 5 عملاء من حيث قيمة المبيعات</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  قيمة المبيعات حسب العميل
                </CardTitle>
                <CardDescription>مقارنة بين قيم المبيعات للعملاء الرئيسيين</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#10b981" name="قيمة المبيعات" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Reports */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  توزيع المخزون حسب الفئة
                </CardTitle>
                <CardDescription>نسب المخزون المتاح في كل فئة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={inventoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percent }) => `${category} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {inventoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 ml-2" />
                  قيمة المخزون بالفئة
                </CardTitle>
                <CardDescription>مقارنة قيمة المخزون وعدد الأصناف</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="القيمة" />
                    <Bar dataKey="items" fill="#f59e0b" name="عدد الأصناف" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Reports */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 ml-2" />
                  توزيع العملاء جغرافياً
                </CardTitle>
                <CardDescription>عدد العملاء في كل دولة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="customers" fill="#8b5cf6" name="عدد العملاء" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 ml-2" />
                  نسب التوزيع الجغرافي
                </CardTitle>
                <CardDescription>النسبة المئوية للعملاء في كل دولة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ country, percent }) => `${country} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="customers"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shipments Reports */}
        <TabsContent value="shipments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ship className="w-5 h-5 ml-2" />
                  حالة الشحنات الشهرية
                </CardTitle>
                <CardDescription>عدد الشحنات المسلمة والمعلقة شهرياً</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={shipmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="shipments" stroke="#3b82f6" name="إجمالي الشحنات" />
                    <Line type="monotone" dataKey="delivered" stroke="#10b981" name="تم التسليم" />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="معلق" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 ml-2" />
                  معدل التسليم الناجح
                </CardTitle>
                <CardDescription>نسبة الشحنات المسلمة بنجاح على مدار الأشهر</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={shipmentsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="delivered"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      name="تم التسليم"
                    />
                    <Area type="monotone" dataKey="pending" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="معلق" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
