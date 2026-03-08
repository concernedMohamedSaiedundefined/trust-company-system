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
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Package,
  DollarSign,
  Save,
  XCircle,
  Truck,
  FileText,
  Activity,
} from "lucide-react"
import type { Purchase, PurchaseItem, Supplier, Product, Notification } from "@/types"

interface PurchaseManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function PurchaseManagement({ onAddNotification }: PurchaseManagementProps) {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Purchase>>({
    purchaseNumber: "",
    supplier: "",
    supplierId: 0,
    products: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    paymentMethod: "نقدي",
    purchaseDate: new Date().toISOString().split("T")[0],
    buyer: "",
    status: "معلق",
    paidAmount: 0,
    remainingAmount: 0,
    notes: "",
    deliveryDate: "",
    invoiceNumber: "",
  })
  const [selectedProducts, setSelectedProducts] = useState<PurchaseItem[]>([])
  const [currentProduct, setCurrentProduct] = useState({
    productId: 0,
    quantity: 0,
    unitPrice: 0,
  })

  useEffect(() => {
    const savedPurchases = localStorage.getItem("purchases")
    const savedSuppliers = localStorage.getItem("suppliers")
    const savedProducts = localStorage.getItem("products")

    if (savedSuppliers) {
      setSuppliers(JSON.parse(savedSuppliers))
    }

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }

    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases))
    } else {
      const demoPurchases: Purchase[] = [
        {
          id: 1,
          purchaseNumber: "PUR-2024-001",
          supplier: "مزرعة الوادي الأخضر",
          supplierId: 1,
          products: [{ productId: 1, productName: "طماطم طازجة", quantity: 500, unitPrice: 2.0, total: 1000 }],
          subtotal: 1000,
          discount: 50,
          tax: 47.5,
          totalAmount: 997.5,
          paymentMethod: "آجل",
          purchaseDate: "2024-01-05",
          buyer: "عمر حسن",
          status: "مكتمل",
          paidAmount: 800,
          remainingAmount: 197.5,
          notes: "طلبية شهرية",
          deliveryDate: "2024-01-10",
          invoiceNumber: "INV-2024-001",
        },
        {
          id: 2,
          purchaseNumber: "PUR-2024-002",
          supplier: "شركة النيل للمنتجات الزراعية",
          supplierId: 2,
          products: [{ productId: 2, productName: "بطاطس", quantity: 100, unitPrice: 1.5, total: 150 }],
          subtotal: 150,
          discount: 10,
          tax: 7,
          totalAmount: 147,
          paymentMethod: "نقدي",
          purchaseDate: "2024-01-08",
          buyer: "سارة علي",
          status: "مكتمل",
          paidAmount: 147,
          remainingAmount: 0,
          notes: "",
          deliveryDate: "2024-01-12",
          invoiceNumber: "INV-2024-002",
        },
      ]
      setPurchases(demoPurchases)
      localStorage.setItem("purchases", JSON.stringify(demoPurchases))
    }
  }, [])

  const addProductToList = () => {
    if (currentProduct.productId === 0 || currentProduct.quantity === 0) return

    const product = products.find((p) => p.id === currentProduct.productId)
    if (!product) return

    const total = currentProduct.quantity * currentProduct.unitPrice
    const newItem: PurchaseItem = {
      productId: product.id,
      productName: product.name,
      quantity: currentProduct.quantity,
      unitPrice: currentProduct.unitPrice,
      total,
    }

    setSelectedProducts([...selectedProducts, newItem])
    setCurrentProduct({ productId: 0, quantity: 0, unitPrice: 0 })

    // Update subtotal
    const newSubtotal = [...selectedProducts, newItem].reduce((sum, item) => sum + item.total, 0)
    const newTax = newSubtotal * 0.05
    const newTotal = newSubtotal - (formData.discount || 0) + newTax
    setFormData({
      ...formData,
      products: [...selectedProducts, newItem],
      subtotal: newSubtotal,
      tax: newTax,
      totalAmount: newTotal,
      remainingAmount: newTotal - (formData.paidAmount || 0),
    })
  }

  const removeProductFromList = (index: number) => {
    const newProducts = selectedProducts.filter((_, i) => i !== index)
    setSelectedProducts(newProducts)

    const newSubtotal = newProducts.reduce((sum, item) => sum + item.total, 0)
    const newTax = newSubtotal * 0.05
    const newTotal = newSubtotal - (formData.discount || 0) + newTax
    setFormData({
      ...formData,
      products: newProducts,
      subtotal: newSubtotal,
      tax: newTax,
      totalAmount: newTotal,
      remainingAmount: newTotal - (formData.paidAmount || 0),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPurchase: Purchase = {
      ...(formData as Purchase),
      id: purchases.length + 1,
      purchaseNumber: `PUR-2024-${String(purchases.length + 1).padStart(3, "0")}`,
      products: selectedProducts,
    }

    const updatedPurchases = [...purchases, newPurchase]
    setPurchases(updatedPurchases)
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases))

    // Update product quantities and supplier balance
    const updatedProducts = products.map((product) => {
      const purchasedItem = selectedProducts.find((item) => item.productId === product.id)
      if (purchasedItem) {
        return {
          ...product,
          quantity: product.quantity + purchasedItem.quantity,
          totalValue: (product.quantity + purchasedItem.quantity) * product.pricePerUnit,
        }
      }
      return product
    })
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    onAddNotification({
      userId: 1,
      title: "طلب شراء جديد",
      message: `تم إنشاء طلب شراء ${newPurchase.purchaseNumber} بقيمة $${newPurchase.totalAmount.toLocaleString()}`,
      type: "success",
      module: "purchases",
      relatedId: newPurchase.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    // Reset form
    setFormData({
      purchaseNumber: "",
      supplier: "",
      supplierId: 0,
      products: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      totalAmount: 0,
      paymentMethod: "نقدي",
      purchaseDate: new Date().toISOString().split("T")[0],
      buyer: "",
      status: "معلق",
      paidAmount: 0,
      remainingAmount: 0,
      notes: "",
      deliveryDate: "",
      invoiceNumber: "",
    })
    setSelectedProducts([])
    setShowAddForm(false)
  }

  const filteredPurchases = purchases.filter(
    (purchase) =>
      purchase.purchaseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.buyer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalPurchases: purchases.length,
    totalAmount: purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0),
    totalPaid: purchases.reduce((sum, purchase) => sum + purchase.paidAmount, 0),
    totalRemaining: purchases.reduce((sum, purchase) => sum + purchase.remainingAmount, 0),
    completedPurchases: purchases.filter((p) => p.status === "مكتمل").length,
    pendingPurchases: purchases.filter((p) => p.status === "معلق").length,
    thisMonthPurchases: purchases.filter((p) => p.purchaseDate.startsWith("2024-01")).length,
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-100 text-sm">إجمالي المشتريات</p>
                <p className="text-3xl font-bold">{stats.totalPurchases}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-violet-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي المبلغ</p>
                <p className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">المبلغ المدفوع</p>
                <p className="text-3xl font-bold">${stats.totalPaid.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">المستحقات</p>
                <p className="text-3xl font-bold">${stats.totalRemaining.toLocaleString()}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <ShoppingCart className="w-8 h-8 text-violet-600 ml-3" />
            إدارة المشتريات
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع عمليات الشراء من الموردين</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "طلب شراء جديد"}
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المشتريات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-white bg-white/80 backdrop-blur-sm rounded-xl"
                dir="rtl"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white">
              <Filter className="w-4 h-4 ml-2" />
              فلترة
            </Button>
            <Button variant="outline" className="h-12 px-6 bg-white/80 backdrop-blur-sm border-2 border-white">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Purchase Form */}
      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
            <CardTitle className="flex items-center">
              <Plus className="w-6 h-6 ml-2 text-violet-600" />
              إضافة طلب شراء جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="supplier">المورد *</Label>
                  <Select
                    value={formData.supplierId?.toString()}
                    onValueChange={(value) => {
                      const supplier = suppliers.find((s) => s.id === Number(value))
                      setFormData({
                        ...formData,
                        supplierId: Number(value),
                        supplier: supplier?.name || "",
                      })
                    }}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer">المشتري *</Label>
                  <Input
                    id="buyer"
                    value={formData.buyer}
                    onChange={(e) => setFormData({ ...formData, buyer: e.target.value })}
                    required
                    dir="rtl"
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">تاريخ الشراء</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">تاريخ التسليم</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="h-12">
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

              {/* Products Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  المنتجات
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>المنتج</Label>
                    <Select
                      value={currentProduct.productId.toString()}
                      onValueChange={(value) => {
                        const product = products.find((p) => p.id === Number(value))
                        setCurrentProduct({
                          ...currentProduct,
                          productId: Number(value),
                          unitPrice: product?.costPrice || 0,
                        })
                      }}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="اختر المنتج" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>الكمية</Label>
                    <Input
                      type="number"
                      value={currentProduct.quantity}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: Number(e.target.value) })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>السعر</Label>
                    <Input
                      type="number"
                      value={currentProduct.unitPrice}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, unitPrice: Number(e.target.value) })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>&nbsp;</Label>
                    <Button type="button" onClick={addProductToList} className="h-12 w-full">
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة
                    </Button>
                  </div>
                </div>

                {selectedProducts.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-right p-3 font-semibold text-gray-700">المنتج</th>
                          <th className="text-right p-3 font-semibold text-gray-700">الكمية</th>
                          <th className="text-right p-3 font-semibold text-gray-700">السعر</th>
                          <th className="text-right p-3 font-semibold text-gray-700">الإجمالي</th>
                          <th className="text-right p-3 font-semibold text-gray-700">إجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts.map((item, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">{item.productName}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">${item.unitPrice}</td>
                            <td className="p-3 font-bold">${item.total.toLocaleString()}</td>
                            <td className="p-3">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => removeProductFromList(index)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Financial Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 ml-2" />
                  التفاصيل المالية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-bold text-lg">${formData.subtotal?.toLocaleString()}</span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discount">الخصم</Label>
                      <Input
                        id="discount"
                        type="number"
                        value={formData.discount}
                        onChange={(e) => {
                          const discount = Number(e.target.value)
                          const tax = (formData.subtotal || 0) * 0.05
                          const total = (formData.subtotal || 0) - discount + tax
                          setFormData({
                            ...formData,
                            discount,
                            tax,
                            totalAmount: total,
                            remainingAmount: total - (formData.paidAmount || 0),
                          })
                        }}
                        className="h-12"
                      />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">الضريبة (5%):</span>
                      <span className="font-bold text-lg">${formData.tax?.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg">
                      <span className="font-semibold">الإجمالي النهائي:</span>
                      <span className="font-bold text-2xl">${formData.totalAmount?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paidAmount">المبلغ المدفوع</Label>
                      <Input
                        id="paidAmount"
                        type="number"
                        value={formData.paidAmount}
                        onChange={(e) => {
                          const paidAmount = Number(e.target.value)
                          setFormData({
                            ...formData,
                            paidAmount,
                            remainingAmount: (formData.totalAmount || 0) - paidAmount,
                          })
                        }}
                        className="h-12"
                      />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-red-600 font-medium">المتبقي:</span>
                      <span className="font-bold text-lg text-red-600">
                        ${formData.remainingAmount?.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">الحالة</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="معلق">معلق</SelectItem>
                          <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                          <SelectItem value="مكتمل">مكتمل</SelectItem>
                          <SelectItem value="ملغي">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    dir="rtl"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                  disabled={selectedProducts.length === 0}
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ الطلب
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Purchases List */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <FileText className="w-6 h-6 ml-2 text-violet-600" />
                قائمة المشتريات
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Activity className="w-4 h-4 ml-2" />
                إجمالي المشتريات: {filteredPurchases.length} | هذا الشهر: {stats.thisMonthPurchases}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">رقم الطلب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المورد</th>
                  <th className="text-right p-4 font-semibold text-gray-700">التاريخ</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المشتري</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المبلغ الإجمالي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المدفوع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المتبقي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((purchase, index) => (
                  <tr
                    key={purchase.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-violet-600">{purchase.purchaseNumber}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 ml-2 text-gray-400" />
                        {purchase.supplier}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {purchase.purchaseDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{purchase.buyer}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-blue-600">${purchase.totalAmount.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${purchase.paidAmount.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className={`font-bold ${purchase.remainingAmount > 0 ? "text-red-600" : "text-green-600"}`}>
                        ${purchase.remainingAmount.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={purchase.status === "مكتمل" ? "default" : "secondary"}
                        className={
                          purchase.status === "مكتمل"
                            ? "bg-green-100 text-green-800"
                            : purchase.status === "معلق"
                              ? "bg-yellow-100 text-yellow-800"
                              : purchase.status === "قيد التنفيذ"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {purchase.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedPurchase(purchase)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-green-50 hover:text-green-600 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-red-50 hover:text-red-600 bg-transparent"
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
    </div>
  )
}
