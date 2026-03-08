# WhatsApp Web Integration - Desktop Setup Guide

## Quick Start

### Prerequisites
1. WhatsApp installed on your phone
2. Modern desktop web browser (Chrome, Firefox, Safari, or Edge)
3. Phone with internet connection to scan QR code

### Setup Steps

1. **Login to WhatsApp Web**
   - Go to https://web.whatsapp.com in your browser
   - Scan QR code with your WhatsApp phone app
   - Keep browser tab open and logged in

2. **Test Invoice WhatsApp Feature**
   - Navigate to Invoice Management module
   - Select any invoice
   - Click green WhatsApp icon
   - Enter a test phone number
   - Click "إرسال على WhatsApp"
   - WhatsApp Web should open in new window with pre-filled message

## How WhatsApp Web Works with This System

### Desktop Browser Flow

```
User clicks WhatsApp icon
       ↓
Phone number input dialog appears
       ↓
User enters phone number
       ↓
System validates & formats number
       ↓
WhatsApp Web URL generated with message
       ↓
New window opens to: https://web.whatsapp.com/send?phone=XXXXXX&text=MESSAGE
       ↓
WhatsApp Web loads with pre-filled message
       ↓
User can review and send message
```

### Example URL Generated

```
https://web.whatsapp.com/send?phone=201001234567&text=*الفاتورة%3A+INV-2024-001*%0A...
```

## Phone Number Formats Supported

All these formats will work and be converted to the correct format:

| Format | Example | Converts To |
|--------|---------|-------------|
| International | +201001234567 | 201001234567 |
| National | 01001234567 | 201001234567 |
| Country+Code | 201001234567 | 201001234567 |
| With Spaces | +20 100 123 4567 | 201001234567 |
| With Dashes | 01001-234-567 | 201001234567 |

## Message Format

### What User Receives

```
الفاتورة: INV-2024-001

العميل: شركة الأهرام للتجارة
التاريخ: 2024-01-15
الإجمالي: $429.00

📄 يرجى مراجعة الفاتورة المرفقة.
```

## Common Issues & Solutions

### 1. WhatsApp Web Window Doesn't Open

**Problem:** Clicking WhatsApp icon does nothing

**Solutions:**
- Check if browser has popup blocking enabled
  - **Chrome:** Click padlock icon → Popups → Allow
  - **Firefox:** Settings → Privacy → Exceptions → Add domain
  - **Safari:** Preferences → Security → Allow popups
  - **Edge:** Settings → Privacy → Popups → Allow

- Ensure browser tab is focused when clicking button

- Try using keyboard shortcut to open: `Ctrl+Shift+N` (new window)

### 2. Message Pre-Fill Not Working

**Problem:** WhatsApp Web opens but message is blank

**Solutions:**
- Check if browser allows JavaScript execution
- Verify phone number was entered correctly
- Try refreshing WhatsApp Web tab first
- Use different phone number to test

### 3. Phone Number Not Recognized

**Problem:** Error saying phone number invalid

**Solutions:**
- Verify country code (Egypt = 2, use format: 201001234567)
- Remove special characters, spaces, dashes
- Ensure phone number belongs to active WhatsApp account
- Try with different phone number to confirm

### 4. WhatsApp Web Shows "Keep Your Phone Connected"

**Problem:** WhatsApp Web shows disconnected warning

**Solutions:**
- Enable notifications and background process on phone
- Keep phone's internet connection active
- Don't log out on other device while using Web
- Restart WhatsApp on phone and refresh browser tab

### 5. Message Shows Special Characters Like %20, %0A

**Problem:** Text appears encoded in URL but not in message

**This is normal!** URL encoding is required for web links.
- %20 = space
- %0A = new line
- %3A = colon

These automatically decode when WhatsApp Web renders the message.

## Testing Checklist

Use this checklist to verify everything works:

- [ ] Can access https://web.whatsapp.com
- [ ] Can scan QR code and login
- [ ] WhatsApp Web shows "Phone connected"
- [ ] Phone shows WhatsApp Web session active
- [ ] Can click WhatsApp icon on invoice
- [ ] Phone number dialog appears
- [ ] Can enter phone number without errors
- [ ] New window opens to WhatsApp Web
- [ ] Pre-filled message appears in chat
- [ ] Message contains invoice number
- [ ] Message contains customer name
- [ ] Message contains invoice total
- [ ] Can send message successfully
- [ ] Phone receives message with correct content

