"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
  FolderOpen,
  File,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Upload,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  FolderPlus,
  MoreVertical,
  Share2,
  Star,
  HardDrive,
  Save,
  XCircle,
} from "lucide-react"
import type { Notification } from "@/types"

interface FileItem {
  id: number
  name: string
  type: string
  size: string
  folder: string
  uploadDate: string
  uploadedBy: string
  tags: string[]
  url?: string
  description: string
  status: string
  shared: boolean
  starred: boolean
}

interface FolderItem {
  id: number
  name: string
  filesCount: number
  size: string
  createdDate: string
  color: string
  iconName: string // Changed from icon to iconName
}

interface FilesManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function FilesManagement({ onAddNotification }: FilesManagementProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [folders, setFolders] = useState<FolderItem[]>([])
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showFolderDialog, setShowFolderDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadFormData, setUploadFormData] = useState({
    name: "",
    folder: "",
    description: "",
    tags: "",
  })
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Icon mapping function
  const getFolderIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      FileText,
      FileSpreadsheet,
      ImageIcon,
      File,
    }
    return icons[iconName] || File
  }

  useEffect(() => {
    // Load data from localStorage
    const savedFiles = localStorage.getItem("files")
    const savedFolders = localStorage.getItem("folders")

    if (savedFiles && savedFolders) {
      setFiles(JSON.parse(savedFiles))
      setFolders(JSON.parse(savedFolders))
    } else {
      // Initialize with demo data
      const demoFolders: FolderItem[] = [
        {
          id: 1,
          name: "العقود والاتفاقيات",
          filesCount: 15,
          size: "45 MB",
          createdDate: "2024-01-15",
          color: "from-blue-500 to-blue-600",
          iconName: "FileText",
        },
        {
          id: 2,
          name: "الفواتير",
          filesCount: 28,
          size: "12 MB",
          createdDate: "2024-01-10",
          color: "from-green-500 to-green-600",
          iconName: "FileSpreadsheet",
        },
        {
          id: 3,
          name: "المستندات الجمركية",
          filesCount: 22,
          size: "38 MB",
          createdDate: "2024-01-08",
          color: "from-purple-500 to-purple-600",
          iconName: "FileText",
        },
        {
          id: 4,
          name: "الشهادات",
          filesCount: 10,
          size: "8 MB",
          createdDate: "2024-01-05",
          color: "from-orange-500 to-orange-600",
          iconName: "FileText",
        },
        {
          id: 5,
          name: "الصور والمرفقات",
          filesCount: 45,
          size: "125 MB",
          createdDate: "2024-01-01",
          color: "from-pink-500 to-pink-600",
          iconName: "ImageIcon",
        },
      ]

      const demoFiles: FileItem[] = [
        {
          id: 1,
          name: "عقد توريد مع مزرعة الوادي الأخضر.pdf",
          type: "PDF",
          size: "2.5 MB",
          folder: "العقود والاتفاقيات",
          uploadDate: "2024-01-20 14:30",
          uploadedBy: "أحمد محمد",
          tags: ["عقود", "موردين"],
          description: "عقد توريد الخضروات والفواكه لعام 2024",
          status: "نشط",
          shared: true,
          starred: true,
          url: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvS2lkc1szIDAgUl0vQ291bnQgMS9UeXBlL1BhZ2VzPj4KZW5kb2JqCjEgMCBvYmoKPDwvUGFnZXMgMiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjQgMCBvYmoKPDwvQ3JlYXRvcihmYWtlKS9Qcm9kdWNlcihmYWtlKT4+CmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAyMjAgMDAwMDAgbg0KMDAwMDAwMDE2NCAwMDAwMCBuDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAyNjkgMDAwMDAgbg0KdHJhaWxlcgo8PC9Sb290IDEgMCBSL0luZm8gNCAwIFI+PgpzdGFydHhyZWYKMzI2CiUlRU9G",
        },
        {
          id: 2,
          name: "فاتورة INV-2024-001.xlsx",
          type: "Excel",
          size: "450 KB",
          folder: "الفواتير",
          uploadDate: "2024-01-19 10:15",
          uploadedBy: "فاطمة أحمد",
          tags: ["فواتير", "مبيعات"],
          description: "فاتورة بيع لشركة الأهرام للتجارة",
          status: "مدفوع",
          shared: false,
          starred: false,
          url: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQA",
        },
        {
          id: 3,
          name: "شهادة المنشأ SH-2024-001.pdf",
          type: "PDF",
          size: "1.2 MB",
          folder: "المستندات الجمركية",
          uploadDate: "2024-01-18 16:45",
          uploadedBy: "عمر حسن",
          tags: ["جمارك", "شحنات"],
          description: "شهادة منشأ للشحنة رقم SH-2024-001",
          status: "معتمد",
          shared: true,
          starred: false,
          url: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvS2lkc1szIDAgUl0vQ291bnQgMS9UeXBlL1BhZ2VzPj4KZW5kb2JqCjEgMCBvYmoKPDwvUGFnZXMgMiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjQgMCBvYmoKPDwvQ3JlYXRvcihmYWtlKS9Qcm9kdWNlcihmYWtlKT4+CmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAyMjAgMDAwMDAgbg0KMDAwMDAwMDE2NCAwMDAwMCBuDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAyNjkgMDAwMDAgbg0KdHJhaWxlcgo8PC9Sb290IDEgMCBSL0luZm8gNCAwIFI+PgpzdGFydHhyZWYKMzI2CiUlRU9G",
        },
        {
          id: 4,
          name: "شهادة جودة المنتجات.pdf",
          type: "PDF",
          size: "3.8 MB",
          folder: "الشهادات",
          uploadDate: "2024-01-17 09:20",
          uploadedBy: "سارة علي",
          tags: ["شهادات", "جودة"],
          description: "شهادة الجودة والسلامة الغذائية",
          status: "ساري",
          shared: false,
          starred: true,
          url: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvS2lkc1szIDAgUl0vQ291bnQgMS9UeXBlL1BhZ2VzPj4KZW5kb2JqCjEgMCBvYmoKPDwvUGFnZXMgMiAwIFIvVHlwZS9DYXRhbG9nPj4KZW5kb2JqCjQgMCBvYmoKPDwvQ3JlYXRvcihmYWtlKS9Qcm9kdWNlcihmYWtlKT4+CmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAyMjAgMDAwMDAgbg0KMDAwMDAwMDE2NCAwMDAwMCBuDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAyNjkgMDAwMDAgbg0KdHJhaWxlcgo8PC9Sb290IDEgMCBSL0luZm8gNCAwIFI+PgpzdGFydHhyZWYKMzI2CiUlRU9G",
        },
        {
          id: 5,
          name: "صورة المنتجات.jpg",
          type: "صورة",
          size: "5.2 MB",
          folder: "الصور والمرفقات",
          uploadDate: "2024-01-16 11:30",
          uploadedBy: "خالد يوسف",
          tags: ["صور", "منتجات"],
          description: "صورة عرض للمنتجات الطازجة",
          status: "منشور",
          shared: true,
          starred: false,
          url: "/placeholder.svg?height=400&width=600",
        },
      ]

      setFolders(demoFolders)
      setFiles(demoFiles)
      localStorage.setItem("folders", JSON.stringify(demoFolders))
      localStorage.setItem("files", JSON.stringify(demoFiles))
    }
  }, [])

  const handleUpload = () => {
    if (!uploadFormData.name || !uploadFormData.folder || !selectedUploadFile) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى ملء جميع الحقول وتحديد ملف",
        type: "error",
        module: "files",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
      return
    }

    // Convert file to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string

      const newFile: FileItem = {
        id: files.length + 1,
        name: uploadFormData.name,
        type: selectedUploadFile.name.split(".").pop()?.toUpperCase() || "FILE",
        size: `${(selectedUploadFile.size / 1024 / 1024).toFixed(2)} MB`,
        folder: uploadFormData.folder,
        uploadDate: new Date().toLocaleString("ar-EG"),
        uploadedBy: "أحمد محمد",
        tags: uploadFormData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        description: uploadFormData.description,
        status: "جديد",
        shared: false,
        starred: false,
        url: base64,
      }

      const updatedFiles = [...files, newFile]
      setFiles(updatedFiles)
      localStorage.setItem("files", JSON.stringify(updatedFiles))

      onAddNotification({
        userId: 1,
        title: "ملف جديد",
        message: `تم رفع الملف ${newFile.name} بنجاح`,
        type: "success",
        module: "files",
        relatedId: newFile.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })

      setUploadFormData({ name: "", folder: "", description: "", tags: "" })
      setSelectedUploadFile(null)
      setShowUploadDialog(false)
    }
    reader.readAsDataURL(selectedUploadFile)
  }

  const handleDelete = (fileId: number) => {
    const updatedFiles = files.filter((f) => f.id !== fileId)
    setFiles(updatedFiles)
    localStorage.setItem("files", JSON.stringify(updatedFiles))

    onAddNotification({
      userId: 1,
      title: "حذف ملف",
      message: `تم حذف الملف بنجاح`,
      type: "info",
      module: "files",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const toggleStar = (fileId: number) => {
    const updatedFiles = files.map((f) => (f.id === fileId ? { ...f, starred: !f.starred } : f))
    setFiles(updatedFiles)
    localStorage.setItem("files", JSON.stringify(updatedFiles))
  }

  const handleDownload = (file: FileItem) => {
    if (file.url) {
      const link = document.createElement("a")
      link.href = file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      onAddNotification({
        userId: 1,
        title: "تحميل ملف",
        message: `تم تحميل الملف ${file.name} بنجاح`,
        type: "success",
        module: "files",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })
    } else {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "الملف غير متاح للتحميل",
        type: "error",
        module: "files",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })
    }
  }

  const handleShare = (fileId: number) => {
    const updatedFiles = files.map((f) => (f.id === fileId ? { ...f, shared: !f.shared } : f))
    setFiles(updatedFiles)
    localStorage.setItem("files", JSON.stringify(updatedFiles))

    const file = updatedFiles.find((f) => f.id === fileId)
    onAddNotification({
      userId: 1,
      title: file?.shared ? "مشاركة ملف" : "إلغاء المشاركة",
      message: file?.shared ? `تم مشاركة الملف ${file.name}` : `تم إلغاء مشاركة الملف ${file?.name}`,
      type: "info",
      module: "files",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setSelectedUploadFile(droppedFile)
      if (!uploadFormData.name) {
        setUploadFormData({ ...uploadFormData, name: droppedFile.name })
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedUploadFile(file)
      if (!uploadFormData.name) {
        setUploadFormData({ ...uploadFormData, name: file.name })
      }
    }
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFolder = selectedFolder === "all" || file.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return FileText
      case "excel":
      case "xlsx":
        return FileSpreadsheet
      case "صورة":
      case "jpg":
      case "png":
        return ImageIcon
      case "فيديو":
        return FileVideo
      case "صوت":
        return FileAudio
      default:
        return File
    }
  }

  const totalSize = files.reduce((sum, file) => {
    const size = Number.parseFloat(file.size.split(" ")[0])
    return sum + size
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الملفات</p>
                <p className="text-3xl font-bold">{files.length}</p>
              </div>
              <File className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">المجلدات</p>
                <p className="text-3xl font-bold">{folders.length}</p>
              </div>
              <FolderOpen className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">المساحة المستخدمة</p>
                <p className="text-3xl font-bold">{totalSize.toFixed(0)} MB</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">الملفات المشتركة</p>
                <p className="text-3xl font-bold">{files.filter((f) => f.shared).length}</p>
              </div>
              <Share2 className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent flex items-center">
            <FolderOpen className="w-8 h-8 text-amber-600 ml-3" />
            الملفات والمرفقات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع المستندات والملفات الخاصة بالشركة</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button
            onClick={() => setShowFolderDialog(true)}
            variant="outline"
            className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
          >
            <FolderPlus className="w-4 h-4 ml-2" />
            مجلد جديد
          </Button>
          <Button
            onClick={() => setShowUploadDialog(true)}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
          >
            <Upload className="w-4 h-4 ml-2" />
            رفع ملف
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الملفات بالاسم أو الوسوم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl"
                dir="rtl"
              />
            </div>
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-64 h-12 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl">
                <SelectValue placeholder="جميع المجلدات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المجلدات</SelectItem>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.name}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
            >
              <Filter className="w-4 h-4 ml-2" />
              فلترة متقدمة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Folders Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FolderOpen className="w-6 h-6 ml-2" />
          المجلدات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {folders.map((folder) => {
            const Icon = getFolderIcon(folder.iconName)
            return (
              <Card
                key={folder.id}
                className={`border-0 shadow-lg bg-gradient-to-br ${folder.color} text-white cursor-pointer hover:scale-105 transition-transform duration-200`}
                onClick={() => setSelectedFolder(folder.name)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8" />
                    <Badge className="bg-white/20 text-white">{folder.filesCount}</Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{folder.name}</h3>
                  <div className="text-sm opacity-90">
                    <p>{folder.size}</p>
                    <p className="text-xs mt-1">{folder.createdDate}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Files Grid/List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <File className="w-6 h-6 ml-2" />
            الملفات ({filteredFiles.length})
          </h2>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              شبكة
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              قائمة
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => {
              const FileIcon = getFileIcon(file.type)
              return (
                <Card key={file.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button variant="ghost" size="sm" onClick={() => toggleStar(file.id)}>
                          <Star
                            className={`w-4 h-4 ${file.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                          />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleShare(file.id)}>
                          <Share2 className={`w-4 h-4 ${file.shared ? "text-blue-500" : "text-gray-400"}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{file.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{file.size}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {file.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="text-xs bg-blue-100 text-blue-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse mt-3 pt-3 border-t">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedFile(file)}
                          >
                            <Eye className="w-3 h-3 ml-1" />
                            عرض
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <FileIcon className="w-5 h-5 ml-2" />
                              {selectedFile?.name}
                            </DialogTitle>
                          </DialogHeader>
                          {selectedFile && (
                            <div className="space-y-4 py-4">
                              {/* Image Preview */}
                              {selectedFile.url &&
                                (selectedFile.type.toLowerCase() === "jpg" ||
                                  selectedFile.type.toLowerCase() === "png" ||
                                  selectedFile.type.toLowerCase() === "صورة") && (
                                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                    <img
                                      src={selectedFile.url || "/placeholder.svg"}
                                      alt={selectedFile.name}
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
                                )}

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">النوع</Label>
                                  <p className="text-sm mt-1">{selectedFile.type}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">الحجم</Label>
                                  <p className="text-sm mt-1">{selectedFile.size}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">المجلد</Label>
                                  <p className="text-sm mt-1">{selectedFile.folder}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">تاريخ الرفع</Label>
                                  <p className="text-sm mt-1">{selectedFile.uploadDate}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">رفع بواسطة</Label>
                                  <p className="text-sm mt-1">{selectedFile.uploadedBy}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">الحالة</Label>
                                  <Badge className="mt-1">{selectedFile.status}</Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">الوصف</Label>
                                <p className="text-sm mt-1 text-gray-700">{selectedFile.description}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">الوسوم</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedFile.tags.map((tag, index) => (
                                    <Badge key={index} className="bg-blue-100 text-blue-700">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleDownload(file)}
                      >
                        <Download className="w-3 h-3 ml-1" />
                        تحميل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold text-gray-700">الملف</th>
                      <th className="text-right p-4 font-semibold text-gray-700">المجلد</th>
                      <th className="text-right p-4 font-semibold text-gray-700">الحجم</th>
                      <th className="text-right p-4 font-semibold text-gray-700">تاريخ الرفع</th>
                      <th className="text-right p-4 font-semibold text-gray-700">رفع بواسطة</th>
                      <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                      <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => {
                      const FileIcon = getFileIcon(file.type)
                      return (
                        <tr key={file.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                                <FileIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{file.name}</div>
                                <div className="text-xs text-gray-500">{file.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{file.folder}</Badge>
                          </td>
                          <td className="p-4 text-gray-600">{file.size}</td>
                          <td className="p-4 text-gray-600">{file.uploadDate}</td>
                          <td className="p-4 text-gray-600">{file.uploadedBy}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                file.status === "نشط"
                                  ? "bg-green-100 text-green-800"
                                  : file.status === "معتمد"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {file.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button variant="ghost" size="sm" onClick={() => toggleStar(file.id)}>
                                <Star
                                  className={`w-4 h-4 ${file.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                                />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleShare(file.id)}>
                                <Share2 className={`w-4 h-4 ${file.shared ? "text-blue-500" : "text-gray-400"}`} />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedFile(file)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDownload(file)}>
                                <Download className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      هل أنت متأكد من حذف الملف "{file.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(file.id)}
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
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Upload className="w-5 h-5 ml-2" />
              رفع ملف جديد
            </DialogTitle>
            <DialogDescription>قم برفع ملف جديد إلى النظام</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fileName">اسم الملف *</Label>
              <Input
                id="fileName"
                value={uploadFormData.name}
                onChange={(e) => setUploadFormData({ ...uploadFormData, name: e.target.value })}
                placeholder="أدخل اسم الملف"
                dir="rtl"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileFolder">المجلد *</Label>
              <Select
                value={uploadFormData.folder}
                onValueChange={(value) => setUploadFormData({ ...uploadFormData, folder: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="اختر المجلد" />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileDescription">الوصف</Label>
              <Textarea
                id="fileDescription"
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData({ ...uploadFormData, description: e.target.value })}
                placeholder="أدخل وصف الملف"
                dir="rtl"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileTags">الوسوم</Label>
              <Input
                id="fileTags"
                value={uploadFormData.tags}
                onChange={(e) => setUploadFormData({ ...uploadFormData, tags: e.target.value })}
                placeholder="أدخل الوسوم مفصولة بفاصلة"
                dir="rtl"
                className="h-12"
              />
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <input id="file-input" type="file" className="hidden" onChange={handleFileInput} accept="*/*" />
              {selectedUploadFile ? (
                <div className="space-y-2">
                  <File className="w-12 h-12 mx-auto text-green-500" />
                  <p className="text-sm font-semibold text-green-700">{selectedUploadFile.name}</p>
                  <p className="text-xs text-gray-500">{(selectedUploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedUploadFile(null)
                    }}
                  >
                    <XCircle className="w-3 h-3 ml-1" />
                    إزالة
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 mb-1">اسحب الملف هنا أو انقر للتحميل</p>
                  <p className="text-xs text-gray-400">الحد الأقصى: 50 MB</p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              <XCircle className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
            <Button onClick={handleUpload} className="bg-gradient-to-r from-amber-600 to-yellow-600">
              <Save className="w-4 h-4 ml-2" />
              رفع الملف
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Folder Dialog */}
      <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FolderPlus className="w-5 h-5 ml-2" />
              إنشاء مجلد جديد
            </DialogTitle>
            <DialogDescription>قم بإنشاء مجلد جديد لتنظيم الملفات</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">اسم المجلد *</Label>
              <Input id="folderName" placeholder="أدخل اسم المجلد" dir="rtl" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="folderDescription">الوصف</Label>
              <Textarea id="folderDescription" placeholder="أدخل وصف المجلد" dir="rtl" rows={3} />
            </div>
          </div>
          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <Button variant="outline" onClick={() => setShowFolderDialog(false)}>
              <XCircle className="w-4 h-4 ml-2" />
              إلغاء
            </Button>
            <Button
              onClick={() => {
                setShowFolderDialog(false)
                onAddNotification({
                  userId: 1,
                  title: "مجلد جديد",
                  message: "تم إنشاء المجلد بنجاح",
                  type: "success",
                  module: "files",
                  timestamp: new Date().toLocaleString("ar-EG"),
                  isRead: false,
                  priority: "low",
                })
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Save className="w-4 h-4 ml-2" />
              إنشاء المجلد
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
