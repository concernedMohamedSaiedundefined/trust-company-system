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
  User,
  Calendar,
  DollarSign,
  Target,
  Activity,
  CheckCircle,
  Clock,
  Printer,
  Send,
  Package,
  Calculator,
  CreditCard,
  Hash,
  MessageCircle,
  Phone,
} from "lucide-react"
import type { Notification } from "@/types"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Invoice {
  id: number
  invoiceNumber: string
  customerName: string
  customerId: number
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  discount: number
  tax: number
  totalAmount: number
  status: string
  paymentMethod: string
  notes: string
  template: string
  includeTax?: boolean
}

interface InvoiceItem {
  id: number
  productName: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function InvoiceManagement({ onAddNotification }: InvoiceManagementProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      customerName: "شركة الأهرام للتجارة",
      customerId: 1,
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      items: [
        {
          id: 1,
          productName: "طماطم طازجة",
          description: "طماطم طازجة عالية الجودة",
          quantity: 100,
          unitPrice: 3.0,
          total: 300,
        },
        {
          id: 2,
          productName: "بطاطس",
          description: "بطاطس مصرية ممتازة",
          quantity: 50,
          unitPrice: 2.2,
          total: 110,
        },
      ],
      subtotal: 410,
      discount: 20,
      tax: 39,
      totalAmount: 429,
      status: "مرسلة",
      paymentMethod: "آجل",
      notes: "فاتورة للشحنة الأولى",
      template: "classic",
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      customerName: "مؤسسة الخليج التجارية",
      customerId: 2,
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
      items: [
        {
          id: 1,
          productName: "خضروات مشكلة",
          description: "مجموعة متنوعة من الخضروات الطازجة",
          quantity: 200,
          unitPrice: 2.5,
          total: 500,
        },
      ],
      subtotal: 500,
      discount: 25,
      tax: 47.5,
      totalAmount: 522.5,
      status: "مدفوعة",
      paymentMethod: "نقدي",
      notes: "دفع فوري",
      template: "modern",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false)
  const [whatsAppPhone, setWhatsAppPhone] = useState("")
  const [whatsAppInvoice, setWhatsAppInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, "0")}`,
    customerName: "",
    customerId: 0,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    items: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    totalAmount: 0,
    status: "مسودة",
    paymentMethod: "نقدي",
    notes: "",
    template: "classic",
    includeTax: true,
  })

  const [currentItem, setCurrentItem] = useState<Partial<InvoiceItem>>({
    productName: "",
    description: "",
    quantity: 1,
    unitPrice: 0,
    total: 0,
  })

  const addItemToInvoice = () => {
    if (currentItem.productName && currentItem.quantity && currentItem.unitPrice) {
      const newItem: InvoiceItem = {
        id: (formData.items?.length || 0) + 1,
        productName: currentItem.productName || "",
        description: currentItem.description || "",
        quantity: currentItem.quantity || 0,
        unitPrice: currentItem.unitPrice || 0,
        total: (currentItem.quantity || 0) * (currentItem.unitPrice || 0),
      }

      const updatedItems = [...(formData.items || []), newItem]
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = subtotal * 0.1 // 10% tax
      const totalAmount = subtotal - (formData.discount || 0) + tax

      setFormData({
        ...formData,
        items: updatedItems,
        subtotal,
        tax,
        totalAmount,
      })

      setCurrentItem({
        productName: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      })
    }
  }

  const handleEdit = (invoice: Invoice) => {
    setFormData(invoice)
    setEditingInvoice(invoice)
    setShowAddForm(true)
  }

  const handleDelete = (invoiceId: number) => {
    const updatedInvoices = invoices.filter((i) => i.id !== invoiceId)
    setInvoices(updatedInvoices)

    const deletedInvoice = invoices.find((i) => i.id === invoiceId)
    onAddNotification({
      userId: 1,
      title: "تم حذف الفاتورة",
      message: `تم حذف الفاتورة ${deletedInvoice?.invoiceNumber} بنجاح`,
      type: "info",
      module: "invoices",
      relatedId: invoiceId,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingInvoice) {
      const updatedInvoice: Invoice = {
        ...editingInvoice,
        ...formData,
        id: editingInvoice.id,
      } as Invoice

      const updatedInvoices = invoices.map((i) => (i.id === editingInvoice.id ? updatedInvoice : i))
      setInvoices(updatedInvoices)

      onAddNotification({
        userId: 1,
        title: "تم تحديث الفاتورة",
        message: `تم تحديث الفاتورة ${updatedInvoice.invoiceNumber} بنجاح`,
        type: "success",
        module: "invoices",
        relatedId: updatedInvoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })

      setEditingInvoice(null)
    } else {
      const newInvoice: Invoice = {
        ...(formData as Invoice),
        id: invoices.length + 1,
      }
      const updatedInvoices = [...invoices, newInvoice]
      setInvoices(updatedInvoices)

      onAddNotification({
        userId: 1,
        title: "فاتورة جديدة",
        message: `تم إنشاء الفاتورة ${newInvoice.invoiceNumber} بنجاح`,
        type: "success",
        module: "invoices",
        relatedId: newInvoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })
    }

    setFormData({
      invoiceNumber: `INV-2024-${String(invoices.length + 2).padStart(3, "0")}`,
      customerName: "",
      customerId: 0,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      items: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      totalAmount: 0,
      status: "مسودة",
      paymentMethod: "نقدي",
      notes: "",
      template: "classic",
    })
    setShowAddForm(false)
  }

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const invoiceStats = {
    totalInvoices: invoices.length,
    paidInvoices: invoices.filter((i) => i.status === "مدفوعة").length,
    pendingInvoices: invoices.filter((i) => i.status === "مرسلة").length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
  }

  // Invoice Templates
  const InvoicePreview = ({ invoice, template }: { invoice: Invoice; template: string }) => {
    if (template === "premium") {
      return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg shadow-2xl max-w-4xl mx-auto text-white">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">شركة تراست للتصدير</h1>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mb-4"></div>
                <div className="space-y-1 text-gray-300 text-sm">
                  <p>📍 القاهرة، مصر</p>
                  <p>📞 +20123456789</p>
                  <p>✉️ info@trust-export.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="border-2 border-amber-400 px-6 py-4 rounded">
                  <h2 className="text-3xl font-bold mb-2">فاتورة</h2>
                  <p className="text-amber-400 text-lg font-semibold">#{invoice.invoiceNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-700">
            <div>
              <h3 className="text-amber-400 font-semibold mb-3">فاتورة إلى:</h3>
              <div className="bg-gray-800 p-4 rounded">
                <p className="font-semibold text-lg">{invoice.customerName}</p>
                <p className="text-gray-400 text-sm mt-1">العميل رقم: {invoice.customerId}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">تاريخ الإصدار:</span>
                <span className="font-semibold">{invoice.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">تاريخ الاستحقاق:</span>
                <span className="font-semibold">{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">طريقة الدفع:</span>
                <span className="font-semibold">{invoice.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-600 to-amber-700">
                  <th className="text-right p-4 rounded-tr-lg">المنتج</th>
                  <th className="text-right p-4">الوصف</th>
                  <th className="text-right p-4">الكمية</th>
                  <th className="text-right p-4">السعر</th>
                  <th className="text-right p-4 rounded-tl-lg">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}>
                    <td className="p-4 font-semibold">{item.productName}</td>
                    <td className="p-4 text-gray-400">{item.description}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-4 font-semibold text-amber-400">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-80 space-y-2 bg-gray-800 p-4 rounded">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>الخصم:</span>
                <span>-${invoice.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة:</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between text-xl font-bold text-amber-400">
                  <span>الإجمالي:</span>
                  <span>${invoice.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 p-4 bg-amber-900 bg-opacity-30 rounded border border-amber-600">
              <h4 className="font-semibold text-amber-400 mb-2">ملاحظات:</h4>
              <p className="text-gray-300">{invoice.notes}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>شكراً لتعاملكم معنا • شركة تراست للتصدير</p>
          </div>
        </div>
      )
    }

    if (template === "modern") {
      return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Modern Template */}
          <div className="border-b-4 border-gradient-to-r from-blue-500 to-purple-500 pb-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  شركة تراست للتصدير
                </h1>
                <p className="text-gray-600 mt-2">نظام المحاسبة المتكامل</p>
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p>📍 القاهرة، مصر</p>
                  <p>📞 +20123456789</p>
                  <p>✉️ info@trust-export.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg">
                  <h2 className="text-2xl font-bold">فاتورة</h2>
                  <p className="text-blue-100">#{invoice.invoiceNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">فاتورة إلى:</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">{invoice.customerName}</p>
                <p className="text-gray-600 text-sm mt-1">العميل رقم: {invoice.customerId}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الإصدار:</span>
                  <span className="font-semibold">{invoice.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الاستحقاق:</span>
                  <span className="font-semibold">{invoice.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">طريقة الدفع:</span>
                  <span className="font-semibold">{invoice.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="text-right p-4 rounded-tr-lg">المنتج</th>
                  <th className="text-right p-4">الوصف</th>
                  <th className="text-right p-4">الكمية</th>
                  <th className="text-right p-4">السعر</th>
                  <th className="text-right p-4 rounded-tl-lg">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-4 font-semibold">{item.productName}</td>
                    <td className="p-4 text-gray-600">{item.description}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">${item.unitPrice.toFixed(2)}</td>
                    <td className="p-4 font-semibold">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الخصم:</span>
                  <span>-${invoice.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة:</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-2">
                  <div className="flex justify-between text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    <span>الإجمالي:</span>
                    <span>${invoice.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ملاحظات:</h4>
              <p className="text-blue-700">{invoice.notes}</p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>شكراً لتعاملكم معنا • شركة تراست للتصدير</p>
          </div>
        </div>
      )
    }

    // Classic Template (Default)
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="border-b-2 border-gray-300 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">شركة تراست للتصدير</h1>
              <p className="text-gray-600 mt-2">نظام المحاسبة المتكامل</p>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>العنوان: القاهرة، مصر</p>
                <p>الهاتف: +20123456789</p>
                <p>البريد الإلكتروني: info@trust-export.com</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">فاتورة</h2>
              <p className="text-gray-600">رقم: {invoice.invoiceNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">فاتورة إلى:</h3>
            <p className="font-semibold">{invoice.customerName}</p>
            <p className="text-gray-600 text-sm">العميل رقم: {invoice.customerId}</p>
          </div>
          <div className="text-right">
            <div className="space-y-2">
              <p>
                <span className="text-gray-600">تاريخ الإصدار: </span>
                <span className="font-semibold">{invoice.issueDate}</span>
              </p>
              <p>
                <span className="text-gray-600">تاريخ الاستحقاق: </span>
                <span className="font-semibold">{invoice.dueDate}</span>
              </p>
              <p>
                <span className="text-gray-600">طريقة الدفع: </span>
                <span className="font-semibold">{invoice.paymentMethod}</span>
              </p>
            </div>
          </div>
        </div>

        <table className="w-full mb-8 border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-right p-3 border-b border-gray-300">المنتج</th>
              <th className="text-right p-3 border-b border-gray-300">الوصف</th>
              <th className="text-right p-3 border-b border-gray-300">الكمية</th>
              <th className="text-right p-3 border-b border-gray-300">السعر</th>
              <th className="text-right p-3 border-b border-gray-300">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="p-3 border-b border-gray-200 font-semibold">{item.productName}</td>
                <td className="p-3 border-b border-gray-200 text-gray-600">{item.description}</td>
                <td className="p-3 border-b border-gray-200">{item.quantity}</td>
                <td className="p-3 border-b border-gray-200">${item.unitPrice.toFixed(2)}</td>
                <td className="p-3 border-b border-gray-200 font-semibold">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-80">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-right p-2">المجموع الفرعي:</td>
                  <td className="text-right p-2 font-semibold">${invoice.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-right p-2">الخصم:</td>
                  <td className="text-right p-2 font-semibold">-${invoice.discount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-right p-2">الضريبة:</td>
                  <td className="text-right p-2 font-semibold">${invoice.tax.toFixed(2)}</td>
                </tr>
                <tr className="border-t-2 border-gray-300">
                  <td className="text-right p-2 text-lg font-bold">الإجمالي:</td>
                  <td className="text-right p-2 text-lg font-bold">${invoice.totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-8 p-4 bg-gray-100 rounded">
            <h4 className="font-semibold mb-2">ملاحظات:</h4>
            <p>{invoice.notes}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>شكراً لتعاملكم معنا</p>
        </div>
      </div>
    )
  }

  const handlePrint = (invoice: Invoice) => {
    try {
      window.print()
      onAddNotification({
        userId: 1,
        title: "طباعة الفاتورة",
        message: `تم فتح نافذة الطباعة للفاتورة ${invoice.invoiceNumber}`,
        type: "success",
        module: "invoices",
        relatedId: invoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })
    } catch (error) {
      console.error("[InvoiceManagement] Error printing invoice:", error)
      onAddNotification({
        userId: 1,
        title: "خطأ في الطباعة",
        message: "حدث خطأ أثناء محاولة طباعة الفاتورة",
        type: "error",
        module: "invoices",
        relatedId: invoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
    }
  }

  const handleDownloadPDF = (invoice: Invoice) => {
    try {
      const content = `
        الفاتورة: ${invoice.invoiceNumber}
        العميل: ${invoice.customerName}
        تاريخ الإصدار: ${invoice.issueDate}
        تاريخ الاستحقاق: ${invoice.dueDate}
        
        المنتجات:
        ${invoice.items.map((item) => `${item.productName} x${item.quantity} = $${item.total.toFixed(2)}`).join("\n")}
        
        المجموع الفرعي: $${invoice.subtotal.toFixed(2)}
        الخصم: $${invoice.discount.toFixed(2)}
        الضريبة: $${invoice.tax.toFixed(2)}
        الإجمالي: $${invoice.totalAmount.toFixed(2)}
        
        طريقة الدفع: ${invoice.paymentMethod}
        ${invoice.notes ? `ملاحظات: ${invoice.notes}` : ""}
      `
      
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
      element.setAttribute("download", `invoice-${invoice.invoiceNumber}.txt`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      onAddNotification({
        userId: 1,
        title: "تحميل الفاتورة",
        message: `تم تحميل الفاتورة ${invoice.invoiceNumber}`,
        type: "success",
        module: "invoices",
        relatedId: invoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })
    } catch (error) {
      console.error("[InvoiceManagement] Error downloading PDF:", error)
      onAddNotification({
        userId: 1,
        title: "خطأ في التحميل",
        message: "حدث خطأ أثناء محاولة تحميل الفاتورة",
        type: "error",
        module: "invoices",
        relatedId: invoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
    }
  }

  const handleWhatsAppShare = (invoice: Invoice) => {
    setWhatsAppInvoice(invoice)
    setShowWhatsAppDialog(true)
    setWhatsAppPhone("")
  }

  const sendWhatsAppInvoice = () => {
    if (!whatsAppInvoice || !whatsAppPhone.trim()) {
      onAddNotification({
        userId: 1,
        title: "خطأ",
        message: "يرجى إدخال رقم الهاتف",
        type: "error",
        module: "invoices",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
      return
    }

    try {
      const itemsList = whatsAppInvoice.items
        .map((item) => `• ${item.productName} x${item.quantity} = $${item.total.toFixed(2)}`)
        .join("%0A")

      const message = `*الفاتورة: ${whatsAppInvoice.invoiceNumber}*%0A%0A*العميل:* ${whatsAppInvoice.customerName}%0A*التاريخ:* ${whatsAppInvoice.issueDate}%0A%0A*المنتجات:*%0A${itemsList}%0A%0A*الإجمالي:* $${whatsAppInvoice.totalAmount.toFixed(2)}`

      const phoneNumber = whatsAppPhone.replace(/\D/g, "")
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`

      window.open(whatsappUrl, "_blank")

      onAddNotification({
        userId: 1,
        title: "إرسال عبر WhatsApp",
        message: `سيتم فتح WhatsApp Web للإرسال إلى ${whatsAppPhone}`,
        type: "success",
        module: "invoices",
        relatedId: whatsAppInvoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "medium",
      })

      setShowWhatsAppDialog(false)
      setWhatsAppPhone("")
      setWhatsAppInvoice(null)
    } catch (error) {
      console.error("[InvoiceManagement] Error sharing via WhatsApp:", error)
      onAddNotification({
        userId: 1,
        title: "خطأ في الإرسال",
        message: "حدث خطأ أثناء محاولة الإرسال عبر WhatsApp",
        type: "error",
        module: "invoices",
        relatedId: whatsAppInvoice.id,
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "high",
      })
    }
  }

  const handleExport = () => {
    onAddNotification({
      userId: 1,
      title: "تصدير البيانات",
      message: "تم تصدير بيانات الفواتير بنجاح",
      type: "success",
      module: "invoices",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "low",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الفواتير</p>
                <p className="text-3xl font-bold">{invoiceStats.totalInvoices}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">الفواتير المدفوعة</p>
                <p className="text-3xl font-bold">{invoiceStats.paidInvoices}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">الفواتير المعلقة</p>
                <p className="text-3xl font-bold">{invoiceStats.pendingInvoices}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">إجمالي المبلغ</p>
                <p className="text-3xl font-bold">${invoiceStats.totalAmount.toFixed(0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center">
            <FileText className="w-8 h-8 text-blue-600 ml-3" />
            إدارة الفواتير
          </h1>
          <p className="text-gray-600 mt-2">إنشاء وإدارة الفواتير مع قوالب جميلة ومتنوعة</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Plus className="w-4 h-4 ml-2" />
          {showAddForm ? "إلغاء" : "إنشاء فاتورة جديدة"}
        </Button>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="البحث في الفواتير برقم الفاتورة أو اسم العميل..."
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
              onClick={handleExport}
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير البيانات
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Plus className="w-6 h-6 ml-2 text-blue-600" />
              {editingInvoice ? "تعديل الفاتورة" : "إنشاء فاتورة جديدة"}
            </CardTitle>
            <CardDescription>
              {editingInvoice ? "تحديث بيانات الفاتورة" : "أدخل بيانات الفاتورة الجديدة"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="flex items-center text-sm font-medium">
                    <Hash className="w-4 h-4 ml-2" />
                    رقم الفاتورة *
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    placeholder="INV-2024-001"
                    required
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerName" className="flex items-center text-sm font-medium">
                    <User className="w-4 h-4 ml-2" />
                    اسم العميل *
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="اسم العميل"
                    required
                    dir="rtl"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template" className="flex items-center text-sm font-medium">
                    <FileText className="w-4 h-4 ml-2" />
                    قالب الفاتورة
                  </Label>
                  <Select
                    value={formData.template}
                    onValueChange={(value) => setFormData({ ...formData, template: value })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <SelectValue placeholder="اختر القالب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">كلاسيكي</SelectItem>
                      <SelectItem value="modern">عصري</SelectItem>
                      <SelectItem value="premium">بريميوم</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="flex items-center text-sm font-medium">
                    <Calendar className="w-4 h-4 ml-2" />
                    تاريخ الاستحقاق *
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="flex items-center text-sm font-medium">
                    <CreditCard className="w-4 h-4 ml-2" />
                    طريقة الدفع
                  </Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl">
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نقدي">نقدي</SelectItem>
                      <SelectItem value="آجل">آجل</SelectItem>
                      <SelectItem value="تحويل بنكي">تحويل بنكي</SelectItem>
                      <SelectItem value="شيك">شيك</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Add Items Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 ml-2" />
                  إضافة منتجات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <Input
                    placeholder="اسم المنتج"
                    value={currentItem.productName}
                    onChange={(e) => setCurrentItem({ ...currentItem, productName: e.target.value })}
                    dir="rtl"
                    className="h-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <Input
                    placeholder="الوصف"
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    dir="rtl"
                    className="h-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <Input
                    type="number"
                    placeholder="الكمية"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                    className="h-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="السعر"
                    value={currentItem.unitPrice}
                    onChange={(e) => setCurrentItem({ ...currentItem, unitPrice: Number(e.target.value) })}
                    className="h-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={addItemToInvoice}
                    className="h-10 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة
                  </Button>
                </div>

                {/* Items List */}
                {formData.items && formData.items.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-right p-3 font-semibold text-gray-700">المنتج</th>
                          <th className="text-right p-3 font-semibold text-gray-700">الوصف</th>
                          <th className="text-right p-3 font-semibold text-gray-700">الكمية</th>
                          <th className="text-right p-3 font-semibold text-gray-700">السعر</th>
                          <th className="text-right p-3 font-semibold text-gray-700">الإجمالي</th>
                          <th className="text-right p-3 font-semibold text-gray-700">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.items.map((item, index) => (
                          <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}>
                            <td className="p-3 font-semibold">{item.productName}</td>
                            <td className="p-3 text-gray-600">{item.description}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">${item.unitPrice.toFixed(2)}</td>
                            <td className="p-3 font-semibold">${item.total.toFixed(2)}</td>
                            <td className="p-3">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const updatedItems = formData.items?.filter((_, i) => i !== index) || []
                                  const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
                                  const tax = subtotal * 0.1
                                  const totalAmount = subtotal - (formData.discount || 0) + tax
                                  setFormData({
                                    ...formData,
                                    items: updatedItems,
                                    subtotal,
                                    tax,
                                    totalAmount,
                                  })
                                }}
                                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
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

              {/* Financial Summary */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="discount" className="flex items-center text-sm font-medium">
                      <Calculator className="w-4 h-4 ml-2" />
                      الخصم
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      step="0.01"
                      value={formData.discount}
                      onChange={(e) => {
                        const discount = Number(e.target.value)
                        const subtotal = formData.subtotal || 0
                        const tax = subtotal * 0.1
                        const totalAmount = subtotal - discount + tax
                        setFormData({ ...formData, discount, tax, totalAmount })
                      }}
                      placeholder="0.00"
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>المجموع الفرعي:</span>
                          <span className="font-semibold">${(formData.subtotal || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الخصم:</span>
                          <span className="font-semibold">-${(formData.discount || 0).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>الضريبة (10%):</span>
                          <span className="font-semibold">${(formData.tax || 0).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between text-lg font-bold text-blue-600">
                            <span>الإجمالي:</span>
                            <span>${(formData.totalAmount || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingInvoice(null)
                  }}
                  className="px-8 py-3 rounded-xl"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (formData.items && formData.items.length > 0) {
                      setSelectedInvoice(formData as Invoice)
                      setShowPreview(true)
                    }
                  }}
                  className="px-8 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-300"
                  disabled={!formData.items || formData.items.length === 0}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  معاينة
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {editingInvoice ? "تحديث الفاتورة" : "حفظ الفاتورة"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Invoice Preview Modal */}
      {showPreview && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">معاينة الفاتورة</h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  onClick={() => selectedInvoice && handlePrint(selectedInvoice)}
                  className="bg-green-50 hover:bg-green-100 text-green-600 border-green-300"
                >
                  <Printer className="w-4 h-4 ml-2" />
                  طباعة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  className="bg-gray-50 hover:bg-gray-100"
                >
                  <XCircle className="w-4 h-4 ml-2" />
                  إغلاق
                </Button>
              </div>
            </div>
            <div className="p-6">
              <InvoicePreview invoice={selectedInvoice} template={selectedInvoice.template || "classic"} />
            </div>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl flex items-center">
                <FileText className="w-6 h-6 ml-2 text-blue-600" />
                قائمة الفواتير
              </CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Target className="w-4 h-4 ml-2" />
                إجمالي الفواتير: {filteredInvoices.length} | مدفوعة: {invoiceStats.paidInvoices} | معلقة:{" "}
                {invoiceStats.pendingInvoices}
              </CardDescription>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Badge variant="outline" className="bg-white/80">
                <Activity className="w-3 h-3 ml-1" />
                {invoiceStats.paidInvoices} فاتورة مدفوعة
              </Badge>
              <Badge variant="outline" className="bg-white/80">
                <Clock className="w-3 h-3 ml-1" />
                {invoiceStats.pendingInvoices} فاتورة معلقة
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 font-semibold text-gray-700">رقم الفاتورة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">العميل</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ الإصدار</th>
                  <th className="text-right p-4 font-semibold text-gray-700">تاريخ الاستحقاق</th>
                  <th className="text-right p-4 font-semibold text-gray-700">المبلغ</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الحالة</th>
                  <th className="text-right p-4 font-semibold text-gray-700">طريقة الدفع</th>
                  <th className="text-right p-4 font-semibold text-gray-700">القالب</th>
                  <th className="text-right p-4 font-semibold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-blue-600">{invoice.invoiceNumber}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {invoice.customerName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{invoice.customerName}</div>
                          <div className="text-sm text-gray-500">ID: {invoice.customerId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {invoice.issueDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 ml-2 text-gray-400" />
                        {invoice.dueDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-green-600">${invoice.totalAmount.toFixed(2)}</div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          invoice.status === "مدفوعة" ? "default" : invoice.status === "مرسلة" ? "secondary" : "outline"
                        }
                        className={
                          invoice.status === "مدفوعة"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "مرسلة"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-700">
                        <CreditCard className="w-4 h-4 ml-2 text-gray-400" />
                        {invoice.paymentMethod}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {invoice.template === "modern"
                          ? "عصري"
                          : invoice.template === "premium"
                            ? "بريميوم"
                            : "كلاسيكي"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-1 rtl:space-x-reverse flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedInvoice(invoice)
                            setShowPreview(true)
                          }}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                          title="معاينة الفاتورة"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePrint(invoice)}
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 bg-transparent"
                          title="طباعة الفاتورة"
                        >
                          <Printer className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadPDF(invoice)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-transparent"
                          title="تحميل PDF"
                        >
                          <Download className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleWhatsAppShare(invoice)}
                          className="hover:bg-green-50 hover:text-green-600 hover:border-green-300 bg-transparent"
                          title="إرسال عبر WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 bg-transparent"
                          onClick={() => handleEdit(invoice)}
                          title="تعديل الفاتورة"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
                              title="حذف الفاتورة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل أنت متأكد من حذف الفاتورة "{invoice.invoiceNumber}"؟ لا يمكن التراجع عن هذا الإجراء.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(invoice.id)}
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

      <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              إرسال عبر WhatsApp Web
            </DialogTitle>
            <DialogDescription>
              أدخل رقم الهاتف لإرسال الفاتورة عبر WhatsApp Web (الويب)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                رقم الهاتف
              </Label>
              <Input
                id="whatsapp-phone"
                placeholder="+201001234567"
                value={whatsAppPhone}
                onChange={(e) => setWhatsAppPhone(e.target.value)}
                className="text-right"
                dir="rtl"
              />
              <p className="text-xs text-gray-500 text-right">
                مثال: +201001234567 أو 01001234567 أو 201001234567
              </p>
            </div>

            {whatsAppInvoice && (
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-sm font-semibold text-blue-900">معاينة الرسالة:</p>
                <div className="text-xs text-blue-700 mt-2 space-y-1">
                  <p>الفاتورة: {whatsAppInvoice.invoiceNumber}</p>
                  <p>العميل: {whatsAppInvoice.customerName}</p>
                  <p>الإجمالي: ${whatsAppInvoice.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowWhatsAppDialog(false)
                  setWhatsAppPhone("")
                }}
                className="flex-1"
              >
                إلغاء
              </Button>
              <Button
                onClick={sendWhatsAppInvoice}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4 ml-2" />
                إرسال على WhatsApp
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              ملاحظة: سيتم فتح WhatsApp Web في نافذة جديدة. تأكد من تسجيل الدخول إلى WhatsApp Web.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
