"use client"

import React from "react"

import { Button } from "@/components/ui/button"
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
import { Eye, Trash2, Edit } from "lucide-react"

interface ActionIconsProps {
  record: any
  onEdit: (record: any) => void
  onDelete: (id: number) => void
  onView?: (record: any) => React.ReactNode
  recordId: number
  recordName?: string
}

export function ActionIcons({
  record,
  onEdit,
  onDelete,
  onView,
  recordId,
  recordName = "السجل",
}: ActionIconsProps) {
  return (
    <div className="flex space-x-2 rtl:space-x-reverse">
      {onView && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 bg-transparent"
              title="عرض التفاصيل"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>تفاصيل السجل</DialogTitle>
              <DialogDescription>عرض تفصيلي لبيانات السجل</DialogDescription>
            </DialogHeader>
            {onView(record)}
          </DialogContent>
        </Dialog>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => onEdit(record)}
        className="hover:bg-green-50 hover:text-green-600 hover:border-green-300"
        title="تعديل"
      >
        <Edit className="w-4 h-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 bg-transparent"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف {recordName}؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(recordId)}
              className="bg-red-600 hover:bg-red-700"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
