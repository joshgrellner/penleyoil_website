# Penley Oil Website - Deployment Checklist

## ✅ Completed Items

### 1. Site Functionality Testing
**Status:** PASSED ✅
- **Homepage:** All sections load correctly, green headers, dark readable text
- **Contact Page:** Form functional, red emergency header, Google Maps embedded
- **Fuel Delivery:** All 5 fuel types display (including kerosene), 300 gal minimum
- **DEF Page:** No climate control mention, totes info accurate, 250 gal minimum
- **Tanks Page:** All tank types correct (single/double wall, cube), no compliance mentions
- **Lubricants:** VP Racing added, green headers, heavy duty oils included

**Live URLs:**
- Main: https://penleyoil-website.vercel.app
- Staging: https://staging.penleyoil.com
- Staging Alt: https://staging.getpenleyoil.com

### 2. Contact Form Configuration
**Status:** CONFIGURED ✅
- Form submits to `/api/quote/submit`
- Emails sent via Resend API to `info@penleyoil.com`
- Customer confirmation emails sent automatically
- Data stored in Supabase database
- TCPA/Privacy compliance checkboxes included
- Error handling with fallback phone number

**Environment Variables Set:**
- ✅ RESEND_API_KEY
- ✅ ADMIN_EMAIL
- ✅ EMAIL_FROM
- ✅ SUPABASE_URL
- ✅ SUPABASE_SERVICE_ROLE_KEY

### 3. Mobile Responsiveness
**Status:** OPTIMIZED ✅
- Uses Tailwind CSS responsive classes throughout
- Breakpoints: `md:`, `lg:`, `xl:` for tablets/desktop
- Mobile-first design approach
- All grids collapse properly on mobile
- Touch-friendly buttons and forms
- Hamburger menu for mobile navigation

**Test on these devices:**
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Desktop (Chrome, Firefox, Safari)

### 4. Google Maps Embed
**Status:** WORKING ✅
- Embedded on contact page (app/contact/page.tsx:154)
- Address: 2627 W. Reno Ave, Oklahoma City, OK 73107
- Includes "Get Directions" link
- Iframe lazy-loaded for performance

### 5. Emergency Contact Numbers
**Status:** VERIFIED ✅
- Phone: (405) 235-7553
- All phone links use `tel:4052357553` protocol
- Clickable on mobile devices
- Analytics tracking on click-to-call
- Emergency section prominently displayed with RED header

### 6. SEO Configuration
**Status:** OPTIMIZED ✅

**Global SEO (app/layout.tsx):**
- ✅ Metadata base URL set
- ✅ Title template configured
- ✅ Keywords included
- ✅ Robots meta tags configured
- ✅ Google Search Console verification placeholder
- ✅ OpenGraph & Twitter cards on all pages
- ✅ Canonical URLs set
- ✅ Structured data (Schema.org JSON-LD) on all service pages

**Per-Page SEO:**
- ✅ All pages have unique titles
- ✅ All pages have unique descriptions
- ✅ All pages have OpenGraph images
- ✅ Service pages have LocalBusiness schema
- ✅ FAQ pages have FAQPage schema

**TODO: Google Search Console**
1. Add property for penleyoil.com
2. Add property for www.penleyoil.com
3. Get verification codes
4. Update app/layout.tsx lines 58-59 with verification codes
5. Submit sitemap: https://penleyoil.com/sitemap.xml

---

## 🔧 Pending Setup

### 7. Google Analytics 4 (GA4)
**Status:** READY TO CONFIGURE ⚠️

**Current Setup:**
- ✅ GA4 tracking code already integrated in app/layout.tsx:92-108
- ✅ PageViewTracker component active
- ⚠️ Need to set NEXT_PUBLIC_GA4_ID environment variable

**Setup Instructions:**

#### Step 1: Create GA4 Property
1. Go to https://analytics.google.com
2. Click "Admin" (gear icon, bottom left)
3. Under "Property" column, click "Create Property"
4. Fill in property details:
   - Property name: "Penley Oil Website"
   - Reporting time zone: Central Time (US & Canada)
   - Currency: USD
5. Click "Next" → Select industry: "Energy & Utilities"
6. Select business size and objectives
7. Click "Create" → Accept terms

#### Step 2: Get Measurement ID
1. In Admin → Property column → "Data Streams"
2. Click "Add stream" → "Web"
3. Enter website URL: https://www.penleyoil.com
4. Stream name: "Penley Oil Main Site"
5. Click "Create stream"
6. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

