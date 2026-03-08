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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Save,
  Beaker,
  Award,
  Target,
  AlertCircle,
  Microscope,
} from "lucide-react"
import type { FoodSafetyTest, FoodSafetyCertificate, QualityIncident, Notification } from "@/types"

interface FoodSafetyManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function FoodSafetyManagement({ onAddNotification }: FoodSafetyManagementProps) {
  const [activeTab, setActiveTab] = useState("tests")
  const [tests, setTests] = useState<FoodSafetyTest[]>([
    {
      id: 1,
      testNumber: "FST-2024-001",
      productName: "طماطم طازجة",
      productId: 1,
      batchNumber: "BTH-2024-001",
      testType: "فحص ميكروبيولوجي",
      testDate: "2024-01-15",
      laboratory: "مختبر الجودة المركزي",
      result: "مطابق",
      score: 95,
      expiryDate: "2024-02-15",
      inspector: "د. أحمد حسن",
      standards: ["ISO 22000", "HACCP", "GMP"],
      remarks: "جميع الفحوصات مطابقة للمواصفات الدولية",
      documents: ["test-report.pdf", "certificate.pdf"],
      status: "مكتمل",
      correctionRequired: false,
    },
    {
      id: 2,
      testNumber: "FST-2024-002",
      productName: "بطاطس",
      productId: 2,
      batchNumber: "BTH-2024-002",
      testType: "فحص المبيدات",
      testDate: "2024-01-18",
      laboratory: "مختبر سلامة الغذاء",
      result: "مطابق مع ملاحظات",
      score: 82,
      expiryDate: "2024-03-01",
      inspector: "د. فاطمة علي",
      standards: ["ISO 22000", "EU Regulations"],
      remarks: "مستوى المبيدات ضمن الحدود المسموحة لكن يوصى بالمراقبة",
      documents: ["pesticide-test.pdf"],
      status: "مكتمل",
      correctionRequired: true,
      correctionDeadline: "2024-02-01",
    },
  ])

  const [certificates, setCertificates] = useState<FoodSafetyCertificate[]>([
    {
      id: 1,
      certificateNumber: "CERT-2024-001",
      certificateType: "ISO 22000",
      issuingAuthority: "الهيئة المصرية للمواصفات",
      issueDate: "2024-01-01",
      expiryDate: "2025-01-01",
      scope: "إنتاج وتصدير المحاصيل الزراعية الطازجة",
      status: "نشط",
      products: ["طماطم", "بطاطس", "خيار", "فلفل"],
      inspector: "د. محمد إبراهيم",
      documents: ["iso-certificate.pdf", "audit-report.pdf"],
      renewalDate: "2024-11-01",
      notes: "شهادة رئيسية للتصدير الدولي",
    },
    {
      id: 2,
      certificateNumber: "CERT-2024-002",
      certificateType: "HACCP",
      issuingAuthority: "المجلس الدولي لسلامة الغذاء",
      issueDate: "2023-12-15",
      expiryDate: "2025-12-15",
      scope: "نظام تحليل المخاطر ونقاط التحكم الحرجة",
      status: "نشط",
      products: ["جميع المنتجات"],
      inspector: "د. سارة أحمد",
      documents: ["haccp-certificate.pdf", "procedures.pdf"],
      renewalDate: "2025-10-15",
      notes: "شهادة أساسية لضمان سلامة الغذاء",
    },
  ])

