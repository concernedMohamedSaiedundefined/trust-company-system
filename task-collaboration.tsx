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
  MessageSquare,
  Send,
  Paperclip,
  User,
  Clock,
  Reply,
  Heart,
  AtSign,
  FileText,
  Link,
  Trash2,
  Edit,
  CheckCircle,
} from "lucide-react"

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
  attachments: Attachment[]
  mentioned: string[]
}

interface Attachment {
  id: number
  name: string
  type: string
  size: string
}

interface Task {
  id: number
  title: string
  assignedTo: string
  dueDate: string
  status: string
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

export function TaskCollaboration({
  onAddNotification,
}: {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}) {
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 1,
    title: "تصميم الواجهة الأمامية",
    assignedTo: "أحمد محمد",
    dueDate: "2024-01-30",
    status: "In Progress",
  })

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "أحمد محمد",
      avatar: "أ",
      content: "اكتملت الخطوة الأولى من التصميم، يرجى المراجعة",
      timestamp: "قبل 2 ساعة",
      likes: 3,
      replies: [
        {
          id: 11,
          author: "علي حسن",
          avatar: "ع",
          content: "شكراً على المجهود! التصميم جميل جداً",
          timestamp: "قبل 1 ساعة",
          likes: 1,
          replies: [],
          attachments: [],
          mentioned: ["أحمد محمد"],
        },
      ],
      attachments: [
        {
          id: 101,
          name: "wireframe.pdf",
          type: "PDF",
          size: "2.4 MB",
        },
      ],
      mentioned: ["علي حسن"],
    },
    {
      id: 2,
      author: "فاطمة أحمد",
      avatar: "ف",
      content: "هل تم تطبيق الألوان المطلوبة في الاجتماع الأخير؟",
      timestamp: "قبل 30 دقيقة",
      likes: 0,
      replies: [],
      attachments: [],
      mentioned: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([])
  const [attachedFiles, setAttachedFiles] = useState<Attachment[]>([])

  const tasks: Task[] = [
    {
      id: 1,
      title: "تصميم الواجهة الأمامية",
      assignedTo: "أحمد محمد",
      dueDate: "2024-01-30",
      status: "In Progress",
    },
    {
      id: 2,
      title: "تطوير قاعدة البيانات",
      assignedTo: "علي حسن",
      dueDate: "2024-02-10",
      status: "In Progress",
    },
    {
      id: 3,
      title: "اختبار الأداء",
      assignedTo: "فاطمة أحمد",
      dueDate: "2024-02-15",
      status: "Pending",
    },
  ]

  const teamMembers = ["أحمد محمد", "علي حسن", "فاطمة أحمد", "سارة علي", "محمود محمد"]

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Math.max(...comments.map((c) => c.id), 0) + 1,
      author: "المستخدم الحالي",
      avatar: "م",
      content: newComment,
      timestamp: "الآن",
      likes: 0,
      replies: [],
      attachments: attachedFiles,
      mentioned: mentionedUsers,
    }

    if (replyingTo !== null) {
      const updateComments = (commentsArray: Comment[]): Comment[] => {
        return commentsArray.map((c) => {
          if (c.id === replyingTo) {
            return { ...c, replies: [...c.replies, comment] }
          }
          if (c.replies.length > 0) {
            return { ...c, replies: updateComments(c.replies) }
          }
          return c
        })
      }
      setComments(updateComments(comments))
    } else {
      setComments([...comments, comment])
    }

    onAddNotification({
      userId: 1,
      title: "تعليق جديد",
      message: `تم إضافة تعليق على ${selectedTask.title}`,
      type: "info",
      module: "collaboration",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
    })

    setNewComment("")
    setReplyingTo(null)
    setMentionedUsers([])
    setAttachedFiles([])
  }

  const handleAddMention = (user: string) => {
    if (!mentionedUsers.includes(user)) {
      setMentionedUsers([...mentionedUsers, user])
      setNewComment(`${newComment}@${user} `)
    }
  }

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id))
  }

  const renderCommentThread = (comment: Comment, depth: number = 0) => (
    <div key={comment.id} className="space-y-3">
      <Card className={`border-0 ${depth > 0 ? "bg-gray-50" : ""}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {comment.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <p className="text-xs text-gray-500">{comment.timestamp}</p>
                </div>
                {depth === 0 && (
                  <Button
                    onClick={() => handleDeleteComment(comment.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-3">{comment.content}</p>

              {comment.mentioned.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {comment.mentioned.map((user) => (
                    <Badge key={user} variant="outline" className="text-xs">
                      @{user}
                    </Badge>
                  ))}
                </div>
              )}

              {comment.attachments.length > 0 && (
                <div className="mb-3 space-y-2 bg-blue-50 p-3 rounded-lg">
                  {comment.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-2 text-sm text-blue-700"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{attachment.name}</span>
                      <span className="text-xs text-gray-500">({attachment.size})</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setReplyingTo(comment.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-blue-600"
                >
                  <Reply className="w-4 h-4 ml-1" />
                  رد
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-gray-600">
                  <Heart className="w-4 h-4 ml-1" />
                  {comment.likes > 0 && comment.likes}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {comment.replies.length > 0 && (
        <div className="mr-6 space-y-3">
          {comment.replies.map((reply) => renderCommentThread(reply, depth + 1))}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">تعاون الفريق</h2>
          <p className="text-gray-600 mt-1">تبادل التعليقات والملفات والتنسيق بين أعضاء الفريق</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">المهام</h3>
          {tasks.map((task) => (
            <Card
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className={`cursor-pointer border-0 transition-all ${
                selectedTask.id === task.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-4">
                <h4 className="font-semibold text-sm mb-2">{task.title}</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {task.assignedTo}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {new Date(task.dueDate).toLocaleDateString("ar-EG")}
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {task.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comments Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Header */}
          <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{selectedTask.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      {selectedTask.assignedTo}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      {new Date(selectedTask.dueDate).toLocaleDateString("ar-EG")}
                    </div>
                  </div>
                </div>
                <Badge className="bg-blue-600 text-white">{selectedTask.status}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Comments Thread */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">التعليقات ({comments.length})</h4>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((comment) => renderCommentThread(comment))}
            </div>
          </div>

          {/* Add Comment */}
          <Card className="border-0">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>إضافة تعليق</Label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليقك هنا... استخدم @ للإشارة إلى الزملاء"
                  className="rounded-lg min-h-20 resize-none"
                />
              </div>

              {mentionedUsers.length > 0 && (
                <div className="flex flex-wrap gap-2 bg-blue-50 p-3 rounded-lg">
                  {mentionedUsers.map((user) => (
                    <Badge key={user} variant="outline" className="text-xs">
                      @{user}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <AtSign className="w-4 h-4 ml-2" />
                    إشارة
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <Paperclip className="w-4 h-4 ml-2" />
                    ملف
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 rounded-lg">
                    <Link className="w-4 h-4 ml-2" />
                    رابط
                  </Button>
                </div>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-blue-600 hover:bg-blue-700 h-9 px-4 rounded-lg"
                >
                  <Send className="w-4 h-4 ml-2" />
                  إرسال
                </Button>
              </div>

              {replyingTo !== null && (
                <div className="bg-yellow-50 p-3 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-yellow-800">
                    رد على تعليق ({comments.find((c) => c.id === replyingTo)?.author})
                  </span>
                  <Button
                    onClick={() => setReplyingTo(null)}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    إلغاء
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mention Users Dropdown */}
          {newComment.includes("@") && (
            <Card className="border-0">
              <CardContent className="p-3">
                <p className="text-xs text-gray-600 mb-2">اختر الشخص للإشارة:</p>
                <div className="flex flex-wrap gap-2">
                  {teamMembers
                    .filter((user) => !mentionedUsers.includes(user))
                    .map((user) => (
                      <Button
                        key={user}
                        onClick={() => handleAddMention(user)}
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg text-xs"
                      >
                        @{user}
                      </Button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
