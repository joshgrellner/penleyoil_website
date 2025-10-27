# Penley Oil Ads Archive

Complete archive of all advertising campaigns running across Google, Meta, and Microsoft platforms.

## Quick Start Guide

### 1. Google Ads (via Google Ads Transparency Center)

**URL:** https://adstransparency.google.com

**Steps:**
1. Search for "Penley Oil" or "penleyoil.com"
2. Set date range to "All time"
3. Select your region (Oklahoma/United States)
4. For each ad found:
   - Screenshot the ad creative → save to `google/creatives/google-ad-{number}.png`
   - Copy headline 1, headline 2, headline 3
   - Copy description 1, description 2
   - Note the display URL and final URL
   - Record start date, end date (if ended), and geographic targeting
   - Copy the transparency center detail link
   - Check for extensions (sitelinks, callouts, structured snippets)
5. Add each ad as a row in `google/ads.csv`

**What to capture:**
- ✅ All text headlines and descriptions
- ✅ Display URL and final landing page URL
- ✅ Ad extensions (sitelinks, call extensions, location, etc.)
- ✅ Geographic targeting
- ✅ Start/end dates
- ✅ Campaign and ad group names (if visible)
- ⚠️ Keywords (likely NOT visible in transparency center - ask Thryv)
- ⚠️ Bid amounts (NOT public - ask Thryv)

---

### 2. Meta Ads (Facebook Ad Library)

**URL:** https://www.facebook.com/ads/library

**Steps:**
1. Search for "Penley Oil Company" or your Facebook Page
2. Filter: "All ads" (not just active) to see historical ads
3. For each ad/variant:
   - Download or screenshot the creative → save to `meta/creatives/meta-ad-{number}.{jpg|mp4}`
   - Copy primary text (the main ad copy above the creative)
   - Copy headline (the bolded text below the creative)
   - Copy link description (smaller text under headline)
   - Note the CTA button ("Learn More", "Sign Up", "Call Now", etc.)
   - Record start date (and end date if finished)
   - Note platforms shown on (Facebook Feed, Instagram Story, etc.)
   - Copy the Ad Library detail URL
4. Add each ad as a row in `meta/ads.csv`

**What to capture:**
- ✅ Primary text, headline, description
- ✅ Creative file (image or video)
- ✅ CTA button
- ✅ Landing page URL
- ✅ Start/end dates
- ✅ Platforms (Facebook, Instagram, Messenger, Audience Network)
- ⚠️ Audience targeting (age, location, interests) - limited visibility, ask Thryv
- ⚠️ Budget/spend - NOT public, ask Thryv

---

### 3. Microsoft Ads (Microsoft Ad Library)

**URL:** https://about.ads.microsoft.com/en-us/resources/ad-transparency

**Steps:**
1. Search for "Penley Oil" or your advertiser name
2. If no results, note this gap and plan to get data from Thryv export
3. For any ads found:
   - Screenshot creative → save to `microsoft/creatives/ms-ad-{number}.png`
   - Copy headlines, descriptions, display URL
   - Note start/end dates and targeting
   - Copy detail link
4. Add to `microsoft/ads.csv`

**Note:** Microsoft's Ad Library has limited public data. You may need to request a campaign export from Thryv for complete Microsoft Ads data.

---

## CSV Column Reference

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| `platform` | Ad platform | `Google`, `Facebook`, `Instagram`, `Microsoft` | ✅ Yes |
| `campaign` | Campaign name (from Thryv if available) | `Oklahoma Fuel Delivery - Search` | Optional |
| `ad_group` | Ad group name | `OKC Diesel Delivery` | Optional |
| `ad_id` | Platform ad ID or transparency center ID | `CR2024...` | Recommended |
| `status` | `active`, `paused`, `ended` | `active` | ✅ Yes |
| `start_date` | When ad started running | `2024-10-01` | ✅ Yes |
| `end_date` | When ad stopped (if applicable) | `2025-01-15` or blank | Optional |
| `headline_1` | First headline | `Same-Day Diesel Delivery` | ✅ Yes (if text ad) |
| `headline_2` | Second headline | `Serving Oklahoma Since 1958` | Optional |
| `headline_3` | Third headline | `Call (405) 235-7553 Now` | Optional |
| `description_1` | First description line | `Bulk fuel delivery to OKC metro...` | ✅ Yes |
| `description_2` | Second description line | `DEF, lubricants, tank rentals...` | Optional |
| `primary_text` | Main ad copy (Meta ads) | `Need diesel delivered fast? Penley Oil...` | For Meta ads |
| `cta` | Call-to-action button | `Call Now`, `Learn More`, `Get Quote` | Recommended |
| `final_url` | Landing page URL | `https://penleyoil.com/fuel-delivery` | ✅ Yes |
| `display_url` | Display URL shown in ad | `penleyoil.com/FuelDelivery` | Recommended |
| `extensions` | Ad extensions used | `Call: (405)235-7553; Location: OKC` | Optional |
| `sitelinks` | Sitelink extension URLs/text | `DEF Supply \| Lubricants \| Contact` | Optional |
| `geo` | Geographic targeting | `Oklahoma City, OK; Tulsa, OK` | Recommended |
| `creative_file` | Filename of creative | `google-ad-001.png` | ✅ Yes (if image/video) |
| `notes` | Additional observations | `Variant A - winter messaging` | Optional |
| `source_link` | Link to transparency center detail | `https://adstransparency.google.com/...` | ✅ Yes |

