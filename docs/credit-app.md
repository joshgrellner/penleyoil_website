# Credit Application Implementation Guide

## Overview

The credit application system at `/credit-application` is a multi-step wizard that collects business information, validates it, and prepares it for submission.

## Current Implementation Status

### ✅ Completed Features

1. **Multi-Step Wizard Component** (`/components/CreditAppWizard.tsx`)
   - 7-step form with progress tracking
   - Step navigation pills with visual feedback
   - Save & Resume placeholder (browser storage fallback)
   - Form state management across steps

2. **Individual Step Components** (`/components/credit-app/`)
   - **CompanyInfoStep**: Legal name, FEIN, entity type, billing address, AP contact
   - **OwnersStep**: Owner/principal information (basic implementation)
   - **BankReferenceStep**: Bank information, contact details
   - **TradeReferencesStep**: 3 trade references with company details
   - **SalesProfileStep**: Product selection, monthly gallons, delivery cities
   - **FileUploadsStep**: W-9, tax certificates, COI, other docs (drag-drop ready)
   - **AgreementsStep**: Consent checkboxes, signature pad integration
   - **ThankYouStep**: Confirmation page with next steps

3. **Validation Schema** (`/lib/credit-app-schema.ts`)
   - Zod schemas for all form steps
   - TypeScript types exported for type safety
   - Field-level validation rules

4. **Page & Routing**
   - `/credit-application` route created
   - SEO metadata configured
   - FAQ schema markup added
   - Navigation links in header (Resources dropdown)

5. **Environment Configuration**
   - `.env.example` with all required variables
   - `.env.local` for local development
   - Email, database, and API key placeholders

### 🚧 Pending Implementation

The following features are **designed but not yet implemented**:

1. **Backend API Route** (`/app/api/credit-application/submit/route.ts`)
   - Needs to be created to handle form submissions
   - Should process FormData with files
   - Validate with Zod schemas
   - Store in database (Supabase/Prisma)
   - Upload files to secure storage
   - Generate PDF
   - Send emails

2. **PDF Generation**
   - Install: `@react-pdf/renderer` (already installed)
   - Create PDF template with Penley branding
   - Include all form data, signatures, timestamps
   - Generate hash of signed payload for verification

3. **Email Integration**
   - Configure Resend/SendGrid/similar service
   - Email PDF to `credit@penleyoil.com` and `ap@penleyoil.com`
   - Include application summary in email body
   - Confirmation email to applicant

4. **Database Schema**
   ```sql
   -- Example Prisma/Supabase schema
   table credit_applications {
     id: uuid primary key
     company_name: text
     submitted_at: timestamp
     status: enum(New, Under Review, Approved, Declined)
     estimated_monthly_gallons: integer
     data: jsonb  -- Full application data
     files: jsonb -- File URLs
     internal_notes: text
     created_at: timestamp
     updated_at: timestamp
   }
   ```

5. **Admin Viewer** (`/app/admin/credit-applications/page.tsx`)
   - Basic auth middleware
   - List view with table (company, date, status, gallons)
   - Detail view with all fields
   - Status update dropdown
   - Internal notes textarea
   - File download links
   - CSV export function

6. **Save & Resume Feature**
   - Generate magic link with JWT token
   - Email magic link to applicant
   - Store partial application in database
   - Resume from token

7. **Spam Protection**
   - Integrate hCaptcha or reCAPTCHA
   - Rate limiting on submission endpoint
   - IP tracking

8. **Signature Enhancements**
   - Already integrated `react-signature-canvas`
   - Add typed signature option
   - Capture IP address automatically
   - Generate timestamp
   - Create hash of agreement text

9. **Personal Guaranty Logic**
   - Toggle in OwnersStep
   - When enabled, require initials + separate signature
   - Add to PDF as separate page

10. **Bank Account Masking**
    - Only store last 4 digits
    - Never email full account number
    - Mask in UI inputs

## Implementation Steps

### Step 1: Set Up Database (Supabase Recommended)

