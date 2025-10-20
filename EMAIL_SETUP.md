# Email Notification System Setup

## Overview

The website uses **Resend** for sending email notifications. This system handles:
- Quote form submissions
- Credit application notifications
- Customer confirmations

---

## Quick Start

### 1. Get a Resend API Key

1. Go to https://resend.com
2. Sign up for free account (100 emails/day free tier)
3. Verify your domain OR use onboarding email for testing
4. Create an API key in dashboard

### 2. Add Environment Variables

Add to `.env.local`:

```bash
# Resend Email Service
RESEND_API_KEY=re_...

# Email Configuration
EMAIL_FROM=noreply@penleyoil.com  # Must be verified domain
ADMIN_EMAIL=info@penleyoil.com    # Where quote/credit app notifications go
EMAIL_CC=sales@penleyoil.com,support@penleyoil.com  # Optional CC recipients (comma-separated)
```

### 3. Run Database Migration

Run in Supabase SQL Editor:

```bash
# Copy contents of supabase-quote-submissions.sql
```

This creates the `quote_submissions` table for storing quote form data.

### 4. Verify Domain (Production)

For production, you MUST verify your domain in Resend:

1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter `penleyoil.com`
4. Add the provided DNS records (DKIM, SPF, DMARC)
5. Wait for verification (usually 5-10 minutes)

---

## Email Flows

### Quote Form Submission

**Trigger:** Customer submits quote form on website

**Emails Sent:**

1. **Admin Notification** → `ADMIN_EMAIL` + `EMAIL_CC`
   - Subject: "New Quote Request - [Customer Name]"
   - Contains: Contact info, service requested, message, delivery details
   - Critical: Blocks submission if fails

2. **Customer Confirmation** → Customer's email
   - Subject: "Thank You for Your Quote Request - Penley Oil"
   - Contains: Confirmation message, request details, contact info
   - Non-critical: Failure logged but doesn't block submission

**API Endpoint:** `/api/quote/submit`

### Credit Application Submission

**Trigger:** Customer completes credit application wizard

**Emails Sent:**

1. **Admin Notification** → `ADMIN_EMAIL` + `EMAIL_CC`
   - Subject: "New Credit Application - [Company Name]"
   - Contains: Company info, contact details, application ID, link to admin panel
   - Critical: Blocks submission if fails

2. **Customer Confirmation** → Customer's email
   - Subject: "Credit Application Received - Penley Oil"
   - Contains: Application ID, status, next steps
   - Non-critical: Failure logged but doesn't block submission

**API Endpoint:** `/api/credit-application/submit`

---

## Testing

### Test Quote Form

```bash
curl -X POST http://localhost:3000/api/quote/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "phone": "(405) 555-1234",
    "company": "Test Company",
    "message": "Test quote request\n\nDelivery Details:\n- Location: Oklahoma City\n- Product: diesel-clear\n- Quantity: 500 gallons\n- Timeframe: this-week",
    "service": "diesel-clear"
  }'
```

**Expected:**
- Admin receives notification email
- Customer receives confirmation email
- Quote saved to `quote_submissions` table
- Returns: `{"success":true,"message":"Quote request submitted successfully","quoteId":"..."}`

### Check Email Logs

1. Go to Resend Dashboard → Logs
2. Verify emails were sent
3. Check delivery status

---

## Configuration Details

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | Resend API key | `re_123abc...` |
| `EMAIL_FROM` | Yes | From email address (must be verified) | `noreply@penleyoil.com` |
| `ADMIN_EMAIL` | Yes | Admin notification recipient | `info@penleyoil.com` |
| `EMAIL_CC` | No | CC recipients (comma-separated) | `sales@penleyoil.com,ap@penleyoil.com` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Website URL for links in emails | `https://www.penleyoil.com` |

### Email Templates

All email templates are in `/lib/email.ts`:

