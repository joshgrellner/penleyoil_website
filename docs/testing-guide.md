# End-to-End Testing Guide

**Project:** Penley Oil Company Website
**Date:** October 24, 2025
**Purpose:** Comprehensive testing documentation for Quote Form, Credit Application, PDF Generation, Email Routing, and GA4 Events

---

## Table of Contents

1. [Quote Form Testing](#quote-form-testing)
2. [Credit Application Testing](#credit-application-testing)
3. [PDF Generation](#pdf-generation)
4. [Email Routing](#email-routing)
5. [GA4 Event Tracking](#ga4-event-tracking)
6. [Configuration Checklist](#configuration-checklist)
7. [Test Cases](#test-cases)

---

## Quote Form Testing

### Location
- **Component:** `components/QuoteForm.tsx`
- **API Endpoint:** `/api/quote/submit`
- **Used On:** Home page, Contact page

### Features Implemented

✅ **Client-Side Validation**
- Required fields: Name, Phone, City, Product, Timeframe
- Optional fields: Company, Email, Quantity, Message
- Email format validation (type="email")
- Phone format validation (type="tel")

✅ **Privacy & Consent**
- Privacy Policy & Terms consent (required)
- SMS/Text message consent (optional, TCPA compliant)
- Links to /privacy and /terms pages

✅ **Form Submission**
- POSTs to `/api/quote/submit`
- Displays loading state ("Submitting...")
- Shows success message on completion
- Auto-resets form after 5 seconds

✅ **Error Handling**
- Validates required fields
- Displays API error messages
- Fallback message: "Please call us at (405) 235-7553"

✅ **Database Storage**
- Saves to Supabase `quote_submissions` table
- Fields: name, email, phone, company, message, service, status
- Status set to 'new' by default

✅ **GA4 Analytics**
- Tracks `lead_form_submit` event on success
- Includes form_id and page_context

### Test Cases

#### Test 1: Valid Submission

```bash
curl -X POST http://localhost:3000/api/quote/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "(405) 555-1234",
    "company": "Smith Construction",
    "message": "Need 500 gallons of diesel delivered to Oklahoma City job site.\n\nDelivery Details:\n- Location: Oklahoma City\n- Product: diesel-clear\n- Quantity: 500 gallons\n- Timeframe: this-week",
    "service": "diesel-clear"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully",
  "quoteId": "abc123"
}
```

#### Test 2: Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/quote/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith"
  }'
```

**Expected Response:**
```json
{
  "error": "Missing required fields"
}
```
**Status Code:** 400

#### Test 3: Invalid Email Format

The browser's built-in validation prevents submission with invalid email format (type="email" attribute).

#### Test 4: Form Reset After Submission

1. Fill out and submit the form
2. Wait 5 seconds
3. **Expected:** Form resets to empty state

---

## Credit Application Testing

### Location
- **Component:** `components/CreditAppWizard.tsx`
- **API Endpoint:** `/api/credit-application/submit`
- **Page:** `/credit-application`

### Features Implemented

✅ **7-Step Wizard**
1. **Company Info** - Business details, entity type, EIN/SSN
2. **Owners/Principals** - Up to 4 owners with ownership percentages
3. **Bank Reference** - Banking information and authorization
4. **Trade References** - Up to 3 trade references
5. **Sales Profile** - Estimated usage and credit line request
6. **Documents** - File uploads (W-9, Tax Exemption, COI, Other)
7. **Sign & Submit** - E-signature with checkboxes and legal disclosures

✅ **Form Validation (Zod)**
- Schema validation for each step
- Type-safe data structures
- Error messages for invalid inputs
- Real-time validation on submit

✅ **File Upload System**
- **W-9 Form** (required)
- **Tax Exemption Certificate** (if applicable)
- **Certificate of Insurance** (optional)
- **Other Documents** (up to 5 additional files)
- Files uploaded to Supabase Storage (`credit-app-files` bucket)

✅ **E-Signature**
- Checkboxes for legal agreements:
  - Credit inquiry consent
  - TCPA email consent
  - Personal Guaranty (if required)
- Authorized signer name and title fields
- IP address capture
- Timestamp recording
- Agreement hash generation for verification

✅ **Progress Tracking**
- Visual progress bar (e.g., "Step 3 of 7: 43% Complete")
- Navigation: Back/Next buttons
- Step names displayed

✅ **Data Storage**
- Saves to Supabase `credit_applications` table
- Fields: company_name, estimated_monthly_gallons, data (JSON), files (JSON)
- Status tracking system ready

✅ **GA4 Analytics**
- `credit_app_started` - Tracks when wizard opens
- `credit_app_step_completed` - Tracks each step completion
- `credit_app_completed` - Tracks final submission

### Test Cases

#### Test 1: Complete Application Flow

**Manual Test Steps:**

1. Navigate to `/credit-application`
2. **Step 1 - Company Info:**
   - Fill in all required fields
   - Select entity type (LLC, Corporation, etc.)
   - Enter EIN or SSN
   - Click "Next"

3. **Step 2 - Owners:**
   - Add at least 1 owner
   - Ensure ownership percentages = 100%
   - Click "Next"

4. **Step 3 - Bank Reference:**
   - Enter bank name, account number, phone
   - Check authorization checkbox
   - Click "Next"

5. **Step 4 - Trade References:**
   - Add 1-3 trade references
   - Include company name, contact, phone
   - Click "Next"

6. **Step 5 - Sales Profile:**
   - Select products needed
   - Enter estimated monthly gallons
   - Request credit line amount
   - Click "Next"

7. **Step 6 - Documents:**
   - Upload W-9 (required)
   - Upload Tax Exemption Cert (optional)
   - Upload COI (optional)
   - Click "Next"

8. **Step 7 - Sign & Submit:**
   - Check all required consent boxes
   - Enter authorized signer name and title
   - Click "Submit Application"

**Expected Result:**
- Success page displays
- Submission ID shown
- Email sent to admin and customer
- Application saved to database

#### Test 2: File Upload Validation

```bash
# API Test for file upload
curl -X POST http://localhost:3000/api/credit-application/submit \
  -F "application=@/tmp/test-app.json;type=application/json" \
  -F "w9=@/tmp/test-w9.pdf;type=application/pdf"
```

**Expected:** Files uploaded to Supabase Storage, paths saved in database

#### Test 3: Form Validation

1. Try to proceed to next step without filling required fields
2. **Expected:** Error messages display, cannot proceed

#### Test 4: Step Navigation

1. Fill Step 1, click Next
2. Go back to Step 1
3. **Expected:** Previously entered data still present

---

## PDF Generation

### Status: ⚠️ **NOT YET IMPLEMENTED**

### Location
- `app/api/credit-application/submit/route.ts:101-102`

### Current Implementation

```typescript
// TODO: Generate PDF (implement with @react-pdf/renderer)
// const pdfUrl = await generatePDF(validated, submission.id);
```

The API returns:
```json
{
  "success": true,
  "submissionId": "abc123",
  "pdfUrl": null  // <-- Currently null
}
```

### Dependencies Required

**Missing Package:**
```bash
npm install @react-email/render
```

**Already Installed:**
- `@react-pdf/renderer` (v4.3.1) ✅

### Implementation Plan

1. **Create PDF Template**
   - File: `components/pdf/CreditApplicationPDF.tsx`
   - Use `@react-pdf/renderer` components
   - Include all application data, signatures, timestamps

2. **PDF Generation Function**
   - File: `lib/pdf-generator.ts`
   - Function: `generateCreditAppPDF(application: CreditApplication, submissionId: string)`
   - Returns: PDF as Buffer or Blob

3. **Upload to Storage**
   - Save PDF to Supabase Storage bucket: `credit-app-pdfs`
   - Generate public URL
   - Return URL in API response

4. **Attach to Email**
   - Admin email: Include PDF link
   - Customer email: Optionally attach PDF

### Test Case (Future)

```typescript
import { generateCreditAppPDF } from '@/lib/pdf-generator';

const pdf = await generateCreditAppPDF(applicationData, 'app-123');
const pdfUrl = await uploadPDFToStorage(pdf, 'app-123');

// Expected: pdfUrl = "https://....supabase.co/storage/v1/object/public/credit-app-pdfs/app-123.pdf"
```

---

## Email Routing

### Configuration

**Email Service:** Resend (https://resend.com)

**Environment Variables Required:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@penleyoil.com
ADMIN_EMAIL=info@penleyoil.com
EMAIL_CC=sales@penleyoil.com,accounting@penleyoil.com  # Optional, comma-separated
```

### Status

⚠️ **Configuration Required:**
- `RESEND_API_KEY` is **NOT** set in `.env.local`
- Emails will **FAIL** until key is added
- Error message: "Failed to send notification. Please call us at (405) 235-7553."

✅ **Implementation Complete:**
- Quote notification email (`lib/email.ts:34`)
- Quote confirmation email (`lib/email.ts:78`)
- Credit app notification email (`lib/email.ts:131`)
- Credit app confirmation email (`lib/email.ts:179`)

### Email Types

#### 1. Quote Notification (to Admin)

**Trigger:** Quote form submission
**Recipients:** `ADMIN_EMAIL` + `EMAIL_CC`
**Subject:** "New Quote Request - [Customer Name]"

**Content:**
- Customer contact info (name, email, phone, company)
- Service requested
- Message/details
- Link to source: "Submitted from www.penleyoil.com quote form"

#### 2. Quote Confirmation (to Customer)

**Trigger:** Quote form submission (non-blocking)
**Recipient:** Customer's email
**Subject:** "Thank You for Your Quote Request - Penley Oil"

**Content:**
- Personalized greeting
- Request summary
- Expected response time (1 business day)
- Phone number for immediate assistance
- Company contact info and hours

#### 3. Credit App Notification (to Admin)

**Trigger:** Credit application submission
**Recipients:** `ADMIN_EMAIL` + `EMAIL_CC`
**Subject:** "New Credit Application - [Company Name]"

**Content:**
- Company and contact info
- Application ID
- Link to admin dashboard: `/admin/credit-applications`

#### 4. Credit App Confirmation (to Customer)

**Trigger:** Credit application submission (non-blocking)
**Recipient:** Applicant's email
**Subject:** "Credit Application Received - Penley Oil"

**Content:**
- Personalized greeting
- Application ID
- Status: "Under Review"
- Expected review time (2-3 business days)
- Contact number for questions

### Test Cases

#### Test 1: Configure Resend API Key

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Generate API key
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_key_here
   EMAIL_FROM=noreply@penleyoil.com
   ADMIN_EMAIL=info@penleyoil.com
   ```
4. Restart dev server
5. Submit quote form
6. **Expected:** Email sent successfully

#### Test 2: Email Delivery

```bash
# After configuring RESEND_API_KEY
curl -X POST http://localhost:3000/api/quote/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "405-555-1234",
    "message": "Test quote",
    "service": "diesel-clear"
  }'
```

**Expected:**
- API returns success
- Admin receives notification email
- Customer receives confirmation email (check spam folder)

#### Test 3: Email Failure Handling

1. Submit form **without** RESEND_API_KEY configured
2. **Expected:**
   - API returns 500 error
   - Message: "Failed to send notification. Please call us at (405) 235-7553."
   - Application still saved to database (if Supabase is configured)

---

## GA4 Event Tracking

### Configuration

**Required Environment Variables:**
```env
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX  # Your Google Analytics 4 Measurement ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Google Tag Manager ID (optional)
```

### Implementation

**Location:** `lib/analytics.ts`

All events use the global `window.gaEvent()` function which wraps Google Analytics 4 `gtag()`.

### Events Tracked

#### 1. Lead Form Submit

**Event:** `lead_form_submit`
**Trigger:** Quote form successful submission
**Location:** `components/QuoteForm.tsx:74`

**Parameters:**
```typescript
{
  form_id: "quote-form",
  page_context: "/",  // Current page URL
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

**Test:**
```javascript
// In browser console after submitting quote form
window.dataLayer // Should contain lead_form_submit event
```

#### 2. Click to Call

**Event:** `click_to_call`
**Trigger:** Clicking phone number links
**Locations:** Header, Footer, Quote Form, Contact page

**Parameters:**
```typescript
{
  phone_number: "(405) 235-7553",
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

**Test:**
```javascript
// Click phone number in header
// Check console or GA4 DebugView
```

#### 3. Credit App Started

**Event:** `credit_app_started`
**Trigger:** Credit application page load
**Location:** `components/CreditAppWizard.tsx:64`

**Parameters:**
```typescript
{
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

#### 4. Credit App Step Completed

**Event:** `credit_app_step_completed`
**Trigger:** Clicking "Next" in credit app wizard
**Location:** `components/CreditAppWizard.tsx:76-79`

**Parameters:**
```typescript
{
  step_number: 3,
  step_name: "Bank Reference",
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

#### 5. Credit App Completed

**Event:** `credit_app_completed`
**Trigger:** Final submission of credit application
**Location:** `components/CreditAppWizard.tsx:127`

**Parameters:**
```typescript
{
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

#### 6. Page View

**Event:** `page_view`
**Trigger:** Client-side navigation (if implemented)
**Location:** `lib/analytics.ts:75`

**Parameters:**
```typescript
{
  page_location: "https://penleyoil.com/def",
  page_title: "DEF Supply | Penley Oil",
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

#### 7. CTA Click

**Event:** `cta_click`
**Trigger:** Call-to-action button clicks
**Usage:** `trackQuoteCTA('Schedule Delivery', '/def')`

**Parameters:**
```typescript
{
  cta_label: "Schedule Delivery",
  page_location: "/def",
  timestamp: "2025-10-24T14:30:00.000Z"
}
```

#### 8. External Link Click

**Event:** `external_link_click`
**Trigger:** Clicking external links
**Usage:** `trackExternalLink('https://example.com', 'Partner Site')`

#### 9. File Download

**Event:** `file_download`
**Trigger:** File downloads
**Usage:** `trackDownload('credit-app.pdf', 'application/pdf')`

### Test Cases

#### Test 1: GA4 DebugView

1. Go to Google Analytics 4
2. Navigate to: **Configure → DebugView**
3. Enable debug mode in browser console:
   ```javascript
   window.gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
   ```
4. Perform actions on site (submit form, click phone, etc.)
5. **Expected:** Events appear in DebugView in real-time

#### Test 2: DataLayer Inspection

```javascript
// In browser console
console.log(window.dataLayer);

// After submitting quote form, you should see:
[
  ...,
  {
    event: "lead_form_submit",
    form_id: "quote-form",
    page_context: "/",
    timestamp: "..."
  }
]
```

#### Test 3: Event Verification

1. Navigate to `/credit-application`
2. Complete all 7 steps
3. Submit application
4. **Expected Events:**
   - `credit_app_started` (on page load)
   - `credit_app_step_completed` (7 times, one per step)
   - `credit_app_completed` (on final submission)

---

## Configuration Checklist

### Required for Full Functionality

- [ ] **Resend API Key** (`RESEND_API_KEY`)
  - Sign up at https://resend.com
  - Generate API key
  - Add to `.env.local`

- [ ] **Email Configuration**
  - [ ] `EMAIL_FROM` - Sender email (e.g., noreply@penleyoil.com)
  - [ ] `ADMIN_EMAIL` - Recipient for notifications
  - [ ] `EMAIL_CC` - Optional CC recipients (comma-separated)

- [ ] **Google Analytics**
  - [ ] `NEXT_PUBLIC_GA4_ID` - GA4 Measurement ID
  - [ ] `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID (optional)

- [ ] **Supabase** (Already Configured ✅)
  - [x] `NEXT_PUBLIC_SUPABASE_URL`
  - [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [x] `SUPABASE_SERVICE_ROLE_KEY`

- [ ] **Supabase Storage Buckets**
  - [ ] Create bucket: `credit-app-files`
  - [ ] Create bucket: `credit-app-pdfs` (for PDF generation)
  - [ ] Set public access policies as needed

- [ ] **Supabase Tables** (Verify schema)
  - [ ] `quote_submissions` table exists
  - [ ] `credit_applications` table exists

### Optional Configuration

- [ ] **React Email Renderer** (for PDF generation)
  ```bash
  npm install @react-email/render
  ```

- [ ] **Chatbot Integration** (Already configured in layout)
  - [ ] `NEXT_PUBLIC_CHATBOT_PROVIDER`
  - [ ] `NEXT_PUBLIC_CHATBOT_KEY`

---

## Complete Test Suite

### Pre-Launch Testing Checklist

#### Quote Form
- [ ] Fill out all fields and submit
- [ ] Verify required field validation
- [ ] Test email format validation
- [ ] Check privacy consent requirement
- [ ] Submit with minimal required fields only
- [ ] Verify database record created
- [ ] Confirm admin email received
- [ ] Confirm customer email received
- [ ] Test error handling (remove Resend key)
- [ ] Verify GA4 event fires

#### Credit Application
- [ ] Complete all 7 steps
- [ ] Test back/forward navigation
- [ ] Verify data persistence between steps
- [ ] Test validation on each step
- [ ] Upload files (W-9, certificates)
- [ ] Test file upload limits
- [ ] Complete e-signature
- [ ] Verify IP address capture
- [ ] Check timestamp recording
- [ ] Verify database record created
- [ ] Confirm files uploaded to Supabase
- [ ] Confirm admin email received
- [ ] Confirm customer email received
- [ ] Verify all GA4 events fire

#### Email System
- [ ] Configure Resend API key
- [ ] Test quote notification email
- [ ] Test quote confirmation email
- [ ] Test credit app notification email
- [ ] Test credit app confirmation email
- [ ] Verify email delivery to inbox (not spam)
- [ ] Test CC recipients
- [ ] Check email formatting (HTML rendering)

#### Analytics
- [ ] Configure GA4 ID
- [ ] Enable DebugView
- [ ] Test all events fire correctly
- [ ] Verify event parameters
- [ ] Check dataLayer structure
- [ ] Test page view tracking
- [ ] Verify click-to-call tracking

#### PDF Generation (Future)
- [ ] Install @react-email/render
- [ ] Implement PDF generation function
- [ ] Test PDF creation
- [ ] Upload PDF to Supabase Storage
- [ ] Return PDF URL in API response
- [ ] Attach PDF to admin email

---

## Troubleshooting

### Quote Form Not Submitting

**Issue:** Form submits but returns error

**Check:**
1. Is `RESEND_API_KEY` configured?
2. Is Supabase connection working?
3. Check browser console for errors
4. Check server logs: `npm run dev`

**Fix:**
```env
# Add to .env.local
RESEND_API_KEY=re_your_key_here
ADMIN_EMAIL=info@penleyoil.com
```

### Credit App File Uploads Failing

**Issue:** Files not uploading

**Check:**
1. Is Supabase Storage configured?
2. Does `credit-app-files` bucket exist?
3. Are storage policies set correctly?
4. Check file size limits

**Fix:**
```sql
-- Create Supabase Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('credit-app-files', 'credit-app-files', false);

-- Set storage policy
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'credit-app-files');
```

### Emails Not Sending

**Issue:** Email delivery fails

**Check:**
1. Is Resend API key valid?
2. Is sender domain verified in Resend?
3. Check Resend dashboard for errors
4. Verify email addresses are valid

**Fix:**
1. Log in to Resend dashboard
2. Verify domain: https://resend.com/domains
3. Check API key permissions
4. Test with curl:
```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_your_key' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "noreply@penleyoil.com",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

### GA4 Events Not Tracking

**Issue:** Events not appearing in GA4

**Check:**
1. Is `NEXT_PUBLIC_GA4_ID` configured?
2. Is GA4 script loading? (Check Network tab)
3. Is `window.gaEvent` function defined?
4. Check DebugView in GA4

**Fix:**
```javascript
// Test in browser console
console.log(window.gaEvent); // Should be a function
window.gaEvent('test_event', { test: 'data' });
```

---

## Summary

### ✅ Fully Implemented & Ready
- Quote form validation
- Credit application 7-step wizard
- File upload system
- E-signature capture
- Database storage (Supabase)
- GA4 event tracking (all events)
- Error handling
- Form reset and success states

### ⚠️ Requires Configuration
- **Resend API Key** - For email functionality
- **Email addresses** - FROM, ADMIN, CC
- **GA4 Measurement ID** - For analytics
- **Supabase Storage buckets** - For file uploads

### 📝 TODO Items
- **PDF Generation** - Implement with @react-pdf/renderer
- **Install @react-email/render** package
- **Create PDF templates** for credit applications

### 🧪 Ready to Test
Once configuration is complete, all forms and features can be tested end-to-end. Follow the test cases in this document to verify functionality.

---

## Contact

For questions or issues during testing:
- **Developer:** Claude Code
- **Documentation Created:** October 24, 2025
- **Last Updated:** October 24, 2025

**Next Steps:**
1. Configure environment variables
2. Run test suite
3. Deploy to production
4. Monitor email delivery and analytics
