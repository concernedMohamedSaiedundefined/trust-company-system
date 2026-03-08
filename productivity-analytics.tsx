"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Zap,
  Award,
  BarChart3,
} from "lucide-react"

const kpiData = [
  {
    label: "إجمالي المهام المكتملة",
    value: "342",
    change: "+12.5%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    trend: "up",
  },
  {
    label: "متوسط وقت الإنجاز",
    value: "4.2 يوم",
    change: "-8%",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: "down",
  },
  {
    label: "مهام متأخرة",
    value: "12",
    change: "-25%",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    trend: "down",
  },
  {
    label: "إنتاجية الفريق",
    value: "94.3%",
    change: "+5.2%",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    trend: "up",
  },
  {
    label: "الموظفون النشطون",
    value: "18",
    change: "+3",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    trend: "up",
  },
  {
    label: "معدل الإنجاز اليومي",
    value: "28 مهمة",
    change: "+15%",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    trend: "up",
  },
]

const tasksCompletionData = [
  { month: "يناير", completed: 65, delayed: 12, pending: 8 },
  { month: "فبراير", completed: 78, delayed: 8, pending: 5 },
  { month: "مارس", completed: 82, delayed: 6, pending: 4 },
  { month: "أبريل", completed: 75, delayed: 10, pending: 7 },
  { month: "مايو", completed: 88, delayed: 5, pending: 3 },
  { month: "يونيو", completed: 92, delayed: 3, pending: 2 },
]

const employeeProductivityData = [
  { name: "أحمد محمد", completed: 45, inProgress: 8, delayed: 2 },
  { name: "علي حسن", completed: 38, inProgress: 6, delayed: 1 },
  { name: "فاطمة أحمد", completed: 52, inProgress: 5, delayed: 3 },
  { name: "سارة علي", completed: 41, inProgress: 7, delayed: 2 },
  { name: "محمود محمد", completed: 35, inProgress: 9, delayed: 4 },
]

const departmentPerformanceData = [
  { name: "التطوير", value: 35, tasks: 85 },
  { name: "التصميم", value: 28, tasks: 62 },
  { name: "الجودة", value: 18, tasks: 45 },
  { name: "الإدارة", value: 12, tasks: 28 },
  { name: "الدعم", value: 7, tasks: 18 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

export function ProductivityAnalytics() {
  const [timeRange, setTimeRange] = useState("monthly")

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">تحليلات الإنتاجية</h2>
          <p className="text-gray-600 mt-1">تقارير شاملة عن أداء الفريق والمشاريع</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40 h-11 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">أسبوعي</SelectItem>
            <SelectItem value="monthly">شهري</SelectItem>
            <SelectItem value="quarterly">ربع سنوي</SelectItem>
            <SelectItem value="yearly">سنوي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index} className="border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.change}
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Completion Over Time */}
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              إنجاز المهام الشهري
            </CardTitle>
            <CardDescription>توزيع المهام المكتملة والمتأخرة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="month" type="category" width={60} />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="مكتملة" />
                <Bar dataKey="delayed" fill="#ef4444" name="متأخرة" />
                <Bar dataKey="pending" fill="#f59e0b" name="قيد الانتظار" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              أداء الأقسام
            </CardTitle>
            <CardDescription>توزيع المهام حسب القسم</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentPerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Employee Productivity */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            إنتاجية الموظفين
          </CardTitle>
          <CardDescription>مقارنة أداء أعضاء الفريق</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={employeeProductivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="مكتملة" />
              <Bar dataKey="inProgress" fill="#3b82f6" name="قيد التنفيذ" />
              <Bar dataKey="delayed" fill="#ef4444" name="متأخرة" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary Table */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            ملخص الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold">الموظف</th>
                  <th className="text-right py-3 px-4 font-semibold">المهام المكتملة</th>
                  <th className="text-right py-3 px-4 font-semibold">معدل الإنجاز</th>
                  <th className="text-right py-3 px-4 font-semibold">متوسط الوقت</th>
                  <th className="text-right py-3 px-4 font-semibold">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {employeeProductivityData.map((employee, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{employee.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{employee.completed} مهمة</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${(employee.completed / 52) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-600">
                          {((employee.completed / 52) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {((employee.completed > 0 ? 30 / employee.completed : 0) * 24).toFixed(1)} ساعة
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          employee.completed > 40
                            ? "bg-green-100 text-green-800"
                            : employee.completed > 30
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-orange-100 text-orange-800"
                        }
                      >
                        {employee.completed > 40 ? "ممتاز" : employee.completed > 30 ? "جيد" : "متوسط"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-900">نقاط القوة</h4>
                <p className="text-sm text-green-700 mt-2">
                  فريق متميز برسة عالية في الإنجاز والالتزام بالمواعيد
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900">نقاط التحسين</h4>
                <p className="text-sm text-yellow-700 mt-2">
                  هناك 12 مهمة متأخرة تحتاج إلى متابعة فورية
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">التوصيات</h4>
                <p className="text-sm text-blue-700 mt-2">
                  زيادة استثمار الموارد في الأقسام ذات الأداء المتوسط
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
