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
  Scale,
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Eye,
  Trash2,
  DollarSign,
  Save,
  XCircle,
  ScrollText,
  Gavel,
  Activity,
  Target,
  FileCheck,
} from "lucide-react"
import type { LegalCase, Contract, Notification } from "@/types"

interface LegalManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function LegalManagement({ onAddNotification }: LegalManagementProps) {
  const [activeTab, setActiveTab] = useState("cases")
  const [cases, setCases] = useState<LegalCase[]>([
    {
      id: 1,
      caseNumber: "LC-2024-001",
      title: "نزاع عقد توريد",
      type: "تجاري",
      status: "جاري",
      priority: "عالية",
      description: "نزاع مع مورد بخصوص جودة المنتجات المسلمة",
      plaintiff: "شركة تراست للتصدير",
      defendant: "شركة ABC للتوريدات",
      court: "المحكمة التجارية - القاهرة",
      lawyer: "المحامي أحمد محمود",
      filingDate: "2024-01-10",
      hearingDate: "2024-02-15",
      documents: ["complaint.pdf", "contract.pdf", "evidence.pdf"],
      notes: "تم تقديم كافة المستندات المطلوبة",
      estimatedCost: 50000,
      actualCost: 35000,
      relatedModule: "suppliers",
      relatedId: 1,
    },
    {
      id: 2,
      caseNumber: "LC-2024-002",
      title: "استرداد مستحقات",
      type: "مدني",
      status: "منتهية",
      priority: "متوسطة",
      description: "قضية استرداد مستحقات من عميل متعثر",
      plaintiff: "شركة تراست للتصدير",
      defendant: "شركة XYZ التجارية",
      court: "المحكمة المدنية - الإسكندرية",
      lawyer: "المحامية فاطمة علي",
      filingDate: "2023-11-05",
      hearingDate: "2024-01-20",
      verdict: "حكم لصالح المدعي باسترداد المبلغ كاملاً",
      documents: ["judgment.pdf", "invoices.pdf"],
      notes: "تم تنفيذ الحكم واسترداد المبلغ",
      estimatedCost: 30000,
      actualCost: 28000,
      relatedModule: "customers",
      relatedId: 1,
    },
  ])

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: 1,
      contractNumber: "CT-2024-001",
      title: "عقد توريد محاصيل زراعية",
      type: "توريد",
      parties: ["شركة تراست للتصدير", "مزرعة الوادي الأخضر"],
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      value: 500000,
      status: "نشط",
      terms: "توريد شهري للمحاصيل الزراعية حسب المواصفات المتفق عليها",
      renewalTerms: "تجديد تلقائي لمدة سنة إضافية ما لم يتم الإخطار قبل 60 يوماً",
      penaltyClause: "غرامة 5% عن كل تأخير في التوريد",
      documents: ["contract.pdf", "appendix-a.pdf", "terms.pdf"],
      signatories: ["أحمد محمد - المدير العام", "محمد حسن - صاحب المزرعة"],
      department: "المشتريات",
      notes: "عقد رئيسي للموسم الحالي",
    },
    {
      id: 2,
      contractNumber: "CT-2024-002",
      title: "عقد تصدير إلى السعودية",
      type: "تصدير",
      parties: ["شركة تراست للتصدير", "مؤسسة الخليج التجارية"],
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      value: 750000,
      status: "نشط",
      terms: "تصدير شحنات شهرية من المنتجات الزراعية إلى السوق السعودي",
      renewalTerms: "قابل للتجديد بالاتفاق المتبادل",
      penaltyClause: "غرامة 10% عن كل شحنة متأخرة أو غير مطابقة للمواصفات",
      documents: ["export-contract.pdf", "shipping-terms.pdf"],
      signatories: ["أحمد محمد - المدير العام", "عبدالله السعيد - مدير المشتريات"],
      department: "التصدير",
      notes: "عقد استراتيجي لتوسيع السوق الخليجي",
    },
  ])

  const [showAddCase, setShowAddCase] = useState(false)
  const [showAddContract, setShowAddContract] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)

  const [caseFormData, setCaseFormData] = useState<Partial<LegalCase>>({
    caseNumber: "",
    title: "",
    type: "تجاري",
    status: "جاري",
    priority: "متوسطة",
    description: "",
    plaintiff: "شركة تراست للتصدير",
    defendant: "",
    court: "",
    lawyer: "",
    filingDate: new Date().toISOString().split("T")[0],
    documents: [],
    notes: "",
    estimatedCost: 0,
    actualCost: 0,
  })

  const [contractFormData, setContractFormData] = useState<Partial<Contract>>({
    contractNumber: "",
    title: "",
    type: "توريد",
    parties: [],
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    value: 0,
    status: "مسودة",
    terms: "",
    documents: [],
    signatories: [],
    department: "",
    notes: "",
  })

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault()
    const newCase: LegalCase = {
      ...(caseFormData as LegalCase),
      id: cases.length + 1,
      caseNumber: `LC-2024-${String(cases.length + 1).padStart(3, "0")}`,
      documents: caseFormData.documents || [],
    }
    const updatedCases = [...cases, newCase]
    setCases(updatedCases)
    localStorage.setItem("legalCases", JSON.stringify(updatedCases))

    onAddNotification({
      userId: 1,
      title: "قضية جديدة",
      message: `تم إضافة القضية ${newCase.title} بنجاح`,
      type: "info",
      module: "legal",
      relatedId: newCase.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setCaseFormData({
      caseNumber: "",
      title: "",
      type: "تجاري",
      status: "جاري",
      priority: "متوسطة",
      description: "",
      plaintiff: "شركة تراست للتصدير",
      defendant: "",
      court: "",
      lawyer: "",
      filingDate: new Date().toISOString().split("T")[0],
      documents: [],
      notes: "",
      estimatedCost: 0,
      actualCost: 0,
    })
    setShowAddCase(false)
  }

  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault()
    const newContract: Contract = {
      ...(contractFormData as Contract),
      id: contracts.length + 1,
      contractNumber: `CT-2024-${String(contracts.length + 1).padStart(3, "0")}`,
      parties: contractFormData.parties || [],
      documents: contractFormData.documents || [],
      signatories: contractFormData.signatories || [],
    }
    const updatedContracts = [...contracts, newContract]
    setContracts(updatedContracts)
    localStorage.setItem("legalContracts", JSON.stringify(updatedContracts))

    onAddNotification({
      userId: 1,
      title: "عقد جديد",
      message: `تم إضافة العقد ${newContract.title} بنجاح`,
      type: "success",
      module: "legal",
      relatedId: newContract.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setContractFormData({
      contractNumber: "",
      title: "",
      type: "توريد",
      parties: [],
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      value: 0,
      status: "مسودة",
      terms: "",
      documents: [],
      signatories: [],
      department: "",
      notes: "",
    })
    setShowAddContract(false)
  }

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.defendant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredContracts = contracts.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const caseStats = {
    totalCases: cases.length,
    activeCases: cases.filter((c) => c.status === "جاري").length,
    completedCases: cases.filter((c) => c.status === "منتهية").length,
    pendingCases: cases.filter((c) => c.status === "معلقة").length,
    totalEstimatedCost: cases.reduce((sum, c) => sum + c.estimatedCost, 0),
    totalActualCost: cases.reduce((sum, c) => sum + c.actualCost, 0),
  }

  const contractStats = {
    totalContracts: contracts.length,
    activeContracts: contracts.filter((c) => c.status === "نشط").length,
    expiredContracts: contracts.filter((c) => c.status === "منتهي").length,
    draftContracts: contracts.filter((c) => c.status === "مسودة").length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0),
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-500 to-slate-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100 text-sm">إجمالي القضايا</p>
                <p className="text-3xl font-bold">{caseStats.totalCases}</p>
              </div>
              <Scale className="w-8 h-8 text-gray-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">القضايا الجارية</p>
                <p className="text-3xl font-bold">{caseStats.activeCases}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">العقود النشطة</p>
                <p className="text-3xl font-bold">{contractStats.activeContracts}</p>
              </div>
              <FileCheck className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">قيمة العقود</p>
                <p className="text-3xl font-bold">${contractStats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent flex items-center">
            <Scale className="w-8 h-8 text-gray-600 ml-3" />
            إدارة الشؤون القانونية
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للقضايا والعقود والوثائق القانونية</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-slate-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في القضايا والعقود..."
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
        <TabsList className="grid w-full grid-cols-2 h-14">
          <TabsTrigger value="cases" className="text-base">
            <Gavel className="w-5 h-5 ml-2" />
            القضايا القانونية ({caseStats.totalCases})
          </TabsTrigger>
          <TabsTrigger value="contracts" className="text-base">
            <ScrollText className="w-5 h-5 ml-2" />
            العقود ({contractStats.totalContracts})
          </TabsTrigger>
        </TabsList>

        {/* Cases Tab */}
        <TabsContent value="cases" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddCase(!showAddCase)}
              className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              {showAddCase ? "إلغاء" : "إضافة قضية"}
            </Button>
          </div>

          {showAddCase && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Plus className="w-6 h-6 ml-2 text-gray-600" />
                  إضافة قضية جديدة
                </CardTitle>
                <CardDescription>أدخل تفاصيل القضية بدقة</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddCase} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      <FileText className="w-4 h-4 inline ml-2" />
                      عنوان القضية *
                    </Label>
                    <Input
                      id="title"
                      value={caseFormData.title}
                      onChange={(e) => setCaseFormData({ ...caseFormData, title: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">نوع القضية</Label>
                    <Select
                      value={caseFormData.type}
                      onValueChange={(value) => setCaseFormData({ ...caseFormData, type: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="تجاري">تجاري</SelectItem>
                        <SelectItem value="مدني">مدني</SelectItem>
                        <SelectItem value="عمالي">عمالي</SelectItem>
                        <SelectItem value="جنائي">جنائي</SelectItem>
                        <SelectItem value="إداري">إداري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defendant">المدعى عليه *</Label>
                    <Input
                      id="defendant"
                      value={caseFormData.defendant}
                      onChange={(e) => setCaseFormData({ ...caseFormData, defendant: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="court">المحكمة *</Label>
                    <Input
                      id="court"
                      value={caseFormData.court}
                      onChange={(e) => setCaseFormData({ ...caseFormData, court: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lawyer">المحامي المسؤول</Label>
                    <Input
                      id="lawyer"
                      value={caseFormData.lawyer}
                      onChange={(e) => setCaseFormData({ ...caseFormData, lawyer: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">الأولوية</Label>
                    <Select
                      value={caseFormData.priority}
                      onValueChange={(value) => setCaseFormData({ ...caseFormData, priority: value })}
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
                    <Label htmlFor="filingDate">تاريخ رفع القضية</Label>
                    <Input
                      id="filingDate"
                      type="date"
                      value={caseFormData.filingDate}
                      onChange={(e) => setCaseFormData({ ...caseFormData, filingDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedCost">التكلفة المتوقعة</Label>
                    <Input
                      id="estimatedCost"
                      type="number"
                      value={caseFormData.estimatedCost}
                      onChange={(e) => setCaseFormData({ ...caseFormData, estimatedCost: Number(e.target.value) })}
                      className="h-12"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">وصف القضية</Label>
                    <Textarea
                      id="description"
                      value={caseFormData.description}
                      onChange={(e) => setCaseFormData({ ...caseFormData, description: e.target.value })}
                      dir="rtl"
                      rows={4}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddCase(false)}>
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-gray-600 to-slate-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ القضية
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Cases List */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
              <CardTitle className="flex items-center">
                <Gavel className="w-6 h-6 ml-2 text-gray-600" />
                قائمة القضايا
              </CardTitle>
              <CardDescription>
                <Target className="w-4 h-4 inline ml-1" />
                جاري: {caseStats.activeCases} | منتهية: {caseStats.completedCases} | معلقة: {caseStats.pendingCases}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold">رقم القضية</th>
                      <th className="text-right p-4 font-semibold">العنوان</th>
                      <th className="text-right p-4 font-semibold">النوع</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                      <th className="text-right p-4 font-semibold">الأولوية</th>
                      <th className="text-right p-4 font-semibold">المحكمة</th>
                      <th className="text-right p-4 font-semibold">التكلفة</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((legalCase, index) => (
                      <tr
                        key={legalCase.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{legalCase.caseNumber}</div>
                          <div className="text-sm text-gray-500">{legalCase.filingDate}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{legalCase.title}</div>
                          <div className="text-sm text-gray-500">{legalCase.defendant}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{legalCase.type}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              legalCase.status === "جاري"
                                ? "bg-blue-100 text-blue-800"
                                : legalCase.status === "منتهية"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {legalCase.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              legalCase.priority === "عالية"
                                ? "bg-red-100 text-red-800"
                                : legalCase.priority === "متوسطة"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {legalCase.priority}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{legalCase.court}</td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">${legalCase.actualCost.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">من ${legalCase.estimatedCost.toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline" onClick={() => setSelectedCase(legalCase)}>
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

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setShowAddContract(!showAddContract)}
              className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              {showAddContract ? "إلغاء" : "إضافة عقد"}
            </Button>
          </div>

          {showAddContract && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
                <CardTitle className="flex items-center text-xl">
                  <Plus className="w-6 h-6 ml-2 text-gray-600" />
                  إضافة عقد جديد
                </CardTitle>
                <CardDescription>أدخل تفاصيل العقد بدقة</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleAddContract} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contractTitle">عنوان العقد *</Label>
                    <Input
                      id="contractTitle"
                      value={contractFormData.title}
                      onChange={(e) => setContractFormData({ ...contractFormData, title: e.target.value })}
                      required
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractType">نوع العقد</Label>
                    <Select
                      value={contractFormData.type}
                      onValueChange={(value) => setContractFormData({ ...contractFormData, type: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="توريد">توريد</SelectItem>
                        <SelectItem value="تصدير">تصدير</SelectItem>
                        <SelectItem value="خدمات">خدمات</SelectItem>
                        <SelectItem value="عمالة">عمالة</SelectItem>
                        <SelectItem value="شراكة">شراكة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">تاريخ البدء</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={contractFormData.startDate}
                      onChange={(e) => setContractFormData({ ...contractFormData, startDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={contractFormData.endDate}
                      onChange={(e) => setContractFormData({ ...contractFormData, endDate: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">قيمة العقد</Label>
                    <Input
                      id="value"
                      type="number"
                      value={contractFormData.value}
                      onChange={(e) => setContractFormData({ ...contractFormData, value: Number(e.target.value) })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">القسم</Label>
                    <Input
                      id="department"
                      value={contractFormData.department}
                      onChange={(e) => setContractFormData({ ...contractFormData, department: e.target.value })}
                      dir="rtl"
                      className="h-12"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="terms">بنود وشروط العقد</Label>
                    <Textarea
                      id="terms"
                      value={contractFormData.terms}
                      onChange={(e) => setContractFormData({ ...contractFormData, terms: e.target.value })}
                      dir="rtl"
                      rows={4}
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowAddContract(false)}>
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-gray-600 to-slate-600">
                      <Save className="w-4 h-4 ml-2" />
                      حفظ العقد
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Contracts List */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50">
              <CardTitle className="flex items-center">
                <ScrollText className="w-6 h-6 ml-2 text-gray-600" />
                قائمة العقود
              </CardTitle>
              <CardDescription>
                <Target className="w-4 h-4 inline ml-1" />
                نشط: {contractStats.activeContracts} | مسودة: {contractStats.draftContracts} | منتهي:{" "}
                {contractStats.expiredContracts}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-semibold">رقم العقد</th>
                      <th className="text-right p-4 font-semibold">العنوان</th>
                      <th className="text-right p-4 font-semibold">النوع</th>
                      <th className="text-right p-4 font-semibold">الحالة</th>
                      <th className="text-right p-4 font-semibold">المدة</th>
                      <th className="text-right p-4 font-semibold">القيمة</th>
                      <th className="text-right p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContracts.map((contract, index) => (
                      <tr
                        key={contract.id}
                        className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{contract.contractNumber}</div>
                          <div className="text-sm text-gray-500">{contract.department}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium">{contract.title}</div>
                          <div className="text-sm text-gray-500">{contract.parties.join(" - ")}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{contract.type}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              contract.status === "نشط"
                                ? "bg-green-100 text-green-800"
                                : contract.status === "مسودة"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {contract.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">
                          <div>{contract.startDate}</div>
                          <div className="text-gray-500">{contract.endDate}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">${contract.value.toLocaleString()}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button size="sm" variant="outline" onClick={() => setSelectedContract(contract)}>
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
