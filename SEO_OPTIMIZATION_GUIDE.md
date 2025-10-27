# SEO Optimization Guide - Penley Oil Website

## Current Status: GOOD ✅ (Score: 8.5/10)

Your site has strong SEO fundamentals already in place. This guide covers what you have and what to add for even better Google rankings.

---

## ✅ ALREADY IMPLEMENTED

### 1. **JSON-LD Schema Markup**
- ✅ Organization schema
- ✅ LocalBusiness schema with hours and location
- ✅ Service schemas for fuel delivery and DEF
- ✅ FAQ schema on homepage

**Impact:** Google can display rich snippets in search results (star ratings, business hours, phone number)

### 2. **SEO-Optimized Metadata**
- ✅ Unique title tags on every page with local keywords
- ✅ Meta descriptions (150-160 characters)
- ✅ Open Graph tags for social sharing
- ✅ Canonical URLs to prevent duplicate content

### 3. **Technical SEO**
- ✅ Sitemap.xml at `/sitemap.xml`
- ✅ Robots.txt at `/robots.txt`
- ✅ Fast page load (Next.js 15 + image optimization)
- ✅ Mobile-responsive design
- ✅ HTTPS ready

### 4. **Content Structure**
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Semantic HTML
- ✅ Internal linking between pages
- ✅ Location-specific content (Oklahoma City, Edmond, Norman, etc.)

### 5. **Local SEO**
- ✅ NAP (Name, Address, Phone) consistent across all pages
- ✅ Service area pages for major cities
- ✅ LocalBusiness schema with geo-coordinates

---

## 🚀 QUICK WINS (Add These Now)

### 1. **Google Business Profile** (CRITICAL - Do This First!)

**Why:** This is THE #1 ranking factor for local searches like "diesel delivery near me" or "fuel delivery Oklahoma City"

**Setup Steps:**
1. Go to https://business.google.com
2. Claim your listing for "Penley Oil Company"
3. Verify your business (Google will mail a postcard to 2627 W. Reno Ave)
4. Complete 100% of your profile:
   - Business hours (Mon-Thu 7AM-4:30PM, Fri 7AM-4PM)
   - Phone: (405) 235-7553
   - Website: https://penleyoil.com
   - Categories:
     - Fuel Supplier (Primary)
     - Diesel Fuel Supplier
     - Oil & Gas Exploration Service
     - Lubricant Supplier
   - Service areas: Add Oklahoma City, Edmond, Norman, Moore, Yukon, etc.
   - Business description (use keywords naturally)
   - Upload photos:
     - Logo
     - Delivery trucks
     - Facility at 2627 W. Reno Ave
     - Team photos
     - DEF storage tanks

5. **Get Reviews:**
   - Ask satisfied customers to leave Google reviews
   - Target: 20+ reviews with 4.5+ star average
   - Respond to every review (positive or negative)

**Impact:** This alone can 10x your local search visibility

---

### 2. **Add Image Alt Text** (30 minutes)

**Why:** Google can't "see" images without alt text. Alt text helps with image search and accessibility.

**Current Status:** Some images have alt text, but many are missing descriptive keywords.

**What to Add:**
```tsx
// Homepage hero
<Image
  src="/hero-truck.png"
  alt="Penley Oil diesel fuel delivery truck in Oklahoma City"
  ...
/>

// Service icons/images
<Image
  src="/fuel-icon.png"
  alt="Diesel fuel delivery service icon - same-day delivery Oklahoma"
  ...
/>

// DEF page
<Image
  src="/def-tank.png"
  alt="20,000 gallon DEF storage tanks at Penley Oil facility Oklahoma City"
  ...
/>
```

**Formula for good alt text:**
- Describe what's in the image
- Include 1-2 relevant keywords naturally
- Keep it under 125 characters

---

### 3. **Optimize Page Load Speed**

**Current:** Already fast with Next.js, but you can go further:

Add to `next.config.js`:
```js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  compress: true,
}
```

**Test your speed:**
- https://pagespeed.web.dev/
- Target: 90+ score on mobile and desktop

---

### 4. **Add More FAQ Schema to Service Pages**

**Why:** FAQ rich snippets take up huge space in search results and boost click-through rates.

