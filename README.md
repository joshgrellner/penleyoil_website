# Penley Oil Company Website

Modern, SEO-optimized website for Penley Oil Company built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 What's Built So Far

### ✅ Completed Components

1. **Homepage** (`/`)
   - SEO-optimized with meta tags, Open Graph, and JSON-LD schema
   - Hero section with CTAs
   - Value propositions (Fastest Response, Guaranteed DEF Supply, Family Owned)
   - Complete services overview grid
   - Industries we serve section
   - Service areas preview
   - Quote form integration
   - FAQ section with schema markup
   - Multiple conversion points

2. **Core Components**
   - `Header.tsx` - Responsive navigation with mobile menu
   - `Footer.tsx` - Complete footer with links and contact info
   - `CTAButton.tsx` - Reusable button component
   - `QuoteForm.tsx` - Lead capture form

3. **Configuration & Data**
   - `lib/config.ts` - All business data, services, cities, industries
   - `lib/schema.ts` - JSON-LD schema generators for SEO

### 🚧 Still To Build

- Individual service pages (Fuel, DEF, Lubricants, Additives, Tanks)
- Deliveries page with SLA details
- Programmatic city pages (15+ cities)
- Industry landing pages (8 industries)
- About Us and Contact pages
- Sitemap.xml and robots.txt

## 🖥️ Local Development

**The site is currently running at http://localhost:3000**

Open your browser and navigate to http://localhost:3000 to see the homepage!

### Commands

```bash
# Development server (already running in background)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Project Structure

```
penleyoil-website/
├── app/
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Main navigation
│   ├── Footer.tsx          # Site footer
│   ├── CTAButton.tsx       # Call-to-action button
│   └── QuoteForm.tsx       # Lead capture form
├── lib/
│   ├── config.ts           # Site configuration & data
│   └── schema.ts           # SEO schema helpers
└── public/                 # Static assets (add images here)
```

## 🎨 Customization

### Update Business Information

Edit `lib/config.ts`:
- Contact info (phone, address, hours)
- Services and products
- Cities and service areas
- Industries
- Delivery SLAs

### Add Images/Logos

Place images in the `public/` folder:
- `public/logo.png` - Company logo
- `public/business-photo.jpg` - Location photo for schema
- Add truck photos, team photos, etc.

### Update Colors/Branding

Brand colors are defined in `app/globals.css`:

```css
:root {
  --penley-green: #1a5232;        /* Primary brand green */
  --penley-green-light: #2d6f47;  /* Light green accent */
  --penley-green-dark: #0d3820;   /* Dark green accent */
  --penley-gold: #b8924a;         /* Primary gold accent */
  --penley-gold-light: #d4a961;   /* Light gold */
  --penley-gold-dark: #9a7a3d;    /* Dark gold */
}
```

These colors are used throughout the site with CSS custom properties:
- `bg-[--penley-green]` - Backgrounds
- `text-[--penley-gold]` - Text accents
- `from-[--penley-green] to-[--penley-green-light]` - Gradients

## 📊 SEO Features Implemented

### Meta Tags
- Title templates for all pages
- Meta descriptions optimized for keywords
- Open Graph tags for social sharing
- Canonical URLs

### Schema.org Structured Data
- Organization schema
- LocalBusiness schema
- Service schema
- Product schema (DEF packages)
- FAQ schema
- Breadcrumb schema (ready for inner pages)

### Target Keywords
- diesel fuel delivery Oklahoma
- diesel delivery Oklahoma City
- DEF supplier Oklahoma
- diesel exhaust fluid Oklahoma
- bulk DEF Oklahoma City
- fuel tank rental Oklahoma
- lubricants distributor Oklahoma
- emergency fueling Oklahoma
- kerosene delivery OKC

### Performance Optimizations
- Next.js 15 with Turbopack for fast builds
- Server-side rendering (SSR) for instant indexing
- Image optimization ready
- Code splitting automatic

## 🔧 Next Steps

### 1. Test the Current Site

Visit **http://localhost:3000** and review:
- Homepage layout and content
- Mobile responsiveness (resize browser)
- Navigation menu
- Quote form (test submission)
- All links (will 404 for now - pages not built yet)

### 2. Add Images

We're using AI-generated images from nanobanana. Images needed:
- Hero background (delivery truck on road)
- Service images (fuel delivery, DEF, tanks, etc.)
- Facility/team photos
- Industry-specific images

### 3. Build Remaining Pages

Pages to create:
- Service pages (Fuel, DEF, Lubricants, Additives, Tanks)
- Deliveries page with SLA details
- City pages for local SEO (15+ cities)
- Industry landing pages (8 industries)
- About and Contact pages

### 4. Configure Analytics

Update `lib/config.ts`:
```typescript
analytics: {
  gaId: 'G-XXXXXXXXXX',  // Your actual Google Analytics 4 ID
  gtmId: 'GTM-XXXXXXX'   // Your actual Google Tag Manager ID
}
```

### 5. Set Up Google Search Console

After deployment, verify ownership with the code in `app/layout.tsx`:
```typescript
verification: {
  google: 'YOUR_GOOGLE_VERIFICATION_CODE',
}
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Push code to GitHub
2. Import project to Vercel (vercel.com)
3. Auto-deploys on every commit
4. Free SSL certificate
5. Global CDN

### Option 2: Netlify (Also Free)

1. Push code to GitHub
2. Connect to Netlify (netlify.com)
3. Configure build: `npm run build`
4. Publish directory: `.next`

### Option 3: Your Own Server

Requirements:
- Node.js 18+
- Run `npm run build` then `npm start`
- Use PM2 or similar for process management
- Configure nginx/Apache as reverse proxy

## 📞 Form Submissions

The quote form (`components/QuoteForm.tsx`) currently logs to console. To capture leads, integrate with:

### Option A: Email Service (Recommended)
- [Resend](https://resend.com) - Email API
- [SendGrid](https://sendgrid.com)
- [Mailgun](https://mailgun.com)

### Option B: Form Services
- [Formspree](https://formspree.io)
- [Formspark](https://formspark.io)
- [Netlify Forms](https://www.netlify.com/products/forms/)

### Option C: Your CRM
- Integrate with your existing CRM API
- Can pipe directly to your sales system

## 📈 SEO Checklist

Before going live:

- [ ] Add actual Google Analytics ID
- [ ] Add actual Google Tag Manager ID
- [ ] Add Google Search Console verification
- [ ] Submit sitemap.xml (after we build it)
- [ ] Set up Google Business Profile
- [ ] Add schema markup for reviews (when you have them)
- [ ] Optimize images (compress, add alt text)
- [ ] Test on Google PageSpeed Insights
- [ ] Check mobile usability in Google Search Console

## 🆘 Need Help?

The site is built with modern best practices. Everything is:
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js App Router (latest version)
- Fully responsive and accessible

## 📄 License

Copyright © 2025 Penley Oil Company. All rights reserved.
