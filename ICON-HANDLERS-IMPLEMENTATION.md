# Action Icons Implementation Guide

This document outlines how to implement fully functional action icons (View, Edit, Delete) across all management modules.

## Overview

All management modules should have three operational action icons:
1. **View (Eye Icon)** - Opens a details modal with read-only record information
2. **Edit (Pencil Icon)** - Opens the edit form with pre-filled record data
3. **Delete (Trash Icon)** - Deletes the record after confirmation

## Reusable Component

A reusable `ActionIcons` component is available at `components/ui/action-icons.tsx`.

### Usage Pattern

```typescript
import { ActionIcons } from "@/components/ui/action-icons"

// In your table row:
<ActionIcons
  record={item}
  recordId={item.id}
  recordName={item.name || "السجل"}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={() => (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">الاسم</Label>
        <p className="text-sm">{item.name}</p>
      </div>
      {/* More fields */}
    </div>
  )}
/>
```

## Required Handler Functions

### 1. handleEdit(record)
Opens the edit form with pre-filled data from the selected record.

```typescript
const handleEdit = (item: ItemType) => {
  setFormData(item) // Pre-fill form
  setEditingItem(item) // Track editing state
  setShowAddForm(true) // Show form
}
```

### 2. handleDelete(id)
Deletes the record and updates state and localStorage.

```typescript
const handleDelete = (id: number) => {
  const updated = items.filter((item) => item.id !== id)
  setItems(updated)
  localStorage.setItem("items", JSON.stringify(updated))
  
  onAddNotification({
    userId: 1,
    title: "حذف السجل",
    message: "تم حذف السجل بنجاح",
    type: "success",
    module: "module-name",
    timestamp: new Date().toLocaleString("ar-EG"),
    isRead: false,
    priority: "low",
  })
}
```

## Modules Status

### Fully Implemented (No Changes Needed)
- ✅ Supplier Management
- ✅ Products Management
- ✅ Invoice Management
- ✅ Files Management
- ✅ Sales Management (Recently Fixed)

### Need Icon Handlers Implementation
- ⚠️ HR Management
- ⚠️ Expenses Management
- ⚠️ Customs Management
- ⚠️ Bank Management
- ⚠️ Legal Management
- ⚠️ Food Safety Management
- ⚠️ Warehouse Management
- ⚠️ Inventory Management
- ⚠️ Purchase Management
- ⚠️ User Management
- ⚠️ Settings Management
- ⚠️ Reports & Analytics

## Implementation Checklist for Each Module

For each module that needs updating:

1. **Add Imports**
   - Add Dialog and AlertDialog components
   - Add Edit icon from lucide-react
   - Add ActionIcons component (or implement inline)

2. **Add State Management**
   - `selectedItem` state for viewing
   - `editingItem` state for editing
   - Ensure edit form exists

3. **Add Handler Functions**
   - `handleEdit(item)` - Sets form data and shows form
   - `handleDelete(id)` - Removes from state and localStorage

4. **Replace Icon Buttons**
   - Replace simple Button components with Dialog/AlertDialog wrappers
   - Or use the ActionIcons component for consistency

5. **Add Notifications**
   - Call `onAddNotification` on successful actions
   - Include appropriate messages and timestamps

6. **Test Functionality**
   - Click View → Opens modal with details
   - Click Edit → Form pre-fills and opens
   - Click Delete → Shows confirmation dialog
   - No console errors
   - localStorage updates correctly

## Error Handling Best Practices

```typescript
try {
  const updated = items.filter((item) => item.id !== id)
  setItems(updated)
  localStorage.setItem("items", JSON.stringify(updated))
  
  onAddNotification({
    // ... success notification
  })
} catch (error) {
  console.error("[ActionIcons] Error deleting item:", error)
  onAddNotification({
    userId: 1,
    title: "خطأ",
    message: "حدث خطأ أثناء الحذف",
    type: "error",
    module: "module-name",
    timestamp: new Date().toLocaleString("ar-EG"),
    isRead: false,
    priority: "high",
  })
}
```

## Production Readiness Checklist

- [ ] All icons have onClick handlers
- [ ] View dialog shows correct record details
- [ ] Edit form pre-fills with record data
- [ ] Delete requires confirmation
- [ ] localStorage updates correctly
- [ ] Notifications are sent on all actions
- [ ] No console errors
- [ ] RTL layout is correct
- [ ] Icons have proper hover states
- [ ] All modules consistent

## Module-Specific Notes

### HR Management
- Handle employee data with full profile display
- Ensure salary and benefits details are in view modal

### Inventory Management
- Show stock levels and warehouse locations in view modal
- Handle quantity updates on edit

### Purchase Management  
- Display supplier and invoice information
- Handle payment status in edit

### User Management
- Protect deletion (prevent removing current user?)
- Show user roles and permissions in view
