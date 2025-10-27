# Media Pipeline Documentation

## Overview

The Penley Oil website media pipeline automates the process of finding, downloading, reviewing, and approving license-safe images and vendor logos for production use.

**Key Principle:** NO images or logos are used in production until explicitly approved through the `/admin/media-review` interface.

---

## Directory Structure

```
penleyoil-website/
├── content/
│   ├── images.json           # Image manifest with metadata
│   ├── vendors.json          # Vendor logo manifest
│   └── media-rejections.log  # Rejection audit log
├── public/
│   ├── images/               # Downloaded images
│   │   ├── home/
│   │   ├── fuel/
│   │   ├── def/
│   │   ├── lubes/
│   │   ├── additives/
│   │   ├── tanks/
│   │   ├── deliveries/
│   │   ├── industries/
│   │   └── city/
│   └── logos/                # Vendor logos
│       ├── phillips66/
│       ├── vp-racing/
│       ├── mystik/
│       └── bg/
├── scripts/
│   ├── fetch-media.ts        # Download images/logos
│   └── audit-media.ts        # Validate media quality
├── components/
│   └── LogoStrip.tsx         # Vendor logo display
└── app/
    ├── admin/media-review/   # Approval interface
    └── api/media/            # API routes
```

---

## Workflow

### Step 1: Configure API Keys

Copy `.env.example` to `.env.local` and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Get from https://unsplash.com/developers
UNSPLASH_ACCESS_KEY=your_key_here

# Get from https://www.pexels.com/api/
PEXELS_API_KEY=your_key_here

# Media pipeline settings
MEDIA_SOURCE_PRIMARY=unsplash,pexels
ADOBE_STOCK_ALLOWED=false
MEDIA_MAX_WIDTH=2000

# Admin password for review interface
NEXT_PUBLIC_ADMIN_PASSWORD=penley2025
```

### Step 2: Fetch Media

Run the fetch script to download images and prepare logos:

```bash
npm install -g ts-node  # If not already installed
ts-node scripts/fetch-media.ts
```

**What it does:**
- Searches Unsplash/Pexels using `searchQuery` from `images.json`
- Downloads images to `/public/images/{category}/`
- Updates `images.json` with photographer credits and dimensions
- Logs instructions for manual vendor logo downloads

**Note:** Vendor logos must be downloaded manually from official brand guidelines pages to ensure license compliance.

### Step 3: Download Vendor Logos

The script outputs instructions like:

```
🏢 Fetching logo for: Phillips 66
📝 Visit https://www.phillips66.com/about/brand-guidelines and download official logo assets
   Expected path: /logos/phillips66/phillips66.svg
```

**Manual Steps:**
1. Visit the vendor's brand guidelines page
2. Download official SVG logo (preferred) and PNG fallback
3. Save to the specified `/public/logos/` directory
4. Follow usage guidelines in `vendors.json`

### Step 4: Audit Media

Run the audit script to validate quality:

```bash
ts-node scripts/audit-media.ts
```

**Checks:**
- ✅ File existence (JPG, WebP, SVG, PNG)
- ✅ Alt text quality (length, context, location keywords)
- ✅ Photographer credits
- ✅ License compliance
- ✅ Image dimensions (1200-2000px wide)
- ✅ Vendor logo usage notes

**Example Output:**

```
📋 MEDIA AUDIT REPORT
═══════════════════════════════════════════════════════════

📸 IMAGES
Total: 17 | Approved: 0 | Issues: 2 | Warnings: 15

home/home-hero-1:
  ⚠️  Warnings:
     - Missing photographer credit
     - ⚠️  Not yet approved for production use

🏢 VENDOR LOGOS
Total: 4 | Approved: 0 | Issues: 0 | Warnings: 8

Phillips 66:
  ⚠️  Warnings:
     - SVG logo preferred but not found
     - License status: pending
     - ⚠️  Not yet approved for production use

📊 SUMMARY
Total Assets: 21
Approved: 0/21
Issues: 2
Warnings: 23

📝 17 assets pending approval. Visit /admin/media-review to review.
```

### Step 5: Review and Approve

Start the dev server:

```bash
npm run dev
```

Visit the review interface:

```
http://localhost:3000/admin/media-review
```

**Login:** Use password from `NEXT_PUBLIC_ADMIN_PASSWORD` (default: `penley2025`)

**Review Interface Features:**

1. **Images Tab**
   - View all images by category
   - See alt text, photographer credits, license info
   - Preview images (once downloaded)
   - Approve ✓ or Replace ✗

2. **Logos Tab**
   - View vendor logos on light/dark backgrounds
   - See usage guidelines (clearspace, colors, modifications)
   - Check license status
   - Approve ✓ or Remove ✗

**Approval Actions:**

- **Approve:** Marks asset as `approved: true` in manifest
- **Replace/Remove:** Logs reason in `media-rejections.log` and marks for replacement

### Step 6: Update Pages (After Approval)

**Only after assets are approved**, update pages to use them.

**Example - Using LogoStrip Component:**

```tsx
import LogoStrip from '@/components/LogoStrip';

