"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Receipt,
  Plus,
  Search,
  Download,
  Eye,
  Trash2,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  FileText,
  Save,
  X,
} from "lucide-react"
import type { Expense, Notification } from "@/types"

interface ExpensesManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function ExpensesManagement({ onAddNotification }: ExpensesManagementProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [formData, setFormData] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: 0,
    approvedBy: "",
    status: "قيد المراجعة",
    receipt: "",
    department: "",
    accountId: 0,
  })

  const categories = [
    "مصاريف إدارية",
    "رواتب",
    "تأمينات",
    "صيانة",
    "نقل وشحن",
    "مرافق (كهرباء، ماء، غاز)",
    "إيجارات",
    "مستلزمات مكتبية",
    "تسويق وإعلان",
    "ضيافة",
    "اتصالات",
    "أخرى",
  ]

  const departments = [
    "الإدارة العليا",
    "المبيعات",
    "المشتريات",
    "المحاسبة",
    "الشحن",
    "المخازن",
    "الموارد البشرية",
    "تكنولوجيا المعلومات",
  ]

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    } else {
      const demoExpenses: Expense[] = [
        {
          id: 1,
          date: "2024-01-15",
          category: "رواتب",
          description: "رواتب موظفي شهر يناير",
          amount: 25000,
          approvedBy: "أحمد محمد",
          status: "معتمد",
          receipt: "receipt_001.pdf",
          department: "الموارد البشرية",
          accountId: 1,
        },
        {
          id: 2,
          date: "2024-01-18",
          category: "مصاريف إدارية",
          description: "مستلزمات مكتبية",
          amount: 850,
          approvedBy: "فاطمة أحمد",
          status: "قيد المراجعة",
          receipt: "receipt_002.pdf",
          department: "الإدارة العليا",
          accountId: 1,
        },
        {
          id: 3,
          date: "2024-01-20",
          category: "تأمينات",
          description: "تأمين طبي للموظفين",
          amount: 5500,
          approvedBy: "أحمد محمد",
          status: "معتمد",
          receipt: "receipt_003.pdf",
          department: "الموارد البشرية",
          accountId: 1,
        },
      ]
      setExpenses(demoExpenses)
      localStorage.setItem("expenses", JSON.stringify(demoExpenses))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newExpense: Expense = {
      ...(formData as Expense),
      id: expenses.length + 1,
    }

    const updatedExpenses = [...expenses, newExpense]
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

    onAddNotification({
      userId: 1,
      title: "مصروف جديد",
      message: `تم إضافة مصروف بقيمة $${newExpense.amount} - ${newExpense.category}`,
      type: "success",
      module: "expenses",
      relatedId: newExpense.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "",
      description: "",
      amount: 0,
      approvedBy: "",
      status: "قيد المراجعة",
      receipt: "",
      department: "",
      accountId: 0,
    })
    setShowAddForm(false)
  }

  const deleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter((e) => e.id !== id)
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

    onAddNotification({
      userId: 1,
      title: "حذف مصروف",
      message: "تم حذف المصروف بنجاح",
      type: "info",
      module: "expenses",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const approveExpense = (id: number) => {
    const updatedExpenses = expenses.map((e) => (e.id === id ? { ...e, status: "معتمد" } : e))
    setExpenses(updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))

    onAddNotification({
      userId: 1,
      title: "اعتماد مصروف",
      message: "تم اعتماد المصروف بنجاح",
      type: "success",
      module: "expenses",
      relatedId: id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || expense.category === filterCategory
    const matchesStatus = filterStatus === "all" || expense.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    approvedExpenses: expenses.filter((e) => e.status === "معتمد").reduce((sum, exp) => sum + exp.amount, 0),
    pendingExpenses: expenses.filter((e) => e.status === "قيد المراجعة").length,
    rejectedExpenses: expenses.filter((e) => e.status === "مرفوض").length,
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">إجمالي المصروفات</p>
                <p className="text-3xl font-bold">${stats.totalExpenses.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">مصروفات معتمدة</p>
                <p className="text-3xl font-bold">${stats.approvedExpenses.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">قيد المراجعة</p>
                <p className="text-3xl font-bold">{stats.pendingExpenses}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">مرفوضة</p>
                <p className="text-3xl font-bold">{stats.rejectedExpenses}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
            <Receipt className="w-8 h-8 text-teal-600 ml-3" />
            إدارة النثريات والتأمينات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للمصروفات والنثريات والتأمينات</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "مصروف جديد"}
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المصروفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 rounded-xl"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 h-12 border-2 border-white bg-white/80 rounded-xl">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 h-12 border-2 border-white bg-white/80 rounded-xl">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="معتمد">معتمد</SelectItem>
                <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                <SelectItem value="مرفوض">مرفوض</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 px-6 bg-white/80 border-2 border-white hover:bg-white">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Expense Form */}
      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-teal-600" />
              إضافة مصروف جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">التاريخ *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">الفئة *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">المبلغ ($) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">القسم *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approvedBy">المعتمد من قبل</Label>
                  <Input
                    id="approvedBy"
                    value={formData.approvedBy}
                    onChange={(e) => setFormData({ ...formData, approvedBy: e.target.value })}
                    placeholder="اسم المعتمد"
                    className="h-12 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt">رقم الإيصال</Label>
                  <Input
                    id="receipt"
                    value={formData.receipt}
                    onChange={(e) => setFormData({ ...formData, receipt: e.target.value })}
                    placeholder="receipt_001.pdf"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="وصف تفصيلي للمصروف"
                  className="rounded-xl"
                  rows={4}
                  required
                  dir="rtl"
                />
              </div>

              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={resetForm} className="px-8 bg-transparent">
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المصروف
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Expenses Table */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <FileText className="w-6 h-6 ml-2 text-teal-600" />
            قائمة المصروفات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold">التاريخ</th>
                  <th className="text-right p-4 font-semibold">الفئة</th>
                  <th className="text-right p-4 font-semibold">الوصف</th>
                  <th className="text-right p-4 font-semibold">المبلغ</th>
                  <th className="text-right p-4 font-semibold">القسم</th>
                  <th className="text-right p-4 font-semibold">المعتمد من</th>
                  <th className="text-right p-4 font-semibold">الإيصال</th>
                  <th className="text-right p-4 font-semibold">الحالة</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr
                    key={expense.id}
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        {expense.date}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                        {expense.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs truncate">{expense.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-teal-600">${expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="p-4">{expense.department}</td>
                    <td className="p-4">{expense.approvedBy || "-"}</td>
                    <td className="p-4">
                      {expense.receipt ? (
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <FileText className="w-3 h-3 ml-1" />
                          عرض
                        </Button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={
                          expense.status === "معتمد"
                            ? "bg-green-100 text-green-800"
                            : expense.status === "قيد المراجعة"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        {expense.status === "قيد المراجعة" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => approveExpense(expense.id)}
                            className="hover:bg-green-50 hover:text-green-600"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedExpense(expense)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteExpense(expense.id)}
                          className="hover:bg-red-50 hover:text-red-600"
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
