"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Play,
  Pause,
  Square,
  Plus,
  Trash2,
  Clock,
  Calendar,
  Users,
  Briefcase,
  BarChart3,
  TrendingUp,
} from "lucide-react"

interface TimeEntry {
  id: number
  taskId: number
  taskTitle: string
  employee: string
  date: string
  startTime: string
  endTime: string
  duration: number
  notes: string
}

interface TimerSession {
  taskId: number
  taskTitle: string
  startTime: number
  isRunning: boolean
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

export function TimeTracking({
  onAddNotification,
}: {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}) {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      taskId: 1,
      taskTitle: "تصميم الواجهة الأمامية",
      employee: "أحمد محمد",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "12:30",
      duration: 3.5,
      notes: "إكمال تصميم الصفحة الرئيسية",
    },
    {
      id: 2,
      taskId: 2,
      taskTitle: "تطوير قاعدة البيانات",
      employee: "علي حسن",
      date: new Date().toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "14:00",
      duration: 4,
      notes: "إنشاء جداول قاعدة البيانات",
    },
  ])

  const [timerSession, setTimerSession] = useState<TimerSession | null>(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const [manualEntryForm, setManualEntryForm] = useState({
    taskTitle: "",
    employee: "",
    startTime: "",
    endTime: "",
    notes: "",
  })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerSession?.isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerSession?.isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const handleStartTimer = (taskTitle: string) => {
    setTimerSession({
      taskId: Math.random(),
      taskTitle,
      startTime: Date.now(),
      isRunning: true,
    })
    setElapsedSeconds(0)
  }

  const handlePauseTimer = () => {
    if (timerSession) {
      setTimerSession({ ...timerSession, isRunning: false })
    }
  }

  const handleResumeTimer = () => {
    if (timerSession) {
      setTimerSession({ ...timerSession, isRunning: true })
    }
  }

  const handleStopTimer = () => {
    if (timerSession && elapsedSeconds > 0) {
      const startDate = new Date(timerSession.startTime)
      const startHour = String(startDate.getHours()).padStart(2, "0")
      const startMinute = String(startDate.getMinutes()).padStart(2, "0")

      const endDate = new Date(timerSession.startTime + elapsedSeconds * 1000)
      const endHour = String(endDate.getHours()).padStart(2, "0")
      const endMinute = String(endDate.getMinutes()).padStart(2, "0")

      const newEntry: TimeEntry = {
        id: Math.max(...timeEntries.map((e) => e.id), 0) + 1,
        taskId: timerSession.taskId as unknown as number,
        taskTitle: timerSession.taskTitle,
        employee: "الموظف الحالي",
        date: new Date().toISOString().split("T")[0],
        startTime: `${startHour}:${startMinute}`,
        endTime: `${endHour}:${endMinute}`,
        duration: elapsedSeconds / 3600,
        notes: "",
      }

      setTimeEntries([...timeEntries, newEntry])
      onAddNotification({
        userId: 1,
        title: "تم تسجيل الوقت",
        message: `تم حفظ ${elapsedSeconds / 3600} ساعة للمهمة`,
        type: "success",
        module: "time-tracking",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
    }
    setTimerSession(null)
    setElapsedSeconds(0)
  }

  const handleAddManualEntry = () => {
    if (!manualEntryForm.taskTitle || !manualEntryForm.startTime || !manualEntryForm.endTime) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى ملء جميع الحقول المطلوبة",
        type: "error",
        module: "time-tracking",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
      })
      return
    }

    const startTime = new Date(`${selectedDate}T${manualEntryForm.startTime}`)
    const endTime = new Date(`${selectedDate}T${manualEntryForm.endTime}`)
    const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 3600)

    const newEntry: TimeEntry = {
      id: Math.max(...timeEntries.map((e) => e.id), 0) + 1,
      taskId: Math.random() as unknown as number,
      taskTitle: manualEntryForm.taskTitle,
      employee: manualEntryForm.employee || "بدون تحديد",
      date: selectedDate,
      startTime: manualEntryForm.startTime,
      endTime: manualEntryForm.endTime,
      duration,
      notes: manualEntryForm.notes,
    }

    setTimeEntries([...timeEntries, newEntry])
    setShowDialog(false)
    setManualEntryForm({
      taskTitle: "",
      employee: "",
      startTime: "",
      endTime: "",
      notes: "",
    })

    onAddNotification({
      userId: 1,
      title: "إدخال يدوي",
      message: `تم إضافة ${duration.toFixed(1)} ساعة`,
      type: "success",
      module: "time-tracking",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
    })
  }

  const handleDeleteEntry = (id: number) => {
    setTimeEntries(timeEntries.filter((e) => e.id !== id))
  }

  const todayEntries = timeEntries.filter((e) => e.date === new Date().toISOString().split("T")[0])
  const totalTodayHours = todayEntries.reduce((sum, e) => sum + e.duration, 0)

  const employeeHours: { [key: string]: number } = {}
  timeEntries.forEach((e) => {
    employeeHours[e.employee] = (employeeHours[e.employee] || 0) + e.duration
  })

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">تتبع الوقت</h2>
          <p className="text-gray-600 mt-1">تسجيل وإدارة ساعات العمل</p>
        </div>
      </div>

      {/* Timer Section */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-2xl">مؤقت المهمة الحالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!timerSession ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taskSelect">اختر المهمة</Label>
                <Select
                  onValueChange={(value) => handleStartTimer(value)}
                >
                  <SelectTrigger id="taskSelect" className="h-11 rounded-lg">
                    <SelectValue placeholder="اختر مهمة لبدء المؤقت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تصميم الواجهة الأمامية">تصميم الواجهة الأمامية</SelectItem>
                    <SelectItem value="تطوير قاعدة البيانات">تطوير قاعدة البيانات</SelectItem>
                    <SelectItem value="اختبار الموقع">اختبار الموقع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">{timerSession.taskTitle}</p>
                  <p className="text-5xl font-bold font-mono text-blue-600">
                    {formatTime(elapsedSeconds)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {timerSession.isRunning ? (
                  <Button
                    onClick={handlePauseTimer}
                    className="flex-1 h-12 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                  >
                    <Pause className="w-5 h-5 ml-2" />
                    إيقاف مؤقت
                  </Button>
                ) : (
                  <Button
                    onClick={handleResumeTimer}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    <Play className="w-5 h-5 ml-2" />
                    متابعة
                  </Button>
                )}
                <Button
                  onClick={handleStopTimer}
                  className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  <Square className="w-5 h-5 ml-2" />
                  حفظ وإنهاء
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">ساعات اليوم</p>
                <p className="text-3xl font-bold mt-2">{totalTodayHours.toFixed(1)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">عدد المدخلات</p>
                <p className="text-3xl font-bold mt-2">{timeEntries.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm">الموظفون النشطون</p>
                <p className="text-3xl font-bold mt-2">{Object.keys(employeeHours).length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-11 rounded-xl">
              <Plus className="w-5 h-5 ml-2" />
              إدخال يدوي
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-xl">
            <DialogHeader>
              <DialogTitle>إدخال وقت يدوي</DialogTitle>
              <DialogDescription>
                إضافة ساعات عمل يدويًا
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="entryDate">التاريخ</Label>
                <Input
                  id="entryDate"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taskName">عنوان المهمة</Label>
                  <Input
                    id="taskName"
                    value={manualEntryForm.taskTitle}
                    onChange={(e) =>
                      setManualEntryForm({
                        ...manualEntryForm,
                        taskTitle: e.target.value,
                      })
                    }
                    placeholder="أدخل اسم المهمة"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeName">الموظف</Label>
                  <Input
                    id="employeeName"
                    value={manualEntryForm.employee}
                    onChange={(e) =>
                      setManualEntryForm({
                        ...manualEntryForm,
                        employee: e.target.value,
                      })
                    }
                    placeholder="أدخل اسم الموظف"
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">وقت البداية</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={manualEntryForm.startTime}
                    onChange={(e) =>
                      setManualEntryForm({
                        ...manualEntryForm,
                        startTime: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">وقت النهاية</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={manualEntryForm.endTime}
                    onChange={(e) =>
                      setManualEntryForm({
                        ...manualEntryForm,
                        endTime: e.target.value,
                      })
                    }
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Input
                  id="notes"
                  value={manualEntryForm.notes}
                  onChange={(e) =>
                    setManualEntryForm({
                      ...manualEntryForm,
                      notes: e.target.value,
                    })
                  }
                  placeholder="أدخل ملاحظات إضافية"
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddManualEntry}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-11 rounded-lg"
                >
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

      {/* Time Entries Table */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle>سجل الساعات</CardTitle>
          <CardDescription>جميع ساعات العمل المسجلة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 font-semibold">المهمة</th>
                  <th className="text-right py-3 px-4 font-semibold">الموظف</th>
                  <th className="text-right py-3 px-4 font-semibold">التاريخ</th>
                  <th className="text-right py-3 px-4 font-semibold">الوقت</th>
                  <th className="text-right py-3 px-4 font-semibold">الساعات</th>
                  <th className="text-right py-3 px-4 font-semibold">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {timeEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{entry.taskTitle}</td>
                    <td className="py-3 px-4">{entry.employee}</td>
                    <td className="py-3 px-4">{new Date(entry.date).toLocaleDateString("ar-EG")}</td>
                    <td className="py-3 px-4">{entry.startTime} - {entry.endTime}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{entry.duration.toFixed(1)} ساعة</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        onClick={() => handleDeleteEntry(entry.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee Hours Summary */}
      <Card className="border-0">
        <CardHeader>
          <CardTitle>ملخص ساعات الموظفين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(employeeHours).map(([employee, hours]) => (
              <div key={employee} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{employee}</span>
                </div>
                <Badge variant="outline" className="text-lg">
                  {hours.toFixed(1)} ساعة
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