- `sendQuoteNotificationToAdmin()` - Quote form admin notification
- `sendQuoteConfirmationToCustomer()` - Quote form customer confirmation
- `sendCreditAppNotificationToAdmin()` - Credit app admin notification
- `sendCreditAppConfirmationToCustomer()` - Credit app customer confirmation

**Customization:**
Edit the HTML in `/lib/email.ts` to change email design/content.

---

## Database Schema

### `quote_submissions` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `name` | TEXT | Customer name |
| `email` | TEXT | Customer email (optional) |
| `phone` | TEXT | Customer phone |
| `company` | TEXT | Company name (optional) |
| `message` | TEXT | Quote request message |
| `service` | TEXT | Service requested |
| `status` | TEXT | Status: new, contacted, quoted, converted, declined |
| `notes` | TEXT | Admin notes |
| `assigned_to` | TEXT | Assigned team member |
| `created_at` | TIMESTAMPTZ | Submission timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |
| `contacted_at` | TIMESTAMPTZ | When customer was contacted |
| `quoted_at` | TIMESTAMPTZ | When quote was sent |

**Indexes:**
- `created_at DESC` - For sorting by date
- `status` - For filtering by status
- `email` - For searching by email

---

## Troubleshooting

### Emails Not Sending

1. **Check API key:**
   ```bash
   echo $RESEND_API_KEY
   ```

2. **Check domain verification:**
   - Go to Resend Dashboard → Domains
   - Ensure status is "Verified"

3. **Check logs:**
   ```bash
   # In browser console or server logs
   # Look for "Failed to send..." errors
   ```

4. **Test with curl:**
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer $RESEND_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "noreply@penleyoil.com",
       "to": "test@example.com",
       "subject": "Test Email",
       "html": "<h1>Test</h1>"
     }'
   ```

### Emails Going to Spam

1. **Verify domain properly** - Must have DKIM, SPF, DMARC
2. **Use verified "From" address** - Don't use free email domains
3. **Avoid spammy content** - No all caps, excessive exclamation marks
4. **Test with mail-tester.com**

### Database Errors

1. **Check table exists:**
   ```sql
   SELECT * FROM quote_submissions LIMIT 1;
   ```

2. **Run migration:**
   - Copy `supabase-quote-submissions.sql`
   - Paste into Supabase SQL Editor
   - Click "Run"

---

## Production Checklist

Before going live:

- [ ] Domain verified in Resend
- [ ] DNS records (DKIM, SPF, DMARC) configured
- [ ] `EMAIL_FROM` uses verified domain
- [ ] `ADMIN_EMAIL` set to correct email
- [ ] `EMAIL_CC` includes all stakeholders
- [ ] Database migration run in production Supabase
- [ ] Test quote form submission
- [ ] Test credit application submission
- [ ] Verify emails arrive in inbox (not spam)
- [ ] Check Resend dashboard shows successful sends

---

## Resend Free Tier Limits

- **100 emails/day** (free)
- **100 emails/month** with test mode
- Upgrade to Pro: 50,000 emails/month for $20

**Estimate for Penley Oil:**
- Assuming 5-10 quote forms/day = 10-20 emails/day
- Assuming 1-2 credit apps/day = 2-4 emails/day
- **Total: ~15-25 emails/day** = Well within free tier

If you exceed limits, upgrade to Pro ($20/month).

---

## Cost Comparison

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Resend** | 100/day | 50k/month @ $20 |
| SendGrid | 100/day | 40k/month @ $20 |
| Mailgun | 5k/month | 50k/month @ $35 |
| AWS SES | 3k/month | $0.10 per 1k |

**Resend is recommended** for ease of setup and generous free tier.

---

## Support

**Resend Documentation:** https://resend.com/docs
**Resend Status:** https://status.resend.com
**Supabase SQL Editor:** https://supabase.com/dashboard/project/[project-id]/sql

---

**Last Updated:** 2025-10-20