#### Step 3: Add to Vercel
```bash
# Add GA4 ID to Vercel environment variables
vercel env add NEXT_PUBLIC_GA4_ID

# When prompted:
# - Enter your G-XXXXXXXXXX measurement ID
# - Select: Production, Preview, Development (all three)
```

#### Step 4: Verify Tracking
1. Deploy to Vercel (auto-deploys after env var added)
2. Visit your site: https://penleyoil-website.vercel.app
3. Open GA4 → Reports → Realtime
4. You should see your visit within 30 seconds

#### Step 5: Configure Conversions
In GA4, mark these events as conversions:
1. `lead_submit` - Quote form submissions
2. `click_to_call` - Phone number clicks
3. `chat_open` - Chatbot interactions (if enabled)

#### Optional: Enhanced Ecommerce
Your site already tracks these events:
- `page_view` - Page views
- `lead_submit` - Form submissions
- `click_to_call` - Phone clicks
- `service_view` - Service page views

**Custom Reports to Create:**
1. Lead Source Report: Which pages generate most leads
2. Service Interest: Most viewed service pages
3. Geographic Report: Which cities generate most traffic
4. Mobile vs Desktop: Conversion rates by device

---

## 📊 Optional Enhancements

### A. Google Tag Manager (GTM)
**Benefits:** More flexible event tracking without code changes

**Setup:**
1. Create GTM account: https://tagmanager.google.com
2. Get container ID (GTM-XXXXXXX)
3. Add to Vercel: `vercel env add NEXT_PUBLIC_GTM_ID`
4. Code already supports GTM (app/layout.tsx:52, 63-72)

### B. Performance Monitoring
**Options:**
- Vercel Analytics (built-in, free for Pro)
- Sentry for error tracking
- Lighthouse CI for automated audits

**Enable Vercel Analytics:**
```bash
# In Vercel dashboard:
# Project → Analytics tab → Enable
```

### C. Uptime Monitoring
**Recommended Tools:**
- UptimeRobot (free, 5-minute checks)
- Better Uptime (paid, 30-second checks)
- Pingdom

**Setup UptimeRobot:**
1. https://uptimerobot.com → Sign up
2. Add monitor: https://www.penleyoil.com
3. Alert email: info@penleyoil.com
4. Monitor interval: 5 minutes

### D. Content Delivery Network (CDN)
**Status:** Already configured via Vercel Edge Network ✅
- Images optimized via Next.js Image component
- Automatic global edge caching
- Gzip/Brotli compression enabled

### E. Security Headers
**Status:** Already configured ✅
- HTTPS enforced
- HSTS enabled
- X-Frame-Options: DENY
- CSP headers (via Vercel)

---

## 🚀 Production Launch Checklist

When ready to switch from staging to production domain:

### DNS Configuration
**Current:** staging.penleyoil.com, staging.getpenleyoil.com
**Target:** penleyoil.com, www.penleyoil.com

**Steps:**
1. **Contact Thryv** to get access to penleyoil.com DNS, OR
2. **Transfer domain** from Thryv to GoDaddy for full control

**DNS Records to Add:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### In Vercel Dashboard:
1. Go to Project → Settings → Domains
2. Add production domains:
   - penleyoil.com
   - www.penleyoil.com
3. Verify DNS configuration
4. Wait for SSL certificate (automatic, ~5 minutes)

### Update Environment Variables:
```bash
# Update site URL to production
vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://www.penleyoil.com
# Select: Production only
```

### Final Tests:
- [ ] Test contact form on production domain
- [ ] Verify Google Maps loads
- [ ] Test all phone number links
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate (https://)
- [ ] Test page load speed (should be < 2 seconds)
- [ ] Submit to Google Search Console
- [ ] Check GA4 tracking after 24 hours

---

## 📞 Support Contacts

**Vercel Support:** support@vercel.com
**Resend Support:** support@resend.com
**Supabase Support:** support@supabase.com

**Project Repository:** github.com/joshgrellner/penleyoil_website

---

## 📝 Notes

**Last Updated:** October 27, 2025
**Deployment Status:** Staging ✅ | Production ⏳
**Version:** 1.0.0

**Known Issues:** None

**Recent Changes:**
- Added kerosene to fuel types
- Added VP Racing to lubricants suppliers
- Updated tank inventory (single/double wall, cube tanks)
- Changed minimum orders (300 gal fuel, 250 gal DEF)
- Made emergency header red on contact page
- Added heavy duty engine oils to lubricants