export default function HomePage() {
  return (
    <div>
      {/* Other content */}

      {/* Only shows approved vendors */}
      <LogoStrip
        heading="Trusted Suppliers"
        subheading="We carry premium products from industry-leading brands"
        showOnlyApproved={true}
        variant="light"
      />
    </div>
  );
}
```

**Example - Using Images:**

```tsx
import Image from 'next/image';
import imagesData from '@/content/images.json';

const heroImage = imagesData.images.home.find(img => img.id === 'home-hero-1');

export default function HomePage() {
  if (!heroImage?.approved) {
    return null; // Don't show unapproved images
  }

  return (
    <Image
      src={`/images/home/${heroImage.filename}`}
      alt={heroImage.alt}
      width={heroImage.dimensions.width}
      height={heroImage.dimensions.height}
      priority
    />
  );
}
```

---

## Image Manifest Structure

`content/images.json`:

```json
{
  "images": {
    "home": [
      {
        "id": "home-hero-1",
        "filename": "home-hero-1.jpg",
        "webp": "home-hero-1.webp",
        "alt": "Penley Oil fuel delivery bobtail truck refilling commercial fuel tank at Oklahoma construction site",
        "caption": null,
        "credit": {
          "source": "Unsplash",
          "photographer": "John Smith",
          "url": "https://unsplash.com/photos/xxxxx",
          "license": "Unsplash License (free for commercial use)"
        },
        "approved": false,
        "searchQuery": "fuel bobtail truck on site fueling at construction yard at sunrise",
        "usage": ["homepage-hero"],
        "dimensions": {
          "width": 2000,
          "height": 1333
        }
      }
    ]
  },
  "metadata": {
    "lastUpdated": "2025-10-15T00:00:00Z",
    "totalImages": 17,
    "approvedImages": 0,
    "pendingImages": 17
  }
}
```

### Adding New Images

1. Add entry to `images.json`:

```json
{
  "id": "fuel-tanker-2",
  "filename": "fuel-tanker-2.jpg",
  "webp": "fuel-tanker-2.webp",
  "alt": "Diesel fuel tanker truck making delivery at Oklahoma industrial facility",
  "credit": {
    "source": "Unsplash",
    "photographer": "TBD",
    "url": "TBD",
    "license": "Unsplash License"
  },
  "approved": false,
  "searchQuery": "diesel tanker truck industrial delivery sunrise oklahoma",
  "usage": ["fuel-delivery-page"]
}
```

2. Run `ts-node scripts/fetch-media.ts`
3. Run `ts-node scripts/audit-media.ts`
4. Approve at `/admin/media-review`

---

## Vendor Logo Manifest Structure

`content/vendors.json`:

```json
{
  "vendors": [
    {
      "name": "Phillips 66",
      "url": "https://www.phillips66.com",
      "logoPath": "/logos/phillips66/phillips66.svg",
      "logoPathPng": "/logos/phillips66/phillips66.png",
      "usageNotes": {
        "clearspace": "Minimum clearspace of 0.5x shield height on all sides",
        "background": "Prefer white or light backgrounds; dark variant available",
        "colors": "Official red (#ED1C24) and blue (#0033A0)",
        "modifications": "Do not distort, rotate, or alter proportions"
      },
      "approved": false,
      "sourceUrl": "https://www.phillips66.com/about/brand-guidelines",
      "licenseStatus": "pending"
    }
  ]
}
```

### Adding New Vendors

1. Add entry to `vendors.json`
2. Download logo files manually from brand guidelines
3. Save to `/public/logos/{vendor}/`
4. Approve at `/admin/media-review`

---

## License Compliance

### Unsplash License

✅ **Allowed:**
- Commercial use
- Modification
- No attribution required (but appreciated)

❌ **Not Allowed:**
- Selling unmodified photos
- Creating competing service
- Hotlinking

**Guidelines:**
- Download and host locally ✅
- Give credit when possible ✅
- Track downloads via API ✅

### Pexels License

✅ **Allowed:**
- Commercial use
- Modification
- No attribution required

❌ **Not Allowed:**
- Selling unmodified photos
- Identifiable people without consent
- Hotlinking

**Guidelines:**
- Download and host locally ✅
- Give credit when possible ✅

### Vendor Logos

**CRITICAL:** Always get explicit permission or verify authorized distributor status.

✅ **Best Practices:**
- Use only official logo files from brand guidelines
- Follow usage notes exactly (clearspace, colors, backgrounds)
- Never modify logos (no distortion, rotation, color changes)
- Keep approval documentation
- Update `licenseStatus` after confirmation

---

## API Routes

### GET `/api/media/images`
Returns `images.json` manifest

### GET `/api/media/vendors`
Returns `vendors.json` manifest

### POST `/api/media/approve`
Approves an image or vendor logo

**Body:**
```json
{
  "type": "image",
  "category": "home",
  "id": "home-hero-1",
  "approved": true
}
```

### POST `/api/media/reject`
Rejects and marks for replacement

**Body:**
```json
{
  "type": "image",
  "category": "home",
  "id": "home-hero-1",
  "reason": "Poor image quality, needs higher resolution"
}
```

---

## Scripts Reference

### `scripts/fetch-media.ts`

**Purpose:** Download images from Unsplash/Pexels

**Usage:**
```bash
ts-node scripts/fetch-media.ts
```

**Options:**
- Automatically uses API keys from `.env.local`
- Tries Unsplash first, falls back to Pexels
- Rate-limited to 1 request/second
- Updates manifests with actual photographer/URL data

### `scripts/audit-media.ts`

**Purpose:** Validate media quality and compliance

**Usage:**
```bash
ts-node scripts/audit-media.ts
```

**Exit Codes:**
- `0` - No critical issues
- `1` - Critical issues found (missing files, no alt text, etc.)

---

## Common Issues

### Issue: "Unsplash API key not configured"

**Solution:**
```bash
# Add to .env.local
UNSPLASH_ACCESS_KEY=your_key_here
```

Get key from: https://unsplash.com/developers

### Issue: "Image file not found"

**Solution:**
```bash
# Re-run fetch script
ts-node scripts/fetch-media.ts

