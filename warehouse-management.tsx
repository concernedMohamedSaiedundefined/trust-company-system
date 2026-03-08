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
  Warehouse,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Save,
  XCircle,
  MapPin,
  Package,
  Thermometer,
  Shield,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  Building2,
  Layers,
  BarChart3,
  Users,
  Clock,
} from "lucide-react"
import type { Notification } from "@/types"

interface WarehouseLocation {
  id: number
  name: string
  code: string
  address: string
  manager: string
  capacity: number
  currentStock: number
  temperature: number
  humidity: number
  securityLevel: string
  status: string
  zones: WarehouseZone[]
  lastInspection: string
  notes: string
}

interface WarehouseZone {
  id: number
  name: string
  type: string
  capacity: number
  currentStock: number
  temperature: number
  products: string[]
}

interface WarehouseManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function WarehouseManagement({ onAddNotification }: WarehouseManagementProps) {
  const [warehouses, setWarehouses] = useState<WarehouseLocation[]>([
    {
      id: 1,
      name: "المخزن الرئيسي",
      code: "WH-001",
      address: "القاهرة، مصر",
      manager: "أحمد محمد",
      capacity: 10000,
      currentStock: 7500,
      temperature: 18,
      humidity: 45,
      securityLevel: "عالي",
      status: "نشط",
      zones: [
        {
          id: 1,
          name: "منطقة التبريد",
          type: "مبرد",
          capacity: 2000,
          currentStock: 1800,
          temperature: 4,
          products: ["طماطم طازجة", "خضروات ورقية"],
        },
        {
          id: 2,
          name: "منطقة التخزين العادي",
          type: "عادي",
          capacity: 5000,
          currentStock: 3500,
          temperature: 20,
          products: ["بطاطس", "بصل", "جزر"],
        },
      ],
      lastInspection: "2024-01-15",
      notes: "مخزن رئيسي بحالة ممتازة",
    },
    {
      id: 2,
      name: "مخزن الإسكندرية",
      code: "WH-002",
      address: "الإسكندرية، مصر",
      manager: "فاطمة حسن",
      capacity: 8000,
      currentStock: 5200,
      temperature: 22,
      humidity: 50,
      securityLevel: "متوسط",
      status: "نشط",
      zones: [
        {
          id: 1,
          name: "منطقة التصدير",
          type: "تصدير",
          capacity: 4000,
          currentStock: 2800,
          temperature: 18,
          products: ["منتجات للتصدير"],
        },
      ],
      lastInspection: "2024-01-10",
      notes: "مخزن متخصص للتصدير",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseLocation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<WarehouseLocation>>({
    name: "",
    code: "",
    address: "",
    manager: "",
    capacity: 0,
    currentStock: 0,
    temperature: 20,
    humidity: 50,
    securityLevel: "متوسط",
    status: "نشط",
    zones: [],
    lastInspection: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newWarehouse: WarehouseLocation = {
      ...(formData as WarehouseLocation),
      id: warehouses.length + 1,
    }
    const updatedWarehouses = [...warehouses, newWarehouse]
    setWarehouses(updatedWarehouses)

    onAddNotification({
      userId: 1,
      title: "مخزن جديد",
      message: `تم إضافة المخزن ${newWarehouse.name} بنجاح`,
      type: "success",
      module: "warehouse",
      relatedId: newWarehouse.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setFormData({
      name: "",
      code: "",
      address: "",
      manager: "",
      capacity: 0,
      currentStock: 0,
      temperature: 20,
      humidity: 50,
      securityLevel: "متوسط",
      status: "نشط",
      zones: [],
      lastInspection: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setShowAddForm(false)
  }

  const filteredWarehouses = warehouses.filter(
    (warehouse) =>
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const warehouseStats = {
    totalWarehouses: warehouses.length,
    activeWarehouses: warehouses.filter((w) => w.status === "نشط").length,
    totalCapacity: warehouses.reduce((sum, w) => sum + w.capacity, 0),
    totalStock: warehouses.reduce((sum, w) => sum + w.currentStock, 0),
    utilizationRate:
      (warehouses.reduce((sum, w) => sum + w.currentStock, 0) / warehouses.reduce((sum, w) => sum + w.capacity, 0)) *
      100,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">إجمالي المخازن</p>
                <p className="text-3xl font-bold">{warehouseStats.totalWarehouses}</p>
              </div>
              <Warehouse className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">المخازن النشطة</p>
                <p className="text-3xl font-bold">{warehouseStats.activeWarehouses}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">السعة الإجمالية</p>
                <p className="text-3xl font-bold">{warehouseStats.totalCapacity.toLocaleString()}</p>
              </div>
              <Layers className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">معدل الاستخدام</p>
                <p className="text-3xl font-bold">{warehouseStats.utilizationRate.toFixed(1)}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent flex items-center">
            <Warehouse className="w-8 h-8 text-yellow-600 ml-3" />
            إدارة المخازن
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للمخازن والمواقع التخزينية مع مراقبة الظروف البيئية</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة مخزن جديد"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في المخازن بالاسم، الكود، أو المدير..."
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
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-yellow-600" />
              إضافة مخزن جديد
            </CardTitle>
            <CardDescription>أدخل بيانات المخزن الجديد</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 ml-2" />
                  المعلومات الأساسية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium">
                  <Warehouse className="w-4 h-4 ml-2" />
                  اسم المخزن *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="اسم المخزن"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  كود المخزن *
                </Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="WH-001"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager" className="flex items-center text-sm font-medium">
                  <Users className="w-4 h-4 ml-2" />
                  مدير المخزن *
                </Label>
                <Input
                  id="manager"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  placeholder="اسم المدير"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity" className="flex items-center text-sm font-medium">
                  <Layers className="w-4 h-4 ml-2" />
                  السعة الإجمالية *
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                  placeholder="10000"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentStock" className="flex items-center text-sm font-medium">
                  <Package className="w-4 h-4 ml-2" />
                  المخزون الحالي
                </Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: Number(e.target.value) })}
                  placeholder="0"
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityLevel" className="flex items-center text-sm font-medium">
                  <Shield className="w-4 h-4 ml-2" />
                  مستوى الأمان
                </Label>
                <Select
                  value={formData.securityLevel}
                  onValueChange={(value) => setFormData({ ...formData, securityLevel: value })}
                >
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl">
                    <SelectValue placeholder="اختر مستوى الأمان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="منخفض">منخفض</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="عالي">عالي</SelectItem>
                    <SelectItem value="فائق">فائق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Thermometer className="w-5 h-5 ml-2" />
                  الظروف البيئية
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center text-sm font-medium">
                  <Thermometer className="w-4 h-4 ml-2" />
                  درجة الحرارة (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: Number(e.target.value) })}
                  placeholder="20"
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity" className="flex items-center text-sm font-medium">
                  <Thermometer className="w-4 h-4 ml-2" />
                  الرطوبة (%)
                </Label>
                <Input
                  id="humidity"
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => setFormData({ ...formData, humidity: Number(e.target.value) })}
                  placeholder="50"
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastInspection" className="flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 ml-2" />
                  آخر فحص
                </Label>
                <Input
                  id="lastInspection"
                  type="date"
                  value={formData.lastInspection}
                  onChange={(e) => setFormData({ ...formData, lastInspection: e.target.value })}
                  className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
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
                    placeholder="العنوان التفصيلي للمخزن"
                    dir="rtl"
                    className="border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                    rows={3}
                  />
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center text-sm font-medium">
                    <Package className="w-4 h-4 ml-2" />
                    ملاحظات
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="ملاحظات إضافية..."
                    dir="rtl"
                    className="border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                    rows={3}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
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
                  className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المخزن
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Warehouse className="w-6 h-6 ml-2 text-yellow-600" />
                قائمة المخازن
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي المخازن: {filteredWarehouses.length} | نشط: {warehouseStats.activeWarehouses} | معدل الاستخدام:{" "}
                {warehouseStats.utilizationRate.toFixed(1)}%
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {warehouseStats.activeWarehouses} مخزن نشط
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <Layers className="w-3 h-3 ml-1" />
                {warehouseStats.totalCapacity.toLocaleString()} سعة إجمالية
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">المخزن</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الكود</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المدير</th>
                  <th className="text-right p-4 font-semibold text-gray-700">السعة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المخزون الحالي</th>
                  <th className="text-right p-4 font-semibold text-gray-700">معدل الاستخدام</th>
                  <th className="text-right p-4 font-semibold text-gray-700">درجة الحرارة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">مستوى الأمان</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarehouses.map((warehouse, index) => {
                  const utilizationRate = (warehouse.currentStock / warehouse.capacity) * 100
                  return (
                    <tr
                      key={warehouse.id}
                      className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {warehouse.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{warehouse.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 ml-1" />
                              {warehouse.address}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-blue-600">{warehouse.code}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-gray-700">
                          <Users className="w-4 h-4 ml-2 text-gray-400" />
                          {warehouse.manager}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-blue-600">{warehouse.capacity.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-green-600">{warehouse.currentStock.toLocaleString()}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div
                            className={`font-bold ${
                              utilizationRate > 90
                                ? "text-red-600"
                                : utilizationRate > 70
                                  ? "text-orange-600"
                                  : "text-green-600"
                            }`}
                          >
                            {utilizationRate.toFixed(1)}%
                          </div>
                          {utilizationRate > 90 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-gray-700">
                          <Thermometer className="w-4 h-4 ml-2 text-gray-400" />
                          {warehouse.temperature}°C
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            warehouse.securityLevel === "عالي" || warehouse.securityLevel === "فائق"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            warehouse.securityLevel === "عالي" || warehouse.securityLevel === "فائق"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {warehouse.securityLevel}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={warehouse.status === "نشط" ? "default" : "secondary"}
                          className={
                            warehouse.status === "نشط" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {warehouse.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedWarehouse(warehouse)}
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
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
