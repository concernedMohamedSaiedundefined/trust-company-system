"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Save,
  XCircle,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Ship,
  Building2,
  User,
  Hash,
  Paperclip,
} from "lucide-react"
import type { Notification, CustomsDocument } from "@/types"

interface CustomsManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function CustomsManagement({ onAddNotification }: CustomsManagementProps) {
  const [documents, setDocuments] = useState<CustomsDocument[]>([
    {
      id: 1,
      documentNumber: "CUS-2024-001",
      documentType: "بيان جمركي",
      shipmentId: 1,
      shipmentNumber: "SH-2024-001",
      issueDate: "2024-01-10",
      expiryDate: "2024-02-10",
      customsOffice: "جمارك القاهرة",
      declarant: "أحمد محمد",
      status: "معتمد",
      fees: 500,
      taxes: 300,
      totalCost: 800,
      notes: "تم التخليص بنجاح",
      attachments: ["بيان-جمركي.pdf", "فاتورة.pdf"],
    },
    {
      id: 2,
      documentNumber: "CUS-2024-002",
      documentType: "شهادة منشأ",
      shipmentId: 2,
      shipmentNumber: "SH-2024-002",
      issueDate: "2024-01-15",
      expiryDate: "2024-02-15",
      customsOffice: "جمارك الإسكندرية",
      declarant: "فاطمة علي",
      status: "قيد المراجعة",
      fees: 200,
      taxes: 150,
      totalCost: 350,
      notes: "في انتظار الموافقة",
      attachments: ["شهادة-منشأ.pdf"],
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<CustomsDocument | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<CustomsDocument>>({
    documentNumber: `CUS-2024-${String(documents.length + 1).padStart(3, "0")}`,
    documentType: "بيان جمركي",
    shipmentId: 0,
    shipmentNumber: "",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    customsOffice: "",
    declarant: "",
    status: "قيد المراجعة",
    fees: 0,
    taxes: 0,
    totalCost: 0,
    notes: "",
    attachments: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDocument: CustomsDocument = {
      ...(formData as CustomsDocument),
      id: documents.length + 1,
      totalCost: (formData.fees || 0) + (formData.taxes || 0),
    }
    const updatedDocuments = [...documents, newDocument]
    setDocuments(updatedDocuments)

    onAddNotification({
      userId: 1,
      title: "مستند جمركي جديد",
      message: `تم إضافة المستند ${newDocument.documentNumber} بنجاح`,
      type: "success",
      module: "customs",
      relatedId: newDocument.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setFormData({
      documentNumber: `CUS-2024-${String(documents.length + 2).padStart(3, "0")}`,
      documentType: "بيان جمركي",
      shipmentId: 0,
      shipmentNumber: "",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      customsOffice: "",
      declarant: "",
      status: "قيد المراجعة",
      fees: 0,
      taxes: 0,
      totalCost: 0,
      notes: "",
      attachments: [],
    })
    setShowAddForm(false)
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.declarant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalDocuments: documents.length,
    approved: documents.filter((d) => d.status === "معتمد").length,
    pending: documents.filter((d) => d.status === "قيد المراجعة").length,
    totalCost: documents.reduce((sum, doc) => sum + doc.totalCost, 0),
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">إجمالي المستندات</p>
                <p className="text-3xl font-bold">{stats.totalDocuments}</p>
              </div>
              <FileText className="w-8 h-8 text-indigo-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">المستندات المعتمدة</p>
                <p className="text-3xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">قيد المراجعة</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">التكلفة الإجمالية</p>
                <p className="text-3xl font-bold">${stats.totalCost.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent flex items-center">
            <FileText className="w-8 h-8 text-indigo-600 ml-3" />
            إدارة التخليص الجمركي
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع مستندات التخليص الجمركي والإجراءات المتعلقة بها</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة مستند جمركي"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المستندات الجمركية برقم المستند أو الشحنة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl"
                dir="rtl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
            >
              <Filter className="w-4 h-4 ml-2" />
              فلترة متقدمة
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
              onClick={() => {
                onAddNotification({
                  userId: 1,
                  title: "تصدير البيانات",
                  message: "تم تصدير بيانات المستندات الجمركية بنجاح",
                  type: "success",
                  module: "customs",
                  timestamp: new Date().toLocaleString("ar-EG"),
                  isRead: false,
                  priority: "low",
                })
              }}
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-indigo-600" />
              إضافة مستند جمركي جديد
            </CardTitle>
            <CardDescription>أدخل بيانات المستند الجمركي الجديد</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="documentNumber" className="flex items-center text-sm font-medium">
                    <Hash className="w-4 h-4 ml-2" />
                    رقم المستند *
                  </Label>
                  <Input
                    id="documentNumber"
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="CUS-2024-001"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentType" className="flex items-center text-sm font-medium">
                    <FileText className="w-4 h-4 ml-2" />
                    نوع المستند *
                  </Label>
                  <Select
                    value={formData.documentType}
                    onValueChange={(value) => setFormData({ ...formData, documentType: value })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="اختر نوع المستند" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="بيان جمركي">بيان جمركي</SelectItem>
                      <SelectItem value="شهادة منشأ">شهادة منشأ</SelectItem>
                      <SelectItem value="فاتورة تجارية">فاتورة تجارية</SelectItem>
                      <SelectItem value="قائمة تعبئة">قائمة تعبئة</SelectItem>
                      <SelectItem value="شهادة فحص">شهادة فحص</SelectItem>
                      <SelectItem value="تصاريح">تصاريح</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipmentNumber" className="flex items-center text-sm font-medium">
                    <Ship className="w-4 h-4 ml-2" />
                    رقم الشحنة *
                  </Label>
                  <Input
                    id="shipmentNumber"
                    value={formData.shipmentNumber}
                    onChange={(e) => setFormData({ ...formData, shipmentNumber: e.target.value })}
                    placeholder="SH-2024-001"
                    required
                    dir="rtl"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDate" className="flex items-center text-sm font-medium">
                    <Calendar className="w-4 h-4 ml-2" />
                    تاريخ الإصدار *
                  </Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="flex items-center text-sm font-medium">
                    <Calendar className="w-4 h-4 ml-2" />
                    تاريخ الانتهاء
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customsOffice" className="flex items-center text-sm font-medium">
                    <Building2 className="w-4 h-4 ml-2" />
                    مكتب الجمارك *
                  </Label>
                  <Input
                    id="customsOffice"
                    value={formData.customsOffice}
                    onChange={(e) => setFormData({ ...formData, customsOffice: e.target.value })}
                    placeholder="جمارك القاهرة"
                    required
                    dir="rtl"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="declarant" className="flex items-center text-sm font-medium">
                    <User className="w-4 h-4 ml-2" />
                    المخلص الجمركي *
                  </Label>
                  <Input
                    id="declarant"
                    value={formData.declarant}
                    onChange={(e) => setFormData({ ...formData, declarant: e.target.value })}
                    placeholder="أحمد محمد"
                    required
                    dir="rtl"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="flex items-center text-sm font-medium">
                    <CheckCircle className="w-4 h-4 ml-2" />
                    الحالة
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                      <SelectItem value="معتمد">معتمد</SelectItem>
                      <SelectItem value="مرفوض">مرفوض</SelectItem>
                      <SelectItem value="معلق">معلق</SelectItem>
                      <SelectItem value="مكتمل">مكتمل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fees" className="flex items-center text-sm font-medium">
                    <DollarSign className="w-4 h-4 ml-2" />
                    الرسوم الجمركية
                  </Label>
                  <Input
                    id="fees"
                    type="number"
                    step="0.01"
                    value={formData.fees}
                    onChange={(e) => {
                      const fees = Number(e.target.value)
                      const taxes = formData.taxes || 0
                      setFormData({ ...formData, fees, totalCost: fees + taxes })
                    }}
                    placeholder="0.00"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxes" className="flex items-center text-sm font-medium">
                    <DollarSign className="w-4 h-4 ml-2" />
                    الضرائب
                  </Label>
                  <Input
                    id="taxes"
                    type="number"
                    step="0.01"
                    value={formData.taxes}
                    onChange={(e) => {
                      const taxes = Number(e.target.value)
                      const fees = formData.fees || 0
                      setFormData({ ...formData, taxes, totalCost: fees + taxes })
                    }}
                    placeholder="0.00"
                    className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCost" className="flex items-center text-sm font-medium">
                    <DollarSign className="w-4 h-4 ml-2" />
                    التكلفة الإجمالية
                  </Label>
                  <Input
                    id="totalCost"
                    type="number"
                    step="0.01"
                    value={formData.totalCost}
                    readOnly
                    className="h-12 border-2 border-gray-200 bg-gray-50 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center text-sm font-medium">
                  <FileText className="w-4 h-4 ml-2" />
                  ملاحظات
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ملاحظات إضافية..."
                  dir="rtl"
                  className="border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-3 rounded-xl"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المستند
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <FileText className="w-6 h-6 ml-2 text-indigo-600" />
                قائمة المستندات الجمركية
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                إجمالي المستندات: {filteredDocuments.length} | معتمد: {stats.approved} | قيد المراجعة: {stats.pending}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">رقم المستند</th>
                  <th className="text-right p-4 font-semibold text-gray-700">النوع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">رقم الشحنة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ الإصدار</th>
                  <th className="text-right p-4 font-semibold text-gray-700">مكتب الجمارك</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المخلص الجمركي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الرسوم</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الضرائب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجمالي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc, index) => (
                  <tr
                    key={doc.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-indigo-600">{doc.documentNumber}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        {doc.documentType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Ship className="w-4 h-4 ml-2 text-gray-400" />
                        {doc.shipmentNumber}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {doc.issueDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Building2 className="w-4 h-4 ml-2 text-gray-400" />
                        {doc.customsOffice}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <User className="w-4 h-4 ml-2 text-gray-400" />
                        {doc.declarant}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">${doc.fees.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">${doc.taxes.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-indigo-600">${doc.totalCost.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          doc.status === "معتمد"
                            ? "default"
                            : doc.status === "قيد المراجعة"
                              ? "secondary"
                              : doc.status === "مرفوض"
                                ? "destructive"
                                : "outline"
                        }
                        className={
                          doc.status === "معتمد"
                            ? "bg-green-100 text-green-800"
                            : doc.status === "قيد المراجعة"
                              ? "bg-orange-100 text-orange-800"
                              : doc.status === "مرفوض"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedDocument(doc)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
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

      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 ml-2 text-indigo-600" />
                  تفاصيل المستند الجمركي
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)}>
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">رقم المستند</Label>
                  <p className="font-semibold text-indigo-600">{selectedDocument.documentNumber}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">النوع</Label>
                  <p className="font-semibold">{selectedDocument.documentType}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">رقم الشحنة</Label>
                  <p className="font-semibold">{selectedDocument.shipmentNumber}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">تاريخ الإصدار</Label>
                  <p className="font-semibold">{selectedDocument.issueDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">تاريخ الانتهاء</Label>
                  <p className="font-semibold">{selectedDocument.expiryDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">مكتب الجمارك</Label>
                  <p className="font-semibold">{selectedDocument.customsOffice}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">المخلص الجمركي</Label>
                  <p className="font-semibold">{selectedDocument.declarant}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">الحالة</Label>
                  <Badge
                    className={
                      selectedDocument.status === "معتمد"
                        ? "bg-green-100 text-green-800"
                        : selectedDocument.status === "قيد المراجعة"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {selectedDocument.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">الرسوم الجمركية</Label>
                  <p className="font-bold text-gray-900">${selectedDocument.fees.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-500">الضرائب</Label>
                  <p className="font-bold text-gray-900">${selectedDocument.taxes.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm text-gray-500">التكلفة الإجمالية</Label>
                  <p className="font-bold text-indigo-600 text-xl">${selectedDocument.totalCost.toFixed(2)}</p>
                </div>
              </div>
              {selectedDocument.notes && (
                <div>
                  <Label className="text-sm text-gray-500">ملاحظات</Label>
                  <p className="mt-1 text-gray-700">{selectedDocument.notes}</p>
                </div>
              )}
              {selectedDocument.attachments && selectedDocument.attachments.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-500 flex items-center">
                    <Paperclip className="w-4 h-4 ml-2" />
                    المرفقات
                  </Label>
                  <div className="mt-2 space-y-2">
                    {selectedDocument.attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
