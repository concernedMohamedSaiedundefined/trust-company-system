"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Calendar, Clock, Users, CheckCircle, MessageSquare, Paperclip, TrendingUp } from "lucide-react"

interface ActivityLog {
  id: number
  employee: string
  date: string
  taskTitle: string
  description: string
  timeSpent: number
  status: "Completed" | "In Progress" | "Pending"
  notes: string
}

interface DailyReport {
  employee: string
  date: string
  tasksCompleted: number
  tasksInProgress: number
  totalHours: number
  activities: ActivityLog[]
}

interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  module: string
  timestamp: string
  isRead: boolean
}

const sampleActivities: ActivityLog[] = [
  {
    id: 1,
    employee: "أحمد محمد",
    date: new Date().toISOString().split("T")[0],
    taskTitle: "تصميم الواجهة الأمامية",
    description: "إكمال تصميم صفحة المنتجات",
    timeSpent: 3.5,
    status: "Completed",
    notes: "تم الانتهاء بنجاح",
  },
  {
    id: 2,
    employee: "أحمد محمد",
    date: new Date().toISOString().split("T")[0],
    taskTitle: "اختبار الواجهة",
    description: "اختبار الاستجابة على الأجهزة المختلفة",
    timeSpent: 2,
    status: "In Progress",
    notes: "قيد العمل",
  },
  {
    id: 3,
    employee: "علي حسن",
    date: new Date().toISOString().split("T")[0],
    taskTitle: "تطوير قاعدة البيانات",
    description: "إضافة جداول جديدة",
    timeSpent: 4,
    status: "Completed",
    notes: "تم الإنجاز في الموعد",
  },
]

