"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Truck,
  Package,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Building2,
  MapPin,
  FileCheck,
  Receipt,
  DollarSign,
  CreditCard,
  Save,
  XCircle,
  Target,
  Activity,
  ArrowLeft,
} from "lucide-react"
import type { Supplier, Notification } from "@/types"

interface SupplierManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
  onBack?: () => void
}

export function SupplierManagement({ onAddNotification, onBack }: SupplierManagementProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Supplier>>({
    name: "",
    supplyType: "",
    phone: "",
    email: "",
    address: "",
    commercialRegister: "",
    taxNumber: "",
    totalSupplies: 0,
    paid: 0,
    remaining: 0,
    paymentType: "نقدي",
    discounts: 0,
    bonuses: 0,
    contracts: [],
    invoices: [],
    qualityTests: [],
    accountBalance: 0,
  })

  useEffect(() => {
    const savedSuppliers = localStorage.getItem("suppliers")
    if (savedSuppliers) {
      setSuppliers(JSON.parse(savedSuppliers))
    } else {
      const demoSuppliers: Supplier[] = [
        {
          id: 1,
          name: "مزرعة الوادي الأخضر",
          supplyType: "خضروات وفواكه",
          phone: "+20101234567",
          email: "info@greenvalley.com",
          address: "الوادي الجديد، مصر",
          commercialRegister: "CR123456789",
          taxNumber: "TAX987654321",
          totalSupplies: 250000,
          paid: 200000,
          remaining: 50000,
          paymentType: "آجل",
          discounts: 5000,
          bonuses: 2000,
          contracts: ["contract1.pdf", "contract2.pdf"],
          invoices: ["invoice1.pdf", "invoice2.pdf"],
          qualityTests: ["test1.pdf"],
          accountBalance: 50000,
        },
        {
          id: 2,
          name: "شركة النيل للمنتجات الزراعية",
          supplyType: "محاصيل زراعية",
          phone: "+20109876543",
          email: "supplies@nileagri.com",
          address: "دمياط، مصر",
          commercialRegister: "CR456789123",
          taxNumber: "TAX123456789",
          totalSupplies: 180000,
          paid: 180000,
          remaining: 0,
          paymentType: "نقدي",
          discounts: 3000,
          bonuses: 1500,
          contracts: ["contract3.pdf"],
          invoices: ["invoice3.pdf", "invoice4.pdf"],
          qualityTests: ["test3.pdf"],
          accountBalance: 0,
        },
      ]
      setSuppliers(demoSuppliers)
      localStorage.setItem("suppliers", JSON.stringify(demoSuppliers))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingSupplier) {
      // Update existing supplier
      const updatedSupplier: Supplier = {
        ...editingSupplier,
        ...formData,
        remaining: (formData.totalSupplies || 0) - (formData.paid || 0),
        accountBalance: (formData.totalSupplies || 0) - (formData.paid || 0),
      } as Supplier

      const updatedSuppliers = suppliers.map((s) => (s.id === editingSupplier.id ? updatedSupplier : s))
      setSuppliers(updatedSuppliers)
      localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

      onAddNotification({
        userId: 1,
        title: "تم تحديث المورد",
        message: `تم تحديث بيانات المورد ${updatedSupplier.name} بنجاح`,
        type: "success",
        module: "suppliers",
        relatedId: updatedSupplier.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })

      setEditingSupplier(null)
    } else {
      // Add new supplier
      const newSupplier: Supplier = {
        ...(formData as Supplier),
        id: suppliers.length + 1,
        remaining: (formData.totalSupplies || 0) - (formData.paid || 0),
        accountBalance: (formData.totalSupplies || 0) - (formData.paid || 0),
      }
      const updatedSuppliers = [...suppliers, newSupplier]
      setSuppliers(updatedSuppliers)
      localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

      onAddNotification({
        userId: 1,
        title: "مورد جديد",
        message: `تم إضافة المورد ${newSupplier.name} بنجاح`,
        type: "success",
        module: "suppliers",
        relatedId: newSupplier.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      supplyType: "",
      phone: "",
      email: "",
      address: "",
      commercialRegister: "",
      taxNumber: "",
      totalSupplies: 0,
      paid: 0,
      remaining: 0,
      paymentType: "نقدي",
      discounts: 0,
      bonuses: 0,
      contracts: [],
      invoices: [],
      qualityTests: [],
      accountBalance: 0,
    })
    setShowAddForm(false)
    setEditingSupplier(null)
  }

  const handleEdit = (supplier: Supplier) => {
    setFormData(supplier)
    setEditingSupplier(supplier)
    setShowAddForm(true)
  }

  const handleDelete = (supplierId: number) => {
    const updatedSuppliers = suppliers.filter((s) => s.id !== supplierId)
    setSuppliers(updatedSuppliers)
    localStorage.setItem("suppliers", JSON.stringify(updatedSuppliers))

    const deletedSupplier = suppliers.find((s) => s.id === supplierId)
    onAddNotification({
      userId: 1,
      title: "تم حذف المورد",
      message: `تم حذف المورد ${deletedSupplier?.name} بنجاح`,
      type: "info",
      module: "suppliers",
      relatedId: supplierId,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
    setSelectedSupplier(null)
  }

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.includes(searchTerm) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.supplyType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const supplierStats = {
    totalSuppliers: suppliers.length,
    totalSupplies: suppliers.reduce((sum, supplier) => sum + supplier.totalSupplies, 0),
    totalPaid: suppliers.reduce((sum, supplier) => sum + supplier.paid, 0),
    totalRemaining: suppliers.reduce((sum, supplier) => sum + supplier.remaining, 0),
    activeSuppliers: suppliers.filter((s) => s.remaining > 0).length,
    completedSuppliers: suppliers.filter((s) => s.remaining === 0).length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">إجمالي الموردين</p>
                <p className="text-3xl font-bold">{supplierStats.totalSuppliers}</p>
              </div>
              <Truck className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي التوريدات</p>
                <p className="text-3xl font-bold">${supplierStats.totalSupplies.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">المبلغ المدفوع</p>
                <p className="text-3xl font-bold">${supplierStats.totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">المستحقات</p>
                <p className="text-3xl font-bold">${supplierStats.totalRemaining.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center">
            <Truck className="w-8 h-8 text-green-600 ml-3" />
            إدارة الموردين
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع موردي الشركة وشركاء التوريد</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة مورد جديد"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الموردين بالاسم، الهاتف، أو البريد الإلكتروني..."
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
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-green-600" />
              {editingSupplier ? "تعديل المورد" : "إضافة مورد جديد"}
            </CardTitle>
            <CardDescription>
              {editingSupplier ? "تعديل بيانات المورد" : "أدخل بيانات المورد الجديد بدقة لضمان المتابعة الصحيحة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Truck className="w-5 h-5 ml-2" />
                  معلومات المورد
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium">
                  <Building2 className="w-4 h-4 ml-2" />
                  اسم المورد / الشركة *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="اسم المورد أو الشركة"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplyType" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  نوع التوريد *
                </Label>
                <Input
                  id="supplyType"
                  value={formData.supplyType}
                  onChange={(e) => setFormData({ ...formData, supplyType: e.target.value })}
                  placeholder="خضروات وفواكه"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm font-medium">
                  <Phone className="w-4 h-4 ml-2" />
                  رقم الهاتف *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20123456789"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium">
                  <Mail className="w-4 h-4 ml-2" />
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@company.com"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commercialRegister" className="flex items-center text-sm font-medium">
                  <FileCheck className="w-4 h-4 ml-2" />
                  السجل التجاري
                </Label>
                <Input
                  id="commercialRegister"
                  value={formData.commercialRegister}
                  onChange={(e) => setFormData({ ...formData, commercialRegister: e.target.value })}
                  placeholder="CR123456789"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxNumber" className="flex items-center text-sm font-medium">
                  <Receipt className="w-4 h-4 ml-2" />
                  الرقم الضريبي
                </Label>
                <Input
                  id="taxNumber"
                  value={formData.taxNumber}
                  onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                  placeholder="TAX987654321"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  المعلومات المالية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSupplies" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  إجمالي التوريدات
                </Label>
                <Input
                  id="totalSupplies"
                  type="number"
                  value={formData.totalSupplies}
                  onChange={(e) => setFormData({ ...formData, totalSupplies: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paid" className="flex items-center text-sm font-medium">
                  <CheckCircle className="w-4 h-4 ml-2" />
                  المبلغ المدفوع
                </Label>
                <Input
                  id="paid"
                  type="number"
                  value={formData.paid}
                  onChange={(e) => setFormData({ ...formData, paid: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentType" className="flex items-center text-sm font-medium">
                  <CreditCard className="w-4 h-4 ml-2" />
                  نوع الدفع
                </Label>
                <Select
                  value={formData.paymentType}
                  onValueChange={(value) => setFormData({ ...formData, paymentType: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-green-500 rounded-xl">
                    <SelectValue placeholder="اختر نوع الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نقدي">نقدي</SelectItem>
                    <SelectItem value="آجل">آجل</SelectItem>
                    <SelectItem value="مختلط">مختلط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center text-sm font-medium">
                    <MapPin className="w-4 h-4 ml-2" />
                    العنوان التفصيلي
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="العنوان التفصيلي للمورد"
                    dir="rtl"
                    className="border-2 border-gray-200 focus:border-green-500 rounded-xl"
                    rows={3}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl bg-transparent"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {editingSupplier ? "تحديث المورد" : "حفظ المورد"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Truck className="w-6 h-6 ml-2 text-green-600" />
                قائمة الموردين
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي الموردين: {filteredSuppliers.length} | نشط: {supplierStats.activeSuppliers} | مكتمل:{" "}
                {supplierStats.completedSuppliers}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {supplierStats.activeSuppliers} مورد لديه مستحقات
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <CheckCircle className="w-3 h-3 ml-1" />
                {supplierStats.completedSuppliers} مورد مسدد بالكامل
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">المورد</th>
                  <th className="text-right p-4 font-semibold text-gray-700">نوع التوريد</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الهاتف</th>
                  <th className="text-right p-4 font-semibold text-gray-700">إجمالي التوريدات</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المدفوع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المتبقي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier, index) => (
                  <tr key={supplier.id} className={`border-b hover:bg-gray-50 transition-colors`}>
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                          {supplier.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500">{supplier.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-800">{supplier.supplyType}</Badge>
                    </td>
                    <td className="p-4">{supplier.phone}</td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${supplier.totalSupplies.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-blue-600">${supplier.paid.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${supplier.remaining > 0 ? "text-red-600" : "text-green-600"}`}>
                        ${supplier.remaining.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedSupplier(supplier)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Truck className="w-5 h-5 ml-2" />
                                تفاصيل المورد: {selectedSupplier?.name}
                              </DialogTitle>
                              <DialogDescription>عرض تفصيلي لجميع بيانات المورد</DialogDescription>
                            </DialogHeader>
                            {selectedSupplier && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">اسم المورد</Label>
                                  <p className="text-sm">{selectedSupplier.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">نوع التوريد</Label>
                                  <p className="text-sm">{selectedSupplier.supplyType}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">رقم الهاتف</Label>
                                  <p className="text-sm">{selectedSupplier.phone}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">البريد الإلكتروني</Label>
                                  <p className="text-sm">{selectedSupplier.email}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">السجل التجاري</Label>
                                  <p className="text-sm">{selectedSupplier.commercialRegister}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الرقم الضريبي</Label>
                                  <p className="text-sm">{selectedSupplier.taxNumber}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">إجمالي التوريدات</Label>
                                  <p className="text-sm font-bold text-green-600">
                                    ${selectedSupplier.totalSupplies.toLocaleString()}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المبلغ المدفوع</Label>
                                  <p className="text-sm font-bold text-blue-600">
                                    ${selectedSupplier.paid.toLocaleString()}
                                  </p>
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">العنوان</Label>
                                  <p className="text-sm">{selectedSupplier.address}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(supplier)}
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف المورد "{supplier.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(supplier.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
