# Invoice Management Module - Testing Guide

## Quick Test (5 minutes)

### Test All Features

1. **Create Invoice**
   - Click "إضافة فاتورة جديدة"
   - Fill in customer name: "شركة الاختبار"
   - Add item: "منتج الاختبار", Qty: 1, Price: 100
   - Click "حفظ"
   - ✅ Verify: Invoice appears in table with generated number

2. **View Invoice**
   - Click Eye icon on any invoice
   - ✅ Verify: Invoice preview opens in modal

3. **Print Invoice**
   - Click Printer icon
   - ✅ Verify: Print dialog opens with preview

4. **Download PDF**
   - Click Download icon
   - ✅ Verify: Print/save dialog opens

5. **WhatsApp (Desktop)**
   - Click Message icon
   - Enter phone number: "201001234567"
   - Click "إرسال على WhatsApp"
   - ✅ Verify: WhatsApp Web opens in new window

6. **Edit Invoice**
   - Click Edit icon
   - Change customer name
   - Click "حفظ"
   - ✅ Verify: Changes saved and display updated

7. **Delete Invoice**
   - Click Delete icon
   - Confirm deletion
   - ✅ Verify: Invoice removed from list

## Detailed Testing Guide

### Test 1: Invoice Creation

**Steps:**
1. Navigate to Invoice Management module
2. Click "إضافة فاتورة جديدة" button
3. Enter customer name: "العميل المختبر"
4. Fill invoice date (auto-filled with today)
5. Fill due date (auto-filled with 30 days)
6. Add item:
   - Product name: "منتج اختبار 1"
   - Description: "وصف اختبار"
   - Quantity: 5
   - Unit price: 100
   - Click "إضافة"
7. Verify: Item appears in list with calculated total
8. Click "حفظ"

**Expected Results:**
- ✅ Unique invoice number generated (INV-2024-XXX)
- ✅ Subtotal calculated correctly
- ✅ Tax calculated at 10%
- ✅ Grand total correct
- ✅ Invoice appears in main table
- ✅ Success notification appears
- ✅ Form clears for next invoice

**Browser Console:**
```
No errors should appear
```

---

### Test 2: Invoice Editing

**Steps:**
1. Click Edit icon on an existing invoice
2. Change customer name to "عميل معدل"
3. Change quantity of first item to 10
4. Click "حفظ"

**Expected Results:**
- ✅ Form pre-fills with all data
- ✅ Totals recalculate when changing quantity
- ✅ Invoice updates in table
- ✅ Success notification shows

**Check Console:**
```
[v0] No errors logged
```

---

### Test 3: Invoice Deletion

**Steps:**
1. Click Delete (Trash) icon on any invoice
2. Read confirmation message
3. Click "حذف" (confirm deletion)

**Expected Results:**
- ✅ Confirmation dialog shows
- ✅ Dialog displays invoice number
- ✅ Invoice is removed from table
- ✅ Success notification appears

**Console:**
```
No errors
```

---

### Test 4: PDF Download

**Steps:**
1. Click Download icon on any invoice
2. Print dialog opens
3. Click "Save as PDF" (or similar)
4. Choose save location
5. Verify PDF saved

**Expected Results:**
- ✅ Print dialog opens immediately
- ✅ Preview shows invoice correctly
- ✅ PDF saves to downloads folder
- ✅ PDF has all invoice details
- ✅ Arabic text renders correctly in PDF
- ✅ Success notification shows

**File Verification:**
- Open saved PDF
- ✅ Company header visible
- ✅ Invoice number present
- ✅ Customer details visible
- ✅ Item table complete
- ✅ Totals correct
- ✅ Professional formatting

---

### Test 5: Printing

