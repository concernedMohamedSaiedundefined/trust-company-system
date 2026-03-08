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
  Layers,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Save,
  ClipboardList,
  Package,
  TrendingUp,
  Activity,
  Calendar,
} from "lucide-react"
import type { InventoryItem, InventorySession, Notification, Product } from "@/types"

interface InventoryManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function InventoryManagement({ onAddNotification }: InventoryManagementProps) {
  const [sessions, setSessions] = useState<InventorySession[]>([])
  const [items, setItems] = useState<InventoryItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showNewSession, setShowNewSession] = useState(false)
  const [showAddItem, setShowAddItem] = useState(false)
  const [currentSession, setCurrentSession] = useState<InventorySession | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sessionFormData, setSessionFormData] = useState<Partial<InventorySession>>({
    sessionNumber: "",
    startDate: new Date().toISOString().split("T")[0],
    performedBy: "",
    location: "",
    status: "in_progress",
    notes: "",
  })
  const [itemFormData, setItemFormData] = useState<Partial<InventoryItem>>({
    productId: 0,
    productName: "",
    category: "",
    currentStock: 0,
    recordedStock: 0,
    unit: "",
    location: "",
    notes: "",
  })

  useEffect(() => {
    const savedSessions = localStorage.getItem("inventorySessions")
    const savedItems = localStorage.getItem("inventoryItems")
    const savedProducts = localStorage.getItem("products")

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }

    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    } else {
      const demoSessions: InventorySession[] = [
        {
          id: 1,
          sessionNumber: "INV-2024-001",
          startDate: "2024-01-15",
          endDate: "2024-01-15",
          performedBy: "أحمد محمد",
          location: "مخزن رقم 1",
          status: "completed",
          itemsCount: 5,
          matchCount: 3,
          surplusCount: 1,
          shortageCount: 1,
          totalValue: 125000,
          notes: "جرد شهري روتيني",
        },
      ]
      setSessions(demoSessions)
      localStorage.setItem("inventorySessions", JSON.stringify(demoSessions))
    }

    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      const demoItems: InventoryItem[] = [
        {
          id: 1,
          productId: 1,
          productName: "طماطم طازجة",
          category: "خضروات",
          currentStock: 500,
          recordedStock: 500,
          difference: 0,
          unit: "كيلو",
          lastInventoryDate: "2024-01-15",
          location: "مخزن رقم 1",
          status: "match",
          value: 1250,
        },
        {
          id: 2,
          productId: 2,
          productName: "بطاطس",
          category: "خضروات",
          currentStock: 50,
          recordedStock: 45,
          difference: -5,
          unit: "كيلو",
          lastInventoryDate: "2024-01-15",
          location: "مخزن رقم 2",
          status: "shortage",
          value: 90,
        },
      ]
      setItems(demoItems)
      localStorage.setItem("inventoryItems", JSON.stringify(demoItems))
    }
  }, [])

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault()
    const newSession: InventorySession = {
      ...(sessionFormData as InventorySession),
      id: sessions.length + 1,
      sessionNumber: `INV-2024-${String(sessions.length + 1).padStart(3, "0")}`,
      itemsCount: 0,
      matchCount: 0,
      surplusCount: 0,
      shortageCount: 0,
      totalValue: 0,
    }
    const updatedSessions = [...sessions, newSession]
    setSessions(updatedSessions)
    localStorage.setItem("inventorySessions", JSON.stringify(updatedSessions))
    setCurrentSession(newSession)

    onAddNotification({
      userId: 1,
      title: "جلسة جرد جديدة",
      message: `تم إنشاء جلسة جرد ${newSession.sessionNumber}`,
      type: "success",
      module: "inventory",
      relatedId: newSession.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setSessionFormData({
      sessionNumber: "",
      startDate: new Date().toISOString().split("T")[0],
      performedBy: "",
      location: "",
      status: "in_progress",
      notes: "",
    })
    setShowNewSession(false)
    setShowAddItem(true)
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const product = products.find((p) => p.id === itemFormData.productId)
    if (!product) return

    const difference = (itemFormData.recordedStock || 0) - (itemFormData.currentStock || 0)
    let status: "match" | "surplus" | "shortage" = "match"
    if (difference > 0) status = "surplus"
    else if (difference < 0) status = "shortage"

    const newItem: InventoryItem = {
      ...(itemFormData as InventoryItem),
      id: items.length + 1,
      productName: product.name,
      category: product.category,
      difference,
      status,
      lastInventoryDate: new Date().toISOString().split("T")[0],
      value: (itemFormData.recordedStock || 0) * product.pricePerUnit,
    }

    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    localStorage.setItem("inventoryItems", JSON.stringify(updatedItems))

    // Update product quantity
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, quantity: itemFormData.recordedStock || 0 } : p,
    )
    setProducts(updatedProducts)
    localStorage.setItem("products", JSON.stringify(updatedProducts))

    onAddNotification({
      userId: 1,
      title: "تسجيل جرد",
      message: `تم تسجيل ${newItem.productName} - ${status === "match" ? "مطابق" : status === "surplus" ? "فائض" : "عجز"}`,
      type: status === "shortage" ? "warning" : "success",
      module: "inventory",
      relatedId: newItem.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: status === "shortage" ? "high" : "medium",
    })

    setItemFormData({
      productId: 0,
      productName: "",
      category: "",
      currentStock: 0,
      recordedStock: 0,
      unit: "",
      location: "",
      notes: "",
    })
  }

  const filteredItems = items.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalSessions: sessions.length,
    activeSessions: sessions.filter((s) => s.status === "in_progress").length,
    completedSessions: sessions.filter((s) => s.status === "completed").length,
    totalItems: items.length,
    matchItems: items.filter((i) => i.status === "match").length,
    surplusItems: items.filter((i) => i.status === "surplus").length,
    shortageItems: items.filter((i) => i.status === "shortage").length,
    totalValue: items.reduce((sum, item) => sum + item.value, 0),
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الجلسات</p>
                <p className="text-3xl font-bold">{stats.totalSessions}</p>
              </div>
              <ClipboardList className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">مطابق</p>
                <p className="text-3xl font-bold">{stats.matchItems}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">فائض</p>
                <p className="text-3xl font-bold">{stats.surplusItems}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">عجز</p>
                <p className="text-3xl font-bold">{stats.shortageItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <Layers className="w-8 h-8 text-blue-600 ml-3" />
            إدارة الجرد
          </h1>
          <p className="text-gray-600 mt-2">جرد المخزون ومطابقة الكميات الفعلية مع السجلات</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          {currentSession && currentSession.status === "in_progress" && (
            <Button
              onClick={() => setShowAddItem(!showAddItem)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج للجرد
            </Button>
          )}
          <Button
            onClick={() => setShowNewSession(!showNewSession)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            جلسة جرد جديدة
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المنتجات..."
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

      {/* New Session Form */}
      {showNewSession && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center">
              <Plus className="w-6 h-6 ml-2 text-blue-600" />
              إنشاء جلسة جرد جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleCreateSession} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="performedBy">القائم بالجرد *</Label>
                <Input
                  id="performedBy"
                  value={sessionFormData.performedBy}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, performedBy: e.target.value })}
                  required
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">الموقع *</Label>
                <Input
                  id="location"
                  value={sessionFormData.location}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, location: e.target.value })}
                  required
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">تاريخ البدء</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={sessionFormData.startDate}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, startDate: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={sessionFormData.notes}
                  onChange={(e) => setSessionFormData({ ...sessionFormData, notes: e.target.value })}
                  dir="rtl"
                  rows={3}
                />
              </div>

              <div className="md:col-span-2 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setShowNewSession(false)}>
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  إنشاء الجلسة
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Item Form */}
      {showAddItem && currentSession && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center">
              <Plus className="w-6 h-6 ml-2 text-green-600" />
              إضافة منتج للجرد - {currentSession.sessionNumber}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="productId">المنتج *</Label>
                <Select
                  value={itemFormData.productId?.toString()}
                  onValueChange={(value) => {
                    const product = products.find((p) => p.id === Number(value))
                    setItemFormData({
                      ...itemFormData,
                      productId: Number(value),
                      currentStock: product?.quantity || 0,
                      unit: product?.unit || "",
                      location: product?.location || "",
                    })
                  }}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - {product.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStock">الكمية المسجلة</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={itemFormData.currentStock}
                  readOnly
                  className="h-12 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recordedStock">الكمية الفعلية *</Label>
                <Input
                  id="recordedStock"
                  type="number"
                  value={itemFormData.recordedStock}
                  onChange={(e) => setItemFormData({ ...itemFormData, recordedStock: Number(e.target.value) })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">الوحدة</Label>
                <Input id="unit" value={itemFormData.unit} readOnly className="h-12 bg-gray-50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">الموقع</Label>
                <Input id="location" value={itemFormData.location} readOnly className="h-12 bg-gray-50" />
              </div>

              <div className="lg:col-span-3 space-y-2">
                <Label htmlFor="notes">ملاحظات</Label>
                <Textarea
                  id="notes"
                  value={itemFormData.notes}
                  onChange={(e) => setItemFormData({ ...itemFormData, notes: e.target.value })}
                  dir="rtl"
                  rows={3}
                />
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddItem(false)}>
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  تسجيل
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Inventory Items List */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Package className="w-6 h-6 ml-2 text-blue-600" />
                نتائج الجرد
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Activity className="w-4 h-4 ml-2" />
                إجمالي المنتجات: {filteredItems.length}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">المنتج</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الكمية المسجلة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الكمية الفعلية</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الفرق</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">القيمة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الموقع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">آخر جرد</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div>
                        <div className="font-semibold text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">
                        {item.currentStock} {item.unit}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">
                        {item.recordedStock} {item.unit}
                      </div>
                    </td>
                    <td className="p-4">
                      <div
                        className={`font-bold ${item.difference > 0 ? "text-green-600" : item.difference < 0 ? "text-red-600" : "text-gray-600"}`}
                      >
                        {item.difference > 0 ? "+" : ""}
                        {item.difference} {item.unit}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={item.status === "match" ? "default" : "secondary"}
                        className={
                          item.status === "match"
                            ? "bg-green-100 text-green-800"
                            : item.status === "surplus"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {item.status === "match" ? (
                          <CheckCircle className="w-3 h-3 ml-1" />
                        ) : item.status === "surplus" ? (
                          <TrendingUp className="w-3 h-3 ml-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 ml-1" />
                        )}
                        {item.status === "match" ? "مطابق" : item.status === "surplus" ? "فائض" : "عجز"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-blue-600">${item.value.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{item.location}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {item.lastInventoryDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-blue-50 hover:text-blue-600 bg-transparent"
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sessions List */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-xl flex items-center">
            <ClipboardList className="w-6 h-6 ml-2 text-purple-600" />
            جلسات الجرد
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((session) => (
              <Card key={session.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{session.sessionNumber}</h3>
                      <p className="text-sm text-gray-500">{session.location}</p>
                    </div>
                    <Badge
                      variant={session.status === "completed" ? "default" : "secondary"}
                      className={
                        session.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : session.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {session.status === "completed" ? "مكتمل" : session.status === "in_progress" ? "جاري" : "ملغي"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">القائم بالجرد</p>
                      <p className="font-medium">{session.performedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">التاريخ</p>
                      <p className="font-medium">{session.startDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-600" />
                      <p className="text-sm font-bold text-green-600">{session.matchCount}</p>
                      <p className="text-xs text-gray-500">مطابق</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                      <p className="text-sm font-bold text-blue-600">{session.surplusCount}</p>
                      <p className="text-xs text-gray-500">فائض</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-red-600" />
                      <p className="text-sm font-bold text-red-600">{session.shortageCount}</p>
                      <p className="text-xs text-gray-500">عجز</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">القيمة الإجمالية</p>
                      <p className="font-bold text-blue-600">${session.totalValue.toLocaleString()}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
