"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Building2,
  Globe,
  FileText,
  Bell,
  Shield,
  Database,
  Printer,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Lock,
  Key,
  Download,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  ImageIcon,
  Palette,
  Percent,
  Hash,
  FileCheck,
  Archive,
  HardDrive,
  Cloud,
  ArrowLeft,
  Users,
  Truck,
  Package,
  BarChart3,
  Trash2,
} from "lucide-react"
import type { Notification } from "@/types"
import { toast } from "sonner"

interface SettingsManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
  onBack?: () => void
}

interface CompanySettings {
  name: string
  nameEn: string
  logo: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  taxNumber: string
  commercialRegister: string
  website: string
  fax: string
}

interface SystemSettings {
  language: string
  currency: string
  timezone: string
  dateFormat: string
  timeFormat: string
  fiscalYearStart: string
  numberFormat: string
  decimalPlaces: number
}

interface InvoiceSettings {
  invoicePrefix: string
  invoiceStartNumber: number
  quotePrefix: string
  quoteStartNumber: number
  purchasePrefix: string
  purchaseStartNumber: number
  defaultTaxRate: number
  enableDiscount: boolean
  defaultDiscount: number
  paymentTerms: string
  notes: string
  termsAndConditions: string
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  lowStockAlert: boolean
  lowStockThreshold: number
  paymentReminder: boolean
  paymentReminderDays: number
  shipmentAlert: boolean
  expiredProductsAlert: boolean
  expirationWarningDays: number
}

interface SecuritySettings {
  passwordMinLength: number
  passwordRequireUppercase: boolean
  passwordRequireNumbers: boolean
  passwordRequireSymbols: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  twoFactorAuth: boolean
  ipWhitelist: string[]
}

interface BackupSettings {
  autoBackup: boolean
  backupFrequency: string
  backupTime: string
  backupLocation: string
  keepBackups: number
  lastBackup: string
}

interface PrintSettings {
  paperSize: string
  orientation: string
  margins: {
    top: number
    bottom: number
    left: number
    right: number
  }
  headerText: string
  footerText: string
  showLogo: boolean
  showWatermark: boolean
  watermarkText: string
}

interface CustomerSettings {
  requireName: boolean
  requireEmail: boolean
  requirePhone: boolean
  requireAddress: boolean
  autoGenerateCode: boolean
  codePrefix: string
  enableCreditLimit: boolean
  defaultCreditLimit: number
  defaultPaymentTerms: number
  categories: string[]
}

interface SupplierSettings {
  autoGenerateCode: boolean
  codePrefix: string
  categories: string[]
  defaultPaymentTerms: number
  enableRatingSystem: boolean
  minRating: number
  autoVerifySupplier: boolean
}

interface InventorySettings {
  enableStockTracking: boolean
  lowStockAlertEnabled: boolean
  lowStockThreshold: number
  defaultUnit: string
  autoGenerateSKU: boolean
  skuPrefix: string
  categories: string[]
  enableBarcodeTracking: boolean
  valuationMethod: string
}

interface ReportsSettings {
  defaultFormat: string
  enablePDFExport: boolean
  enableExcelExport: boolean
  enableCharts: boolean
  defaultDateFilter: string
  reportTemplates: string[]
  dashboardRefreshInterval: number
  enableDataVisualization: boolean
  maxRecordsPerReport: number
}

interface UserPermissionsSettings {
  enableRBAC: boolean
  enableTwoFactorAuth: boolean
  sessionTimeout: number
  maxActiveSessions: number
  auditLogging: boolean
  roles: string[]
  defaultRole: string
}

