# Penley Oil Website - Final URL Structure

**Date Frozen:** October 15, 2025

---

## 🔒 Frozen URLs (Production-Ready)

### Core Pages
- `/` - Homepage
- `/about` - About Penley Oil Company
- `/contact` - Contact form & location
- `/credit-application` - Credit application form
- `/drivers` - Driver job applications

### Service Pages
- `/fuel-delivery` - Diesel & gasoline delivery services
- `/def` - DEF (Diesel Exhaust Fluid) supply
- `/lubricants` - Lubricants & fluids (Phillips 66, Mystik)
- `/additives` - Fuel additives & tank management (BG Products)
- `/tanks` - Tank solutions & rentals
- `/deliveries` - Delivery options & SLAs

### Location Pages
- `/service-areas` - Service coverage overview
- `/service-areas/edmond-ok` - Edmond, Oklahoma specific page
- `/service-areas/norman-ok` - Norman, Oklahoma specific page

### Industry Pages
- `/industries` - Industries overview

### Technical Routes
- `/sitemap.xml` - XML sitemap
- `/robots.txt` - Robots.txt
- `/healthz` - Health check endpoint (200 OK)

---

## 📊 URL Structure Summary

**Total Public URLs:** 15 main pages + 2 city pages + technical routes

### Naming Conventions:
- **Service pages:** `/[service-name]` (kebab-case)
- **City pages:** `/service-areas/[city]-[state]` (kebab-case)
- **Static pages:** `/[page-name]` (kebab-case)

---

## 🎯 SEO Metadata Checklist (All Pages)

Every page must have:
- ✅ `<title>` tag (50-60 characters, includes primary keyword)
- ✅ `<meta name="description">` (150-160 characters)
- ✅ `<meta name="keywords">` (optional but included for key pages)
- ✅ Open Graph tags (`og:title`, `og:description`, `og:url`, `og:type`)
- ✅ Canonical URL (`<link rel="canonical">`)
- ✅ JSON-LD Schema markup (appropriate schemas per page type)

---

## 📄 Page-by-Page SEO Status

### `/` (Homepage)
- ✅ Title: "Penley Oil Company | Diesel Fuel Delivery, DEF Supply & Lubricants Oklahoma City"
- ✅ Schema: Organization, LocalBusiness, Services, FAQ
- ✅ Keywords: diesel delivery oklahoma city, DEF supplier oklahoma, fuel delivery okc

### `/about`
- ✅ Title: "About Penley Oil Company | Family-Owned Since 1958"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: Company history, values, statistics

### `/contact`
- ✅ Title: "Contact Us | Penley Oil Company"
- ✅ Schema: Organization, LocalBusiness
- ✅ Features: Contact form, map, phone, address

### `/fuel-delivery`
- ✅ Title: "Fuel Delivery Services | Diesel & Gasoline | Penley Oil Company"
- ✅ Schema: Service, FAQ, Breadcrumb
- ✅ FAQs: 6 detailed questions with schema
- ✅ Keywords: diesel delivery, fuel delivery oklahoma, bulk diesel

### `/def`
- ✅ Title: "DEF (Diesel Exhaust Fluid) Supply | Bulk & Packaged | Penley Oil"
- ✅ Schema: Product, FAQ, Breadcrumb
- ✅ FAQs: 7 detailed questions with schema
- ✅ Keywords: DEF supplier oklahoma, diesel exhaust fluid, bulk DEF

### `/lubricants`
- ✅ Title: "Lubricants & Fluids | Phillips 66 & Mystik | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: Motor oils, hydraulic fluids, greases

### `/additives`
- ✅ Title: "Fuel Additives & Tank Management | BG Products | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: BG Products lineup, tank sampling program

### `/tanks`
- ✅ Title: "Fuel Tank Solutions | Rentals & Sales | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: Tank options, rental program, installation

### `/deliveries`
- ✅ Title: "Delivery Options | Next-Day, Same-Day, Emergency | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: Delivery tiers, SLAs, automated programs

### `/service-areas`
- ✅ Title: "Service Areas | Oklahoma Fuel Delivery Coverage | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: Primary zone, extended zones, cities served

### `/service-areas/edmond-ok`
- ✅ Title: "Diesel Fuel Delivery Edmond OK | DEF Supply Edmond Oklahoma"
- ✅ Schema: Service, FAQ, Breadcrumb
- ✅ FAQs: 4 Edmond-specific questions
- ✅ Keywords: diesel delivery edmond ok, fuel delivery edmond