---

## Folder Structure

```
ads-archive/
├── README.md                      # This file
├── index.md                       # Summary report (auto-generated)
├── google/
│   ├── ads.csv                    # All Google ads
│   └── creatives/                 # Screenshots and images
│       ├── google-ad-001.png
│       ├── google-ad-002.png
│       └── ...
├── meta/
│   ├── ads.csv                    # All Meta ads (FB + IG)
│   └── creatives/
│       ├── meta-ad-001.jpg
│       ├── meta-ad-002.mp4
│       └── ...
├── microsoft/
│   ├── ads.csv                    # All Microsoft ads
│   └── creatives/
│       ├── ms-ad-001.png
│       └── ...
└── _references/
    ├── thryv-export.pdf           # Campaign exports from Thryv
    ├── notes.md                   # Manual notes
    └── ...
```

---

## Data Quality Checklist

For each ad, ensure you've captured:

- ✅ **Complete copy** - All headlines, descriptions, and primary text
- ✅ **Visual creative** - Screenshot or download of image/video
- ✅ **Landing page** - Final URL and display URL
- ✅ **Dates** - At minimum, start date
- ✅ **Source link** - Direct link back to transparency center listing
- ✅ **Geographic targeting** - Where the ad is shown
- ✅ **Extensions** (Google) - Sitelinks, call extensions, location, etc.
- ✅ **CTA** - Call-to-action button or link text
- ⚠️ **Campaign structure** - If Thryv can provide campaign/ad group names
- ⚠️ **Keywords** (Google Search) - Transparency center won't show this, request from Thryv
- ⚠️ **Audience targeting** (Meta) - Limited public visibility, ask Thryv
- ⚠️ **Budget/performance** - NOT public, must come from Thryv

---

## Missing Data - Ask Thryv

The following data is NOT available via public transparency centers. You'll need to request from Thryv:

### Google Ads
- ❓ Exact keywords and match types
- ❓ Negative keywords
- ❓ Bid amounts and bidding strategy
- ❓ Quality Score
- ❓ Conversion tracking setup
- ❓ Campaign and ad group structure
- ❓ Ad schedules (day-of-week, time-of-day)
- ❓ Device targeting (mobile vs desktop)
- ❓ Audience segments and remarketing lists

### Meta Ads
- ❓ Detailed audience targeting (age, gender, interests, behaviors)
- ❓ Custom audiences and lookalikes
- ❓ Placement breakdown (Feed vs Story vs Reel)
- ❓ Budget and spend
- ❓ Performance metrics (CTR, CPC, conversions)
- ❓ A/B test variants and results

### Microsoft Ads
- ❓ All of the above (Microsoft's public library is very limited)

### All Platforms
- ❓ Spend and budget
- ❓ Click-through rates, conversions, ROAS
- ❓ Historical performance
- ❓ Tracking pixels and conversion events

---

## Next Steps After Data Collection

1. **Run the audit script:**
   ```bash
   node scripts/audit-ads.mjs
   ```

2. **Review the generated summary:**
   - Open `ads-archive/index.md` for totals and gallery

3. **Identify gaps:**
   - Missing creatives
   - Incomplete ad data
   - Platform coverage

4. **Request Thryv export:**
   - Campaign structure and settings
   - Keyword lists (Google)
   - Audience targeting (Meta)
   - Performance data and budget allocation

---

## Example Ad Entries

### Google Search Ad Example
```csv
Google,Oklahoma Fuel Delivery,OKC Diesel,CR123456,active,2024-10-01,,Same-Day Diesel Delivery,Serving Oklahoma Since 1958,Call (405) 235-7553,Bulk fuel delivery to OKC metro. On-road and off-road diesel.,Free tank rental with contract.,,,https://penleyoil.com/fuel-delivery,penleyoil.com/FuelDelivery,"Call: (405)235-7553, Location: 2627 W Reno Ave","DEF Supply | Lubricants | Tank Rentals","Oklahoma City, Edmond, Norman",,Call extensions active,https://adstransparency.google.com/...
```

### Meta Image Ad Example
```csv
Facebook,DEF Supply Campaign,,AD789012,active,2024-09-15,,"Need DEF delivered across Oklahoma?",,,,"Penley Oil delivers ISO-certified DEF in bulk or packaged. 2.5-gal jugs, 330-gal totes, and transport. Serving OK, TX, KS, and NM.",Get Quote,https://penleyoil.com/def,,,,"Oklahoma, Texas, Kansas",meta-ad-003.jpg,Image shows DEF totes being delivered,https://www.facebook.com/ads/library/?id=...
```

---

**Last Updated:** October 21, 2025