# Check if download succeeded
ls -la public/images/home/
```

### Issue: "Alt text quality poor"

**Solution:**
Edit `images.json` to improve alt text:

```json
"alt": "Diesel fuel delivery truck refilling commercial fuel tank at Oklahoma construction site"
```

**Good Alt Text:**
- 8-15 words
- Includes location (Oklahoma, OKC)
- Includes context (fuel delivery, construction site)
- Does NOT start with "image of" or "photo of"

### Issue: "License status pending"

**Solution:**
1. Contact vendor for authorized distributor logo usage permission
2. Update `licenseStatus` to `"approved"` after confirmation
3. Re-run audit to clear warning

---

## Production Checklist

Before deploying:

- [ ] All images downloaded and optimized
- [ ] All vendor logos downloaded (SVG + PNG)
- [ ] Audit script passes with 0 critical issues
- [ ] All production assets approved at `/admin/media-review`
- [ ] Vendor logo permissions documented
- [ ] `.env.local` has production API keys
- [ ] No unapproved assets referenced in pages

**Verify:**
```bash
ts-node scripts/audit-media.ts
# Should show 0 issues, all assets approved
```

---

## Security Notes

- `/admin/media-review` is password-protected
- Change `NEXT_PUBLIC_ADMIN_PASSWORD` in production
- Consider implementing proper authentication (Clerk, NextAuth.js)
- Never commit `.env.local` to git
- API keys should be server-side only (except NEXT_PUBLIC_* vars)

---

## Future Enhancements

1. **WebP Conversion**
   - Auto-convert JPG to WebP during fetch
   - Generate responsive variants (-800w.webp, -1600w.webp)

2. **Image Optimization**
   - Generate blurDataURL placeholders for next/image
   - Compress images to target file size

3. **Automated Testing**
   - E2E tests for media review workflow
   - Visual regression testing for logo rendering

4. **Enhanced Approval Workflow**
   - Multi-user approval (designer + legal)
   - Approval history/audit trail
   - Email notifications for new pending assets

5. **OG Image Generation**
   - Auto-generate 1200×630 social media images
   - Use approved images + branding overlay

---

## Support

For questions or issues with the media pipeline:

1. Check this README first
2. Run audit script for diagnostics
3. Review logs in `content/media-rejections.log`
4. Check API console for errors

---

## Summary

The media pipeline ensures that:

✅ All images are license-safe (Unsplash/Pexels)
✅ All vendor logos are officially approved
✅ Alt text meets accessibility standards
✅ No assets go to production without explicit approval
✅ All media is auditable and documented

**Remember:** The approval gate at `/admin/media-review` is your final checkpoint before production. Never skip this step!
