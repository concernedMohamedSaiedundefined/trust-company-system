"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  UserCheck,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Save,
  XCircle,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Building2,
  Target,
  Activity,
  CheckCircle,
  TrendingUp,
  Users,
  Briefcase,
  Award,
} from "lucide-react"
import type { Employee, Notification } from "@/types"

interface HRManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function HRManagement({ onAddNotification }: HRManagementProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "أحمد محمد علي",
      position: "مدير المبيعات",
      department: "المبيعات",
      email: "ahmed@trust-export.com",
      phone: "+20123456789",
      hireDate: "2023-01-15",
      salary: 8000,
      status: "نشط",
      permissions: ["sales", "customers"],
      bonuses: 1000,
      deductions: 200,
      netSalary: 8800,
    },
    {
      id: 2,
      name: "فاطمة حسن محمود",
      position: "محاسبة رئيسية",
      department: "المحاسبة",
      email: "fatma@trust-export.com",
      phone: "+20109876543",
      hireDate: "2022-06-10",
      salary: 7500,
      status: "نشط",
      permissions: ["accounting", "reports"],
      bonuses: 800,
      deductions: 150,
      netSalary: 8150,
    },
    {
      id: 3,
      name: "محمد عبد الرحمن",
      position: "مسؤول المخازن",
      department: "المخازن",
      email: "mohamed@trust-export.com",
      phone: "+20111222333",
      hireDate: "2023-03-20",
      salary: 6000,
      status: "نشط",
      permissions: ["warehouse", "inventory"],
      bonuses: 500,
      deductions: 100,
      netSalary: 6400,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    hireDate: new Date().toISOString().split("T")[0],
    salary: 0,
    status: "نشط",
    permissions: [],
    bonuses: 0,
    deductions: 0,
    netSalary: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmployee: Employee = {
      ...(formData as Employee),
      id: employees.length + 1,
      netSalary: (formData.salary || 0) + (formData.bonuses || 0) - (formData.deductions || 0),
    }
    const updatedEmployees = [...employees, newEmployee]
    setEmployees(updatedEmployees)

    onAddNotification({
      userId: 1,
      title: "موظف جديد",
      message: `تم إضافة الموظف ${newEmployee.name} بنجاح`,
      type: "success",
      module: "hr",
      relatedId: newEmployee.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      hireDate: new Date().toISOString().split("T")[0],
      salary: 0,
      status: "نشط",
      permissions: [],
      bonuses: 0,
      deductions: 0,
      netSalary: 0,
    })
    setShowAddForm(false)
  }

  const handleEdit = (employee: Employee) => {
    setFormData(employee)
    setSelectedEmployee(employee)
    setShowAddForm(true)
  }

  const handleDelete = (employeeId: number) => {
    try {
      const updatedEmployees = employees.filter((e) => e.id !== employeeId)
      setEmployees(updatedEmployees)

      onAddNotification({
        userId: 1,
        title: "حذف الموظف",
        message: "تم حذف الموظف بنجاح",
        type: "success",
        module: "hr",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })
    } catch (error) {
      console.error("[HRManagement] Error deleting employee:", error)
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "حدث خطأ أثناء الحذف",
        type: "error",
        module: "hr",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const employeeStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((e) => e.status === "نشط").length,
    totalSalaries: employees.reduce((sum, emp) => sum + emp.netSalary, 0),
    avgSalary: employees.reduce((sum, emp) => sum + emp.netSalary, 0) / employees.length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">إجمالي الموظفين</p>
                <p className="text-3xl font-bold">{employeeStats.totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-pink-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">الموظفين النشطين</p>
                <p className="text-3xl font-bold">{employeeStats.activeEmployees}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الرواتب</p>
                <p className="text-3xl font-bold">${employeeStats.totalSalaries.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">متوسط الراتب</p>
                <p className="text-3xl font-bold">${employeeStats.avgSalary.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center">
            <UserCheck className="w-8 h-8 text-pink-600 ml-3" />
            إدارة الموارد البشرية
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للموظفين والرواتب والصلاحيات</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة موظف جديد"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-50 to-rose-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الموظفين بالاسم، المنصب، أو القسم..."
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
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-pink-600" />
              إضافة موظف جديد
            </CardTitle>
            <CardDescription>أدخل بيانات الموظف الجديد بدقة</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 ml-2" />
                  المعلومات الشخصية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium">
                  <User className="w-4 h-4 ml-2" />
                  اسم الموظف *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="الاسم الكامل"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center text-sm font-medium">
                  <Briefcase className="w-4 h-4 ml-2" />
                  المنصب *
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="المنصب الوظيفي"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center text-sm font-medium">
                  <Building2 className="w-4 h-4 ml-2" />
                  القسم *
                </Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl">
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="المبيعات">المبيعات</SelectItem>
                    <SelectItem value="المحاسبة">المحاسبة</SelectItem>
                    <SelectItem value="المخازن">المخازن</SelectItem>
                    <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                    <SelectItem value="التصدير">التصدير</SelectItem>
                    <SelectItem value="الإدارة العليا">الإدارة العليا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium">
                  <Mail className="w-4 h-4 ml-2" />
                  البريد الإلكتروني *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@trust-export.com"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
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
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate" className="flex items-center text-sm font-medium">
                  <Calendar className="w-4 h-4 ml-2" />
                  تاريخ التوظيف *
                </Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  المعلومات المالية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  الراتب الأساسي *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                  placeholder="0"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonuses" className="flex items-center text-sm font-medium">
                  <Award className="w-4 h-4 ml-2" />
                  البونصات والحوافز
                </Label>
                <Input
                  id="bonuses"
                  type="number"
                  value={formData.bonuses}
                  onChange={(e) => setFormData({ ...formData, bonuses: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deductions" className="flex items-center text-sm font-medium">
                  <XCircle className="w-4 h-4 ml-2" />
                  الخصومات
                </Label>
                <Input
                  id="deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => setFormData({ ...formData, deductions: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl"
                />
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
                  className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ الموظف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <UserCheck className="w-6 h-6 ml-2 text-pink-600" />
                قائمة الموظفين
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي الموظفين: {filteredEmployees.length} | نشط: {employeeStats.activeEmployees}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {employeeStats.activeEmployees} موظف نشط
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">الموظف</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المنصب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">القسم</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ التوظيف</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الراتب الأساسي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">البونصات</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الخصومات</th>
                  <th className="text-right p-4 font-semibold text-gray-700">صافي الراتب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 ml-1" />
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Briefcase className="w-4 h-4 ml-2 text-gray-400" />
                        {employee.position}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Building2 className="w-4 h-4 ml-2 text-gray-400" />
                        {employee.department}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {employee.hireDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-blue-600">${employee.salary.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${employee.bonuses.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-red-600">${employee.deductions.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-purple-600">${employee.netSalary.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={employee.status === "نشط" ? "default" : "secondary"}
                        className={
                          employee.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEmployee(employee)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <User className="w-5 h-5 ml-2" />
                                تفاصيل الموظف: {selectedEmployee?.name}
                              </DialogTitle>
                              <DialogDescription>عرض تفصيلي لبيانات الموظف</DialogDescription>
                            </DialogHeader>
                            {selectedEmployee && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الاسم</Label>
                                  <p className="text-sm">{selectedEmployee.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الوظيفة</Label>
                                  <p className="text-sm">{selectedEmployee.position}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">القسم</Label>
                                  <p className="text-sm">{selectedEmployee.department}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">البريد الإلكتروني</Label>
                                  <p className="text-sm">{selectedEmployee.email}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الهاتف</Label>
                                  <p className="text-sm">{selectedEmployee.phone}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">تاريخ الالتحاق</Label>
                                  <p className="text-sm">{selectedEmployee.hireDate}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الراتب الأساسي</Label>
                                  <p className="text-sm font-bold text-green-600">${selectedEmployee.salary.toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المكافآت</Label>
                                  <p className="text-sm font-bold text-blue-600">${selectedEmployee.bonuses.toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الخصومات</Label>
                                  <p className="text-sm font-bold text-red-600">${selectedEmployee.deductions.toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الراتب الصافي</Label>
                                  <p className="text-sm font-bold text-purple-600">${selectedEmployee.netSalary.toLocaleString()}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الحالة</Label>
                                  <Badge className={selectedEmployee.status === "نشط" ? "bg-green-500" : "bg-gray-500"}>
                                    {selectedEmployee.status}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(employee)}
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف الموظف "{employee.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(employee.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                حذف
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