export function ActivityTracking({
  onAddNotification,
}: {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}) {
  const [activities, setActivities] = useState<ActivityLog[]>(sampleActivities)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedEmployee, setSelectedEmployee] = useState("أحمد محمد")

  const [formData, setFormData] = useState({
    employee: "أحمد محمد",
    taskTitle: "",
    description: "",
    timeSpent: 0,
    status: "In Progress" as const,
    notes: "",
  })

  const employees = ["أحمد محمد", "علي حسن", "فاطمة أحمد", "سارة علي", "محمود محمد"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const statusLabels = {
    Completed: "مكتمل",
    "In Progress": "قيد التنفيذ",
    Pending: "قيد الانتظار",
  }

  const handleAddActivity = () => {
    setFormData({
      employee: selectedEmployee,
      taskTitle: "",
      description: "",
      timeSpent: 0,
      status: "In Progress",
      notes: "",
    })
    setShowDialog(true)
  }

  const handleSaveActivity = () => {
    if (!formData.taskTitle) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى إدخال عنوان المهمة",
        type: "error",
        module: "activities",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
      return
    }

    const newActivity: ActivityLog = {
      id: Math.max(...activities.map((a) => a.id), 0) + 1,
      ...formData,
      date: selectedDate,
    }

    setActivities([...activities, newActivity])
    onAddNotification({
      userId: 1,
      title: "نشاط جديد",
      message: `تم تسجيل نشاط جديد ل ${formData.employee}`,
      type: "success",
      module: "activities",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
    })
    setShowDialog(false)
  }

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id))
  }

  const todayActivities = activities.filter((a) => a.date === selectedDate)
  const employeeActivities = todayActivities.filter((a) => a.employee === selectedEmployee)

  const dailyReports: DailyReport[] = employees.map((employee) => {
    const employeeActs = activities.filter((a) => a.employee === employee && a.date === selectedDate)
    return {
      employee,
      date: selectedDate,
      tasksCompleted: employeeActs.filter((a) => a.status === "Completed").length,
      tasksInProgress: employeeActs.filter((a) => a.status === "In Progress").length,
      totalHours: employeeActs.reduce((sum, a) => sum + a.timeSpent, 0),
      activities: employeeActs,
    }
  })

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">تتبع نشاط الموظفين</h2>
          <p className="text-gray-600 mt-1">سجل النشاطات اليومية للموظفين</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddActivity}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 rounded-xl"
            >
              <Plus className="w-5 h-5 ml-2" />
              نشاط جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle>تسجيل نشاط جديد</DialogTitle>
              <DialogDescription>إضافة نشاط يومي للموظف</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actDate">التاريخ</Label>
                  <Input
                    id="actDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actEmployee">الموظف</Label>
                  <Select
                    value={formData.employee}
                    onValueChange={(value) => setFormData({ ...formData, employee: value })}
                  >
                    <SelectTrigger id="actEmployee" className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp} value={emp}>
                          {emp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actTask">عنوان المهمة</Label>
                <Input
                  id="actTask"
                  value={formData.taskTitle}
                  onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  placeholder="أدخل عنوان المهمة"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actDesc">الوصف</Label>
                <Textarea
                  id="actDesc"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="أدخل وصف النشاط"
                  className="rounded-lg min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actTime">الساعات المستغرقة</Label>
                  <Input
                    id="actTime"
                    type="number"
                    step="0.5"
                    value={formData.timeSpent}
                    onChange={(e) => setFormData({ ...formData, timeSpent: Number(e.target.value) })}
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actStatus">الحالة</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as "Completed" | "In Progress" | "Pending",
                      })
                    }
                  >
                    <SelectTrigger id="actStatus" className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">مكتمل</SelectItem>
                      <SelectItem value="In Progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="Pending">قيد الانتظار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actNotes">ملاحظات</Label>
                <Textarea
                  id="actNotes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أدخل ملاحظات إضافية"
                  className="rounded-lg min-h-20"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSaveActivity}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-11 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  حفظ
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outline"
                  className="flex-1 h-11 rounded-lg"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Section */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filterDate">التاريخ</Label>
              <Input
                id="filterDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="filterEmployee">الموظف</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger id="filterEmployee" className="h-11 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp} value={emp}>
                      {emp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">المهام المكتملة</p>
                <p className="text-3xl font-bold mt-2">
                  {employeeActivities.filter((a) => a.status === "Completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">قيد التنفيذ</p>
                <p className="text-3xl font-bold mt-2">
                  {employeeActivities.filter((a) => a.status === "In Progress").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">الساعات اليومية</p>
                <p className="text-3xl font-bold mt-2">
                  {employeeActivities.reduce((sum, a) => sum + a.timeSpent, 0).toFixed(1)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">عدد الموظفين</p>
                <p className="text-3xl font-bold mt-2">{dailyReports.filter((r) => r.activities.length > 0).length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Activities */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            نشاطات {selectedEmployee}
          </CardTitle>
          <CardDescription>{new Date(selectedDate).toLocaleDateString("ar-EG")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employeeActivities.length > 0 ? (
              employeeActivities.map((activity) => (
                <Card key={activity.id} className="border-0 bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.taskTitle}</h4>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        {activity.notes && (
                          <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                            <p className="text-sm text-gray-700">{activity.notes}</p>
                          </div>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {activity.timeSpent} ساعة
                          </Badge>
                          <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                            {statusLabels[activity.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteActivity(activity.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-600">لا توجد نشاطات مسجلة</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* All Employees Summary */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle>ملخص النشاطات اليومية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold">الموظف</th>
                  <th className="text-right py-3 px-4 font-semibold">مكتمل</th>
                  <th className="text-right py-3 px-4 font-semibold">قيد التنفيذ</th>
                  <th className="text-right py-3 px-4 font-semibold">الساعات</th>
                </tr>
              </thead>
              <tbody>
                {dailyReports.map((report) => (
                  <tr
                    key={report.employee}
                    className={`border-b border-gray-100 ${
                      report.activities.length > 0 ? "hover:bg-gray-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">{report.employee}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-green-50">
                        {report.tasksCompleted}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="bg-blue-50">
                        {report.tasksInProgress}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{report.totalHours.toFixed(1)} ساعة</Badge>
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
