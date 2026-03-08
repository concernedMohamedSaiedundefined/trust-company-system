"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Plus,
  Search,
  Download,
  Eye,
  Trash2,
  Edit,
  DollarSign,
  ShoppingCart,
  CheckCircle,
  Clock,
  Calendar,
  Package,
  Save,
  X,
  ArrowLeft,
} from "lucide-react"
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
import type { Sale, Customer, Product, Notification } from "@/types"

interface SalesManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
  onBack?: () => void
}

export function SalesManagement({ onAddNotification, onBack }: SalesManagementProps) {
  const [sales, setSales] = useState<Sale[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [formData, setFormData] = useState<Partial<Sale>>({
    saleNumber: "",
    customer: "",
    customerId: 0,
    products: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    paymentMethod: "نقدي",
    saleDate: new Date().toISOString().split("T")[0],
    salesperson: "أحمد محمد",
    status: "قيد المعالجة",
    paidAmount: 0,
    remainingAmount: 0,
  })

  const [selectedProducts, setSelectedProducts] = useState<
    Array<{
      productId: number
      productName: string
      quantity: number
      unitPrice: number
      total: number
    }>
  >([])

  useEffect(() => {
    // Load data from localStorage
    const savedSales = localStorage.getItem("sales")
    const savedCustomers = localStorage.getItem("customers")
    const savedProducts = localStorage.getItem("products")

    if (savedSales) setSales(JSON.parse(savedSales))
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers))
    if (savedProducts) setProducts(JSON.parse(savedProducts))

    // Initialize with demo data if empty
    if (!savedSales) {
      const demoSales: Sale[] = [
        {
          id: 1,
          saleNumber: "SAL-2024-001",
          customer: "شركة الأهرام للتجارة",
          customerId: 1,
          products: [{ productId: 1, productName: "طماطم طازجة", quantity: 100, unitPrice: 3.0, total: 300 }],
          subtotal: 300,
          discount: 10,
          tax: 15,
          totalAmount: 305,
          paymentMethod: "آجل",
          saleDate: "2024-01-15",
          salesperson: "فاطمة أحمد",
          status: "مكتمل",
          paidAmount: 200,
          remainingAmount: 105,
        },
        {
          id: 2,
          saleNumber: "SAL-2024-002",
          customer: "مؤسسة الخليج التجارية",
          customerId: 2,
          products: [{ productId: 2, productName: "بطاطس", quantity: 50, unitPrice: 2.2, total: 110 }],
          subtotal: 110,
          discount: 5,
          tax: 5.25,
          totalAmount: 110.25,
          paymentMethod: "نقدي",
          saleDate: "2024-01-20",
          salesperson: "أحمد محمد",
          status: "مكتمل",
          paidAmount: 110.25,
          remainingAmount: 0,
        },
      ]
      setSales(demoSales)
      localStorage.setItem("sales", JSON.stringify(demoSales))
    }
  }, [])

  const calculateTotals = () => {
    const subtotal = selectedProducts.reduce((sum, item) => sum + item.total, 0)
    const discount = formData.discount || 0
    const taxRate = 0.05 // 5% tax
    const afterDiscount = subtotal - discount
    const tax = afterDiscount * taxRate
    const total = afterDiscount + tax

    setFormData({
      ...formData,
      subtotal,
      tax: Number(tax.toFixed(2)),
      totalAmount: Number(total.toFixed(2)),
      remainingAmount: Number(total.toFixed(2)) - (formData.paidAmount || 0),
    })
  }

  useEffect(() => {
    calculateTotals()
  }, [selectedProducts, formData.discount, formData.paidAmount])

  const addProductToSale = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existing = selectedProducts.find((p) => p.productId === productId)
    if (existing) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.productId === productId ? { ...p, quantity: p.quantity + 1, total: p.unitPrice * (p.quantity + 1) } : p,
        ),
      )
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.sellingPrice,
          total: product.sellingPrice,
        },
      ])
    }
  }

  const updateProductQuantity = (productId: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((p) => (p.productId === productId ? { ...p, quantity, total: p.unitPrice * quantity } : p)),
    )
  }

  const removeProductFromSale = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newSale: Sale = {
      ...(formData as Sale),
      id: sales.length + 1,
      saleNumber: `SAL-2024-${String(sales.length + 1).padStart(3, "0")}`,
      products: selectedProducts,
      status: formData.remainingAmount! > 0 ? "قيد المعالجة" : "مكتمل",
    }

    const updatedSales = [...sales, newSale]
    setSales(updatedSales)
    localStorage.setItem("sales", JSON.stringify(updatedSales))

    onAddNotification({
      userId: 1,
      title: "عملية بيع جديدة",
      message: `تم إنشاء عملية بيع رقم ${newSale.saleNumber} بقيمة $${newSale.totalAmount}`,
      type: "success",
      module: "sales",
      relatedId: newSale.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      saleNumber: "",
      customer: "",
      customerId: 0,
      products: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      totalAmount: 0,
      paymentMethod: "نقدي",
      saleDate: new Date().toISOString().split("T")[0],
      salesperson: "أحمد محمد",
      status: "قيد المعالجة",
      paidAmount: 0,
      remainingAmount: 0,
    })
    setSelectedProducts([])
    setShowAddForm(false)
  }

  const handleEdit = (sale: Sale) => {
    setFormData({
      customer: sale.customer,
      customerId: sale.customerId,
      products: sale.products,
      subtotal: sale.subtotal,
      discount: sale.discount,
      tax: sale.tax,
      totalAmount: sale.totalAmount,
      paymentMethod: sale.paymentMethod,
      saleDate: sale.saleDate,
      salesperson: sale.salesperson,
      status: sale.status,
      paidAmount: sale.paidAmount,
      remainingAmount: sale.remainingAmount,
    })
    setSelectedProducts(sale.products)
    setSelectedSale(sale)
    setShowAddForm(true)
  }

  const deleteSale = (id: number) => {
    const updatedSales = sales.filter((s) => s.id !== id)
    setSales(updatedSales)
    localStorage.setItem("sales", JSON.stringify(updatedSales))

    onAddNotification({
      userId: 1,
      title: "حذف عملية بيع",
      message: `تم حذف عملية البيع بنجاح`,
      type: "info",
      module: "sales",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.saleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.salesperson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || sale.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    totalSales: sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
    completedSales: sales.filter((s) => s.status === "مكتمل").length,
    pendingSales: sales.filter((s) => s.status === "قيد المعالجة").length,
    totalRevenue: sales.filter((s) => s.status === "مكتمل").reduce((sum, sale) => sum + sale.paidAmount, 0),
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">إجمالي المبيعات</p>
                <p className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">مبيعات مكتملة</p>
                <p className="text-3xl font-bold">{stats.completedSales}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">مبيعات معلقة</p>
                <p className="text-3xl font-bold">{stats.pendingSales}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">الإيرادات المحصلة</p>
                <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent flex items-center">
            <TrendingUp className="w-8 h-8 text-lime-600 ml-3" />
            إدارة المبيعات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع عمليات البيع والفواتير</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 shadow-lg"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "عملية بيع جديدة"}
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-lime-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المبيعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 rounded-xl"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48 h-12 border-2 border-white bg-white/80 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="مكتمل">مكتمل</SelectItem>
                <SelectItem value="قيد المعالجة">قيد المعالجة</SelectItem>
                <SelectItem value="ملغي">ملغي</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12 px-6 bg-white/80 border-2 border-white hover:bg-white">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Sale Form */}
      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-lime-600" />
              عملية بيع جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="customer">العميل *</Label>
                  <Select
                    value={formData.customerId?.toString()}
                    onValueChange={(value) => {
                      const customer = customers.find((c) => c.id === Number(value))
                      setFormData({
                        ...formData,
                        customerId: Number(value),
                        customer: customer?.name || "",
                      })
                    }}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="اختر العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="saleDate">تاريخ البيع *</Label>
                  <Input
                    id="saleDate"
                    type="date"
                    value={formData.saleDate}
                    onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">طريقة الدفع *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نقدي">نقدي</SelectItem>
                      <SelectItem value="آجل">آجل</SelectItem>
                      <SelectItem value="شيك">شيك</SelectItem>
                      <SelectItem value="تحويل بنكي">تحويل بنكي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  المنتجات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products
                    .filter((p) => p.status === "متاح")
                    .map((product) => (
                      <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-gray-500">
                                المتاح: {product.quantity} {product.unit}
                              </p>
                              <p className="text-lg font-bold text-green-600">${product.sellingPrice}</p>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => addProductToSale(product.id)}
                              className="bg-lime-600 hover:bg-lime-700"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">المنتجات المحددة</h3>
                  <div className="space-y-2">
                    {selectedProducts.map((item) => (
                      <Card key={item.productId}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.productName}</h4>
                              <p className="text-sm text-gray-500">السعر: ${item.unitPrice}</p>
                            </div>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateProductQuantity(item.productId, Number(e.target.value))}
                                className="w-20 h-10"
                              />
                              <span className="font-bold text-green-600 min-w-[80px]">${item.total.toFixed(2)}</span>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => removeProductFromSale(item.productId)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount">الخصم ($)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidAmount">المبلغ المدفوع ($)</Label>
                    <Input
                      id="paidAmount"
                      type="number"
                      min="0"
                      value={formData.paidAmount}
                      onChange={(e) => setFormData({ ...formData, paidAmount: Number(e.target.value) })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <Card className="bg-gradient-to-br from-lime-50 to-green-50">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>المجموع الفرعي:</span>
                      <span className="font-bold">${formData.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>الخصم:</span>
                      <span className="font-bold text-red-600">-${formData.discount?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>الضريبة (5%):</span>
                      <span className="font-bold">${formData.tax?.toFixed(2)}</span>
                    </div>
                    <div className="border-t-2 border-lime-200 pt-3 flex justify-between text-xl">
                      <span className="font-bold">الإجمالي:</span>
                      <span className="font-bold text-green-600">${formData.totalAmount?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>المتبقي:</span>
                      <span className="font-bold text-orange-600">${formData.remainingAmount?.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={resetForm} className="px-8 bg-transparent">
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="px-8 bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700"
                  disabled={selectedProducts.length === 0}
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ العملية
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Sales Table */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-lime-50 to-green-50 rounded-t-lg">
          <CardTitle className="flex items-center text-xl">
            <ShoppingCart className="w-6 h-6 ml-2 text-lime-600" />
            قائمة المبيعات
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold">رقم البيع</th>
                  <th className="text-right p-4 font-semibold">العميل</th>
                  <th className="text-right p-4 font-semibold">التاريخ</th>
                  <th className="text-right p-4 font-semibold">الإجمالي</th>
                  <th className="text-right p-4 font-semibold">المدفوع</th>
                  <th className="text-right p-4 font-semibold">المتبقي</th>
                  <th className="text-right p-4 font-semibold">طريقة الدفع</th>
                  <th className="text-right p-4 font-semibold">الحالة</th>
                  <th className="text-right p-4 font-semibold">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale, index) => (
                  <tr
                    key={sale.id}
                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <span className="font-semibold text-blue-600">{sale.saleNumber}</span>
                    </td>
                    <td className="p-4">{sale.customer}</td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2" />
                        {sale.saleDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-green-600">${sale.totalAmount.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-blue-600">${sale.paidAmount.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold ${sale.remainingAmount > 0 ? "text-orange-600" : "text-green-600"}`}>
                        ${sale.remainingAmount.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {sale.paymentMethod}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={
                          sale.status === "مكتمل"
                            ? "bg-green-100 text-green-800"
                            : sale.status === "قيد المعالجة"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {sale.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedSale(sale)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <ShoppingCart className="w-5 h-5 ml-2" />
                                تفاصيل المبيعة: {selectedSale?.saleNumber}
                              </DialogTitle>
                              <DialogDescription>عرض تفصيلي لبيانات عملية البيع</DialogDescription>
                            </DialogHeader>
                            {selectedSale && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">رقم المبيعة</Label>
                                  <p className="text-sm font-bold">{selectedSale.saleNumber}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">العميل</Label>
                                  <p className="text-sm">{selectedSale.customer}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">التاريخ</Label>
                                  <p className="text-sm">{selectedSale.saleDate}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المندوب</Label>
                                  <p className="text-sm">{selectedSale.salesperson}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الإجمالي الفرعي</Label>
                                  <p className="text-sm font-bold text-green-600">${selectedSale.subtotal.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الخصم</Label>
                                  <p className="text-sm font-bold text-orange-600">${selectedSale.discount.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الضريبة</Label>
                                  <p className="text-sm font-bold text-blue-600">${selectedSale.tax.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الإجمالي</Label>
                                  <p className="text-sm font-bold text-green-700">${selectedSale.totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المبلغ المدفوع</Label>
                                  <p className="text-sm font-bold text-blue-600">${selectedSale.paidAmount.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المتبقي</Label>
                                  <p className="text-sm font-bold text-red-600">${selectedSale.remainingAmount.toFixed(2)}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">طريقة الدفع</Label>
                                  <p className="text-sm">{selectedSale.paymentMethod}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الحالة</Label>
                                  <Badge className={selectedSale.status === "مكتمل" ? "bg-green-500" : "bg-orange-500"}>
                                    {selectedSale.status}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(sale)}
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
                                هل أنت متأكد من حذف عملية البيع "{sale.saleNumber}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteSale(sale.id)}
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