1. Create Supabase project
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```
3. Run SQL to create table:
   ```sql
   create table credit_applications (
     id uuid default gen_random_uuid() primary key,
     company_name text not null,
     submitted_at timestamp with time zone default now(),
     status text default 'New',
     estimated_monthly_gallons integer,
     data jsonb not null,
     files jsonb,
     internal_notes text,
     created_at timestamp with time zone default now(),
     updated_at timestamp with time zone default now()
   );
   ```
4. Set up Storage bucket for file uploads:
   ```sql
   insert into storage.buckets (id, name, public)
   values ('credit-app-files', 'credit-app-files', false);
   ```

### Step 2: Create Submission API Route

Create `/app/api/credit-application/submit/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { creditApplicationSchema } from '@/lib/credit-app-schema';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const applicationData = JSON.parse(formData.get('application') as string);

    // Validate
    const validated = creditApplicationSchema.parse(applicationData);

    // Upload files
    const files: any = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const { data, error } = await supabase.storage
          .from('credit-app-files')
          .upload(`${Date.now()}-${value.name}`, value);

        if (!error) files[key] = data.path;
      }
    }

    // Store in database
    const { data: submission, error } = await supabase
      .from('credit_applications')
      .insert({
        company_name: validated.companyInfo.legalName,
        estimated_monthly_gallons: validated.salesProfile.estimatedMonthlyGallons,
        data: validated,
        files,
      })
      .select()
      .single();

    if (error) throw error;

    // Generate PDF (implement with @react-pdf/renderer)
    // const pdfUrl = await generatePDF(validated, submission.id);

    // Send emails (implement with Resend/SendGrid)
    // await sendCreditAppEmail(validated, pdfUrl);

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      pdfUrl: null, // TODO: implement
    });
  } catch (error) {
    console.error('Credit app submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Submission failed' },
      { status: 500 }
    );
  }
}
```

### Step 3: Configure Email Service

1. Sign up for Resend (resend.com)
2. Add API key to `.env.local`:
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxx
   EMAIL_FROM=noreply@penleyoil.com
   ```
3. Create email template in `/lib/emails/credit-app-email.tsx`

### Step 4: Implement PDF Generation

Use `@react-pdf/renderer` to create branded PDF:

```typescript
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const CreditAppPDF = ({ data }: { data: CreditApplication }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Penley Oil Company</Text>
        <Text>Credit Application</Text>
      </View>
      {/* Add all form fields */}
    </Page>
  </Document>
);

export async function generatePDF(data: CreditApplication) {
  const blob = await pdf(<CreditAppPDF data={data} />).toBlob();
  // Upload blob to storage
  return url;
}
```

### Step 5: Build Admin Panel

Create `/app/admin/credit-applications/page.tsx` with basic auth.

## Analytics Events

The following GA4 events are already implemented:

- `credit_app_step_completed` - Fires when each step is completed
- `credit_app_completed` - Fires on successful submission with company name and gallons

Add these to track additional interactions:

- `credit_app_started` - When wizard loads
- `credit_app_resumed` - When magic link is used
- `credit_app_uploaded_file` - When file is uploaded

## Security Considerations

1. **Data Encryption**: All data stored encrypted at rest
2. **HTTPS Only**: Enforce SSL in production
3. **Rate Limiting**: Prevent spam submissions
4. **Input Validation**: Server-side validation with Zod
5. **File Scanning**: Scan uploaded files for viruses
6. **Access Control**: Admin routes behind authentication
7. **Audit Log**: Track all status changes and views

## Testing Checklist

Before going live:

- [ ] Test all 7 steps of the form
- [ ] Validate error messages appear correctly
- [ ] Test file uploads (PDF, JPG, PNG)
- [ ] Verify signature capture works
- [ ] Test on mobile devices
- [ ] Confirm emails are sent
- [ ] Verify PDF generation
- [ ] Test database storage
- [ ] Check admin panel access
- [ ] Test CSV export
- [ ] Verify analytics events fire
- [ ] Test with screen reader for accessibility
- [ ] Check page load performance

## Maintenance

### Updating Form Fields

1. Update schema in `/lib/credit-app-schema.ts`
2. Update step component in `/components/credit-app/[StepName].tsx`
3. Update PDF template
4. Update database migration if needed
5. Update admin viewer

### Changing Email Recipients

Update `.env.local`:
```bash
CREDIT_APP_EMAIL_TO=newcredit@penleyoil.com
CREDIT_APP_EMAIL_CC=newap@penleyoil.com
```

## Support

For questions or issues with the credit application system, contact:
- Development Team
- Email: tech@penleyoil.com
- Phone: (405) 235-7553
