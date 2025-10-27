# Ads Archive - Quick Start (5-Minute Guide)

**Goal:** Build a complete archive of Penley Oil's advertising across Google, Meta, and Microsoft.

---

## Step 1: Google Ads (10-15 minutes)

1. Visit: https://adstransparency.google.com
2. Search: **"Penley Oil"** and **"penleyoil.com"**
3. Set: **All time** + **United States**
4. For each ad:
   - Screenshot → save as `google/creatives/google-ad-001.png` (increment number)
   - Copy headlines + descriptions
   - Copy URLs, dates, targeting
   - Add row to `google/ads.csv`

**CSV Example:**
```csv
Google,Fuel Delivery,OKC Diesel,CR123,active,2024-10-01,,Same-Day Diesel,Serving OK Since 1958,Call Now,Bulk fuel delivery...,,,https://penleyoil.com/fuel-delivery,penleyoil.com,"Call: (405)235-7553","OKC, Edmond, Norman",google-ad-001.png,,https://adstransparency.google.com/...
```

---

## Step 2: Meta Ads (10-15 minutes)

1. Visit: https://www.facebook.com/ads/library
2. Search: **"Penley Oil Company"** (your Page name)
3. Filter: **All ads** (not just Active)
4. For each ad variant:
   - Download/screenshot creative → save as `meta/creatives/meta-ad-001.jpg`
   - Copy primary text, headline, description, CTA
   - Copy dates, platforms (FB/IG)
   - Add row to `meta/ads.csv`

**CSV Example:**
```csv
Facebook,DEF Campaign,,AD789,active,2024-09-15,,Need DEF delivered?,,,,Penley Oil delivers ISO-certified DEF...,Get Quote,https://penleyoil.com/def,,,,"OK, TX, KS",meta-ad-001.jpg,,https://facebook.com/ads/library/?id=...
```

---

## Step 3: Microsoft Ads (5 minutes)

1. Visit: https://about.ads.microsoft.com/en-us/resources/ad-transparency
2. Search: **"Penley Oil"**
3. If no results:
   - Note this in `microsoft/ads.csv` as a comment
   - Plan to request from Thryv
4. If results found, same process as Google

---

## Step 4: Run Audit (30 seconds)

```bash
node scripts/audit-ads.mjs
```

**Check for:**
- Missing required fields
- Creative files not found
- URL/date format issues

**Fix errors**, then re-run until clean.

---

## Step 5: Review Summary

Open: `ads-archive/index.md`

**Should now show:**
- Total ad count per platform
- Active vs inactive breakdown
- Creative file inventory

---

## CSV Column Cheat Sheet

| Must Have | Nice to Have | Optional |
|-----------|--------------|----------|
| platform | campaign | ad_group |
| status | ad_id | extensions |
| start_date | headline_1 | sitelinks |
| final_url | description_1 | notes |
| source_link | creative_file | end_date |

---

## What You CAN'T See (Ask Thryv)

- ❓ Keywords (Google)
- ❓ Audience targeting details (Meta)
- ❓ Budget/spend
- ❓ Performance (CTR, conversions)
- ❓ Campaign structure

---

## When Done

1. ✅ Run audit script → no errors
2. ✅ Review `index.md` for completeness
3. ✅ Email Thryv for export (see main README.md for template)
4. ✅ Grade campaign quality using criteria in `index.md`

---

**Time estimate:** 30-40 minutes total for all three platforms
**Difficulty:** Easy (copy/paste work)
**Tools needed:** Web browser, screenshots

**Questions?** See full guide in `README.md`