**Example for `/fuel-delivery` page:**
```typescript
const fuelFAQs = [
  {
    question: 'How much does diesel fuel delivery cost in Oklahoma City?',
    answer: 'Diesel delivery pricing depends on volume and location. Deliveries start at 100 gallons. Contact us at (405) 235-7553 for a custom quote based on your needs.'
  },
  {
    question: 'Do you deliver diesel fuel on weekends?',
    answer: 'Yes, weekend diesel delivery is available upon request in Oklahoma City and surrounding areas. Call (405) 235-7553 to schedule weekend fueling.'
  },
  {
    question: 'What types of diesel fuel do you deliver?',
    answer: 'We deliver both on-road (clear) diesel and off-road (dyed) diesel. On-road diesel is for highway vehicles, while dyed diesel is tax-exempt for construction equipment, agriculture, and generators.'
  }
];
```

Add similar FAQs to:
- `/def` (5-7 DEF-specific questions)
- `/lubricants` (3-5 questions)
- `/tanks` (3-5 questions about tank rentals)

---

### 5. **Create More City-Specific Landing Pages**

**Why:** Ranks for "diesel delivery [city name]" searches

**Current:** You have general service-areas page

**Add Individual Pages:**
- `/service-areas/edmond-ok`
- `/service-areas/norman-ok`
- `/service-areas/moore-ok`
- `/service-areas/yukon-ok`
- `/service-areas/stillwater-ok`
- `/service-areas/tulsa-ok`

**Template for each:**
```markdown
# Diesel Fuel Delivery in [City], Oklahoma

Penley Oil provides same-day diesel, DEF, and lubricants delivery to [City] and surrounding areas.

## Fuel Delivery Services in [City]
- Next-day diesel delivery
- Bulk DEF supply
- Emergency fueling 24/7
- Free tank rentals

## Service Area: [Specific neighborhoods/zip codes]

## Industries We Serve in [City]
- Construction companies
- Agriculture/farms
- Trucking fleets
- Municipal vehicles

## Contact for [City] Fuel Delivery
Call (405) 235-7553 or request a quote online.
```

---

## 🎯 KEYWORD STRATEGY

### Primary Keywords (High Priority)
Already targeting these well:
- ✅ diesel fuel delivery oklahoma city
- ✅ DEF supplier oklahoma
- ✅ bulk DEF oklahoma city
- ✅ fuel delivery okc
- ✅ diesel exhaust fluid oklahoma

### Secondary Keywords (Add These)
Not heavily targeting yet:
- "emergency fuel delivery oklahoma city"
- "same day diesel delivery okc"
- "diesel fuel delivery near me" (needs Google Business Profile)
- "bulk diesel supplier oklahoma"
- "fuel tank rental oklahoma city"
- "construction fuel delivery oklahoma"
- "farm fuel delivery oklahoma"
- "fleet fueling oklahoma city"

### Long-Tail Keywords (Easy Wins)
Create content targeting:
- "how much does diesel delivery cost in oklahoma"
- "do i need def for my diesel truck"
- "free fuel tank rental oklahoma"
- "24/7 emergency diesel delivery okc"
- "iso certified def supplier oklahoma"

**Where to add:**
- Blog posts (if you add a blog)
- FAQ sections
- Service page subheadings
- Meta descriptions

---

## 📊 BACKLINK STRATEGY

**Why:** Backlinks = Google's #1 ranking factor for competitive keywords

### Easy Backlinks to Get:

1. **Business Directories:**
   - Yelp for Business
   - Yellow Pages
   - BBB (Better Business Bureau)
   - Angi (formerly Angie's List)
   - Thumbtack
   - Oklahoma Chamber of Commerce
   - Oklahoma City Chamber of Commerce

2. **Industry Directories:**
   - National Association of Small Trucking Companies (NASTC)
   - Construction Association of Oklahoma
   - Oklahoma Farm Bureau (if serving agriculture)
   - DEF Coalition member directory

3. **Local Citations:**
   - Nextdoor Business
   - Facebook Business Page (link to website)
   - LinkedIn Company Page
   - Local news sites (sponsor local events)

4. **Partnerships:**
   - Phillips 66 dealer/distributor page
   - Mystik Lubricants distributor locator
   - BG Products distributor page

**Target:** 20-30 high-quality backlinks in first 6 months

---

## 📱 GOOGLE BUSINESS PROFILE OPTIMIZATION

### Post Weekly Updates:
- "🚨 Same-day diesel delivery available this week in OKC metro"
- "❄️ Winter diesel with anti-gel available now"
- "✅ DEF back in stock - 20,000+ gallons ready for delivery"

### Upload Photos Regularly:
- Delivery trucks in action
- Happy customers
- Facility updates
- Staff photos

### Use Google Q&A:
Pre-populate questions:
- Q: "Do you deliver on weekends?"
  A: "Yes, weekend delivery available upon request. Call (405) 235-7553."

- Q: "What's your minimum delivery amount?"
  A: "Minimum 100 gallons for fuel delivery in Oklahoma City metro."

---

## 🔍 CONTENT IDEAS (Future Blog/Resources Page)

If you add a `/resources` or `/blog` section:

1. "Complete Guide to DEF: What It Is and Why Your Diesel Engine Needs It"
2. "Diesel Fuel Storage Best Practices for Construction Sites"
3. "How to Choose Between Single-Wall and Double-Wall Fuel Tanks"
4. "Winter Fuel Additives: Preventing Diesel Gelling in Oklahoma"
5. "Understanding Dyed vs. Clear Diesel: Which Do You Need?"
6. "Fuel Tank Maintenance: How to Extend the Life of Your Storage Tank"
7. "Emergency Fuel Delivery Checklist for Oklahoma Businesses"

**SEO Benefit:** Ranks for informational searches, builds authority, earns backlinks

---

## 📈 TRACKING & ANALYTICS

### Must Install:

1. **Google Analytics 4 (GA4)**
   - Track visitors, conversions, behavior
   - See which pages drive phone calls

2. **Google Search Console**
   - Monitor which keywords you rank for
   - See click-through rates
   - Find technical errors
   - Track sitemap indexing

3. **Call Tracking** (Optional but Recommended)
   - CallRail or similar
   - Track which marketing sources drive phone calls
   - Record calls for quality/training

### Key Metrics to Watch:
- Organic search traffic (visits from Google)
- Top keywords driving traffic
- Phone call conversions
- Quote form submissions
- Bounce rate (should be <60%)
- Page load speed

---

## 🎯 30-DAY SEO ACTION PLAN

### Week 1: Google Business Profile
- [ ] Claim/verify Google Business Profile
- [ ] Complete 100% of profile
- [ ] Upload 10+ photos
- [ ] Add all service areas
- [ ] Ask 5 customers for reviews

### Week 2: On-Page SEO
- [ ] Add alt text to all images
- [ ] Add FAQ schema to 3 service pages
- [ ] Optimize meta descriptions with CTAs
- [ ] Test page speed (target 90+)

### Week 3: Local Citations
- [ ] Add business to 10 directories
- [ ] Create Facebook Business Page
- [ ] Create LinkedIn Company Page
- [ ] Verify NAP consistency everywhere

### Week 4: Content & Tracking
- [ ] Install Google Analytics 4
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Search Console
- [ ] Create 2 city-specific landing pages
- [ ] Plan blog content calendar (optional)

---

## 🚀 EXPECTED RESULTS

### After 30 Days:
- Google Business Profile verified and active
- 10-20 Google reviews
- Listed in 15+ online directories
- 25% increase in organic search impressions

### After 90 Days:
- Ranking top 5 for "diesel delivery oklahoma city"
- Appearing in Google Local Pack (map results)
- 3x increase in website traffic from Google
- 50+ quality backlinks

### After 6 Months:
- Dominating local search for fuel delivery keywords
- Ranking for 50+ keyword variations
- Steady stream of quote requests from Google
- ROI: 10x+ (typical for local service businesses)

---

## 📞 QUICK SUPPORT

**Track these tools:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Google Business Profile: https://business.google.com
- PageSpeed Insights: https://pagespeed.web.dev/

**Need Help?**
Your site is already well-optimized. Focus on:
1. Google Business Profile (ASAP)
2. Getting reviews (ongoing)
3. Adding city pages (next month)

Everything else is a bonus. You're in great shape! 🎉