## Phone Number Input Tips

### Valid Examples

✅ +201001234567
✅ 01001234567
✅ 201001234567
✅ +20 100 123 4567
✅ 01001-234-567

### Invalid Examples

❌ 1001234567 (missing country code)
❌ +1201001234567 (wrong country code)
❌ phone number (non-numeric)
❌ (blank/empty)

## Browser-Specific Instructions

### Google Chrome
1. Go to Settings → Privacy and Security → Site Settings
2. Find "Popups and redirects" section
3. Add your domain to Allow list
4. Refresh the page

### Mozilla Firefox
1. Tools → Settings → Privacy & Security
2. Permissions → Popups
3. Click Exceptions
4. Add your domain
5. Select "Allow"

### Apple Safari
1. Safari → Preferences → Security
2. Check "Allow pop-ups"
3. (Or allow per-site in pop-ups menu)

### Microsoft Edge
1. Settings → Privacy, search, and services
2. Site permissions → Popups and redirects
3. Add domain to Allow list

## Monitoring & Logging

### Browser Console Logs

When sharing via WhatsApp, you should see:
```
[InvoiceManagement] Sharing invoice INV-2024-001 via WhatsApp
[InvoiceManagement] Opening WhatsApp Web link...
```

### Error Logs

If errors occur, check browser console (F12 → Console):
```
[InvoiceManagement] Error sharing via WhatsApp: ...
```

## Security Notes

- **No data sent to external servers** - WhatsApp link generation is client-side
- **Phone numbers not stored** - cleared after message is sent
- **HTTPS only** - WhatsApp Web requires secure connection
- **Authentication required** - must be logged in to WhatsApp Web

## Alternative Methods (If WhatsApp Web Fails)

If WhatsApp Web consistently fails on desktop:

### Option 1: Use Mobile App
- Save invoice PDF using Download button
- Send PDF via mobile WhatsApp app

### Option 2: Manual Link
- Copy invoice number and customer details
- Manually create WhatsApp message
- Paste phone number into web.whatsapp.com

### Option 3: Use Different Browser
- Chrome is most reliable
- Firefox is secondary option
- Safari/Edge have occasional issues

## Advanced Configuration

### Change Country Code for Different Region

Edit `lib/invoice-utils.ts`:
```typescript
// Line: Add country code if not present
if (!cleanPhone.startsWith("2")) {
  finalPhone = "966" + cleanPhone  // Change 2 to your country code
}

// Country Codes:
// 1 = USA/Canada
// 44 = UK
// 91 = India
// 966 = Saudi Arabia
// 2 = Egypt
```

### Customize Message Text

Edit `lib/invoice-utils.ts` in `generateWhatsAppShareLink()`:
```typescript
const message = `Your custom message here...`
```

## Support & Troubleshooting

If none of the above solutions work:

1. **Test WhatsApp Web directly**
   - Visit https://web.whatsapp.com
   - Verify you can send manual messages

2. **Check browser compatibility**
   - Update to latest browser version
   - Test in different browser

3. **Clear browser cache**
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Develop → Empty Caches
   - Edge: Ctrl+Shift+Delete

4. **Verify phone number**
   - Test with known valid WhatsApp phone number
   - Verify phone has WhatsApp installed

5. **Check internet**
   - Test connection at speedtest.net
   - Ensure both computer and phone connected

## Performance Tips

- Keep WhatsApp Web tab open for faster link opening
- Close unnecessary browser tabs/extensions
- Disable browser extensions if issues persist
- Use wired internet for more stable connection

## FAQ

**Q: Does this work without WhatsApp installed on phone?**
A: No, you need WhatsApp on your phone to scan QR code and authenticate on WhatsApp Web.

**Q: Can I schedule messages?**
A: No, WhatsApp Web doesn't support scheduled messages. User must send immediately.

**Q: What happens if phone goes offline?**
A: WhatsApp Web shows "Phone connected" status. Offline phone = offline Web session.

**Q: Can multiple people use same WhatsApp Web login?**
A: No, only one device can be logged in at a time.

**Q: Does this work on mobile browsers?**
A: WhatsApp Web is desktop-only. Mobile uses WhatsApp app directly with different link format.

**Q: Is the phone number stored?**
A: No, phone numbers are cleared immediately after opening WhatsApp Web.

**Q: Can I send to WhatsApp Business?**
A: Yes, same phone number format works for WhatsApp Business accounts.
