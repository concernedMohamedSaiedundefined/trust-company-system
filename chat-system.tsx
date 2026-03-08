"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageCircle,
  Send,
  Users,
  Plus,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Hash,
  Lock,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react"
import type { ChatMessage, ChatChannel, User } from "@/types"

interface ChatSystemProps {
  currentUser: User
  onClose?: () => void
}

export function ChatSystem({ currentUser, onClose }: ChatSystemProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [channels, setChannels] = useState<ChatChannel[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [activeChannel, setActiveChannel] = useState<string>("")
  const [activeDirectChat, setActiveDirectChat] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewChannelForm, setShowNewChannelForm] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelDescription, setNewChannelDescription] = useState("")
  const [newChannelType, setNewChannelType] = useState<"department" | "project" | "general">("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize demo data
    const demoChannels: ChatChannel[] = [
      {
        id: "general",
        name: "عام",
        description: "قناة عامة لجميع الموظفين",
        type: "general",
        members: [1, 2, 3, 4, 5],
        createdBy: 1,
        createdAt: "2024-01-01",
        isPrivate: false,
      },
      {
        id: "sales",
        name: "المبيعات",
        description: "قناة فريق المبيعات",
        type: "department",
        members: [1, 2, 3],
        createdBy: 1,
        createdAt: "2024-01-01",
        isPrivate: false,
      },
      {
        id: "accounting",
        name: "المحاسبة",
        description: "قناة قسم المحاسبة",
        type: "department",
        members: [1, 4, 5],
        createdBy: 1,
        createdAt: "2024-01-01",
        isPrivate: false,
      },
      {
        id: "urgent",
        name: "عاجل",
        description: "للمسائل العاجلة فقط",
        type: "general",
        members: [1, 2, 3, 4, 5],
        createdBy: 1,
        createdAt: "2024-01-01",
        isPrivate: false,
      },
    ]

    const demoUsers: User[] = [
      {
        id: 1,
        username: "ahmed",
        name: "أحمد محمد",
        email: "ahmed@trust-export.com",
        role: "مدير عام",
        department: "الإدارة",
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
        permissions: ["sales"],
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
        permissions: ["accounting"],
        lastLogin: "2024-01-20 08:45",
        status: "نشط",
        isOnline: false,
      },
      {
        id: 4,
        username: "sara",
        name: "سارة علي",
        email: "sara@trust-export.com",
        role: "مسؤول الشحن",
        department: "الشحن",
        permissions: ["shipping"],
        lastLogin: "2024-01-20 11:00",
        status: "نشط",
        isOnline: true,
      },
      {
        id: 5,
        username: "hassan",
        name: "حسن محمود",
        email: "hassan@trust-export.com",
        role: "مسؤول المخازن",
        department: "المخازن",
        permissions: ["warehouse"],
        lastLogin: "2024-01-19 16:30",
        status: "نشط",
        isOnline: false,
      },
    ]

    const demoMessages: ChatMessage[] = [
      {
        id: 1,
        senderId: 2,
        senderName: "فاطمة أحمد",
        senderDepartment: "المبيعات",
        channelId: "general",
        channelName: "عام",
        message: "صباح الخير جميعاً! كيف الأحوال اليوم؟",
        timestamp: "2024-01-20 09:00",
        type: "channel",
        isRead: true,
        priority: "low",
      },
      {
        id: 2,
        senderId: 1,
        senderName: "أحمد محمد",
        senderDepartment: "الإدارة",
        channelId: "general",
        channelName: "عام",
        message: "صباح النور! نحتاج لمراجعة أرقام المبيعات لهذا الأسبوع",
        timestamp: "2024-01-20 09:05",
        type: "channel",
        isRead: true,
        priority: "medium",
      },
      {
        id: 3,
        senderId: 4,
        senderName: "سارة علي",
        senderDepartment: "الشحن",
        channelId: "urgent",
        channelName: "عاجل",
        message: "تنبيه: شحنة رقم SH-2024-001 تأخرت عن الموعد المحدد",
        timestamp: "2024-01-20 10:15",
        type: "channel",
        isRead: false,
        priority: "urgent",
      },
      {
        id: 4,
        senderId: 3,
        senderName: "عمر حسن",
        senderDepartment: "المحاسبة",
        channelId: "accounting",
        channelName: "المحاسبة",
        message: "تم تحديث الحسابات لشهر يناير، يرجى المراجعة",
        timestamp: "2024-01-20 11:30",
        type: "channel",
        isRead: false,
        priority: "high",
      },
    ]

    setChannels(demoChannels)
    setUsers(demoUsers)
    setMessages(demoMessages)
    setActiveChannel("general")
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: messages.length + 1,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderDepartment: currentUser.department,
      channelId: activeChannel || undefined,
      channelName: activeChannel ? channels.find((c) => c.id === activeChannel)?.name : undefined,
      recipientId: activeDirectChat || undefined,
      recipientName: activeDirectChat ? users.find((u) => u.id === activeDirectChat)?.name : undefined,
      message: newMessage,
      timestamp: new Date().toLocaleString("ar-EG"),
      type: activeChannel ? "channel" : "direct",
      isRead: false,
      priority: "low",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const createChannel = () => {
    if (!newChannelName.trim()) return

    const channel: ChatChannel = {
      id: newChannelName.toLowerCase().replace(/\s+/g, "-"),
      name: newChannelName,
      description: newChannelDescription,
      type: newChannelType,
      members: [currentUser.id],
      createdBy: currentUser.id,
      createdAt: new Date().toISOString().split("T")[0],
      isPrivate: false,
    }

    setChannels([...channels, channel])
    setNewChannelName("")
    setNewChannelDescription("")
    setShowNewChannelForm(false)
  }

  const getFilteredMessages = () => {
    if (activeChannel) {
      return messages.filter((m) => m.channelId === activeChannel)
    } else if (activeDirectChat) {
      return messages.filter(
        (m) =>
          (m.senderId === currentUser.id && m.recipientId === activeDirectChat) ||
          (m.senderId === activeDirectChat && m.recipientId === currentUser.id),
      )
    }
    return []
  }

  const getUnreadCount = (channelId: string) => {
    return messages.filter((m) => m.channelId === channelId && !m.isRead && m.senderId !== currentUser.id).length
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-3 h-3" />
      case "high":
        return <Star className="w-3 h-3" />
      case "medium":
        return <Clock className="w-3 h-3" />
      default:
        return <CheckCircle2 className="w-3 h-3" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir="rtl">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <MessageCircle className="w-6 h-6 ml-2" />
              نظام المحادثات الجماعي
            </CardTitle>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                <Users className="w-3 h-3 ml-1" />
                {users.filter((u) => u.isOnline).length} متصل
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex">
          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في المحادثات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                  dir="rtl"
                />
              </div>
            </div>

            <Tabs defaultValue="channels" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                <TabsTrigger value="channels" className="flex items-center">
                  <Hash className="w-4 h-4 ml-1" />
                  القنوات
                </TabsTrigger>
                <TabsTrigger value="direct" className="flex items-center">
                  <Users className="w-4 h-4 ml-1" />
                  المحادثات المباشرة
                </TabsTrigger>
              </TabsList>

              <TabsContent value="channels" className="flex-1 m-0">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">القنوات</h3>
                    <Button size="sm" variant="outline" onClick={() => setShowNewChannelForm(true)} className="h-8">
                      <Plus className="w-3 h-3 ml-1" />
                      إنشاء قناة
                    </Button>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {channels.map((channel) => {
                        const unreadCount = getUnreadCount(channel.id)
                        return (
                          <button
                            key={channel.id}
                            onClick={() => {
                              setActiveChannel(channel.id)
                              setActiveDirectChat(null)
                            }}
                            className={`w-full text-right p-3 rounded-lg transition-colors ${
                              activeChannel === channel.id
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {channel.type === "department" ? (
                                  <Lock className="w-4 h-4 text-gray-500" />
                                ) : (
                                  <Hash className="w-4 h-4 text-gray-500" />
                                )}
                                <span className="mr-2 font-medium">{channel.name}</span>
                              </div>
                              {unreadCount > 0 && (
                                <Badge variant="destructive" className="h-5 min-w-5 text-xs">
                                  {unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 text-right">{channel.description}</p>
                          </button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="direct" className="flex-1 m-0">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-4">المستخدمين</h3>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {users
                        .filter((u) => u.id !== currentUser.id)
                        .map((user) => (
                          <button
                            key={user.id}
                            onClick={() => {
                              setActiveDirectChat(user.id)
                              setActiveChannel("")
                            }}
                            className={`w-full text-right p-3 rounded-lg transition-colors ${
                              activeDirectChat === user.id
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="relative">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.isOnline && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                              </div>
                              <div className="mr-3 flex-1">
                                <div className="font-medium text-sm">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.department}</div>
                              </div>
                              {user.isOnline ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  متصل
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-500">
                                  غير متصل
                                </Badge>
                              )}
                            </div>
                          </button>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {activeChannel ? (
                    <>
                      <Hash className="w-5 h-5 text-gray-500 ml-2" />
                      <div>
                        <h3 className="font-semibold">{channels.find((c) => c.id === activeChannel)?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {channels.find((c) => c.id === activeChannel)?.members.length} عضو
                        </p>
                      </div>
                    </>
                  ) : activeDirectChat ? (
                    <>
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback>{users.find((u) => u.id === activeDirectChat)?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{users.find((u) => u.id === activeDirectChat)?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {users.find((u) => u.id === activeDirectChat)?.department}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h3 className="font-semibold">اختر محادثة</h3>
                      <p className="text-sm text-gray-500">اختر قناة أو مستخدم للبدء</p>
                    </div>
                  )}
                </div>

                {(activeChannel || activeDirectChat) && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {getFilteredMessages().map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? "justify-start" : "justify-start"}`}
                  >
                    <div className="flex items-start space-x-3 rtl:space-x-reverse max-w-[70%]">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                          <span className="font-medium text-sm">{message.senderName}</span>
                          <span className="text-xs text-gray-500">{message.senderDepartment}</span>
                          <span className="text-xs text-gray-400">{message.timestamp}</span>
                          <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                            {getPriorityIcon(message.priority)}
                            <span className="mr-1">
                              {message.priority === "urgent"
                                ? "عاجل"
                                : message.priority === "high"
                                  ? "مهم"
                                  : message.priority === "medium"
                                    ? "متوسط"
                                    : "عادي"}
                            </span>
                          </Badge>
                        </div>
                        <div
                          className={`p-3 rounded-lg ${
                            message.senderId === currentUser.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            {(activeChannel || activeDirectChat) && (
              <div className="p-4 border-t bg-white">
                <div className="flex items-end space-x-2 rtl:space-x-reverse">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      className="min-h-[40px] max-h-[120px] resize-none"
                      dir="rtl"
                    />
                  </div>
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* New Channel Modal */}
      {showNewChannelForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 ml-2" />
                إنشاء قناة جديدة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">اسم القناة</label>
                <Input
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  placeholder="اسم القناة"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="text-sm font-medium">الوصف</label>
                <Textarea
                  value={newChannelDescription}
                  onChange={(e) => setNewChannelDescription(e.target.value)}
                  placeholder="وصف القناة"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="text-sm font-medium">نوع القناة</label>
                <Select value={newChannelType} onValueChange={(value: any) => setNewChannelType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">عام</SelectItem>
                    <SelectItem value="department">قسم</SelectItem>
                    <SelectItem value="project">مشروع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setShowNewChannelForm(false)}>
                  إلغاء
                </Button>
                <Button onClick={createChannel}>إنشاء القناة</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