  const [incidents, setIncidents] = useState<QualityIncident[]>([
    {
      id: 1,
      incidentNumber: "INC-2024-001",
      title: "اكتشاف تلف في بعض العبوات",
      severity: "متوسطة",
      date: "2024-01-20",
      location: "مخزن رقم 2",
      product: "طماطم طازجة",
      description: "تم اكتشاف تلف في 5 عبوات بسبب سوء التخزين",
      reportedBy: "مشرف المخزن - أحمد محمد",
      assignedTo: "مدير الجودة - د. محمد حسن",
      status: "تحت المعالجة",
      rootCause: "درجة حرارة التخزين غير مناسبة",
      correctiveAction: "تعديل إعدادات التبريد وفرز العبوات التالفة",
      deadline: "2024-01-25",
      documents: ["incident-photos.pdf", "investigation-report.pdf"],
    },
    {
      id: 2,
      incidentNumber: "INC-2024-002",
      title: "شكوى عميل من جودة المنتج",
      severity: "عالية",
      date: "2024-01-22",
      location: "شحنة رقم SH-2024-001",
      product: "بطاطس",
      description: "شكوى من عميل بخصوص وجود بعض الدرنات غير مطابقة للمواصفات",
      reportedBy: "خدمة العملاء - فاطمة أحمد",
      assignedTo: "مدير الجودة - د. محمد حسن",
      status: "مغلق",
      rootCause: "خطأ في عملية الفرز والتصنيف",
      correctiveAction: "إعادة تدريب فريق الفرز وتعزيز الفحص النهائي",
      preventiveAction: "تطبيق نظام فحص مزدوج قبل الشحن",
      deadline: "2024-01-30",
      documents: ["customer-complaint.pdf", "action-plan.pdf"],
      verificationDate: "2024-02-05",
      verifiedBy: "مدير الجودة",
    },
  ])

  const [showAddTest, setShowAddTest] = useState(false)
  const [showAddCertificate, setShowAddCertificate] = useState(false)
  const [showAddIncident, setShowAddIncident] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const [testFormData, setTestFormData] = useState<Partial<FoodSafetyTest>>({
    testNumber: "",
    productName: "",
    productId: 0,
    batchNumber: "",
    testType: "فحص ميكروبيولوجي",
    testDate: new Date().toISOString().split("T")[0],
    laboratory: "",
    result: "قيد الفحص",
    score: 0,
    expiryDate: "",
    inspector: "",
    standards: [],
    remarks: "",
    documents: [],
    status: "قيد الفحص",
    correctionRequired: false,
  })

  const [certificateFormData, setCertificateFormData] = useState<Partial<FoodSafetyCertificate>>({
    certificateNumber: "",
    certificateType: "ISO 22000",
    issuingAuthority: "",
    issueDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    scope: "",
    status: "نشط",
    products: [],
    inspector: "",
    documents: [],
    notes: "",
  })

  const [incidentFormData, setIncidentFormData] = useState<Partial<QualityIncident>>({
    incidentNumber: "",
    title: "",
    severity: "متوسطة",
    date: new Date().toISOString().split("T")[0],
    location: "",
    description: "",
    reportedBy: "",
    assignedTo: "",
    status: "جديد",
    deadline: "",
    documents: [],
  })

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault()
    const newTest: FoodSafetyTest = {
      ...(testFormData as FoodSafetyTest),
      id: tests.length + 1,
      testNumber: `FST-2024-${String(tests.length + 1).padStart(3, "0")}`,
      documents: testFormData.documents || [],
      standards: testFormData.standards || [],
    }
    const updatedTests = [...tests, newTest]
    setTests(updatedTests)
    localStorage.setItem("foodSafetyTests", JSON.stringify(updatedTests))

