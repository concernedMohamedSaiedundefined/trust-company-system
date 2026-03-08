"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Columns3,
  List,
  Grid3x3,
  GanttChart,
  Users,
  Flag,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  project: string
  client: string
  department: string
  assignedTo: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  startDate: string
  dueDate: string
  estimatedHours: number
  actualHours: number
  status: "To Do" | "In Progress" | "Review" | "Completed" | "Delayed"
  comments: number
  attachments: number
}

interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  module: string
  relatedId?: number
  timestamp: string
  isRead: boolean
}

export function TasksManagement({
  onAddNotification,
}: {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "تصميم الواجهة الأمامية",
      description: "تصميم وتطوير واجهة المستخدم للموقع",
      project: "مشروع تطوير الموقع",
      client: "شركة التجارة الإلكترونية",
      department: "التطوير",
      assignedTo: "أحمد محمد",
      priority: "High",
      startDate: "2024-01-15",
      dueDate: "2024-01-30",
      estimatedHours: 40,
      actualHours: 35,
      status: "In Progress",
      comments: 5,
      attachments: 3,
    },
    {
      id: 2,
      title: "تطوير قاعدة البيانات",
      description: "بناء هيكل قاعدة البيانات الخاص بالموقع",
      project: "مشروع تطوير الموقع",
      client: "شركة التجارة الإلكترونية",
      department: "الهندسة",
      assignedTo: "علي حسن",
      priority: "High",
      startDate: "2024-01-10",
      dueDate: "2024-02-10",
      estimatedHours: 60,
      actualHours: 42,
      status: "In Progress",
      comments: 3,
      attachments: 2,
    },
  ])

  const [viewMode, setViewMode] = useState<"kanban" | "list" | "grid" | "gantt">("kanban")
  const [showDialog, setShowDialog] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    description: "",
    project: "",
    client: "",
    department: "",
    assignedTo: "",
    priority: "Medium",
    startDate: "",
    dueDate: "",
    estimatedHours: 0,
    status: "To Do",
  })

  const statuses: Task["status"][] = ["To Do", "In Progress", "Review", "Completed", "Delayed"]

  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchPriority = filterPriority === "all" || task.priority === filterPriority
    const matchStatus = filterStatus === "all" || task.status === filterStatus
    return matchSearch && matchPriority && matchStatus
  })

  const handleAddTask = () => {
    setEditingTask(null)
    setFormData({
      title: "",
      description: "",
      project: "",
      client: "",
      department: "",
      assignedTo: "",
      priority: "Medium",
      startDate: "",
      dueDate: "",
      estimatedHours: 0,
      status: "To Do",
    })
    setShowDialog(true)
  }

  const handleSaveTask = () => {
    if (!formData.title || !formData.dueDate) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى ملء جميع الحقول المطلوبة",
        type: "error",
        module: "tasks",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
      return
    }

    if (editingTask) {
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? { ...editingTask, ...formData } as Task : t)),
      )
    } else {
      const newTask: Task = {
        id: Math.max(...tasks.map((t) => t.id), 0) + 1,
        ...formData,
        comments: 0,
        attachments: 0,
        actualHours: 0,
      } as Task
      setTasks([...tasks, newTask])
    }

    setShowDialog(false)
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Review":
        return "bg-purple-100 text-purple-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const priorityLabels = {
    Low: "منخفض",
    Medium: "متوسط",
    High: "مرتفع",
    Urgent: "عاجل",
  }

  const statusLabels = {
    "To Do": "للقيام به",
    "In Progress": "قيد التنفيذ",
    "Review": "مراجعة",
    "Completed": "مكتمل",
    "Delayed": "متأخر",
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة المهام</h2>
          <p className="text-gray-600 mt-1">تتبع وإدارة مهام الفريق</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 rounded-xl"
            >
              <Plus className="w-5 h-5 ml-2" />
              مهمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingTask ? "تعديل المهمة" : "مهمة جديدة"}
              </DialogTitle>
              <DialogDescription>
                {editingTask ? "تحديث تفاصيل المهمة" : "إنشاء مهمة جديدة"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taskTitle">عنوان المهمة</Label>
                  <Input
                    id="taskTitle"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="أدخل عنوان المهمة"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">المشروع</Label>
                  <Input
                    id="project"
                    value={formData.project}
                    onChange={(e) =>
                      setFormData({ ...formData, project: e.target.value })
                    }
                    placeholder="أدخل اسم المشروع"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">الأولوية</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        priority: value as Task["priority"],
                      })
                    }
                  >
                    <SelectTrigger id="priority" className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">منخفض</SelectItem>
                      <SelectItem value="Medium">متوسط</SelectItem>
                      <SelectItem value="High">مرتفع</SelectItem>
                      <SelectItem value="Urgent">عاجل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">الحالة</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Task["status"],
                      })
                    }
                  >
                    <SelectTrigger id="status" className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">للقيام به</SelectItem>
                      <SelectItem value="In Progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="Review">مراجعة</SelectItem>
                      <SelectItem value="Completed">مكتمل</SelectItem>
                      <SelectItem value="Delayed">متأخر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">المسؤول</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) =>
                      setFormData({ ...formData, assignedTo: e.target.value })
                    }
                    placeholder="أدخل اسم المسؤول"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">موعد النهاية</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedHours">الساعات المتوقعة</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedHours: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">القسم</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="أدخل اسم القسم"
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف المهمة"
                  className="rounded-lg min-h-24"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveTask}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-11 rounded-lg flex-1"
                >
                  <CheckCircle className="w-4 h-4 ml-2" />
                  حفظ
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  variant="outline"
                  className="h-11 rounded-lg flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode("kanban")}
            variant={viewMode === "kanban" ? "default" : "outline"}
            size="sm"
            className="h-10 rounded-lg"
          >
            <Columns3 className="w-4 h-4 ml-2" />
            كانبان
          </Button>
          <Button
            onClick={() => setViewMode("list")}
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            className="h-10 rounded-lg"
          >
            <List className="w-4 h-4 ml-2" />
            قائمة
          </Button>
          <Button
            onClick={() => setViewMode("grid")}
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            className="h-10 rounded-lg"
          >
            <Grid3x3 className="w-4 h-4 ml-2" />
            شبكة
          </Button>
          <Button
            onClick={() => setViewMode("gantt")}
            variant={viewMode === "gantt" ? "default" : "outline"}
            size="sm"
            className="h-10 rounded-lg"
          >
            <GanttChart className="w-4 h-4 ml-2" />
            جانت
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 h-10">
            <Search className="w-4 h-4 text-gray-400 ml-2" />
            <Input
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 outline-none p-0 h-full"
            />
          </div>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-40 h-10 rounded-lg">
              <Flag className="w-4 h-4 ml-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأولويات</SelectItem>
              <SelectItem value="Low">منخفض</SelectItem>
              <SelectItem value="Medium">متوسط</SelectItem>
              <SelectItem value="High">مرتفع</SelectItem>
              <SelectItem value="Urgent">عاجل</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-10 rounded-lg">
              <CheckCircle className="w-4 h-4 ml-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="To Do">للقيام به</SelectItem>
              <SelectItem value="In Progress">قيد التنفيذ</SelectItem>
              <SelectItem value="Review">مراجعة</SelectItem>
              <SelectItem value="Completed">مكتمل</SelectItem>
              <SelectItem value="Delayed">متأخر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statuses.map((status) => {
            const statusTasks = filteredTasks.filter((t) => t.status === status)
            return (
              <Card key={status} className="border-0 bg-gray-50 min-h-96">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center justify-between">
                    <span>{statusLabels[status as keyof typeof statusLabels]}</span>
                    <Badge variant="outline">{statusTasks.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statusTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-0"
                    >
                      <CardContent className="p-3 space-y-2">
                        <h4 className="font-semibold text-sm line-clamp-2">{task.title}</h4>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getPriorityColor(task.priority)} variant="outline">
                            {priorityLabels[task.priority as keyof typeof priorityLabels]}
                          </Badge>
                          {status !== "Completed" && (
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Users className="w-3 h-3" />
                          {task.assignedTo}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow border-0">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{task.title}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Flag className="w-4 h-4 ml-2" />
                        {priorityLabels[task.priority as keyof typeof priorityLabels]}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-2" />
                        {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-2" />
                        {task.actualHours} / {task.estimatedHours} ساعة
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 ml-2" />
                        {task.assignedTo}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(task.status)}>
                    {statusLabels[task.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <Card className="border-0 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">لا توجد مهام تطابق البحث</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
