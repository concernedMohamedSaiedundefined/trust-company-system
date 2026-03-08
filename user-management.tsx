"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Shield,
  Activity,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Save,
  X,
  MessageCircle,
} from "lucide-react"
import type { User as UserType, Notification } from "@/types"
import { ChatSystem } from "@/components/chat/chat-system"

interface UserManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
  currentUser: UserType
}

export function UserManagement({ onAddNotification, currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<UserType[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [showChat, setShowChat] = useState(false)

  const [formData, setFormData] = useState<Partial<UserType>>({
    username: "",
    name: "",
    email: "",
    role: "",
    department: "",
    permissions: [],
    status: "نشط",
    isOnline: false,
  })

  const availablePermissions = [
    { id: "customers", name: "إدارة العملاء" },
    { id: "suppliers", name: "إدارة الموردين" },
    { id: "products", name: "إدارة المنتجات" },
    { id: "sales", name: "إدارة المبيعات" },
    { id: "purchases", name: "إدارة المشتريات" },
    { id: "inventory", name: "إدارة الجرد" },
    { id: "shipments", name: "إدارة الشحنات" },
    { id: "accounting", name: "الحسابات" },
    { id: "hr", name: "الموارد البشرية" },
    { id: "reports", name: "التقارير" },
    { id: "settings", name: "الإعدادات" },
    { id: "all", name: "صلاحيات كاملة" },
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

  const roles = [
    "مدير عام",
    "مدير قسم",
    "موظف مبيعات",
    "موظف مشتريات",
    "محاسب",
    "أمين مخزن",
    "موظف شحن",
    "موظف موارد بشرية",
  ]

  useEffect(() => {
    const savedUsers = localStorage.getItem("users")

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      const demoUsers: UserType[] = [
        {
          id: 1,
          username: "ahmed",
          name: "أحمد محمد",
          email: "ahmed@trust-export.com",
          role: "مدير عام",
          department: "الإدارة العليا",
          permissions: ["all"],
          lastLogin: "2024-01-20 10:30",
          status: "نشط",
          isOnline: true,
        },
        {
          id: 2,
          username: "fatma",
          name: "فاطمة أحمد",
          email: "fatma@trust-export.com",
          role: "مدير المبيعات",
          department: "المبيعات",
          permissions: ["customers", "sales", "reports"],
          lastLogin: "2024-01-20 09:15",
          status: "نشط",
          isOnline: true,
        },
        {
          id: 3,
          username: "omar",
          name: "عمر حسن",
          email: "omar@trust-export.com",
          role: "محاسب",
          department: "المحاسبة",
          permissions: ["accounting", "reports"],
          lastLogin: "2024-01-20 08:45",
          status: "نشط",
          isOnline: false,
        },
      ]
      setUsers(demoUsers)
      localStorage.setItem("users", JSON.stringify(demoUsers))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser: UserType = {
      ...(formData as UserType),
      id: users.length + 1,
      lastLogin: new Date().toLocaleString("ar-EG"),
      isOnline: false,
    }

    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    onAddNotification({
      userId: currentUser.id,
      title: "مستخدم جديد",
      message: `تم إضافة المستخدم ${newUser.name} بنجاح`,
      type: "success",
      module: "users",
      relatedId: newUser.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      username: "",
      name: "",
      email: "",
      role: "",
      department: "",
      permissions: [],
      status: "نشط",
      isOnline: false,
    })
    setShowAddForm(false)
  }

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    onAddNotification({
      userId: currentUser.id,
      title: "حذف مستخدم",
      message: "تم حذف المستخدم بنجاح",
      type: "info",
      module: "users",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const togglePermission = (permission: string) => {
    const currentPermissions = formData.permissions || []
    if (currentPermissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: currentPermissions.filter((p) => p !== permission),
      })
    } else {
      setFormData({
        ...formData,
        permissions: [...currentPermissions, permission],
      })
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "نشط").length,
    onlineUsers: users.filter((u) => u.isOnline).length,
    inactiveUsers: users.filter((u) => u.status === "معطل").length,
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-500 to-slate-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-100 text-sm">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-slate-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">مستخدمين نشطين</p>
                <p className="text-3xl font-bold">{stats.activeUsers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">متصلين الآن</p>
                <p className="text-3xl font-bold">{stats.onlineUsers}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">معطلين</p>
                <p className="text-3xl font-bold">{stats.inactiveUsers}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent flex items-center">
            <Settings className="w-8 h-8 text-slate-600 ml-3" />
            إدارة المستخدمين
          </h1>
          <p className="text-gray-600 mt-2">إدارة المستخدمين والصلاحيات ونظام المحادثات</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 ml-2" />
            المحادثات الجماعية
          </Button>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 shadow-lg"
          >
            <Plus className="w-4 h-4 ml-2" />
            {showAddForm ? "إلغاء" : "مستخدم جديد"}
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 rounded-xl"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 h-12 border-2 border-white bg-white/80 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="معطل">معطل</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 px-6 bg-white/80 border-2 border-white hover:bg-white">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add User Form */}
      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-slate-600" />
              إضافة مستخدم جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أحمد محمد"
                    required
                    className="h-12 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="ahmed"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ahmed@trust-export.com"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">الوظيفة *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="اختر الوظيفة" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="status">الحالة *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نشط">نشط</SelectItem>
                      <SelectItem value="معطل">معطل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Shield className="w-5 h-5 ml-2" />
                  الصلاحيات
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Checkbox
                        id={permission.id}
                        checked={formData.permissions?.includes(permission.id)}
                        onCheckedChange={() => togglePermission(permission.id)}
                      />
                      <Label htmlFor={permission.id} className="cursor-pointer">
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={resetForm} className="px-8 bg-transparent">
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المستخدم
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <Users className="w-6 h-6 ml-2 text-slate-600" />
            قائمة المستخدمين
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold">المستخدم</th>
                  <th className="text-right p-4 font-semibold">اسم المستخدم</th>
                  <th className="text-right p-4 font-semibold">الوظيفة</th>
                  <th className="text-right p-4 font-semibold">القسم</th>
                  <th className="text-right p-4 font-semibold">الصلاحيات</th>
                  <th className="text-right p-4 font-semibold">آخر تسجيل دخول</th>
                  <th className="text-right p-4 font-semibold">الحالة</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="w-3 h-3 ml-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-gray-50">
                        @{user.username}
                      </Badge>
                    </td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {user.department}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.slice(0, 2).map((perm) => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {availablePermissions.find((p) => p.id === perm)?.name || perm}
                          </Badge>
                        ))}
                        {user.permissions.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{user.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-3 h-3 ml-1" />
                        {user.lastLogin}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={user.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-green-50 hover:text-green-600 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteUser(user.id)}
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

      {/* Chat System Modal */}
      {showChat && <ChatSystem currentUser={currentUser} onClose={() => setShowChat(false)} />}
    </div>
  )
}