    onAddNotification({
      userId: 1,
      title: "فحص جديد",
      message: `تم إضافة فحص جديد للمنتج ${newTest.productName}`,
      type: "info",
      module: "safety",
      relatedId: newTest.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setTestFormData({
      testNumber: "",
      productName: "",
      productId: 0,
      batchNumber: "",
      testType: "فحص ميكروبيولوجي",
      testDate: new Date().toISOString().split("T")[0],
      laboratory: "",
      result: "قيد الفحص",
      score: 0,
      expiryDate: "",
      inspector: "",
      standards: [],
      remarks: "",
      documents: [],
      status: "قيد الفحص",
      correctionRequired: false,
    })
    setShowAddTest(false)
  }

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault()
    const newCertificate: FoodSafetyCertificate = {
      ...(certificateFormData as FoodSafetyCertificate),
      id: certificates.length + 1,
      certificateNumber: `CERT-2024-${String(certificates.length + 1).padStart(3, "0")}`,
      products: certificateFormData.products || [],
      documents: certificateFormData.documents || [],
    }
    const updatedCertificates = [...certificates, newCertificate]
    setCertificates(updatedCertificates)
    localStorage.setItem("foodSafetyCertificates", JSON.stringify(updatedCertificates))

    onAddNotification({
      userId: 1,
      title: "شهادة جديدة",
      message: `تم إضافة شهادة ${newCertificate.certificateType}`,
      type: "success",
      module: "safety",
      relatedId: newCertificate.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "high",
    })

    setCertificateFormData({
      certificateNumber: "",
      certificateType: "ISO 22000",
      issuingAuthority: "",
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      scope: "",
      status: "نشط",
      products: [],
      inspector: "",
      documents: [],
      notes: "",
    })
    setShowAddCertificate(false)
  }

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault()
    const newIncident: QualityIncident = {
      ...(incidentFormData as QualityIncident),
      id: incidents.length + 1,
      incidentNumber: `INC-2024-${String(incidents.length + 1).padStart(3, "0")}`,
      documents: incidentFormData.documents || [],
    }
    const updatedIncidents = [...incidents, newIncident]
    setIncidents(updatedIncidents)
    localStorage.setItem("qualityIncidents", JSON.stringify(updatedIncidents))

    onAddNotification({
      userId: 1,
      title: "حادثة جودة جديدة",
      message: `تم تسجيل حادثة: ${newIncident.title}`,
      type: "warning",
      module: "safety",
      relatedId: newIncident.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: newIncident.severity === "عالية" ? "high" : "medium",
    })

