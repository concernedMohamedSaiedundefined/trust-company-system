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
  Eye,
  Calendar,
  DollarSign,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

interface Project {
  id: number
  name: string
  client: string
  manager: string
  startDate: string
  deadline: string
  status: "Planning" | "In Progress" | "On Hold" | "Completed"
  budget: number
  spent: number
  description: string
  teamMembers: string[]
  progress: number
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

export function ProjectsManagement({
  onAddNotification,
}: {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "مشروع تطوير الموقع",
      client: "شركة التجارة الإلكترونية",
      manager: "محمد علي",
      startDate: "2024-01-15",
      deadline: "2024-03-30",
      status: "In Progress",
      budget: 50000,
      spent: 32000,
      description: "تطوير موقع تجارة إلكترونية متكامل",
      teamMembers: ["أحمد", "فاطمة", "علي"],
      progress: 65,
    },
    {
      id: 2,
      name: "تحديث نظام الفواتير",
      client: "شركة الخدمات المالية",
      manager: "سارة أحمد",
      startDate: "2024-02-01",
      deadline: "2024-02-28",
      status: "Completed",
      budget: 25000,
      spent: 24500,
      description: "تحديث وتحسين نظام الفواتير الإلكترونية",
      teamMembers: ["عمر", "ليلى"],
      progress: 100,
    },
  ])

  const [showDialog, setShowDialog] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    client: "",
    manager: "",
    startDate: "",
    deadline: "",
    status: "Planning",
    budget: 0,
    description: "",
    teamMembers: [],
    progress: 0,
  })

  const handleAddProject = () => {
    setEditingProject(null)
    setFormData({
      name: "",
      client: "",
      manager: "",
      startDate: "",
      deadline: "",
      status: "Planning",
      budget: 0,
      description: "",
      teamMembers: [],
      progress: 0,
    })
    setShowDialog(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setShowDialog(true)
  }

  const handleSaveProject = () => {
    if (!formData.name || !formData.client) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى ملء جميع الحقول المطلوبة",
        type: "error",
        module: "projects",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
      return
    }

    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...editingProject, ...formData } as Project
            : p,
        ),
      )
      onAddNotification({
        userId: 1,
        title: "تحديث المشروع",
        message: `تم تحديث المشروع ${formData.name} بنجاح`,
        type: "success",
        module: "projects",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
    } else {
      const newProject: Project = {
        id: Math.max(...projects.map((p) => p.id), 0) + 1,
        ...formData,
      } as Project
      setProjects([...projects, newProject])
      onAddNotification({
        userId: 1,
        title: "مشروع جديد",
        message: `تم إنشاء المشروع ${formData.name} بنجاح`,
        type: "success",
        module: "projects",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
    }

    setShowDialog(false)
  }

  const handleDeleteProject = (id: number) => {
    const project = projects.find((p) => p.id === id)
    setProjects(projects.filter((p) => p.id !== id))
    onAddNotification({
      userId: 1,
      title: "حذف المشروع",
      message: `تم حذف المشروع ${project?.name} بنجاح`,
      type: "warning",
      module: "projects",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-orange-100 text-orange-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const statusLabels = {
    Planning: "التخطيط",
    "In Progress": "قيد التنفيذ",
    "On Hold": "موقوف",
    Completed: "مكتمل",
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة المشاريع</h2>
          <p className="text-gray-600 mt-1">إنشاء وإدارة المشاريع والعملاء</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddProject}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 rounded-xl"
            >
              <Plus className="w-5 h-5 ml-2" />
              مشروع جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingProject ? "تعديل المشروع" : "مشروع جديد"}
              </DialogTitle>
              <DialogDescription>
                {editingProject ? "تحديث بيانات المشروع" : "إنشاء مشروع جديد"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">اسم المشروع</Label>
                  <Input
                    id="projectName"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="أدخل اسم المشروع"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">العميل</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    placeholder="أدخل اسم العميل"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">مدير المشروع</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) =>
                      setFormData({ ...formData, manager: e.target.value })
                    }
                    placeholder="أدخل اسم المدير"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">الحالة</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        status: value as Project["status"],
                      })
                    }
                  >
                    <SelectTrigger id="status" className="h-11 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">التخطيط</SelectItem>
                      <SelectItem value="In Progress">قيد التنفيذ</SelectItem>
                      <SelectItem value="On Hold">موقوف</SelectItem>
                      <SelectItem value="Completed">مكتمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ البداية</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">موعد النهاية</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">الميزانية</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: Number(e.target.value),
                      })
                    }
                    placeholder="أدخل المبلغ"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">نسبة الإنجاز (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: Number(e.target.value),
                      })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف المشروع</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف المشروع"
                  className="rounded-lg min-h-24"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveProject}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow border-0">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg font-bold line-clamp-2">
                  {project.name}
                </CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {statusLabels[project.status as keyof typeof statusLabels]}
                </Badge>
              </div>
              <CardDescription className="text-sm">{project.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 ml-2 text-blue-600" />
                  {project.manager}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 ml-2 text-green-600" />
                  {new Date(project.deadline).toLocaleDateString("ar-EG")}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">نسبة الإنجاز</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 ml-2 text-orange-600" />
                  <span className="text-gray-600">
                    {project.spent.toLocaleString("ar-EG")} / {project.budget.toLocaleString("ar-EG")}
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <TrendingUp className="w-4 h-4 ml-2 text-green-600" />
                  <span className={project.spent > project.budget ? "text-red-600" : "text-green-600"}>
                    {((project.spent / project.budget) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => handleEditProject(project)}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 rounded-lg"
                >
                  <Edit className="w-4 h-4 ml-1" />
                  تعديل
                </Button>
                <Button
                  onClick={() => handleDeleteProject(project.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-9 rounded-lg text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 ml-1" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card className="border-0 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">لا توجد مشاريع حتى الآن</p>
            <p className="text-gray-500 text-sm mt-2">ابدأ بإنشاء مشروع جديد</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