export function SettingsManagement({ onAddNotification }: SettingsManagementProps) {
  const [activeTab, setActiveTab] = useState("company")
  const [showPassword, setShowPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: "شركة تراست للتصدير",
    nameEn: "Trust Export Company",
    logo: "",
    email: "info@trust-export.com",
    phone: "+20123456789",
    address: "شارع التحرير، القاهرة",
    city: "القاهرة",
    country: "مصر",
    postalCode: "11511",
    taxNumber: "123-456-789",
    commercialRegister: "CR-2024-001",
    website: "www.trust-export.com",
    fax: "+20212345678",
  })

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    language: "ar",
    currency: "USD",
    timezone: "Africa/Cairo",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    fiscalYearStart: "01-01",
    numberFormat: "1,234.56",
    decimalPlaces: 2,
  })

  const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettings>({
    invoicePrefix: "INV",
    invoiceStartNumber: 1000,
    quotePrefix: "QT",
    quoteStartNumber: 1000,
    purchasePrefix: "PO",
    purchaseStartNumber: 1000,
    defaultTaxRate: 14,
    enableDiscount: true,
    defaultDiscount: 0,
    paymentTerms: "الدفع خلال 30 يوم من تاريخ الفاتورة",
    notes: "",
    termsAndConditions: "جميع الأسعار بالدولار الأمريكي. الدفع عند الاستلام.",
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lowStockAlert: true,
    lowStockThreshold: 50,
    paymentReminder: true,
    paymentReminderDays: 7,
    shipmentAlert: true,
    expiredProductsAlert: true,
    expirationWarningDays: 30,
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelist: [],
  })

  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    backupLocation: "local",
    keepBackups: 7,
    lastBackup: new Date().toLocaleString("ar-EG"),
  })

  const [printSettings, setPrintSettings] = useState<PrintSettings>({
    paperSize: "A4",
    orientation: "portrait",
    margins: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    },
    headerText: "شركة تراست للتصدير",
    footerText: "شكراً لتعاملكم معنا",
    showLogo: true,
    showWatermark: false,
    watermarkText: "نسخة",
  })

  const [customerSettings, setCustomerSettings] = useState<CustomerSettings>({
    requireName: true,
    requireEmail: false,
    requirePhone: true,
    requireAddress: true,
    autoGenerateCode: true,
    codePrefix: "CUST",
    enableCreditLimit: true,
    defaultCreditLimit: 10000,
    defaultPaymentTerms: 30,
    categories: ["عملاء محليين", "عملاء دوليين", "موزعين"],
  })

  const [supplierSettings, setSupplierSettings] = useState<SupplierSettings>({
    autoGenerateCode: true,
    codePrefix: "SUPP",
    categories: ["مواد خام", "خدمات", "أجهزة وتجهيزات"],
    defaultPaymentTerms: 30,
    enableRatingSystem: true,
    minRating: 3,
    autoVerifySupplier: false,
  })

  const [inventorySettings, setInventorySettings] = useState<InventorySettings>({
    enableStockTracking: true,
    lowStockAlertEnabled: true,
    lowStockThreshold: 50,
    defaultUnit: "قطعة",
    autoGenerateSKU: true,
    skuPrefix: "SKU",
    categories: ["فئة أولى", "فئة ثانية", "فئة ثالثة"],
    enableBarcodeTracking: true,
    valuationMethod: "FIFO",
  })

  const [reportsSettings, setReportsSettings] = useState<ReportsSettings>({
    defaultFormat: "pdf",
    enablePDFExport: true,
    enableExcelExport: true,
    enableCharts: true,
    defaultDateFilter: "month",
    reportTemplates: ["المبيعات", "المشتريات", "المخزون", "الموارد البشرية"],
    dashboardRefreshInterval: 30,
    enableDataVisualization: true,
    maxRecordsPerReport: 10000,
  })

  const [userPermissionsSettings, setUserPermissionsSettings] = useState<UserPermissionsSettings>({
    enableRBAC: true,
    enableTwoFactorAuth: false,
    sessionTimeout: 60,
    maxActiveSessions: 3,
    auditLogging: true,
    roles: ["مسؤول", "محاسب", "مدير", "موظف"],
    defaultRole: "موظف",
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = () => {
    const saved = {
      company: localStorage.getItem("companySettings"),
      system: localStorage.getItem("systemSettings"),
      invoice: localStorage.getItem("invoiceSettings"),
      notification: localStorage.getItem("notificationSettings"),
      security: localStorage.getItem("securitySettings"),
      backup: localStorage.getItem("backupSettings"),
      print: localStorage.getItem("printSettings"),
      customer: localStorage.getItem("customerSettings"),
      supplier: localStorage.getItem("supplierSettings"),
      inventory: localStorage.getItem("inventorySettings"),
      reports: localStorage.getItem("reportsSettings"),
      userPermissions: localStorage.getItem("userPermissionsSettings"),
    }

    if (saved.company) setCompanySettings(JSON.parse(saved.company))
    if (saved.system) setSystemSettings(JSON.parse(saved.system))
    if (saved.invoice) setInvoiceSettings(JSON.parse(saved.invoice))
    if (saved.notification) setNotificationSettings(JSON.parse(saved.notification))
    if (saved.security) setSecuritySettings(JSON.parse(saved.security))
    if (saved.backup) setBackupSettings(JSON.parse(saved.backup))
    if (saved.print) setPrintSettings(JSON.parse(saved.print))
    if (saved.customer) setCustomerSettings(JSON.parse(saved.customer))
    if (saved.supplier) setSupplierSettings(JSON.parse(saved.supplier))
    if (saved.inventory) setInventorySettings(JSON.parse(saved.inventory))
    if (saved.reports) setReportsSettings(JSON.parse(saved.reports))
    if (saved.userPermissions) setUserPermissionsSettings(JSON.parse(saved.userPermissions))
  }

  const saveSettings = async () => {
    setIsSaving(true)

    try {
      localStorage.setItem("companySettings", JSON.stringify(companySettings))
      localStorage.setItem("systemSettings", JSON.stringify(systemSettings))
      localStorage.setItem("invoiceSettings", JSON.stringify(invoiceSettings))
      localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
      localStorage.setItem("securitySettings", JSON.stringify(securitySettings))
      localStorage.setItem("backupSettings", JSON.stringify(backupSettings))
      localStorage.setItem("printSettings", JSON.stringify(printSettings))
      localStorage.setItem("customerSettings", JSON.stringify(customerSettings))
      localStorage.setItem("supplierSettings", JSON.stringify(supplierSettings))
      localStorage.setItem("inventorySettings", JSON.stringify(inventorySettings))
      localStorage.setItem("reportsSettings", JSON.stringify(reportsSettings))
      localStorage.setItem("userPermissionsSettings", JSON.stringify(userPermissionsSettings))

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("تم حفظ الإعدادات بنجاح")

      onAddNotification({
        userId: 1,
        title: "تحديث الإعدادات",
        message: "تم حفظ إعدادات النظام بنجاح",
        type: "success",
        module: "settings",
        timestamp: new Date().toLocaleString("ar-EG"),
        isRead: false,
        priority: "low",
      })
    } catch (error) {
      toast.error("حدث خطأ أثناء حفظ الإعدادات")
    } finally {
      setIsSaving(false)
    }
  }

  const handleBackup = () => {
    const allData = {
      company: companySettings,
      system: systemSettings,
      invoice: invoiceSettings,
      notification: notificationSettings,
      security: securitySettings,
      backup: backupSettings,
      print: printSettings,
      customers: localStorage.getItem("customers"),
      suppliers: localStorage.getItem("suppliers"),
      products: localStorage.getItem("products"),
      sales: localStorage.getItem("sales"),
      purchases: localStorage.getItem("purchases"),
    }

    const dataStr = JSON.stringify(allData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `backup-${new Date().toISOString().split("T")[0]}.json`
    link.click()

    setBackupSettings({ ...backupSettings, lastBackup: new Date().toLocaleString("ar-EG") })
    toast.success("تم إنشاء نسخة احتياطية بنجاح")

    onAddNotification({
      userId: 1,
      title: "نسخة احتياطية",
      message: "تم إنشاء نسخة احتياطية من البيانات",
      type: "success",
      module: "settings",
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
            <Settings className="w-8 h-8 text-purple-600 ml-3" />
            إعدادات النظام
          </h1>
          <p className="text-gray-600 mt-2">إدارة وتخصيص إعدادات البرنامج</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button
            onClick={handleBackup}
            variant="outline"
            className="bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
          >
            <Download className="w-4 h-4 ml-2" />
            نسخة احتياطية
          </Button>
          <Button
            onClick={saveSettings}
            disabled={isSaving}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                حفظ جميع الإعدادات
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 bg-gray-100 p-2 rounded-xl overflow-x-auto">
          <TabsTrigger value="company" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Building2 className="w-4 h-4 ml-1" />
            الشركة
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Globe className="w-4 h-4 ml-1" />
            النظام
          </TabsTrigger>
          <TabsTrigger value="invoice" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <FileText className="w-4 h-4 ml-1" />
            الفواتير
          </TabsTrigger>
          <TabsTrigger value="customer" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Users className="w-4 h-4 ml-1" />
            العملاء
          </TabsTrigger>
          <TabsTrigger value="supplier" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Truck className="w-4 h-4 ml-1" />
            الموردين
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Package className="w-4 h-4 ml-1" />
            المخزون
          </TabsTrigger>
          <TabsTrigger value="notification" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Bell className="w-4 h-4 ml-1" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Shield className="w-4 h-4 ml-1" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="backup" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Database className="w-4 h-4 ml-1" />
            النسخ
          </TabsTrigger>
          <TabsTrigger value="print" className="data-[state=active]:bg-white data-[state=active]:shadow-md text-xs md:text-sm">
            <Printer className="w-4 h-4 ml-1" />
            الطباعة
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Building2 className="w-6 h-6 ml-2 text-purple-600" />
                معلومات الشركة
              </CardTitle>
              <CardDescription>البيانات الأساسية للشركة والتواصل</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">اسم الشركة بالعربية *</Label>
                  <Input
                    id="companyName"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({ ...companySettings, name: e.target.value })}
                    className="h-12 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyNameEn">اسم الشركة بالإنجليزية *</Label>
                  <Input
                    id="companyNameEn"
                    value={companySettings.nameEn}
                    onChange={(e) => setCompanySettings({ ...companySettings, nameEn: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="logo" className="flex items-center">
                    <ImageIcon className="w-4 h-4 ml-2" />
                    شعار الشركة
                  </Label>
                  <div className="flex flex-col gap-4">
                    {companySettings.logo && (
                      <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                        <img
                          src={companySettings.logo}
                          alt="Company logo"
                          className="w-full h-full object-contain p-2"
                        />
                        <button
                          type="button"
                          onClick={() => setCompanySettings({ ...companySettings, logo: "" })}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const result = event.target?.result as string
                            setCompanySettings({ ...companySettings, logo: result })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-xl file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        cursor-pointer"
                    />
                    <p className="text-xs text-gray-500">صيغ مدعومة: PNG, JPG, SVG (الحد الأقصى 5 MB)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 ml-2" />
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 ml-2" />
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">الدولة *</Label>
                  <Input
                    id="country"
                    value={companySettings.country}
                    onChange={(e) => setCompanySettings({ ...companySettings, country: e.target.value })}
                    className="h-12 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center">
                    <MapPin className="w-4 h-4 ml-2" />
                    المدينة *
                  </Label>
                  <Input
                    id="city"
                    value={companySettings.city}
                    onChange={(e) => setCompanySettings({ ...companySettings, city: e.target.value })}
                    className="h-12 rounded-xl"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">الرمز البريدي</Label>
                  <Input
                    id="postalCode"
                    value={companySettings.postalCode}
                    onChange={(e) => setCompanySettings({ ...companySettings, postalCode: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxNumber" className="flex items-center">
                    <Hash className="w-4 h-4 ml-2" />
                    الرقم الضريبي
                  </Label>
                  <Input
                    id="taxNumber"
                    value={companySettings.taxNumber}
                    onChange={(e) => setCompanySettings({ ...companySettings, taxNumber: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commercialRegister" className="flex items-center">
                    <FileCheck className="w-4 h-4 ml-2" />
                    السجل التجاري
                  </Label>
                  <Input
                    id="commercialRegister"
                    value={companySettings.commercialRegister}
                    onChange={(e) => setCompanySettings({ ...companySettings, commercialRegister: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input
                    id="website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({ ...companySettings, website: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">العنوان التفصيلي *</Label>
                  <Textarea
                    id="address"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    className="rounded-xl"
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Globe className="w-6 h-6 ml-2 text-blue-600" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>تخصيص اللغة والعملة والتنسيقات</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">اللغة الافتراضية</Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="flex items-center">
                    <DollarSign className="w-4 h-4 ml-2" />
                    العملة الافتراضية
                  </Label>
                  <Select
                    value={systemSettings.currency}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, currency: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - دولار أمريكي</SelectItem>
                      <SelectItem value="EUR">EUR - يورو</SelectItem>
                      <SelectItem value="EGP">EGP - جنيه مصري</SelectItem>
                      <SelectItem value="SAR">SAR - ريال سعودي</SelectItem>
                      <SelectItem value="AED">AED - درهم إماراتي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="flex items-center">
                    <Clock className="w-4 h-4 ml-2" />
                    المنطقة الزمنية
                  </Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Cairo">القاهرة (GMT+2)</SelectItem>
                      <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat" className="flex items-center">
                    <Calendar className="w-4 h-4 ml-2" />
                    تنسيق التاريخ
                  </Label>
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFormat">تنسيق الوقت</Label>
                  <Select
                    value={systemSettings.timeFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timeFormat: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 ساعة</SelectItem>
                      <SelectItem value="24h">24 ساعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscalYear">بداية السنة المالية</Label>
                  <Input
                    id="fiscalYear"
                    type="text"
                    value={systemSettings.fiscalYearStart}
                    onChange={(e) => setSystemSettings({ ...systemSettings, fiscalYearStart: e.target.value })}
                    placeholder="01-01"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberFormat">تنسيق الأرقام</Label>
                  <Select
                    value={systemSettings.numberFormat}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, numberFormat: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1,234.56">1,234.56</SelectItem>
                      <SelectItem value="1.234,56">1.234,56</SelectItem>
                      <SelectItem value="1 234.56">1 234.56</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="decimalPlaces">عدد المنازل العشرية</Label>
                  <Input
                    id="decimalPlaces"
                    type="number"
                    min="0"
                    max="4"
                    value={systemSettings.decimalPlaces}
                    onChange={(e) => setSystemSettings({ ...systemSettings, decimalPlaces: Number(e.target.value) })}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoice Settings */}
        <TabsContent value="invoice" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <FileText className="w-6 h-6 ml-2 text-green-600" />
                إعدادات الفواتير
              </CardTitle>
              <CardDescription>تخصيص أرقام الفواتير والضرائب والخصومات</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">بادئة رقم الفاتورة</Label>
                    <Input
                      id="invoicePrefix"
                      value={invoiceSettings.invoicePrefix}
                      onChange={(e) => setInvoiceSettings({ ...invoiceSettings, invoicePrefix: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoiceStart">رقم الفاتورة الابتدائي</Label>
                    <Input
                      id="invoiceStart"
                      type="number"
                      value={invoiceSettings.invoiceStartNumber}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, invoiceStartNumber: Number(e.target.value) })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quotePrefix">بادئة رقم عرض السعر</Label>
                    <Input
                      id="quotePrefix"
                      value={invoiceSettings.quotePrefix}
                      onChange={(e) => setInvoiceSettings({ ...invoiceSettings, quotePrefix: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quoteStart">رقم عرض السعر الابتدائي</Label>
                    <Input
                      id="quoteStart"
                      type="number"
                      value={invoiceSettings.quoteStartNumber}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, quoteStartNumber: Number(e.target.value) })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchasePrefix">بادئة رقم أمر الشراء</Label>
                    <Input
                      id="purchasePrefix"
                      value={invoiceSettings.purchasePrefix}
                      onChange={(e) => setInvoiceSettings({ ...invoiceSettings, purchasePrefix: e.target.value })}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purchaseStart">رقم أمر الشراء الابتدائي</Label>
                    <Input
                      id="purchaseStart"
                      type="number"
                      value={invoiceSettings.purchaseStartNumber}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, purchaseStartNumber: Number(e.target.value) })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate" className="flex items-center">
                      <Percent className="w-4 h-4 ml-2" />
                      نسبة الضريبة الافتراضية (%)
                    </Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      value={invoiceSettings.defaultTaxRate}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, defaultTaxRate: Number(e.target.value) })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">الخصم الافتراضي (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={invoiceSettings.defaultDiscount}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, defaultDiscount: Number(e.target.value) })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Info className="w-5 h-5 text-blue-600" />
                    <div>
                      <Label htmlFor="enableDiscount" className="text-base font-medium">
                        تفعيل الخصومات
                      </Label>
                      <p className="text-sm text-gray-500">السماح بإضافة خصومات على الفواتير</p>
                    </div>
                  </div>
                  <Switch
                    id="enableDiscount"
                    checked={invoiceSettings.enableDiscount}
                    onCheckedChange={(checked) => setInvoiceSettings({ ...invoiceSettings, enableDiscount: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">شروط الدفع</Label>
                  <Textarea
                    id="paymentTerms"
                    value={invoiceSettings.paymentTerms}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, paymentTerms: e.target.value })}
                    className="rounded-xl"
                    rows={2}
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">الشروط والأحكام</Label>
                  <Textarea
                    id="terms"
                    value={invoiceSettings.termsAndConditions}
                    onChange={(e) => setInvoiceSettings({ ...invoiceSettings, termsAndConditions: e.target.value })}
                    className="rounded-xl"
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notification" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Bell className="w-6 h-6 ml-2 text-yellow-600" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>تخصيص التنبيهات والإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <Label className="text-base font-medium">إشعارات البريد الإلكتروني</Label>
                      <p className="text-sm text-gray-500">استقبال الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium">إشعارات الرسائل النصية</Label>
                      <p className="text-sm text-gray-500">استقبال الإشعارات عبر الرسائل النصية</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <div>
                      <Label className="text-base font-medium">الإشعارات الفورية</Label>
                      <p className="text-sm text-gray-500">استقبال إشعارات فورية داخل التطبيق</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 ml-2 text-orange-600" />
                    التنبيهات التلقائية
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label className="text-base font-medium">تنبيه نقص المخزون</Label>
                        <p className="text-sm text-gray-500">تنبيه عند انخفاض المخزون عن الحد المحدد</p>
                        {notificationSettings.lowStockAlert && (
                          <div className="mt-2">
                            <Input
                              type="number"
                              min="0"
                              value={notificationSettings.lowStockThreshold}
                              onChange={(e) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  lowStockThreshold: Number(e.target.value),
                                })
                              }
                              className="w-32 h-10"
                              placeholder="الحد الأدنى"
                            />
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={notificationSettings.lowStockAlert}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, lowStockAlert: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label className="text-base font-medium">تذكير المدفوعات</Label>
                        <p className="text-sm text-gray-500">تذكير بالمستحقات قبل موعد الاستحقاق</p>
                        {notificationSettings.paymentReminder && (
                          <div className="mt-2">
                            <Input
                              type="number"
                              min="1"
                              value={notificationSettings.paymentReminderDays}
                              onChange={(e) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  paymentReminderDays: Number(e.target.value),
                                })
                              }
                              className="w-32 h-10"
                              placeholder="عدد الأيام"
                            />
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={notificationSettings.paymentReminder}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, paymentReminder: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label className="text-base font-medium">تنبيه الشحنات</Label>
                        <p className="text-sm text-gray-500">إشعار عند تحديث حالة الشحنة</p>
                      </div>
                      <Switch
                        checked={notificationSettings.shipmentAlert}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, shipmentAlert: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <Label className="text-base font-medium">تنبيه صلاحية المنتجات</Label>
                        <p className="text-sm text-gray-500">تحذير من المنتجات القريبة من انتهاء الصلاحية</p>
                        {notificationSettings.expiredProductsAlert && (
                          <div className="mt-2">
                            <Input
                              type="number"
                              min="1"
                              value={notificationSettings.expirationWarningDays}
                              onChange={(e) =>
                                setNotificationSettings({
                                  ...notificationSettings,
                                  expirationWarningDays: Number(e.target.value),
                                })
                              }
                              className="w-32 h-10"
                              placeholder="عدد الأيام"
                            />
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={notificationSettings.expiredProductsAlert}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, expiredProductsAlert: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Shield className="w-6 h-6 ml-2 text-red-600" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription>تأمين الحساب وحماية البيانات</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Lock className="w-5 h-5 ml-2 text-red-600" />
                    سياسة كلمات المرور
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="passLength">الحد الأدنى لطول كلمة المرور</Label>
                      <Input
                        id="passLength"
                        type="number"
                        min="6"
                        max="20"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, passwordMinLength: Number(e.target.value) })
                        }
                        className="h-12 rounded-xl w-32"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <Label>يجب أن تحتوي على أحرف كبيرة (A-Z)</Label>
                      <Switch
                        checked={securitySettings.passwordRequireUppercase}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, passwordRequireUppercase: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <Label>يجب أن تحتوي على أرقام (0-9)</Label>
                      <Switch
                        checked={securitySettings.passwordRequireNumbers}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, passwordRequireNumbers: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <Label>يجب أن تحتوي على رموز خاصة (!@#$%)</Label>
                      <Switch
                        checked={securitySettings.passwordRequireSymbols}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, passwordRequireSymbols: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Key className="w-5 h-5 ml-2 text-red-600" />
                    إعدادات الجلسة
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (دقيقة)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        min="5"
                        max="120"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })
                        }
                        className="h-12 rounded-xl w-32"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                      <Input
                        id="maxAttempts"
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number(e.target.value) })
                        }
                        className="h-12 rounded-xl w-32"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div>
                        <Label className="text-base font-medium">المصادقة الثنائية (2FA)</Label>
                        <p className="text-sm text-gray-500">طبقة أمان إضافية لحماية حسابك</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Database className="w-6 h-6 ml-2 text-indigo-600" />
                إعدادات النسخ الاحتياطي
              </CardTitle>
              <CardDescription>حماية بياناتك من خلال النسخ الاحتياطي التلقائي</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div>
                    <Label className="text-base font-medium flex items-center">
                      <CheckCircle className="w-5 h-5 ml-2 text-green-600" />
                      النسخ الاحتياطي التلقائي
                    </Label>
                    <p className="text-sm text-gray-500">إنشاء نسخ احتياطية تلقائية حسب الجدول المحدد</p>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="frequency" className="flex items-center">
                      <Clock className="w-4 h-4 ml-2" />
                      تكرار النسخ الاحتياطي
                    </Label>
                    <Select
                      value={backupSettings.backupFrequency}
                      onValueChange={(value) => setBackupSettings({ ...backupSettings, backupFrequency: value })}
                      disabled={!backupSettings.autoBackup}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومياً</SelectItem>
                        <SelectItem value="weekly">أسبوعياً</SelectItem>
                        <SelectItem value="monthly">شهرياً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backupTime">وقت النسخ الاحتياطي</Label>
                    <Input
                      id="backupTime"
                      type="time"
                      value={backupSettings.backupTime}
                      onChange={(e) => setBackupSettings({ ...backupSettings, backupTime: e.target.value })}
                      className="h-12 rounded-xl"
                      disabled={!backupSettings.autoBackup}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center">
                      <HardDrive className="w-4 h-4 ml-2" />
                      موقع التخزين
                    </Label>
                    <Select
                      value={backupSettings.backupLocation}
                      onValueChange={(value) => setBackupSettings({ ...backupSettings, backupLocation: value })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">
                          <div className="flex items-center">
                            <HardDrive className="w-4 h-4 ml-2" />
                            التخزين المحلي
                          </div>
                        </SelectItem>
                        <SelectItem value="cloud">
                          <div className="flex items-center">
                            <Cloud className="w-4 h-4 ml-2" />
                            التخزين السحابي
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keepBackups" className="flex items-center">
                      <Archive className="w-4 h-4 ml-2" />
                      عدد النسخ المحفوظة
                    </Label>
                    <Input
                      id="keepBackups"
                      type="number"
                      min="1"
                      max="30"
                      value={backupSettings.keepBackups}
                      onChange={(e) => setBackupSettings({ ...backupSettings, keepBackups: Number(e.target.value) })}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <Label className="text-base font-medium">آخر نسخة احتياطية</Label>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 ml-2" />
                        {backupSettings.lastBackup}
                      </p>
                    </div>
                    <Button
                      onClick={handleBackup}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    >
                      <Download className="w-4 h-4 ml-2" />
                      نسخة احتياطية الآن
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">ملاحظة هامة</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        يُنصح بإنشاء نسخة احتياطية بشكل دوري لحماية بياناتك. يتم تخزين النسخ الاحتياطية في موقع آمن ويمكن
                        استرجاعها عند الحاجة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Print Settings */}
        <TabsContent value="print" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Printer className="w-6 h-6 ml-2 text-gray-600" />
                إعدادات الطباعة
              </CardTitle>
              <CardDescription>تخصيص إعدادات الطباعة للفواتير والتقارير</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="paperSize">حجم الورق</Label>
                    <Select
                      value={printSettings.paperSize}
                      onValueChange={(value) => setPrintSettings({ ...printSettings, paperSize: value })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A4">A4</SelectItem>
                        <SelectItem value="A5">A5</SelectItem>
                        <SelectItem value="Letter">Letter</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orientation">اتجاه الورق</Label>
                    <Select
                      value={printSettings.orientation}
                      onValueChange={(value) => setPrintSettings({ ...printSettings, orientation: value })}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">عمودي (Portrait)</SelectItem>
                        <SelectItem value="landscape">أفقي (Landscape)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">الهوامش (مم)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marginTop">الأعلى</Label>
                      <Input
                        id="marginTop"
                        type="number"
                        min="0"
                        value={printSettings.margins.top}
                        onChange={(e) =>
                          setPrintSettings({
                            ...printSettings,
                            margins: { ...printSettings.margins, top: Number(e.target.value) },
                          })
                        }
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginBottom">الأسفل</Label>
                      <Input
                        id="marginBottom"
                        type="number"
                        min="0"
                        value={printSettings.margins.bottom}
                        onChange={(e) =>
                          setPrintSettings({
                            ...printSettings,
                            margins: { ...printSettings.margins, bottom: Number(e.target.value) },
                          })
                        }
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginLeft">اليسار</Label>
                      <Input
                        id="marginLeft"
                        type="number"
                        min="0"
                        value={printSettings.margins.left}
                        onChange={(e) =>
                          setPrintSettings({
                            ...printSettings,
                            margins: { ...printSettings.margins, left: Number(e.target.value) },
                          })
                        }
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="marginRight">اليمين</Label>
                      <Input
                        id="marginRight"
                        type="number"
                        min="0"
                        value={printSettings.margins.right}
                        onChange={(e) =>
                          setPrintSettings({
                            ...printSettings,
                            margins: { ...printSettings.margins, right: Number(e.target.value) },
                          })
                        }
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headerText">نص الرأس</Label>
                    <Input
                      id="headerText"
                      value={printSettings.headerText}
                      onChange={(e) => setPrintSettings({ ...printSettings, headerText: e.target.value })}
                      className="h-12 rounded-xl"
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footerText">نص التذييل</Label>
                    <Input
                      id="footerText"
                      value={printSettings.footerText}
                      onChange={(e) => setPrintSettings({ ...printSettings, footerText: e.target.value })}
                      className="h-12 rounded-xl"
                      dir="rtl"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <ImageIcon className="w-5 h-5 text-gray-600" />
                      <Label>إظهار الشعار</Label>
                    </div>
                    <Switch
                      checked={printSettings.showLogo}
                      onCheckedChange={(checked) => setPrintSettings({ ...printSettings, showLogo: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Palette className="w-5 h-5 text-gray-600" />
                      <Label>إظهار العلامة المائية</Label>
                    </div>
                    <Switch
                      checked={printSettings.showWatermark}
                      onCheckedChange={(checked) => setPrintSettings({ ...printSettings, showWatermark: checked })}
                    />
                  </div>

                  {printSettings.showWatermark && (
                    <div className="space-y-2">
                      <Label htmlFor="watermarkText">نص العلامة المائية</Label>
                      <Input
                        id="watermarkText"
                        value={printSettings.watermarkText}
                        onChange={(e) => setPrintSettings({ ...printSettings, watermarkText: e.target.value })}
                        className="h-12 rounded-xl"
                        dir="rtl"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Management Settings */}
        <TabsContent value="customer" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Users className="w-6 h-6 ml-2 text-blue-600" />
                إعدادات إدارة العملاء
              </CardTitle>
              <CardDescription>تكوين حقول وسلوك بيانات العملاء</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>اسم العميل مطلوب</Label>
                  <Switch
                    checked={customerSettings.requireName}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, requireName: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>البريد الإلكتروني مطلوب</Label>
                  <Switch
                    checked={customerSettings.requireEmail}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, requireEmail: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>رقم الهاتف مطلوب</Label>
                  <Switch
                    checked={customerSettings.requirePhone}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, requirePhone: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>العنوان مطلوب</Label>
                  <Switch
                    checked={customerSettings.requireAddress}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, requireAddress: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>توليد رمز العميل تلقائياً</Label>
                  <Switch
                    checked={customerSettings.autoGenerateCode}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, autoGenerateCode: checked })
                    }
                  />
                </div>
                {customerSettings.autoGenerateCode && (
                  <div className="space-y-2">
                    <Label htmlFor="codePrefix">بادئة الرمز</Label>
                    <Input
                      id="codePrefix"
                      value={customerSettings.codePrefix}
                      onChange={(e) =>
                        setCustomerSettings({ ...customerSettings, codePrefix: e.target.value })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>تفعيل حد الائتمان</Label>
                  <Switch
                    checked={customerSettings.enableCreditLimit}
                    onCheckedChange={(checked) =>
                      setCustomerSettings({ ...customerSettings, enableCreditLimit: checked })
                    }
                  />
                </div>
                {customerSettings.enableCreditLimit && (
                  <div className="space-y-2">
                    <Label htmlFor="defaultCreditLimit">حد الائتمان الافتراضي</Label>
                    <Input
                      id="defaultCreditLimit"
                      type="number"
                      value={customerSettings.defaultCreditLimit}
                      onChange={(e) =>
                        setCustomerSettings({
                          ...customerSettings,
                          defaultCreditLimit: Number(e.target.value),
                        })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="defaultPaymentTerms">شروط الدفع الافتراضية (أيام)</Label>
                  <Input
                    id="defaultPaymentTerms"
                    type="number"
                    value={customerSettings.defaultPaymentTerms}
                    onChange={(e) =>
                      setCustomerSettings({
                        ...customerSettings,
                        defaultPaymentTerms: Number(e.target.value),
                      })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Supplier Management Settings */}
        <TabsContent value="supplier" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Truck className="w-6 h-6 ml-2 text-orange-600" />
                إعدادات إدارة الموردين
              </CardTitle>
              <CardDescription>تكوين معايير وتصنيفات الموردين</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>توليد رمز المورد تلقائياً</Label>
                  <Switch
                    checked={supplierSettings.autoGenerateCode}
                    onCheckedChange={(checked) =>
                      setSupplierSettings({ ...supplierSettings, autoGenerateCode: checked })
                    }
                  />
                </div>
                {supplierSettings.autoGenerateCode && (
                  <div className="space-y-2">
                    <Label htmlFor="supplierCodePrefix">بادئة الرمز</Label>
                    <Input
                      id="supplierCodePrefix"
                      value={supplierSettings.codePrefix}
                      onChange={(e) =>
                        setSupplierSettings({ ...supplierSettings, codePrefix: e.target.value })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="supplierPaymentTerms">شروط الدفع الافتراضية (أيام)</Label>
                  <Input
                    id="supplierPaymentTerms"
                    type="number"
                    value={supplierSettings.defaultPaymentTerms}
                    onChange={(e) =>
                      setSupplierSettings({
                        ...supplierSettings,
                        defaultPaymentTerms: Number(e.target.value),
                      })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>تفعيل نظام التقييم</Label>
                  <Switch
                    checked={supplierSettings.enableRatingSystem}
                    onCheckedChange={(checked) =>
                      setSupplierSettings({ ...supplierSettings, enableRatingSystem: checked })
                    }
                  />
                </div>
                {supplierSettings.enableRatingSystem && (
                  <div className="space-y-2">
                    <Label htmlFor="minRating">الحد الأدنى للتقييم</Label>
                    <Input
                      id="minRating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.5"
                      value={supplierSettings.minRating}
                      onChange={(e) =>
                        setSupplierSettings({
                          ...supplierSettings,
                          minRating: Number(e.target.value),
                        })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Management Settings */}
        <TabsContent value="inventory" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Package className="w-6 h-6 ml-2 text-green-600" />
                إعدادات إدارة المخزون
              </CardTitle>
              <CardDescription>تكوين المخزون والتتبع والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>تفعيل تتبع المخزون</Label>
                  <Switch
                    checked={inventorySettings.enableStockTracking}
                    onCheckedChange={(checked) =>
                      setInventorySettings({ ...inventorySettings, enableStockTracking: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>تنبيه المخزون المنخفض</Label>
                  <Switch
                    checked={inventorySettings.lowStockAlertEnabled}
                    onCheckedChange={(checked) =>
                      setInventorySettings({
                        ...inventorySettings,
                        lowStockAlertEnabled: checked,
                      })
                    }
                  />
                </div>
                {inventorySettings.lowStockAlertEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">عتبة المخزون المنخفض</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={inventorySettings.lowStockThreshold}
                      onChange={(e) =>
                        setInventorySettings({
                          ...inventorySettings,
                          lowStockThreshold: Number(e.target.value),
                        })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="defaultUnit">وحدة القياس الافتراضية</Label>
                  <Input
                    id="defaultUnit"
                    value={inventorySettings.defaultUnit}
                    onChange={(e) =>
                      setInventorySettings({ ...inventorySettings, defaultUnit: e.target.value })
                    }
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>توليد SKU تلقائياً</Label>
                  <Switch
                    checked={inventorySettings.autoGenerateSKU}
                    onCheckedChange={(checked) =>
                      setInventorySettings({ ...inventorySettings, autoGenerateSKU: checked })
                    }
                  />
                </div>
                {inventorySettings.autoGenerateSKU && (
                  <div className="space-y-2">
                    <Label htmlFor="skuPrefix">بادئة SKU</Label>
                    <Input
                      id="skuPrefix"
                      value={inventorySettings.skuPrefix}
                      onChange={(e) =>
                        setInventorySettings({
                          ...inventorySettings,
                          skuPrefix: e.target.value,
                        })
                      }
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <Label>تفعيل تتبع الباركود</Label>
                  <Switch
                    checked={inventorySettings.enableBarcodeTracking}
                    onCheckedChange={(checked) =>
                      setInventorySettings({
                        ...inventorySettings,
                        enableBarcodeTracking: checked,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuationMethod">طريقة التقييم</Label>
                  <Select value={inventorySettings.valuationMethod} onValueChange={(value) =>
                    setInventorySettings({ ...inventorySettings, valuationMethod: value })
                  }>
                    <SelectTrigger id="valuationMethod" className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIFO">FIFO (أول داخل، أول خارج)</SelectItem>
                      <SelectItem value="LIFO">LIFO (آخر داخل، أول خارج)</SelectItem>
                      <SelectItem value="Average">المتوسط الموزون</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  )
}