    setIncidentFormData({
      incidentNumber: "",
      title: "",
      severity: "متوسطة",
      date: new Date().toISOString().split("T")[0],
      location: "",
      description: "",
      reportedBy: "",
      assignedTo: "",
      status: "جديد",
      deadline: "",
      documents: [],
    })
    setShowAddIncident(false)
  }

  const filteredTests = tests.filter(
    (t) =>
      t.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCertificates = certificates.filter(
    (c) =>
      c.certificateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredIncidents = incidents.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.incidentNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const testStats = {
    totalTests: tests.length,
    passedTests: tests.filter((t) => t.result === "مطابق").length,
    failedTests: tests.filter((t) => t.result === "غير مطابق").length,
    pendingTests: tests.filter((t) => t.result === "قيد الفحص").length,
    averageScore: tests.reduce((sum, t) => sum + t.score, 0) / tests.length || 0,
  }

  const certificateStats = {
    totalCertificates: certificates.length,
    activeCertificates: certificates.filter((c) => c.status === "نشط").length,
    expiringCertificates: certificates.filter((c) => {
      const expiryDate = new Date(c.expiryDate)
      const today = new Date()
      const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 90 && daysUntilExpiry > 0
    }).length,
  }

  const incidentStats = {
    totalIncidents: incidents.length,
    openIncidents: incidents.filter((i) => i.status === "جديد" || i.status === "تحت المعالجة").length,
    closedIncidents: incidents.filter((i) => i.status === "مغلق").length,
    highSeverity: incidents.filter((i) => i.severity === "عالية").length,
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">إجمالي الفحوصات</p>
                <p className="text-3xl font-bold">{testStats.totalTests}</p>
              </div>
              <Beaker className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">الشهادات النشطة</p>
                <p className="text-3xl font-bold">{certificateStats.activeCertificates}</p>
              </div>
              <Award className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">معدل النجاح</p>
                <p className="text-3xl font-bold">{testStats.averageScore.toFixed(0)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">حوادث مفتوحة</p>
                <p className="text-3xl font-bold">{incidentStats.openIncidents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center">
            <Shield className="w-8 h-8 text-emerald-600 ml-3" />
            إدارة سلامة الغذاء
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للفحوصات والشهادات وحوادث الجودة</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الفحوصات والشهادات والحوادث..."
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
              فلترة
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white hover:bg-white"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 h-14">
          <TabsTrigger value="tests" className="text-base">
            <Microscope className="w-5 h-5 ml-2" />
            الفحوصات ({testStats.totalTests})
          </TabsTrigger>
          <TabsTrigger value="certificates" className="text-base">
            <Award className="w-5 h-5 ml-2" />
            الشهادات ({certificateStats.totalCertificates})
          </TabsTrigger>
          <TabsTrigger value="incidents" className="text-base">
            <AlertCircle className="w-5 h-5 ml-2" />
            حوادث الجودة ({incidentStats.totalIncidents})
          </TabsTrigger>
        </TabsList>

        {/* Tests Tab */}
        <TabsContent value="tests" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddTest(!showAddTest)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              {showAddTest ? "إلغاء" : "إضافة فحص"}
            </Button>
          </div>

          {showAddTest && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Plus className="w-6 h-6 ml-2 text-emerald-600" />
                  إضافة فحص جديد
                </CardTitle>
                <CardDescription>أدخل تفاصيل الفحص بدقة</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddTest} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName">اسم المنتج *</Label>
                    <Input
                      id="productName"
                      value={testFormData.productName}
                      onChange={(e) => setTestFormData({ ...testFormData, productName: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">رقم الدفعة *</Label>
                    <Input
                      id="batchNumber"
                      value={testFormData.batchNumber}
                      onChange={(e) => setTestFormData({ ...testFormData, batchNumber: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testType">نوع الفحص</Label>
                    <Select
                      value={testFormData.testType}
                      onValueChange={(value) => setTestFormData({ ...testFormData, testType: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="فحص ميكروبيولوجي">فحص ميكروبيولوجي</SelectItem>
                        <SelectItem value="فحص المبيدات">فحص المبيدات</SelectItem>
                        <SelectItem value="فحص المعادن الثقيلة">فحص المعادن الثقيلة</SelectItem>
                        <SelectItem value="فحص المواد الكيميائية">فحص المواد الكيميائية</SelectItem>
                        <SelectItem value="فحص الجودة الشاملة">فحص الجودة الشاملة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="laboratory">المختبر</Label>
                    <Input
                      id="laboratory"
                      value={testFormData.laboratory}
                      onChange={(e) => setTestFormData({ ...testFormData, laboratory: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="testDate">تاريخ الفحص</Label>
                    <Input
                      id="testDate"
                      type="date"
                      value={testFormData.testDate}
                      onChange={(e) => setTestFormData({ ...testFormData, testDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inspector">المفتش</Label>
                    <Input
                      id="inspector"
                      value={testFormData.inspector}
                      onChange={(e) => setTestFormData({ ...testFormData, inspector: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="score">الدرجة</Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max="100"
                      value={testFormData.score}
                      onChange={(e) => setTestFormData({ ...testFormData, score: Number(e.target.value) })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاريخ الصلاحية</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={testFormData.expiryDate}
                      onChange={(e) => setTestFormData({ ...testFormData, expiryDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="remarks">ملاحظات</Label>
                    <Textarea
                      id="remarks"
                      value={testFormData.remarks}
                      onChange={(e) => setTestFormData({ ...testFormData, remarks: e.target.value })}
                      dir="rtl"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddTest(false)}>
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-green-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ الفحص
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tests List */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="flex items-center">
                <Microscope className="w-6 h-6 ml-2 text-emerald-600" />
                قائمة الفحوصات
              </CardTitle>
              <CardDescription>
                <Target className="w-4 h-4 inline ml-1" />
                مطابق: {testStats.passedTests} | غير مطابق: {testStats.failedTests} | قيد الفحص:{" "}
                {testStats.pendingTests}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold">رقم الفحص</th>
                      <th className="text-right p-4 font-semibold">المنتج</th>
                      <th className="text-right p-4 font-semibold">نوع الفحص</th>
                      <th className="text-right p-4 font-semibold">التاريخ</th>
                      <th className="text-right p-4 font-semibold">النتيجة</th>
                      <th className="text-right p-4 font-semibold">الدرجة</th>
                      <th className="text-right p-4 font-semibold">المختبر</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.map((test, index) => (
                      <tr
                        key={test.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{test.testNumber}</div>
                          <div className="text-sm text-gray-500">{test.batchNumber}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{test.productName}</div>
                          <div className="text-sm text-gray-500">{test.inspector}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{test.testType}</Badge>
                        </td>
                        <td className="p-4 text-sm">{test.testDate}</td>
                        <td className="p-4">
                          <Badge
                            className={
                              test.result === "مطابق"
                                ? "bg-green-100 text-green-800"
                                : test.result === "غير مطابق"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {test.result}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div
                              className={`font-bold ${test.score >= 90 ? "text-green-600" : test.score >= 70 ? "text-yellow-600" : "text-red-600"}`}
                            >
                              {test.score}%
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{test.laboratory}</td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddCertificate(!showAddCertificate)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              {showAddCertificate ? "إلغاء" : "إضافة شهادة"}
            </Button>
          </div>

          {showAddCertificate && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Plus className="w-6 h-6 ml-2 text-emerald-600" />
                  إضافة شهادة جديدة
                </CardTitle>
                <CardDescription>أدخل تفاصيل الشهادة بدقة</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddCertificate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="certificateType">نوع الشهادة *</Label>
                    <Select
                      value={certificateFormData.certificateType}
                      onValueChange={(value) =>
                        setCertificateFormData({ ...certificateFormData, certificateType: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ISO 22000">ISO 22000</SelectItem>
                        <SelectItem value="HACCP">HACCP</SelectItem>
                        <SelectItem value="GMP">GMP</SelectItem>
                        <SelectItem value="Global GAP">Global GAP</SelectItem>
                        <SelectItem value="Organic">Organic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuingAuthority">الجهة المصدرة *</Label>
                    <Input
                      id="issuingAuthority"
                      value={certificateFormData.issuingAuthority}
                      onChange={(e) =>
                        setCertificateFormData({ ...certificateFormData, issuingAuthority: e.target.value })
                      }
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issueDate">تاريخ الإصدار</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={certificateFormData.issueDate}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, issueDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={certificateFormData.expiryDate}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, expiryDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certInspector">المفتش</Label>
                    <Input
                      id="certInspector"
                      value={certificateFormData.inspector}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, inspector: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="renewalDate">تاريخ التجديد</Label>
                    <Input
                      id="renewalDate"
                      type="date"
                      value={certificateFormData.renewalDate}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, renewalDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="scope">نطاق الشهادة</Label>
                    <Textarea
                      id="scope"
                      value={certificateFormData.scope}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, scope: e.target.value })}
                      dir="rtl"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="certNotes">ملاحظات</Label>
                    <Textarea
                      id="certNotes"
                      value={certificateFormData.notes}
                      onChange={(e) => setCertificateFormData({ ...certificateFormData, notes: e.target.value })}
                      dir="rtl"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddCertificate(false)}>
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-green-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ الشهادة
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Certificates List */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="flex items-center">
                <Award className="w-6 h-6 ml-2 text-emerald-600" />
                قائمة الشهادات
              </CardTitle>
              <CardDescription>
                <Target className="w-4 h-4 inline ml-1" />
                نشطة: {certificateStats.activeCertificates} | قريبة الانتهاء: {certificateStats.expiringCertificates}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold">رقم الشهادة</th>
                      <th className="text-right p-4 font-semibold">النوع</th>
                      <th className="text-right p-4 font-semibold">الجهة المصدرة</th>
                      <th className="text-right p-4 font-semibold">الصلاحية</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                      <th className="text-right p-4 font-semibold">النطاق</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCertificates.map((cert, index) => (
                      <tr
                        key={cert.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{cert.certificateNumber}</div>
                          <div className="text-sm text-gray-500">{cert.inspector}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {cert.certificateType}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{cert.issuingAuthority}</td>
                        <td className="p-4">
                          <div className="text-sm">{cert.issueDate}</div>
                          <div className="text-sm text-gray-500">{cert.expiryDate}</div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              cert.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {cert.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm max-w-xs truncate">{cert.scope}</td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddIncident(!showAddIncident)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              {showAddIncident ? "إلغاء" : "تسجيل حادثة"}
            </Button>
          </div>

          {showAddIncident && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Plus className="w-6 h-6 ml-2 text-orange-600" />
                  تسجيل حادثة جودة جديدة
                </CardTitle>
                <CardDescription>أدخل تفاصيل الحادثة بدقة</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddIncident} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="incidentTitle">عنوان الحادثة *</Label>
                    <Input
                      id="incidentTitle"
                      value={incidentFormData.title}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, title: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">الخطورة</Label>
                    <Select
                      value={incidentFormData.severity}
                      onValueChange={(value) => setIncidentFormData({ ...incidentFormData, severity: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عالية">عالية</SelectItem>
                        <SelectItem value="متوسطة">متوسطة</SelectItem>
                        <SelectItem value="منخفضة">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incidentDate">تاريخ الحادثة</Label>
                    <Input
                      id="incidentDate"
                      type="date"
                      value={incidentFormData.date}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, date: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">الموقع</Label>
                    <Input
                      id="location"
                      value={incidentFormData.location}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, location: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reportedBy">المبلغ</Label>
                    <Input
                      id="reportedBy"
                      value={incidentFormData.reportedBy}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, reportedBy: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">المسؤول</Label>
                    <Input
                      id="assignedTo"
                      value={incidentFormData.assignedTo}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, assignedTo: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">الموعد النهائي</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={incidentFormData.deadline}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, deadline: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incidentProduct">المنتج (إن وجد)</Label>
                    <Input
                      id="incidentProduct"
                      value={incidentFormData.product}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, product: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="incidentDescription">وصف الحادثة *</Label>
                    <Textarea
                      id="incidentDescription"
                      value={incidentFormData.description}
                      onChange={(e) => setIncidentFormData({ ...incidentFormData, description: e.target.value })}
                      required
                      dir="rtl"
                      rows={4}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddIncident(false)}>
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ الحادثة
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Incidents List */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center">
                <AlertCircle className="w-6 h-6 ml-2 text-orange-600" />
                قائمة حوادث الجودة
              </CardTitle>
              <CardDescription>
                <Target className="w-4 h-4 inline ml-1" />
                مفتوحة: {incidentStats.openIncidents} | مغلقة: {incidentStats.closedIncidents} | عالية الخطورة:{" "}
                {incidentStats.highSeverity}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold">رقم الحادثة</th>
                      <th className="text-right p-4 font-semibold">العنوان</th>
                      <th className="text-right p-4 font-semibold">الخطورة</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                      <th className="text-right p-4 font-semibold">التاريخ</th>
                      <th className="text-right p-4 font-semibold">المسؤول</th>
                      <th className="text-right p-4 font-semibold">الموعد</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncidents.map((incident, index) => (
                      <tr
                        key={incident.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{incident.incidentNumber}</div>
                          <div className="text-sm text-gray-500">{incident.location}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{incident.title}</div>
                          <div className="text-sm text-gray-500">{incident.product}</div>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              incident.severity === "عالية"
                                ? "bg-red-100 text-red-800"
                                : incident.severity === "متوسطة"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {incident.severity}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              incident.status === "مغلق"
                                ? "bg-green-100 text-green-800"
                                : incident.status === "تحت المعالجة"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {incident.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{incident.date}</td>
                        <td className="p-4 text-sm">{incident.assignedTo}</td>
                        <td className="p-4 text-sm">{incident.deadline}</td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
