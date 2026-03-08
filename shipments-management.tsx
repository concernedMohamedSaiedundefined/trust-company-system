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
  Ship,
  CheckCircle,
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  Download,
  Users,
  MapPin,
  Truck,
  Scale,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  Save,
  XCircle,
  Target,
} from "lucide-react"
import type { Shipment, Notification } from "@/types"

interface ShipmentsManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function ShipmentsManagement({ onAddNotification }: ShipmentsManagementProps) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Shipment>>({
    shipmentNumber: "",
    customer: "",
    destination: "",
    products: [],
    totalValue: 0,
    weight: 0,
    status: "جاهز للشحن",
    shippingDate: new Date().toISOString().split("T")[0],
    estimatedArrival: "",
    transportCompany: "",
    trackingNumber: "",
    documents: [],
    shippingCost: 0,
    insuranceCost: 0,
    customsCost: 0,
    totalCost: 0,
  })

  useEffect(() => {
    const savedShipments = localStorage.getItem("shipments")
    if (savedShipments) {
      setShipments(JSON.parse(savedShipments))
    } else {
      const demoShipments: Shipment[] = [
        {
          id: 1,
          shipmentNumber: "SH-2024-001",
          customer: "شركة الأهرام للتجارة",
          destination: "القاهرة، مصر",
          products: ["طماطم طازجة", "بطاطس"],
          totalValue: 15000,
          weight: 2500,
          status: "في الطريق",
          shippingDate: "2024-01-10",
          estimatedArrival: "2024-01-12",
          transportCompany: "شركة النقل السريع",
          trackingNumber: "TRK123456789",
          documents: ["فاتورة.pdf", "بوليصة شحن.pdf"],
          shippingCost: 500,
          insuranceCost: 200,
          customsCost: 300,
          totalCost: 1000,
        },
        {
          id: 2,
          shipmentNumber: "SH-2024-002",
          customer: "مؤسسة الخليج التجارية",
          destination: "الرياض، السعودية",
          products: ["خضروات مشكلة"],
          totalValue: 25000,
          weight: 3000,
          status: "جاهز للشحن",
          shippingDate: "2024-01-15",
          estimatedArrival: "2024-01-18",
          transportCompany: "شركة الشحن الدولي",
          trackingNumber: "TRK987654321",
          documents: ["فاتورة.pdf", "شهادة منشأ.pdf"],
          shippingCost: 800,
          insuranceCost: 300,
          customsCost: 400,
          totalCost: 1500,
        },
      ]
      setShipments(demoShipments)
      localStorage.setItem("shipments", JSON.stringify(demoShipments))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingShipment) {
      // Update existing shipment
      const updatedShipment: Shipment = {
        ...editingShipment,
        ...formData,
        totalCost: (formData.shippingCost || 0) + (formData.insuranceCost || 0) + (formData.customsCost || 0),
      } as Shipment

      const updatedShipments = shipments.map((s) => (s.id === editingShipment.id ? updatedShipment : s))
      setShipments(updatedShipments)
      localStorage.setItem("shipments", JSON.stringify(updatedShipments))

      onAddNotification({
        userId: 1,
        title: "تم تحديث الشحنة",
        message: `تم تحديث بيانات الشحنة ${updatedShipment.shipmentNumber} بنجاح`,
        type: "success",
        module: "shipments",
        relatedId: updatedShipment.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })

      setEditingShipment(null)
    } else {
      // Add new shipment
      const newShipment: Shipment = {
        ...(formData as Shipment),
        id: shipments.length + 1,
        shipmentNumber: `SH-2024-${String(shipments.length + 1).padStart(3, "0")}`,
        trackingNumber: `TRK${Math.random().toString().substr(2, 9)}`,
        totalCost: (formData.shippingCost || 0) + (formData.insuranceCost || 0) + (formData.customsCost || 0),
      }
      const updatedShipments = [...shipments, newShipment]
      setShipments(updatedShipments)
      localStorage.setItem("shipments", JSON.stringify(updatedShipments))

      onAddNotification({
        userId: 1,
        title: "شحنة جديدة",
        message: `تم إضافة الشحنة ${newShipment.shipmentNumber} بنجاح`,
        type: "success",
        module: "shipments",
        relatedId: newShipment.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      shipmentNumber: "",
      customer: "",
      destination: "",
      products: [],
      totalValue: 0,
      weight: 0,
      status: "جاهز للشحن",
      shippingDate: new Date().toISOString().split("T")[0],
      estimatedArrival: "",
      transportCompany: "",
      trackingNumber: "",
      documents: [],
      shippingCost: 0,
      insuranceCost: 0,
      customsCost: 0,
      totalCost: 0,
    })
    setShowAddForm(false)
    setEditingShipment(null)
  }

  const handleEdit = (shipment: Shipment) => {
    setFormData(shipment)
    setEditingShipment(shipment)
    setShowAddForm(true)
  }

  const handleDelete = (shipmentId: number) => {
    const updatedShipments = shipments.filter((s) => s.id !== shipmentId)
    setShipments(updatedShipments)
    localStorage.setItem("shipments", JSON.stringify(updatedShipments))

    const deletedShipment = shipments.find((s) => s.id === shipmentId)
    onAddNotification({
      userId: 1,
      title: "تم حذف الشحنة",
      message: `تم حذف الشحنة ${deletedShipment?.shipmentNumber} بنجاح`,
      type: "info",
      module: "shipments",
      relatedId: shipmentId,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const shipmentStats = {
    totalShipments: shipments.length,
    inTransit: shipments.filter((s) => s.status === "في الطريق").length,
    readyToShip: shipments.filter((s) => s.status === "جاهز للشحن").length,
    delivered: shipments.filter((s) => s.status === "تم التسليم").length,
    totalValue: shipments.reduce((sum, s) => sum + s.totalValue, 0),
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 text-sm">إجمالي الشحنات</p>
                <p className="text-3xl font-bold">{shipmentStats.totalShipments}</p>
              </div>
              <Ship className="w-8 h-8 text-cyan-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">في الطريق</p>
                <p className="text-3xl font-bold">{shipmentStats.inTransit}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">جاهز للشحن</p>
                <p className="text-3xl font-bold">{shipmentStats.readyToShip}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">القيمة الإجمالية</p>
                <p className="text-3xl font-bold">${shipmentStats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center">
            <Ship className="w-8 h-8 text-cyan-600 ml-3" />
            الشحنات والتصدير
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة لجميع الشحنات وعمليات التصدير</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إضافة شحنة جديدة"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الشحنات برقم الشحنة، العميل، أو الوجهة..."
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
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-cyan-600" />
              {editingShipment ? "تعديل الشحنة" : "إضافة شحنة جديدة"}
            </CardTitle>
            <CardDescription>
              {editingShipment ? "تعديل بيانات الشحنة" : "أدخل بيانات الشحنة الجديدة بدقة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Ship className="w-5 h-5 ml-2" />
                  معلومات الشحنة
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer" className="flex items-center text-sm font-medium">
                  <Users className="w-4 h-4 ml-2" />
                  العميل *
                </Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  placeholder="شركة الأهرام للتجارة"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center text-sm font-medium">
                  <MapPin className="w-4 h-4 ml-2" />
                  الوجهة *
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="القاهرة، مصر"
                  required
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportCompany" className="flex items-center text-sm font-medium">
                  <Truck className="w-4 h-4 ml-2" />
                  شركة النقل
                </Label>
                <Input
                  id="transportCompany"
                  value={formData.transportCompany}
                  onChange={(e) => setFormData({ ...formData, transportCompany: e.target.value })}
                  placeholder="شركة النقل السريع"
                  dir="rtl"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalValue" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  القيمة الإجمالية *
                </Label>
                <Input
                  id="totalValue"
                  type="number"
                  value={formData.totalValue}
                  onChange={(e) => setFormData({ ...formData, totalValue: Number(e.target.value) })}
                  placeholder="15000"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center text-sm font-medium">
                  <Scale className="w-4 h-4 ml-2" />
                  الوزن (كيلو) *
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  placeholder="2500"
                  required
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingDate" className="flex items-center text-sm font-medium">
                  <Calendar className="w-4 h-4 ml-2" />
                  تاريخ الشحن *
                </Label>
                <Input
                  id="shippingDate"
                  type="date"
                  value={formData.shippingDate}
                  onChange={(e) => setFormData({ ...formData, shippingDate: e.target.value })}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedArrival" className="flex items-center text-sm font-medium">
                  <Clock className="w-4 h-4 ml-2" />
                  تاريخ الوصول المتوقع
                </Label>
                <Input
                  id="estimatedArrival"
                  type="date"
                  value={formData.estimatedArrival}
                  onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="flex items-center text-sm font-medium">
                  <Activity className="w-4 h-4 ml-2" />
                  حالة الشحنة
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl">
                    <SelectValue placeholder="اختر حالة الشحنة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جاهز للشحن">جاهز للشحن</SelectItem>
                    <SelectItem value="في الطريق">في الطريق</SelectItem>
                    <SelectItem value="تم التسليم">تم التسليم</SelectItem>
                    <SelectItem value="متأخر">متأخر</SelectItem>
                    <SelectItem value="ملغي">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingCost" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  تكلفة الشحن
                </Label>
                <Input
                  id="shippingCost"
                  type="number"
                  value={formData.shippingCost}
                  onChange={(e) => setFormData({ ...formData, shippingCost: Number(e.target.value) })}
                  placeholder="500"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceCost" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  تكلفة التأمين
                </Label>
                <Input
                  id="insuranceCost"
                  type="number"
                  value={formData.insuranceCost}
                  onChange={(e) => setFormData({ ...formData, insuranceCost: Number(e.target.value) })}
                  placeholder="200"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customsCost" className="flex items-center text-sm font-medium">
                  <DollarSign className="w-4 h-4 ml-2" />
                  تكلفة الجمارك
                </Label>
                <Input
                  id="customsCost"
                  type="number"
                  value={formData.customsCost}
                  onChange={(e) => setFormData({ ...formData, customsCost: Number(e.target.value) })}
                  placeholder="300"
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 rounded-xl"
                />
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
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {editingShipment ? "تحديث الشحنة" : "حفظ الشحنة"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Ship className="w-6 h-6 ml-2 text-cyan-600" />
                قائمة الشحنات
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي الشحنات: {filteredShipments.length} | في الطريق: {shipmentStats.inTransit} | جاهز للشحن:{" "}
                {shipmentStats.readyToShip}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {shipmentStats.inTransit} في الطريق
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <CheckCircle className="w-3 h-3 ml-1" />
                {shipmentStats.delivered} تم التسليم
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">رقم الشحنة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">العميل</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الوجهة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">القيمة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الوزن</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ الشحن</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment, index) => (
                  <tr key={shipment.id} className={`border-b hover:bg-gray-50 transition-colors`}>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">{shipment.shipmentNumber}</div>
                      <div className="text-sm text-gray-500">{shipment.trackingNumber}</div>
                    </td>
                    <td className="p-4">{shipment.customer}</td>
                    <td className="p-4">{shipment.destination}</td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${shipment.totalValue.toLocaleString()}</div>
                    </td>
                    <td className="p-4">{shipment.weight} كيلو</td>
                    <td className="p-4">
                      <Badge
                        className={
                          shipment.status === "تم التسليم"
                            ? "bg-green-100 text-green-800"
                            : shipment.status === "في الطريق"
                              ? "bg-blue-100 text-blue-800"
                              : shipment.status === "جاهز للشحن"
                                ? "bg-yellow-100 text-yellow-800"
                                : shipment.status === "متأخر"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="p-4">{shipment.shippingDate}</td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedShipment(shipment)}
                              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Ship className="w-5 h-5 ml-2" />
                                تفاصيل الشحنة: {selectedShipment?.shipmentNumber}
                              </DialogTitle>
                              <DialogDescription>عرض تفصيلي لجميع بيانات الشحنة</DialogDescription>
                            </DialogHeader>
                            {selectedShipment && (
                              <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">رقم الشحنة</Label>
                                  <p className="text-sm">{selectedShipment.shipmentNumber}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">رقم التتبع</Label>
                                  <p className="text-sm">{selectedShipment.trackingNumber}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">العميل</Label>
                                  <p className="text-sm">{selectedShipment.customer}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الوجهة</Label>
                                  <p className="text-sm">{selectedShipment.destination}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">شركة النقل</Label>
                                  <p className="text-sm">{selectedShipment.transportCompany}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">القيمة الإجمالية</Label>
                                  <p className="text-sm font-bold text-green-600">
                                    ${selectedShipment.totalValue.toLocaleString()}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">الوزن</Label>
                                  <p className="text-sm">{selectedShipment.weight} كيلو</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">تاريخ الشحن</Label>
                                  <p className="text-sm">{selectedShipment.shippingDate}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">تاريخ الوصول المتوقع</Label>
                                  <p className="text-sm">{selectedShipment.estimatedArrival || "غير محدد"}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">إجمالي التكلفة</Label>
                                  <p className="text-sm font-bold text-blue-600">
                                    ${selectedShipment.totalCost?.toLocaleString() || 0}
                                  </p>
                                </div>
                                <div className="col-span-2 space-y-2">
                                  <Label className="text-sm font-medium text-gray-600">المنتجات</Label>
                                  <p className="text-sm">{selectedShipment.products.join(", ")}</p>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(shipment)}
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
                                هل أنت متأكد من حذف الشحنة "{shipment.shipmentNumber}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(shipment.id)}
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
