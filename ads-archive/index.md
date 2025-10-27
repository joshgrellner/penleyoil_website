# Penley Oil Advertising Archive - Summary

**Last Updated:** October 21, 2025
**Status:** 🟡 Ready for data collection

---

## Overview

This archive contains all currently running and recent advertising campaigns for Penley Oil Company across Google Ads, Meta (Facebook/Instagram), and Microsoft Advertising.

### Purpose
- **Audit Thryv's Work:** See exactly what ads are running and verify campaign quality
- **Campaign Inventory:** Complete catalog of all active advertising
- **Historical Record:** Track ad messaging, creative, and performance over time
- **Knowledge Transfer:** Document advertising strategy and execution

---

## Quick Stats

### Platform Summary

| Platform | Total Ads | Active | Paused/Ended | Creatives | Last Updated |
|----------|-----------|--------|--------------|-----------|--------------|
| **Google Ads** | 0 | 0 | 0 | 0 | Not yet collected |
| **Meta (FB/IG)** | 0 | 0 | 0 | 0 | Not yet collected |
| **Microsoft Ads** | 0 | 0 | 0 | 0 | Not yet collected |
| **TOTAL** | **0** | **0** | **0** | **0** | - |

> ⚠️ **Action Required:** Data collection not yet started. See [README.md](./README.md) for instructions.

---

## Platform Breakdown

### Google Ads
**Status:** 🔴 No data collected yet

**What to expect:**
- Search ads targeting fuel delivery keywords
- Display/Remarketing campaigns (if running)
- Local Service Ads (if applicable)
- Ad extensions (sitelinks, call, location, etc.)