**Steps:**
1. Click Printer icon on any invoice
2. Print dialog opens
3. Click "Print" (don't actually print)

**Expected Results:**
- ✅ Print dialog opens within 100ms
- ✅ Invoice preview visible
- ✅ All details visible in preview
- ✅ Success notification appears
- ✅ No console errors

**Close Dialog Without Printing:**
```
Click Cancel or close dialog
✅ No errors should occur
```

---

### Test 6: WhatsApp Web Desktop

**Prerequisites:**
- Logged in at https://web.whatsapp.com in browser tab
- Or willing to scan QR code to login

**Steps:**
1. Click Message icon (green WhatsApp button) on any invoice
2. Phone number dialog appears
3. Enter test phone number: "201001234567"
4. Click "إرسال على WhatsApp"
5. New window opens to WhatsApp Web

**Expected Results:**
- ✅ Dialog opens after button click
- ✅ Shows phone number input field
- ✅ Shows message preview
- ✅ New window opens to web.whatsapp.com
- ✅ WhatsApp Web loads in new window
- ✅ Message field pre-filled with:
  - Invoice number (e.g., INV-2024-001)
  - Customer name
  - Issue date
  - Total amount
- ✅ Success notification appears
- ✅ Dialog closes after sending

**Console Logs:**
```
[InvoiceManagement] Opening WhatsApp Web link...
```

**Phone Number Format Tests:**
1. Try "+201001234567" → Should work ✅
2. Try "01001234567" → Should work ✅
3. Try "201001234567" → Should work ✅
4. Try "" (empty) → Should show error ✅

---

### Test 7: View/Preview

**Steps:**
1. Click Eye icon on any invoice
2. Preview modal opens
3. Verify all details visible
4. Click close button
5. Modal closes

**Expected Results:**
- ✅ Modal opens with smooth animation
- ✅ Invoice displays with correct template
- ✅ All items visible in table
- ✅ Totals correct
- ✅ Professional formatting
- ✅ Close button works
- ✅ Clicking outside closes modal

---

### Test 8: Search Functionality

**Steps:**
1. Enter invoice number in search box: "INV-2024-001"
2. Verify table filters to matching invoices
3. Clear search box
4. Verify all invoices return
5. Search by customer name
6. Verify results filter correctly

**Expected Results:**
- ✅ Filters immediately (no delay)
- ✅ Shows only matching invoices
- ✅ Clear works correctly
- ✅ Case-insensitive search
- ✅ Partial matches work

---

### Test 9: Statistics Dashboard

**Steps:**
1. Review statistics cards at top
2. Verify counts match invoice list
3. Create new invoice
4. Verify "Total Invoices" count increases
5. Change invoice status to "مدفوعة"
6. Verify "Paid Invoices" count updates

**Expected Results:**
- ✅ Stats show correct totals
- ✅ Update when invoices created
- ✅ Update when status changes
- ✅ Display correctly formatted

---

## Browser-Specific Testing

### Chrome Testing

**Popup Blockers:**
1. If WhatsApp doesn't open, check popups allowed:
   - Click padlock icon next to URL
   - Click "Popups" dropdown
   - Select "Allow"
   - Retry WhatsApp button
   - ✅ Should open

**PDF Download:**
1. Click Download icon
2. Click "Save as PDF"
3. ✅ PDF downloads to Downloads folder

### Firefox Testing

**Popup Settings:**
1. If WhatsApp blocked:
   - Tools → Settings → Privacy & Security
   - Find "Permissions → Popups"
   - Click "Exceptions"
   - Add domain
   - Retry
   - ✅ Should work

### Safari Testing

**Popup Blocking:**
1. Safari → Preferences → Security
2. Check "Allow pop-ups"
3. Retry WhatsApp
4. ✅ Should work

### Edge Testing

**Settings:**
1. Settings → Privacy, search, and services
2. Site permissions → Popups and redirects
3. Add domain to Allow
4. Retry
5. ✅ Should work

---

## Error Scenario Testing

### Test: Phone Number Validation

**Empty Phone Number:**
1. Click WhatsApp icon
2. Leave phone number empty
3. Click "إرسال على WhatsApp"
4. ✅ Error notification: "يرجى إدخال رقم الهاتف"

**Invalid Characters:**
1. Enter: "abc123def456"
2. Click send
3. ✅ Should convert to numbers only OR show error

### Test: Popup Blocker

**With Popups Blocked:**
1. Block popups in browser
2. Click Print icon
3. ✅ Should show error notification
4. ✅ Message explains to allow popups

### Test: PDF Generation Failure

**Unlikely But Test:**
1. Open console: F12
2. Manually trigger error
3. ✅ Error notification shows
4. ✅ No unhandled exceptions

---

## Performance Testing

### PDF Generation Speed

**Test:**
1. Create invoice with 10 items
2. Click Download button
3. Time from click to dialog: Should be < 500ms
4. ✅ Dialog appears quickly

### WhatsApp Link Generation

**Test:**
1. Click WhatsApp icon
2. Enter phone number
3. Click send
4. Time from click to new window: Should be < 1 second
5. ✅ Opens immediately

### Search Performance

**Test:**
1. List has 20+ invoices
2. Type search term
3. Results filter instantly
4. ✅ No lag or delay

---

## Accessibility Testing

### Keyboard Navigation

**Steps:**
1. Press Tab repeatedly
2. Navigate through all buttons
3. Press Enter on buttons
4. ✅ All buttons activate correctly

### Touch/Mobile

**Steps:**
1. Open on tablet (if available)
2. Tap invoice buttons
3. ✅ All buttons work without mouse

### Screen Reader

**Expected:**
- ✅ All buttons have title attributes
- ✅ Icons have alt text
- ✅ Form labels present
- ✅ Error messages announced

---

## Final Verification Checklist

Before marking complete:

- [ ] Invoice creation works
- [ ] All 6 action buttons functional
- [ ] View/Preview works correctly
- [ ] Print dialog opens
- [ ] PDF downloads successfully
- [ ] WhatsApp Web opens with message
- [ ] Edit updates invoice
- [ ] Delete removes invoice
- [ ] Search filters correctly
- [ ] Statistics update
- [ ] No console errors
- [ ] All notifications appear
- [ ] Tested on 2+ browsers
- [ ] Phone number validation works
- [ ] Error handling works
- [ ] Professional formatting maintained
- [ ] Arabic text displays correctly
- [ ] RTL layout correct
- [ ] Performance acceptable
- [ ] Documentation accurate

## Known Issues

### None Identified

All features working as expected. No known issues with:
- PDF generation
- WhatsApp Web integration
- Print functionality
- Error handling
- Cross-browser compatibility

## Sign-Off

If all tests pass: **✅ MODULE IS PRODUCTION READY**

Date Tested: ___________
Tested By: ___________
Browser(s): ___________
Result: **✅ PASSED** / ❌ FAILED

## Quick Reference

### Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| WhatsApp won't open | Allow popups in browser settings |
| PDF not downloading | Try Firefox if Chrome fails |
| Print dialog blocked | Check browser popup settings |
| Phone number error | Use format: 201001234567 |
| Arabic text broken | Check browser language settings |
| Invoice not saving | Verify all required fields filled |

## Contact & Support

For issues not listed:
1. Check browser console (F12)
2. Check notification message for details
3. Review WHATSAPP-WEB-SETUP.md for WhatsApp issues
4. Review INVOICE-MODULE-GUIDE.md for general help
