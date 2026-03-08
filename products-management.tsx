"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
  Globe,
  Layers,
  Scale,
  Shield,
  MapPin,
  Calendar,
  DollarSign,
  Save,
  XCircle,
  Target,
  Activity,
  ArrowLeft,
} from "lucide-react"
import type { Product, Notification } from "@/types"

interface ProductsManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
  onBack?: () => void
}

export function ProductsManagement({ onAddNotification, onBack }: ProductsManagementProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    type: "",
    origin: "",
    quantity: 0,
    unit: "كيلو",
    pricePerUnit: 0,
    totalValue: 0,
    expiryDate: "",
    qualityGrade: "A",
    supplier: "",
    location: "",
    status: "متاح",
    costPrice: 0,
    sellingPrice: 0,
    profitMargin: 0,
  })

  useEffect(() => {
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      const demoProducts: Product[] = [
        {
          id: 1,
          name: "طماطم طازجة",
          category: "خضروات",
          type: "طماطم",
          origin: "مصر",
          quantity: 500,
          unit: "كيلو",
          pricePerUnit: 2.5,
          totalValue: 1250,
          expiryDate: "2024-02-15",
          qualityGrade: "A+",
          supplier: "مزرعة الوادي الأخضر",
          location: "مخزن رقم 1",
          status: "متاح",
          costPrice: 2.0,
          sellingPrice: 3.0,
          profitMargin: 1.0,
        },
        {
          id: 2,
          name: "بطاطس",
          category: "خضروات",
          type: "بطاطس",
          origin: "مصر",
          quantity: 50,
          unit: "كيلو",
          pricePerUnit: 1.8,
          totalValue: 90,
          expiryDate: "2024-03-01",
          qualityGrade: "A",
          supplier: "شركة النيل للمنتجات الزراعية",
          location: "مخزن رقم 2",
          status: "قريب الانتهاء",
          costPrice: 1.5,
          sellingPrice: 2.2,
          profitMargin: 0.7,
        },
      ]
      setProducts(demoProducts)
      localStorage.setItem("products", JSON.stringify(demoProducts))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        ...formData,
        totalValue: (formData.quantity || 0) * (formData.pricePerUnit || 0),
        profitMargin: (formData.sellingPrice || 0) - (formData.costPrice || 0),
      } as Product

      const updatedProducts = products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))

      onAddNotification({
        userId: 1,
        title: "تم تحديث المنتج",
        message: `تم تحديث بيانات المنتج ${updatedProduct.name} بنجاح`,
        type: "success",
        module: "products",
        relatedId: updatedProduct.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })

      setEditingProduct(null)
    } else {
      // Add new product
      const newProduct: Product = {
        ...(formData as Product),
        id: products.length + 1,
        totalValue: (formData.quantity || 0) * (formData.pricePerUnit || 0),
        profitMargin: (formData.sellingPrice || 0) - (formData.costPrice || 0),
      }
      const updatedProducts = [...products, newProduct]
      setProducts(updatedProducts)
      localStorage.setItem("products", JSON.stringify(updatedProducts))

      onAddNotification({
        userId: 1,
        title: "منتج جديد",
        message: `تم إضافة المنتج ${newProduct.name} بنجاح`,
        type: "success",
        module: "products",
        relatedId: newProduct.id,
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
      category: "",
      type: "",
      origin: "",
      quantity: 0,
      unit: "كيلو",
      pricePerUnit: 0,
      totalValue: 0,
      expiryDate: "",
      qualityGrade: "A",
      supplier: "",
      location: "",
      status: "متاح",
      costPrice: 0,
      sellingPrice: 0,
      profitMargin: 0,
    })
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const handleEdit = (product: Product) => {
    setFormData(product)
    setEditingProduct(product)
    setShowAddForm(true)
  }

  const handleDelete = (productId: number) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    const deletedProduct = products.find((p) => p.id === productId)
    onAddNotification({
      userId: 1,
      title: "تم حذف المنتج",
      message: `تم حذف المنتج ${deletedProduct?.name} بنجاح`,
      type: "info",
      module: "products",
      relatedId: productId,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const productStats = {
    totalProducts: products.length,
    availableProducts: products.filter((p) => p.status === "متاح").length,
    expiringSoon: products.filter((p) => p.status === "قريب الانتهاء").length,
    outOfStock: products.filter((p) => p.status === "نفد المخزون").length,
    totalValue: products.reduce((sum, p) => sum + p.totalValue, 0),
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">إجمالي المنتجات</p>
                <p className="text-3xl font-bold">{productStats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">المنتجات المتاحة</p>
                <p className="text-3xl font-bold">{productStats.availableProducts}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">قريب الانتهاء</p>
                <p className="text-3xl font-bold">{productStats.expiringSoon}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">القيمة الإجمالية</p>
                <p className="text-3xl font-bold">${productStats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
            <Package className="w-8 h-8 text-orange-600 ml-3" />
            المنتجات والمحاصيل
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع المنتجات والمحاصيل الزراعية</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة منتج جديد"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المنتجات بالاسم، الفئة، أو المورد..."
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
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-orange-600" />
              {editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
            </CardTitle>
            <CardDescription>
              {editingProduct ? "تعديل بيانات المنتج" : "أدخل بيانات المنتج الجديد بدقة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  معلومات المنتج
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  اسم المنتج *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="طماطم طازجة"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center text-sm font-medium">
                  <Layers className="w-4 h-4 ml-2" />
                  الفئة *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="خضروات">خضروات</SelectItem>
                    <SelectItem value="فواكه">فواكه</SelectItem>
                    <SelectItem value="محاصيل">محاصيل</SelectItem>
                    <SelectItem value="بقوليات">بقوليات</SelectItem>
                    <SelectItem value="حبوب">حبوب</SelectItem>
                    <SelectItem value="توابل">توابل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center text-sm font-medium">
                  <Globe className="w-4 h-4 ml-2" />
                  بلد المنشأ *
                </Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="مصر"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  الكمية *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  placeholder="500"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit" className="flex items-center text-sm font-medium">
                  <Scale className="w-4 h-4 ml-2" />
                  الوحدة *
                </Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl">
                    <SelectValue placeholder="اختر الوحدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="كيلو">كيلو</SelectItem>
                    <SelectItem value="طن">طن</SelectItem>
                    <SelectItem value="قطعة">قطعة</SelectItem>
                    <SelectItem value="صندوق">صندوق</SelectItem>
                    <SelectItem value="كيس">كيس</SelectItem>
                    <SelectItem value="لتر">لتر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerUnit" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  السعر/الوحدة *
                </Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  step="0.01"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: Number(e.target.value) })}
                  placeholder="2.50"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPrice" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  سعر التكلفة
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                  placeholder="2.00"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPrice" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  سعر البيع
                </Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
                  placeholder="3.00"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
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
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualityGrade" className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 ml-2" />
                  درجة الجودة
                </Label>
                <Select
                  value={formData.qualityGrade}
                  onValueChange={(value) => setFormData({ ...formData, qualityGrade: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl">
                    <SelectValue placeholder="اختر درجة الجودة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+ - ممتاز</SelectItem>
                    <SelectItem value="A">A - جيد جداً</SelectItem>
                    <SelectItem value="B">B - جيد</SelectItem>
                    <SelectItem value="C">C - مقبول</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  المورد
                </Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="مزرعة الوادي الأخضر"
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 ml-2" />
                  موقع التخزين
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="مخزن رقم 1"
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center text-sm font-medium">
                  <Activity className="w-4 h-4 ml-2" />
                  حالة المنتج
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 rounded-xl">
                    <SelectValue placeholder="اختر حالة المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متاح">متاح</SelectItem>
                    <SelectItem value="قريب الانتهاء">قريب الانتهاء</SelectItem>
                    <SelectItem value="نفد المخزون">نفد المخزون</SelectItem>
                    <SelectItem value="معطل">معطل</SelectItem>
                  </SelectContent>
                </Select>
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
                  className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {editingProduct ? "تحديث المنتج" : "حفظ المنتج"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Package className="w-6 h-6 ml-2 text-orange-600" />
                قائمة المنتجات
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي المنتجات: {filteredProducts.length} | متاح: {productStats.availableProducts} | قريب الانتهاء:{" "}
                {productStats.expiringSoon}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {productStats.availableProducts} منتج متاح
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <AlertTriangle className="w-3 h-3 ml-1" />
                {productStats.expiringSoon} قريب الانتهاء
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">المنتج</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الفئة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الكمية</th>
                  <th className="text-right p-4 font-semibold text-gray-700">السعر/الوحدة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">القيمة الإجمالية</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ الانتهاء</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id} className={`border-b hover:bg-gray-50 transition-colors`}>
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.supplier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-100 text-orange-800">{product.category}</Badge>
                    </td>
                    <td className="p-4">
                      {product.quantity} {product.unit}
                    </td>
                    <td className="p-4">${product.pricePerUnit}</td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${product.totalValue.toLocaleString()}</div>
                    </td>
                    <td className="p-4">{product.expiryDate || "غير محدد"}</td>
                    <td className="p-4">
                      <Badge
                        className={
                          product.status === "متاح"
                            ? "bg-green-100 text-green-800"
                            : product.status === "قريب الانتهاء"
                              ? "bg-yellow-100 text-yellow-800"
                              : product.status === "نفد المخزون"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedProduct(product)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Package className="w-5 h-5 ml-2" />
                                تفاصيل المنتج: {selectedProduct?.name}
                              </DialogTitle>
                              <DialogDescription>عرض تفصيلي لجميع بيانات المنتج</DialogDescription>
                            </DialogHeader>
                            {selectedProduct && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">اسم المنتج</Label>
                                  <p className="text-sm">{selectedProduct.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الفئة</Label>
                                  <p className="text-sm">{selectedProduct.category}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">بلد المنشأ</Label>
                                  <p className="text-sm">{selectedProduct.origin}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الكمية</Label>
                                  <p className="text-sm">
                                    {selectedProduct.quantity} {selectedProduct.unit}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">السعر/الوحدة</Label>
                                  <p className="text-sm">${selectedProduct.pricePerUnit}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">القيمة الإجمالية</Label>
                                  <p className="text-sm font-bold text-green-600">
                                    ${selectedProduct.totalValue.toLocaleString()}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">درجة الجودة</Label>
                                  <p className="text-sm">{selectedProduct.qualityGrade}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المورد</Label>
                                  <p className="text-sm">{selectedProduct.supplier}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">موقع التخزين</Label>
                                  <p className="text-sm">{selectedProduct.location}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">تاريخ الانتهاء</Label>
                                  <p className="text-sm">{selectedProduct.expiryDate || "غير محدد"}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">سعر التكلفة</Label>
                                  <p className="text-sm">${selectedProduct.costPrice}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">سعر البيع</Label>
                                  <p className="text-sm">${selectedProduct.sellingPrice}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product)}
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
                                هل أنت متأكد من حذف المنتج "{product.name}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.id)}
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
