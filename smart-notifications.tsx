"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Trash2,
  Archive,
  Clock,
  Filter,
  Search,
} from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  module: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: "مهمة قد انتهت آجالها",
    message: "المهمة 'تصميم الواجهة الأمامية' قد انتهت آجالها",
    type: "warning",
    module: "tasks",
    timestamp: "قبل 5 دقائق",
    isRead: false,
  },
  {
    id: 2,
    title: "تحديث المشروع",
    message: "تم تحديث المشروع 'مشروع تطوير الموقع' بنجاح",
    type: "success",
    module: "projects",
    timestamp: "قبل 30 دقيقة",
    isRead: false,
  },
  {
    id: 3,
    title: "تعليق جديد",
    message: "أضاف علي حسن تعليقاً على مهمتك",
    type: "info",
    module: "collaboration",
    timestamp: "قبل ساعة",
    isRead: true,
  },
  {
    id: 4,
    title: "خطأ في العملية",
    message: "فشل حفظ البيانات. يرجى المحاولة مرة أخرى",
    type: "error",
    module: "system",
    timestamp: "قبل ساعتين",
    isRead: true,
  },
  {
    id: 5,
    title: "موعد قريب",
    message: "مشروع 'تحديث نظام الفواتير' ينتهي غداً",
    type: "warning",
    module: "projects",
    timestamp: "قبل 3 ساعات",
    isRead: true,
  },
  {
    id: 6,
    title: "مهمة جديدة",
    message: "تم تعيين لك مهمة جديدة 'اختبار النظام'",
    type: "info",
    module: "tasks",
    timestamp: "قبل 4 ساعات",
    isRead: true,
  },
]

export function SmartNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotifications = notifications.filter((notif) => {
    const matchType = filterType === "all" || notif.type === filterType
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "unread" && !notif.isRead) ||
      (filterStatus === "read" && notif.isRead)
    const matchSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase())

    return matchType && matchStatus && matchSearch
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const unreadByType = {
    success: notifications.filter((n) => n.type === "success" && !n.isRead).length,
    error: notifications.filter((n) => n.type === "error" && !n.isRead).length,
    info: notifications.filter((n) => n.type === "info" && !n.isRead).length,
    warning: notifications.filter((n) => n.type === "warning" && !n.isRead).length,
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleMarkAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleDeleteAll = () => {
    setNotifications([])
  }

  const moduleLabels: { [key: string]: string } = {
    tasks: "المهام",
    projects: "المشاريع",
    collaboration: "التعاون",
    "time-tracking": "تتبع الوقت",
    activities: "النشاطات",
    system: "النظام",
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">الإشعارات الذكية</h2>
          <p className="text-gray-600 mt-1">إدارة وتتبع جميع الإشعارات</p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllAsRead}
            className="bg-blue-600 hover:bg-blue-700 h-11 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 ml-2" />
            تحديد الكل كمقروء ({unreadCount})
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الإشعارات</p>
                <p className="text-3xl font-bold mt-2">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">غير مقروءة</p>
                <p className="text-3xl font-bold mt-2 text-yellow-600">{unreadCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">نجاحات</p>
                <p className="text-3xl font-bold mt-2 text-green-600">{unreadByType.success}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">تحذيرات</p>
                <p className="text-3xl font-bold mt-2 text-orange-600">{unreadByType.warning}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">أخطاء</p>
                <p className="text-3xl font-bold mt-2 text-red-600">{unreadByType.error}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">البحث</label>
              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 h-11">
                <Search className="w-4 h-4 text-gray-400 ml-2" />
                <input
                  placeholder="ابحث عن إشعارات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 outline-none p-0 h-full w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">نوع الإشعار</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="success">نجاح</SelectItem>
                  <SelectItem value="warning">تحذير</SelectItem>
                  <SelectItem value="error">خطأ</SelectItem>
                  <SelectItem value="info">معلومات</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">الحالة</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="unread">غير مقروء</SelectItem>
                  <SelectItem value="read">مقروء</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">&nbsp;</label>
              <Button
                onClick={handleDeleteAll}
                variant="outline"
                className="w-full h-11 rounded-lg text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 ml-2" />
                حذف الكل
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={`border-2 transition-all ${
                notif.isRead
                  ? "border-gray-200 bg-white"
                  : `${getTypeColor(notif.type)} border-opacity-50`
              }`}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="mt-1">{getTypeIcon(notif.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                          {!notif.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notif.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {moduleLabels[notif.module] || notif.module}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            notif.type === "success"
                              ? "bg-green-100 text-green-800"
                              : notif.type === "error"
                                ? "bg-red-100 text-red-800"
                                : notif.type === "warning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {notif.type === "success"
                            ? "نجاح"
                            : notif.type === "error"
                              ? "خطأ"
                              : notif.type === "warning"
                                ? "تحذير"
                                : "معلومة"}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {!notif.isRead && (
                          <Button
                            onClick={() => handleMarkAsRead(notif.id)}
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-blue-600"
                          >
                            <CheckCircle className="w-4 h-4 ml-1" />
                            قراءة
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDelete(notif.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border-0 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">لا توجد إشعارات</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
