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
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Save,
  XCircle,
  Activity,
} from "lucide-react"
import type { BankAccount, BankTransaction, Notification } from "@/types"

interface BankManagementProps {
  onAddNotification: (notification: Omit<Notification, "id">) => void
}

export function BankManagement({ onAddNotification }: BankManagementProps) {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [transactions, setTransactions] = useState<BankTransaction[]>([])
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [accountFormData, setAccountFormData] = useState<Partial<BankAccount>>({
    bankName: "",
    accountNumber: "",
    accountType: "جاري",
    balance: 0,
    currency: "USD",
    manager: "",
    openDate: new Date().toISOString().split("T")[0],
    status: "نشط",
    branch: "",
    iban: "",
    swiftCode: "",
    creditLimit: 0,
  })
  const [transactionFormData, setTransactionFormData] = useState<Partial<BankTransaction>>({
    accountId: 0,
    transactionNumber: "",
    date: new Date().toISOString().split("T")[0],
    type: "deposit",
    category: "",
    description: "",
    amount: 0,
    reference: "",
    status: "مكتمل",
  })

  useEffect(() => {
    const savedAccounts = localStorage.getItem("bankAccounts")
    const savedTransactions = localStorage.getItem("bankTransactions")

    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts))
    } else {
      const demoAccounts: BankAccount[] = [
        {
          id: 1,
          bankName: "البنك الأهلي المصري",
          accountNumber: "1234567890",
          accountType: "جاري",
          balance: 250000,
          currency: "USD",
          manager: "أحمد محمود",
          openDate: "2023-01-15",
          status: "نشط",
          branch: "فرع المعادي",
          iban: "EG380001234567890123456789012",
          swiftCode: "NBEGEGCX",
          creditLimit: 50000,
        },
        {
          id: 2,
          bankName: "بنك مصر",
          accountNumber: "9876543210",
          accountType: "توفير",
          balance: 150000,
          currency: "USD",
          manager: "فاطمة أحمد",
          openDate: "2023-03-20",
          status: "نشط",
          branch: "فرع وسط البلد",
          iban: "EG380002987654321098765432109",
          swiftCode: "BMISEGCX",
          creditLimit: 0,
        },
      ]
      setAccounts(demoAccounts)
      localStorage.setItem("bankAccounts", JSON.stringify(demoAccounts))
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      const demoTransactions: BankTransaction[] = [
        {
          id: 1,
          accountId: 1,
          transactionNumber: "TRX-2024-001",
          date: "2024-01-15",
          type: "deposit",
          category: "إيداع مبيعات",
          description: "إيداع مبلغ مبيعات الشهر",
          amount: 50000,
          balanceAfter: 250000,
          reference: "SAL-2024-001",
          relatedModule: "sales",
          relatedId: 1,
          status: "مكتمل",
        },
        {
          id: 2,
          accountId: 1,
          transactionNumber: "TRX-2024-002",
          date: "2024-01-16",
          type: "withdrawal",
          category: "دفع للموردين",
          description: "دفعة لمزرعة الوادي الأخضر",
          amount: 20000,
          balanceAfter: 230000,
          reference: "PUR-2024-001",
          relatedModule: "purchases",
          relatedId: 1,
          status: "مكتمل",
        },
      ]
      setTransactions(demoTransactions)
      localStorage.setItem("bankTransactions", JSON.stringify(demoTransactions))
    }
  }, [])

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault()
    const newAccount: BankAccount = {
      ...(accountFormData as BankAccount),
      id: accounts.length + 1,
    }
    const updatedAccounts = [...accounts, newAccount]
    setAccounts(updatedAccounts)
    localStorage.setItem("bankAccounts", JSON.stringify(updatedAccounts))

    onAddNotification({
      userId: 1,
      title: "حساب بنكي جديد",
      message: `تم إضافة حساب ${newAccount.bankName} بنجاح`,
      type: "success",
      module: "banks",
      relatedId: newAccount.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setAccountFormData({
      bankName: "",
      accountNumber: "",
      accountType: "جاري",
      balance: 0,
      currency: "USD",
      manager: "",
      openDate: new Date().toISOString().split("T")[0],
      status: "نشط",
      branch: "",
      iban: "",
      swiftCode: "",
      creditLimit: 0,
    })
    setShowAddAccount(false)
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const account = accounts.find((a) => a.id === transactionFormData.accountId)
    if (!account) return

    let newBalance = account.balance
    if (transactionFormData.type === "deposit") {
      newBalance += transactionFormData.amount || 0
    } else {
      newBalance -= transactionFormData.amount || 0
    }

    const newTransaction: BankTransaction = {
      ...(transactionFormData as BankTransaction),
      id: transactions.length + 1,
      transactionNumber: `TRX-2024-${String(transactions.length + 1).padStart(3, "0")}`,
      balanceAfter: newBalance,
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem("bankTransactions", JSON.stringify(updatedTransactions))

    const updatedAccounts = accounts.map((a) => (a.id === account.id ? { ...a, balance: newBalance } : a))
    setAccounts(updatedAccounts)
    localStorage.setItem("bankAccounts", JSON.stringify(updatedAccounts))

    onAddNotification({
      userId: 1,
      title: "معاملة بنكية جديدة",
      message: `تم إضافة معاملة ${newTransaction.type === "deposit" ? "إيداع" : "سحب"} بمبلغ $${newTransaction.amount.toLocaleString()}`,
      type: "success",
      module: "banks",
      relatedId: newTransaction.id,
      timestamp: new Date().toLocaleString("ar-EG"),
      isRead: false,
      priority: "medium",
    })

    setTransactionFormData({
      accountId: 0,
      transactionNumber: "",
      date: new Date().toISOString().split("T")[0],
      type: "deposit",
      category: "",
      description: "",
      amount: 0,
      reference: "",
      status: "مكتمل",
    })
    setShowAddTransaction(false)
  }

  const filteredAccounts = accounts.filter(
    (account) =>
      account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountNumber.includes(searchTerm) ||
      account.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    totalAccounts: accounts.length,
    totalBalance: accounts.reduce((sum, account) => sum + account.balance, 0),
    activeAccounts: accounts.filter((a) => a.status === "نشط").length,
    totalDeposits: transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0),
    totalWithdrawals: transactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0),
    transactionsThisMonth: transactions.filter((t) => t.date.startsWith("2024-01")).length,
  }

  const getAccountTransactions = (accountId: number) => {
    return transactions.filter((t) => t.accountId === accountId).sort((a, b) => b.date.localeCompare(a.date))
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">إجمالي الحسابات</p>
                <p className="text-3xl font-bold">{stats.totalAccounts}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">إجمالي الرصيد</p>
                <p className="text-3xl font-bold">${stats.totalBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">الإيداعات</p>
                <p className="text-3xl font-bold">${stats.totalDeposits.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">السحوبات</p>
                <p className="text-3xl font-bold">${stats.totalWithdrawals.toLocaleString()}</p>
              </div>
              <ArrowDownRight className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
            <Building2 className="w-8 h-8 text-blue-600 ml-3" />
            إدارة البنوك
          </h1>
          <p className="text-gray-600 mt-2">إدارة شاملة للحسابات البنكية والمعاملات المالية</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button
            onClick={() => setShowAddTransaction(!showAddTransaction)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            معاملة جديدة
          </Button>
          <Button
            onClick={() => setShowAddAccount(!showAddAccount)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            حساب جديد
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
                placeholder="البحث في الحسابات..."
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

      {/* Add Account Form */}
      {showAddAccount && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center">
              <Plus className="w-6 h-6 ml-2 text-blue-600" />
              إضافة حساب بنكي جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddAccount} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName">اسم البنك *</Label>
                <Input
                  id="bankName"
                  value={accountFormData.bankName}
                  onChange={(e) => setAccountFormData({ ...accountFormData, bankName: e.target.value })}
                  required
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">رقم الحساب *</Label>
                <Input
                  id="accountNumber"
                  value={accountFormData.accountNumber}
                  onChange={(e) => setAccountFormData({ ...accountFormData, accountNumber: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">نوع الحساب</Label>
                <Select
                  value={accountFormData.accountType}
                  onValueChange={(value) => setAccountFormData({ ...accountFormData, accountType: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="جاري">جاري</SelectItem>
                    <SelectItem value="توفير">توفير</SelectItem>
                    <SelectItem value="استثماري">استثماري</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">الرصيد الافتتاحي</Label>
                <Input
                  id="balance"
                  type="number"
                  value={accountFormData.balance}
                  onChange={(e) => setAccountFormData({ ...accountFormData, balance: Number(e.target.value) })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">العملة</Label>
                <Select
                  value={accountFormData.currency}
                  onValueChange={(value) => setAccountFormData({ ...accountFormData, currency: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                    <SelectItem value="EUR">يورو (EUR)</SelectItem>
                    <SelectItem value="EGP">جنيه مصري (EGP)</SelectItem>
                    <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">مدير الحساب</Label>
                <Input
                  id="manager"
                  value={accountFormData.manager}
                  onChange={(e) => setAccountFormData({ ...accountFormData, manager: e.target.value })}
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">الفرع</Label>
                <Input
                  id="branch"
                  value={accountFormData.branch}
                  onChange={(e) => setAccountFormData({ ...accountFormData, branch: e.target.value })}
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="iban">رقم IBAN</Label>
                <Input
                  id="iban"
                  value={accountFormData.iban}
                  onChange={(e) => setAccountFormData({ ...accountFormData, iban: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="swiftCode">رمز SWIFT</Label>
                <Input
                  id="swiftCode"
                  value={accountFormData.swiftCode}
                  onChange={(e) => setAccountFormData({ ...accountFormData, swiftCode: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditLimit">الحد الائتماني</Label>
                <Input
                  id="creditLimit"
                  type="number"
                  value={accountFormData.creditLimit}
                  onChange={(e) => setAccountFormData({ ...accountFormData, creditLimit: Number(e.target.value) })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="openDate">تاريخ الافتتاح</Label>
                <Input
                  id="openDate"
                  type="date"
                  value={accountFormData.openDate}
                  onChange={(e) => setAccountFormData({ ...accountFormData, openDate: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">الحالة</Label>
                <Select
                  value={accountFormData.status}
                  onValueChange={(value) => setAccountFormData({ ...accountFormData, status: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="نشط">نشط</SelectItem>
                    <SelectItem value="معلق">معلق</SelectItem>
                    <SelectItem value="مغلق">مغلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddAccount(false)}>
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ الحساب
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Transaction Form */}
      {showAddTransaction && (
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center">
              <Plus className="w-6 h-6 ml-2 text-green-600" />
              إضافة معاملة بنكية جديدة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAddTransaction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="accountId">الحساب البنكي *</Label>
                <Select
                  value={transactionFormData.accountId?.toString()}
                  onValueChange={(value) =>
                    setTransactionFormData({ ...transactionFormData, accountId: Number(value) })
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.bankName} - {account.accountNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transactionType">نوع المعاملة *</Label>
                <Select
                  value={transactionFormData.type}
                  onValueChange={(value: any) => setTransactionFormData({ ...transactionFormData, type: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deposit">إيداع</SelectItem>
                    <SelectItem value="withdrawal">سحب</SelectItem>
                    <SelectItem value="transfer">تحويل</SelectItem>
                    <SelectItem value="fee">رسوم</SelectItem>
                    <SelectItem value="interest">فائدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={transactionFormData.amount}
                  onChange={(e) => setTransactionFormData({ ...transactionFormData, amount: Number(e.target.value) })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">التصنيف</Label>
                <Input
                  id="category"
                  value={transactionFormData.category}
                  onChange={(e) => setTransactionFormData({ ...transactionFormData, category: e.target.value })}
                  dir="rtl"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  type="date"
                  value={transactionFormData.date}
                  onChange={(e) => setTransactionFormData({ ...transactionFormData, date: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">المرجع</Label>
                <Input
                  id="reference"
                  value={transactionFormData.reference}
                  onChange={(e) => setTransactionFormData({ ...transactionFormData, reference: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="lg:col-span-3 space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={transactionFormData.description}
                  onChange={(e) => setTransactionFormData({ ...transactionFormData, description: e.target.value })}
                  dir="rtl"
                  rows={3}
                />
              </div>

              <div className="lg:col-span-3 flex justify-end space-x-4 rtl:space-x-reverse pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => setShowAddTransaction(false)}>
                  <XCircle className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المعاملة
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Accounts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccounts.map((account) => {
          const accountTransactions = getAccountTransactions(account.id)
          return (
            <Card key={account.id} className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center text-xl">
                      <Building2 className="w-6 h-6 ml-2 text-blue-600" />
                      {account.bankName}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      رقم الحساب: {account.accountNumber} | {account.accountType}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={account.status === "نشط" ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {account.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Balance */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
                  <p className="text-sm text-white/80 mb-2">الرصيد الحالي</p>
                  <p className="text-4xl font-bold">
                    ${account.balance.toLocaleString()} {account.currency}
                  </p>
                </div>

                {/* Account Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">المدير</p>
                    <p className="font-medium">{account.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">الفرع</p>
                    <p className="font-medium">{account.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IBAN</p>
                    <p className="font-medium text-xs">{account.iban}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SWIFT</p>
                    <p className="font-medium">{account.swiftCode}</p>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Activity className="w-4 h-4 ml-2" />
                    آخر المعاملات
                  </h4>
                  <div className="space-y-2">
                    {accountTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          {transaction.type === "deposit" ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium text-sm">{transaction.category}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <p
                          className={`font-bold ${transaction.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 rtl:space-x-reverse pt-4 border-t">
                  <Button size="sm" variant="outline" onClick={() => setSelectedAccount(account)} className="flex-1">
                    <Eye className="w-4 h-4 ml-2" />
                    عرض التفاصيل
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