### `/service-areas/norman-ok`
- ✅ Title: "Diesel Fuel Delivery Norman OK | DEF Supply Norman Oklahoma"
- ✅ Schema: Service, FAQ, Breadcrumb
- ✅ FAQs: 4 Norman-specific questions
- ✅ Keywords: diesel delivery norman ok, fuel delivery norman

### `/industries`
- ✅ Title: "Industries We Serve | Fuel Delivery by Industry | Penley Oil"
- ✅ Schema: Organization, LocalBusiness
- ✅ Content: 8 industry segments with detailed info

### `/credit-application`
- ✅ Title: "Credit Application | Penley Oil Company"
- ✅ Schema: Organization
- ✅ Features: Multi-step credit application form

### `/drivers`
- ✅ Title: "CDL Driver Jobs | Penley Oil Company Careers"
- ✅ Schema: Organization
- ✅ Features: Foley Services job application integration

---

## 🔧 Technical Routes

### `/sitemap.xml`
- ✅ Auto-generated via Next.js
- ✅ Includes all 15+ public pages
- ✅ Updated automatically
- ✅ Priorities set appropriately

### `/robots.txt`
- ✅ Auto-generated via Next.js
- ✅ Allows all crawlers on public pages
- ✅ Disallows /admin/, /api/, /_next/
- ✅ Points to sitemap.xml

### `/healthz`
- ✅ Returns 200 OK
- ✅ JSON response: `{"status": "ok", "timestamp": "..."}`
- ✅ For monitoring services (Pingdom, UptimeRobot, etc.)

---

## 🚀 Future URL Expansion (Template Ready)

### Additional City Pages (Easy to Add):
- `/service-areas/moore-ok`
- `/service-areas/yukon-ok`
- `/service-areas/mustang-ok`
- `/service-areas/stillwater-ok`
- `/service-areas/tulsa-ok`

**Template:** Use `/service-areas/edmond-ok/page.tsx` as template

### Individual Industry Pages (Future):
- `/industries/construction`
- `/industries/agriculture`
- `/industries/trucking-logistics`
- `/industries/municipalities`

---

## 📈 URL Best Practices Followed

✅ **Kebab-case** (lowercase with hyphens)
✅ **Descriptive** (clear what page is about)
✅ **SEO-friendly** (includes keywords where natural)
✅ **Consistent structure** (grouped by category)
✅ **No query parameters** for main navigation
✅ **Canonical URLs** set on all pages
✅ **Breadcrumbs** for nested pages (city pages)

---

## 🔒 URL Change Policy

**These URLs are now FROZEN for production.**

### Rules:
1. **Never change existing URLs** after launch (breaks backlinks, SEO)
2. If URL must change, set up 301 redirect from old → new
3. New pages follow same naming conventions
4. All new pages must have complete SEO metadata
5. Update sitemap.xml when adding new pages

### Adding New Pages:
1. Create page following naming convention
2. Add complete metadata (title, description, OG, schema)
3. Add to `/app/sitemap.ts`
4. Test locally before deploying
5. Submit updated sitemap to Google Search Console

---

## 📊 Sitemap Priority Guide

**Priority Levels Used:**

- **1.0** - Homepage only
- **0.9** - High-value service pages (fuel-delivery, def, contact)
- **0.85** - City-specific pages (high local SEO value)
- **0.8** - Important pages (about, service-areas, deliveries, tanks)
- **0.7** - Supporting pages (lubricants, additives, industries)
- **0.6** - Utility pages (credit-application, drivers)

**Change Frequency:**
- **weekly** - Homepage, high-traffic service pages
- **monthly** - Most other pages
- **yearly** - Static pages that rarely change

---

## ✅ Launch Checklist

Before going live, verify:

- [ ] All 15+ pages render correctly
- [ ] All metadata is present (title, description, OG, canonical)
- [ ] All schema markup validates (use schema.org validator)
- [ ] Sitemap.xml accessible and complete
- [ ] Robots.txt configured correctly
- [ ] /healthz returns 200 OK
- [ ] All internal links work
- [ ] Mobile responsive on all pages
- [ ] Page load speed <3 seconds
- [ ] Forms submit correctly (contact, quote, credit app)
- [ ] No console errors in browser
- [ ] Google Analytics configured (if using)
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google Search Console

---

## 📞 URL Structure Questions?

Refer to:
- `SEO_OPTIMIZATION_GUIDE.md` - Full SEO strategy
- `SEO_IMPROVEMENTS_COMPLETED.md` - Recent improvements
- Next.js Metadata docs: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

**This URL structure is production-ready and optimized for both users and search engines.** 🚀