**Data Source:** [Google Ads Transparency Center](https://adstransparency.google.com)

**Files:**
- CSV: `google/ads.csv`
- Creatives: `google/creatives/`

---

### Meta Ads (Facebook & Instagram)
**Status:** 🔴 No data collected yet

**What to expect:**
- Facebook Feed/Story ads
- Instagram Feed/Story/Reel ads
- Audience Network placements
- Lead gen or traffic campaigns

**Data Source:** [Facebook Ad Library](https://www.facebook.com/ads/library)

**Files:**
- CSV: `meta/ads.csv`
- Creatives: `meta/creatives/`

---

### Microsoft Ads
**Status:** 🔴 No data collected yet

**What to expect:**
- Search ads on Bing
- Microsoft Audience Network (if running)
- May have limited public data - supplement with Thryv export

**Data Source:** [Microsoft Ad Transparency](https://about.ads.microsoft.com/en-us/resources/ad-transparency)

**Files:**
- CSV: `microsoft/ads.csv`
- Creatives: `microsoft/creatives/`

---

## Ad Creative Gallery

### Google Ads
> No creatives collected yet. Check `google/creatives/` after data collection.

### Meta Ads
> No creatives collected yet. Check `meta/creatives/` after data collection.

### Microsoft Ads
> No creatives collected yet. Check `microsoft/creatives/` after data collection.

---

## Data Completeness

### ✅ What We Can See (Public Transparency Data)
- ✅ Ad headlines, descriptions, and copy
- ✅ Visual creatives (images, videos)
- ✅ Landing page URLs
- ✅ Start/end dates
- ✅ Geographic targeting (general)
- ✅ Ad extensions (Google)

### ⚠️ What's Missing (Ask Thryv)

**Google Ads:**
- ❓ Exact keywords and match types
- ❓ Negative keywords
- ❓ Bid amounts and strategy
- ❓ Quality Scores
- ❓ Conversion tracking setup
- ❓ Campaign/ad group structure
- ❓ Ad schedules and device targeting
- ❓ Audience segments

**Meta Ads:**
- ❓ Detailed audience targeting (age, gender, interests)
- ❓ Custom audiences and lookalikes
- ❓ Placement breakdown (Feed vs Story)
- ❓ Budget and spend
- ❓ Performance metrics (CTR, conversions)

**Microsoft Ads:**
- ❓ Most data (Microsoft library is limited)
- ❓ Campaign structure, keywords, targeting
- ❓ Budget and performance

**All Platforms:**
- ❓ Monthly ad spend and budget allocation
- ❓ Click-through rates and conversion rates
- ❓ Return on ad spend (ROAS)
- ❓ Historical performance trends

---

## Campaign Themes & Messaging

> **To be populated after data collection**

Expected messaging themes:
- Same-day diesel delivery
- Bulk DEF supply
- Oklahoma statewide service
- Emergency fueling
- Family-owned since 1958
- Tank rentals and programs

---

## Geographic Targeting

> **To be populated after data collection**

Expected markets:
- Oklahoma City metro (primary)
- Tulsa, Stillwater, Lawton, Enid (secondary)
- Statewide Oklahoma (DEF delivery)
- North Texas (if applicable for DEF)

---

## Next Steps

### 1. Collect Ad Data (Manual - 30-60 minutes)

Follow the step-by-step guide in [README.md](./README.md):

1. **Google Ads Transparency Center** - Search "Penley Oil" and "penleyoil.com"
2. **Meta Ad Library** - Search "Penley Oil Company" page
3. **Microsoft Ad Transparency** - Search advertiser name

For each ad:
- Screenshot/download the creative
- Copy all text (headlines, descriptions, primary text)
- Record dates, targeting, and links
- Add row to the platform CSV

### 2. Run the Audit Script

After populating CSVs:

```bash
node scripts/audit-ads.mjs
```

This will:
- Validate all required fields are present
- Check for missing creatives
- Generate updated statistics for this summary
- Flag any data quality issues

### 3. Request Thryv Data Export

Email Thryv and request:

**Subject:** Penley Oil - Advertising Campaign Export Request

**Request:**
- Full campaign structure (campaigns, ad groups, ads)
- Keyword lists with match types (Google)
- Audience targeting details (Meta)
- Performance data: spend, clicks, conversions (last 90 days)
- Conversion tracking and pixel setup documentation
- Any A/B tests or experiments running

### 4. Review & Grade Campaign Quality

After collecting all data, review:

**Ad Copy Quality:**
- Clear value propositions?
- Strong CTAs?
- Consistent messaging?
- Professional tone and grammar?

**Creative Quality:**
- High-resolution images?
- Brand-consistent design?
- Attention-grabbing visuals?
- Proper logo and contact info?

**Targeting Strategy:**
- Appropriate geographic reach?
- Relevant audience segments?
- Keyword relevance (Google)?
- Good negative keyword coverage?

**Technical Setup:**
- Conversion tracking working?
- Landing pages optimized?
- Ad extensions utilized (Google)?
- Mobile experience good?

---

## Files & Resources

### Data Files
- `google/ads.csv` - All Google Ads
- `meta/ads.csv` - All Meta Ads
- `microsoft/ads.csv` - All Microsoft Ads

### Creative Assets
- `google/creatives/` - Google ad creatives
- `meta/creatives/` - Facebook/Instagram ad creatives
- `microsoft/creatives/` - Microsoft ad creatives

### Documentation
- `README.md` - Detailed data collection guide
- `_references/` - Thryv exports, notes, and other docs

### Scripts
- `../scripts/audit-ads.mjs` - Data validation and reporting

---

## Grading Criteria for Thryv's Work

After data collection, evaluate campaigns on:

### ⭐ Excellent (A)
- 10+ active, well-targeted ads per platform
- High-quality, professional creatives
- Comprehensive keyword coverage (Google)
- Detailed audience targeting (Meta)
- Proper conversion tracking
- Regular optimization and testing

### ✅ Good (B)
- 5-10 active ads per platform
- Decent creative quality
- Solid keyword and audience strategy
- Conversion tracking in place
- Some optimization activity

### ⚠️ Needs Improvement (C)
- 2-5 ads per platform
- Basic creatives
- Limited targeting
- Minimal optimization
- Gaps in tracking

### 🔴 Poor (D/F)
- 0-2 ads per platform
- Low-quality or missing creatives
- Weak targeting strategy
- No conversion tracking
- No ongoing optimization

---

## Questions for Thryv

After reviewing collected data, prepare questions like:

1. **Budget & Spend:**
   - What's the monthly ad spend across all platforms?
   - How is budget allocated (Google vs Meta vs Microsoft)?
   - What's the average CPC and CPL (cost per lead)?

2. **Campaign Structure:**
   - Why these specific campaigns and ad groups?
   - What's the keyword strategy for Google?
   - How are Meta audiences segmented?

3. **Performance:**
   - What's the ROAS or conversion rate?
   - Which ads/campaigns perform best?
   - What's the lead volume and quality?

4. **Optimization:**
   - How often are campaigns reviewed?
   - What tests are running?
   - What improvements are planned?

5. **Gaps:**
   - Why no Microsoft Ads (if applicable)?
   - Missing ad extensions or features?
   - Untapped opportunities?

---

**Status Legend:**
- 🔴 Not started
- 🟡 In progress
- 🟢 Complete

**Last Updated:** October 21, 2025
