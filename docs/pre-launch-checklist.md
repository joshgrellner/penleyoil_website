# Pre-Launch Checklist

**Project:** Penley Oil Company Website
**Target Domain:** penleyoil.com
**Status:** Development Complete, Configuration Required

---

## 🔴 CRITICAL (Must Complete Before Launch)

### 1. Environment Variables Configuration

**File:** Create/Update `.env.local` and `.env.production`

```env
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@penleyoil.com
ADMIN_EMAIL=info@penleyoil.com
EMAIL_CC=sales@penleyoil.com,accounting@penleyoil.com  # Optional, comma-separated

# Google Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX        # Required for analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX         # Optional, for advanced tracking

# Supabase (Already Configured ✅)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://penleyoil.com

# Optional: Chatbot
NEXT_PUBLIC_CHATBOT_PROVIDER=anthropic  # or openai
NEXT_PUBLIC_CHATBOT_KEY=your_key_here
```

**Actions Required:**

- [ ] **Sign up for Resend** (https://resend.com)
  - Free tier: 100 emails/day, 3,000/month
  - Verify domain: penleyoil.com
  - Generate API key
  - Add to environment variables
  - **Time:** 15 minutes

- [ ] **Set up Google Analytics 4**
  - Create GA4 property
  - Copy Measurement ID (G-XXXXXXXXXX)
  - Add to environment variables
  - **Time:** 10 minutes

- [ ] **Add environment variables to Vercel** (if deploying there)
  - Go to Project Settings → Environment Variables
  - Add all variables for Production environment
  - Redeploy after adding
  - **Time:** 5 minutes

### 2. Supabase Configuration

**Database Tables** (Already Created ✅)
- [x] `quote_submissions`
- [x] `credit_applications`

**Storage Buckets** (Need to Create)

- [ ] Create bucket: `credit-app-files`
  ```sql
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('credit-app-files', 'credit-app-files', false);

  -- Set storage policy
  CREATE POLICY "Allow authenticated uploads"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'credit-app-files');
  ```

- [ ] Create bucket: `credit-app-pdfs` (for future PDF generation)
  ```sql
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('credit-app-pdfs', 'credit-app-pdfs', false);
  ```

**Time:** 10 minutes

### 3. Domain & DNS Configuration

- [ ] **Purchase/Verify Domain:** penleyoil.com
- [ ] **Configure DNS Records** (if using Vercel):
  ```
  A     @       76.76.21.21
  CNAME www     cname.vercel-dns.com
  ```
- [ ] **Or point nameservers to Vercel:**
  ```
  ns1.vercel-dns.com
  ns2.vercel-dns.com
  ```
- [ ] **Verify domain in Vercel dashboard**

**Time:** 15-30 minutes (depending on DNS propagation)

### 4. SSL Certificate

- [ ] **Automatic with Vercel** (no action needed)
- [ ] **Or configure Let's Encrypt** (if self-hosting)

**Time:** Automatic

### 5. Google Search Console

- [ ] **Add property:** https://penleyoil.com
- [ ] **Add property:** https://www.penleyoil.com
- [ ] **Verify ownership** (DNS TXT record or HTML file)
- [ ] **Submit sitemap:** https://penleyoil.com/sitemap.xml

**Current Status:** Placeholder tokens in `app/layout.tsx:55-56`
```html
<!-- <meta name="google-site-verification" content="<TOKEN-for-https://penleyoil.com>" /> -->
<!-- <meta name="google-site-verification" content="<TOKEN-for-https://www.penleyoil.com>" /> -->
```

**Actions:**
- [ ] Uncomment and add real verification tokens
- [ ] Submit sitemap to Search Console

**Time:** 15 minutes

---

## 🟡 IMPORTANT (Should Complete Before Launch)

### 6. Email Domain Verification (Resend)

- [ ] Add DNS records to verify penleyoil.com:
  ```
  TXT  _resend   [provided by Resend]
  MX   @         feedback-smtp.us-east-1.amazonses.com (priority 10)
  ```
- [ ] Verify domain in Resend dashboard
- [ ] Test email delivery

**Time:** 20 minutes

### 7. Test All Forms End-to-End

- [ ] **Test Quote Form:**
  - [ ] Fill out and submit
  - [ ] Verify email received by admin
  - [ ] Verify confirmation email sent to customer
  - [ ] Check database record created
  - [ ] Verify GA4 event fires

- [ ] **Test Credit Application:**
  - [ ] Complete all 7 steps
  - [ ] Upload test files (W-9, certificates)
  - [ ] Verify files uploaded to Supabase Storage
  - [ ] Verify email received by admin
  - [ ] Verify confirmation email sent to applicant
  - [ ] Check database record created
  - [ ] Verify all GA4 events fire (9 total)

**Time:** 30 minutes

### 8. UptimeRobot Monitoring

- [ ] **Sign up:** https://uptimerobot.com (Free: 50 monitors)
- [ ] **Create HTTP(s) monitor:**
  ```
  URL: https://penleyoil.com/healthz
  Interval: 1 minute
  Expected Response: 200 OK
  Keyword: "status":"ok"
  ```
- [ ] **Add alert contacts:**
  - [ ] Email notification
  - [ ] SMS notification (optional)
  - [ ] Slack/Discord webhook (optional)
- [ ] **Enable SSL monitoring**

**Time:** 15 minutes

### 9. Google Tag Manager (Optional)

If using GTM instead of direct GA4:

- [ ] Create GTM container
- [ ] Add GTM ID to environment variables
- [ ] Configure tags in GTM dashboard
- [ ] Publish container

**Time:** 30 minutes (if needed)

### 10. Run Lighthouse Audits

- [ ] **Test all 4 key pages** (target ≥95 mobile):
  - [ ] Home (`/`)
  - [ ] DEF (`/def`)
  - [ ] Deliveries (`/deliveries`)
  - [ ] Credit Application (`/credit-application`)

**Current Status:** Optimizations already applied:
- ✅ Font loading optimized (`display: swap`, `preload: true`)
- ✅ CLS fixes (min-height on heroes, logo sized)
- ✅ Images optimized (Next.js Image component)

**Command:**
```bash
lighthouse https://penleyoil.com/ \
  --preset=desktop \
  --emulated-form-factor=mobile \
  --output=html \
  --output-path=./lighthouse-home.html
```

**Time:** 20 minutes

---

## 🟢 OPTIONAL (Can Defer to Post-Launch)

### 11. Implement PDF Generation

**Status:** Currently marked as TODO in code

**File:** `app/api/credit-application/submit/route.ts:101-102`

**Dependencies:**
- ✅ `@react-pdf/renderer@4.3.1` - Installed
- ✅ `@react-email/render` - Installed

**Implementation Steps:**
1. Create PDF template: `components/pdf/CreditApplicationPDF.tsx`
2. Create generator function: `lib/pdf-generator.ts`
3. Upload PDF to Supabase Storage: `credit-app-pdfs`
4. Return PDF URL in API response
5. Attach PDF to admin email

**Time:** 4-6 hours

**Priority:** Medium (app works without it, data is in database)

### 12. Create Admin Dashboard

**Purpose:** View and manage quote submissions and credit applications

**Location:** `/admin/credit-applications`

**Features:**
- [ ] List all submissions
- [ ] Filter by status (new, reviewing, approved, denied)
- [ ] View submission details
- [ ] Download PDFs
- [ ] Update status
- [ ] Add notes

**Time:** 8-12 hours

**Priority:** Low (can use Supabase dashboard initially)

### 13. Add Save/Resume to Credit App

**Purpose:** Allow users to save progress and resume later

**Implementation:**
- [ ] Add "Save & Exit" button
- [ ] Store partial data in database or localStorage
- [ ] Generate resume token/link
- [ ] Send resume link via email
- [ ] Validate token on resume

**Time:** 4-6 hours

**Priority:** Low (most users complete in one session)

### 14. Implement Rate Limiting

**Purpose:** Prevent spam and abuse on form submissions

**Options:**
1. Vercel Edge Config + Middleware
2. Redis + rate-limit library
3. Cloudflare rate limiting

**Time:** 2-3 hours

**Priority:** Low (monitor first, add if needed)

### 15. Set Up Error Tracking

**Options:**
- Sentry (recommended)
- LogRocket
- Bugsnag

**Actions:**
- [ ] Sign up for service
- [ ] Add SDK to project
- [ ] Configure error reporting
- [ ] Test error capture

**Time:** 1 hour

**Priority:** Medium (helpful for debugging production issues)

---

## 📋 Deployment Checklist

### If Using Vercel (Recommended)

1. **Connect Repository:**
   - [ ] Push code to GitHub
   - [ ] Connect repository to Vercel
   - [ ] Select Next.js framework preset

2. **Configure Build Settings:**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Add Environment Variables:**
   - [ ] Add all production environment variables
   - [ ] Ensure `NEXT_PUBLIC_*` variables are set

4. **Deploy:**
   - [ ] Click "Deploy"
   - [ ] Wait for build to complete
   - [ ] Verify deployment

5. **Configure Domain:**
   - [ ] Add custom domain: penleyoil.com
   - [ ] Add www subdomain
   - [ ] Wait for DNS propagation
   - [ ] Verify SSL certificate issued

**Time:** 30 minutes (excluding DNS propagation)

### If Self-Hosting

1. **Server Setup:**
   - [ ] Provision server (Ubuntu 22.04 recommended)
   - [ ] Install Node.js 18+
   - [ ] Install nginx or Apache
   - [ ] Install PM2 for process management

2. **Deploy Application:**
   ```bash
   git clone <repository>
   cd penleyoil-website
   npm install
   npm run build
   pm2 start npm --name "penleyoil" -- start
   ```

3. **Configure Reverse Proxy:**
   ```nginx
   server {
       listen 80;
       server_name penleyoil.com www.penleyoil.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

4. **Set Up SSL:**
   ```bash
   sudo certbot --nginx -d penleyoil.com -d www.penleyoil.com
   ```

**Time:** 2-3 hours

---

## 🧪 Final Testing Checklist

### Functionality Tests

- [ ] **Navigation**
  - [ ] All menu links work
  - [ ] Mobile menu works
  - [ ] Breadcrumbs work
  - [ ] Footer links work

- [ ] **Forms**
  - [ ] Quote form submits successfully
  - [ ] Credit application completes all 7 steps
  - [ ] File uploads work
  - [ ] Emails are received

- [ ] **Pages Load**
  - [ ] Home page loads
  - [ ] All service pages load
  - [ ] All industry pages load
  - [ ] Contact page loads
  - [ ] Credit application loads

- [ ] **Mobile Responsive**
  - [ ] Test on iPhone (Safari)
  - [ ] Test on Android (Chrome)
  - [ ] Test on tablet

- [ ] **Cross-Browser**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Performance Tests

- [ ] **Lighthouse Scores ≥95:**
  - [ ] Performance
  - [ ] Accessibility
  - [ ] Best Practices
  - [ ] SEO

- [ ] **Load Times:**
  - [ ] Home page < 2s
  - [ ] Service pages < 2s
  - [ ] Credit app < 2.5s

- [ ] **Images:**
  - [ ] All images load
  - [ ] No broken images
  - [ ] Alt text present

### Security Tests

- [ ] **HTTPS enabled**
- [ ] **SSL certificate valid**
- [ ] **No mixed content warnings**
- [ ] **Security headers configured**
- [ ] **CSRF protection enabled** (Next.js default)

### SEO Tests

- [ ] **Meta titles present on all pages**
- [ ] **Meta descriptions present on all pages**
- [ ] **Open Graph tags present**
- [ ] **Twitter Card tags present**
- [ ] **JSON-LD schema present**
- [ ] **Robots.txt exists**
- [ ] **Sitemap.xml exists**
- [ ] **Canonical URLs set**

### Analytics Tests

- [ ] **GA4 tracking code loads**
- [ ] **Page views tracked**
- [ ] **Events fire:**
  - [ ] lead_form_submit
  - [ ] click_to_call
  - [ ] credit_app_started
  - [ ] credit_app_step_completed
  - [ ] credit_app_completed
- [ ] **Check GA4 Realtime report**

---

## 📊 Time Estimates

### Critical Tasks (Must Complete)
| Task | Time | Status |
|------|------|--------|
| Environment variables | 30 min | ⚠️ TODO |
| Supabase Storage buckets | 10 min | ⚠️ TODO |
| Domain/DNS setup | 30 min | ⚠️ TODO |
| Google Search Console | 15 min | ⚠️ TODO |
| **TOTAL CRITICAL** | **1.5 hours** | |

### Important Tasks (Should Complete)
| Task | Time | Status |
|------|------|--------|
| Email domain verification | 20 min | ⚠️ TODO |
| Test forms end-to-end | 30 min | ⚠️ TODO |
| UptimeRobot setup | 15 min | ⚠️ TODO |
| Lighthouse audits | 20 min | ⚠️ TODO |
| **TOTAL IMPORTANT** | **1.5 hours** | |

### Optional Tasks (Can Defer)
| Task | Time | Status |
|------|------|--------|
| PDF generation | 4-6 hours | ❌ Deferred |
| Admin dashboard | 8-12 hours | ❌ Deferred |
| Save/resume feature | 4-6 hours | ❌ Deferred |
| **TOTAL OPTIONAL** | **16-24 hours** | |

### **GRAND TOTAL (Critical + Important):** 3 hours

---

## 🚀 Launch Day Checklist

**Morning of Launch:**

1. **Final Smoke Test:**
   - [ ] Test quote form submission
   - [ ] Test credit application
   - [ ] Verify emails arrive
   - [ ] Check all pages load

2. **Verify Configuration:**
   - [ ] All environment variables set
   - [ ] SSL certificate active
   - [ ] DNS propagated
   - [ ] Analytics tracking

3. **Monitoring Setup:**
   - [ ] UptimeRobot monitoring active
   - [ ] GA4 Realtime working
   - [ ] Email notifications configured

4. **Backup Plan:**
   - [ ] Have rollback plan ready
   - [ ] Keep old site accessible (if replacing)
   - [ ] Have phone numbers for domain/hosting support

5. **Announcement:**
   - [ ] Update social media
   - [ ] Send email to customers (optional)
   - [ ] Update Google My Business

**After Launch:**

- [ ] Monitor UptimeRobot for downtime
- [ ] Check GA4 Realtime for traffic
- [ ] Watch for error emails (Resend dashboard)
- [ ] Monitor form submissions (Supabase dashboard)
- [ ] Run Lighthouse audit on live site

---

## 📞 Support Contacts

**Development Issues:**
- Claude Code documentation in `docs/` folder
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs

**Services:**
- Vercel Support: https://vercel.com/support
- Resend Support: https://resend.com/support
- Supabase Support: https://supabase.com/support

**Emergency:**
- If site goes down, check UptimeRobot alerts
- Check Vercel deployment logs
- Check Supabase status: https://status.supabase.com
- Review error logs in Next.js console

---

## ✅ What's Already Done

**Development Complete:**
- [x] All pages built and styled
- [x] Quote form with validation
- [x] Credit application 7-step wizard
- [x] E-signature implementation
- [x] File upload system
- [x] Email templates
- [x] GA4 event tracking (all 9 events)
- [x] Database integration (Supabase)
- [x] SEO optimization (meta tags, JSON-LD, sitemaps)
- [x] Performance optimization (font loading, CLS fixes)
- [x] Health check endpoint (`/healthz`)
- [x] Mobile responsive design
- [x] Accessibility features

**Documentation Complete:**
- [x] `docs/lighthouse.md` - Performance optimization guide
- [x] `docs/testing-guide.md` - Comprehensive testing guide
- [x] `docs/forms-qa.md` - E2E QA report
- [x] `README.md` - Project overview
- [x] `docs/pre-launch-checklist.md` - This document

**Code Quality:**
- [x] TypeScript for type safety
- [x] Zod schema validation
- [x] Error handling
- [x] Security best practices
- [x] TCPA/FCRA compliance

---

## 🎯 Summary

**To go live, you need to:**

1. **Configure 3 services** (~1 hour):
   - Resend (email)
   - Google Analytics (tracking)
   - Supabase Storage (file uploads)

2. **Set up domain** (~30 minutes):
   - Point DNS to Vercel
   - Wait for SSL certificate

3. **Test everything** (~30 minutes):
   - Submit forms
   - Verify emails
   - Check analytics

4. **Set up monitoring** (~15 minutes):
   - UptimeRobot
   - Google Search Console

**Total Time:** ~3 hours

**The site is 95% ready.** It's just configuration and testing!

---

**Last Updated:** October 24, 2025
**Status:** Ready for configuration and deployment
