"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Ship,
  Building2,
  CreditCard,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import type { AccountTransaction, Customer, Supplier, Sale, Purchase, Shipment } from "@/types"
import { Button } from "@/components/ui/button"

interface AccountingIntegrationProps {
  customers: Customer[]
  suppliers: Supplier[]
  sales: Sale[]
  purchases: Purchase[]
  shipments: Shipment[]
  onBack?: () => void
}

export function AccountingIntegration({
  customers,
  suppliers,
  sales,
  purchases,
  shipments,
  onBack,
}: AccountingIntegrationProps) {
  const [transactions, setTransactions] = useState<AccountTransaction[]>([])
  const [accountSummary, setAccountSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
    cashFlow: 0,
  })

  useEffect(() => {
    generateTransactions()
    calculateAccountSummary()
  }, [customers, suppliers, sales, purchases, shipments])

  const generateTransactions = () => {
    const newTransactions: AccountTransaction[] = []
    let transactionId = 1

    // Generate transactions from sales
    sales.forEach((sale) => {
      // Revenue transaction
      newTransactions.push({
        id: transactionId++,
        date: sale.saleDate,
        type: "إيراد",
        category: "مبيعات",
        description: `مبيعات للعميل: ${sale.customer}`,
        amount: sale.totalAmount,
        reference: sale.saleNumber,
        status: "مكتمل",
        attachments: [],
        relatedModule: "sales",
        relatedId: sale.id,
        debit: 0,
        credit: sale.totalAmount,
        balance: 0,
      })

      // Accounts receivable if not fully paid
      if (sale.remainingAmount > 0) {
        newTransactions.push({
          id: transactionId++,
          date: sale.saleDate,
          type: "مستحقات",
          category: "ذمم مدينة",
          description: `مستحقات من العميل: ${sale.customer}`,
          amount: sale.remainingAmount,
          reference: sale.saleNumber,
          status: "معلق",
          attachments: [],
          relatedModule: "customers",
          relatedId: sale.customerId,
          debit: sale.remainingAmount,
          credit: 0,
          balance: 0,
        })
      }
    })

    // Generate transactions from purchases
    purchases.forEach((purchase) => {
      // Expense transaction
      newTransactions.push({
        id: transactionId++,
        date: purchase.purchaseDate,
        type: "مصروف",
        category: "مشتريات",
        description: `مشتريات من المورد: ${purchase.supplier}`,
        amount: purchase.totalAmount,
        reference: purchase.purchaseNumber,
        status: "مكتمل",
        attachments: [],
        relatedModule: "purchases",
        relatedId: purchase.id,
        debit: purchase.totalAmount,
        credit: 0,
        balance: 0,
      })

      // Accounts payable if not fully paid
      if (purchase.remainingAmount > 0) {
        newTransactions.push({
          id: transactionId++,
          date: purchase.purchaseDate,
          type: "مستحقات",
          category: "ذمم دائنة",
          description: `مستحقات للمورد: ${purchase.supplier}`,
          amount: purchase.remainingAmount,
          reference: purchase.purchaseNumber,
          status: "معلق",
          attachments: [],
          relatedModule: "suppliers",
          relatedId: purchase.supplierId,
          debit: 0,
          credit: purchase.remainingAmount,
          balance: 0,
        })
      }
    })

    // Generate transactions from shipments
    shipments.forEach((shipment) => {
      newTransactions.push({
        id: transactionId++,
        date: shipment.shippingDate,
        type: "مصروف",
        category: "شحن",
        description: `تكاليف شحن للعميل: ${shipment.customer}`,
        amount: shipment.totalCost,
        reference: shipment.shipmentNumber,
        status: "مكتمل",
        attachments: [],
        relatedModule: "shipments",
        relatedId: shipment.id,
        debit: shipment.totalCost,
        credit: 0,
        balance: 0,
      })
    })

    setTransactions(newTransactions)
  }

  const calculateAccountSummary = () => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0)
    const totalExpenses =
      purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0) +
      shipments.reduce((sum, shipment) => sum + shipment.totalCost, 0)
    const netProfit = totalRevenue - totalExpenses
    const accountsReceivable = customers.reduce((sum, customer) => sum + customer.remaining, 0)
    const accountsPayable = suppliers.reduce((sum, supplier) => sum + supplier.remaining, 0)
    const cashFlow = totalRevenue - totalExpenses

    setAccountSummary({
      totalRevenue,
      totalExpenses,
      netProfit,
      accountsReceivable,
      accountsPayable,
      cashFlow,
    })
  }

  const getTransactionsByModule = (module: string) => {
    return transactions.filter((t) => t.relatedModule === module)
  }

  const getModuleStats = (module: string) => {
    const moduleTransactions = getTransactionsByModule(module)
    const totalDebit = moduleTransactions.reduce((sum, t) => sum + t.debit, 0)
    const totalCredit = moduleTransactions.reduce((sum, t) => sum + t.credit, 0)
    return { totalDebit, totalCredit, count: moduleTransactions.length }
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            الحسابات العامة
          </h1>
          <p className="text-gray-600 mt-2">نظام محاسبي متكامل ومترابط مع جميع الوحدات</p>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold">${accountSummary.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">إجمالي المصروفات</p>
                <p className="text-3xl font-bold">${accountSummary.totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">صافي الربح</p>
                <p className="text-3xl font-bold">${accountSummary.netProfit.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">الذمم المدينة</p>
                <p className="text-3xl font-bold">${accountSummary.accountsReceivable.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">الذمم الدائنة</p>
                <p className="text-3xl font-bold">${accountSummary.accountsPayable.toLocaleString()}</p>
              </div>
              <ArrowDownRight className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm">التدفق النقدي</p>
                <p className="text-3xl font-bold">${accountSummary.cashFlow.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Integration */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="purchases">المشتريات</TabsTrigger>
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="suppliers">الموردين</TabsTrigger>
          <TabsTrigger value="shipments">الشحنات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 ml-2" />
                  توزيع المعاملات حسب الوحدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["sales", "purchases", "customers", "suppliers", "shipments"].map((module) => {
                    const stats = getModuleStats(module)
                    const moduleNames = {
                      sales: "المبيعات",
                      purchases: "المشتريات",
                      customers: "العملاء",
                      suppliers: "الموردين",
                      shipments: "الشحنات",
                    }
                    return (
                      <div key={module} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                          <span className="font-medium">{moduleNames[module as keyof typeof moduleNames]}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{stats.count} معاملة</div>
                          <div className="text-sm text-gray-500">
                            ${(stats.totalCredit - stats.totalDebit).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 ml-2" />
                  المعاملات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice(0, 10).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ml-3 ${
                            transaction.type === "إيراد" ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium text-sm">{transaction.description}</div>
                          <div className="text-xs text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-bold ${transaction.type === "إيراد" ? "text-green-600" : "text-red-600"}`}
                        >
                          ${transaction.amount.toLocaleString()}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 ml-2" />
                ربط المبيعات بالحسابات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-600 font-semibold">إجمالي المبيعات</div>
                  <div className="text-2xl font-bold text-green-800">
                    ${sales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">المبلغ المحصل</div>
                  <div className="text-2xl font-bold text-blue-800">
                    ${sales.reduce((sum, sale) => sum + sale.paidAmount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-orange-600 font-semibold">المبلغ المتبقي</div>
                  <div className="text-2xl font-bold text-orange-800">
                    ${sales.reduce((sum, sale) => sum + sale.remainingAmount, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {getTransactionsByModule("sales").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 ml-3" />
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">
                          {transaction.reference} - {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+${transaction.amount.toLocaleString()}</div>
                      <Badge className="bg-green-100 text-green-800">{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="w-5 h-5 ml-2" />
                ربط المشتريات بالحسابات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-600 font-semibold">إجمالي المشتريات</div>
                  <div className="text-2xl font-bold text-red-800">
                    ${purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-semibold">المبلغ المدفوع</div>
                  <div className="text-2xl font-bold text-blue-800">
                    ${purchases.reduce((sum, purchase) => sum + purchase.paidAmount, 0).toLocaleString()}
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-orange-600 font-semibold">المبلغ المتبقي</div>
                  <div className="text-2xl font-bold text-orange-800">
                    ${purchases.reduce((sum, purchase) => sum + purchase.remainingAmount, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {getTransactionsByModule("purchases").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 ml-3" />
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-500">
                          {transaction.reference} - {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">-${transaction.amount.toLocaleString()}</div>
                      <Badge className="bg-red-100 text-red-800">{transaction.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 ml-2" />
                حسابات العملاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${customer.accountBalance.toLocaleString()}</div>
                        <Badge variant={customer.remaining > 0 ? "destructive" : "default"}>
                          {customer.remaining > 0 ? "له مستحقات" : "مسدد"}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">إجمالي الفواتير:</span>
                        <div className="font-semibold">${customer.totalInvoices.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">المدفوع:</span>
                        <div className="font-semibold text-green-600">${customer.paid.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">المتبقي:</span>
                        <div className="font-semibold text-red-600">${customer.remaining.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 ml-2" />
                حسابات الموردين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-gray-500">{supplier.supplyType}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${supplier.accountBalance.toLocaleString()}</div>
                        <Badge variant={supplier.remaining > 0 ? "destructive" : "default"}>
                          {supplier.remaining > 0 ? "عليه مستحقات" : "مسدد"}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">إجمالي التوريدات:</span>
                        <div className="font-semibold">${supplier.totalSupplies.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">المدفوع:</span>
                        <div className="font-semibold text-green-600">${supplier.paid.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">المتبقي:</span>
                        <div className="font-semibold text-red-600">${supplier.remaining.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ship className="w-5 h-5 ml-2" />
                تكاليف الشحنات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{shipment.shipmentNumber}</h3>
                        <p className="text-sm text-gray-500">
                          {shipment.customer} - {shipment.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-red-600">${shipment.totalCost.toLocaleString()}</div>
                        <Badge variant="outline">{shipment.status}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">قيمة الشحنة:</span>
                        <div className="font-semibold">${shipment.totalValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">تكلفة الشحن:</span>
                        <div className="font-semibold">${shipment.shippingCost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">التأمين:</span>
                        <div className="font-semibold">${shipment.insuranceCost.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">الجمارك:</span>
                        <div className="font-semibold">${shipment.customsCost.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
