# Google Analytics 4 (GA4) Quick Setup Guide

## 🎯 Goal
Get GA4 tracking working on your Penley Oil website in ~10 minutes.

---

## ⚡ Quick Setup (3 Steps)

### 1. Create GA4 Property (5 min)
1. Go to https://analytics.google.com
2. Click **Admin** (gear icon, bottom left)
3. Click **Create Property**
4. Fill in:
   - **Name:** Penley Oil Website
   - **Time zone:** Central Time (US)
   - **Currency:** USD
5. Click **Next** → Select **Energy & Utilities**
6. Click **Create** → Accept terms

### 2. Get Measurement ID (2 min)
1. In Admin → **Data Streams**
2. Click **Add stream** → **Web**
3. URL: `https://www.penleyoil.com`
4. Name: `Penley Oil Main Site`
5. **Copy the Measurement ID** (looks like `G-XXXXXXXXXX`)

### 3. Add to Vercel (3 min)
```bash
vercel env add NEXT_PUBLIC_GA4_ID
```
**When prompted:**
- Paste your `G-XXXXXXXXXX` ID
- Select: `Production`, `Preview`, `Development` (all three)

**That's it!** The site will auto-deploy and tracking will start immediately.

---

## ✅ Verify It's Working

### Test 1: Real-Time Report (30 seconds)
1. Go to GA4 → **Reports** → **Realtime**
2. Visit https://penleyoil-website.vercel.app
3. You should see **1 user** in the dashboard within 30 seconds

### Test 2: Check Events (1 minute)
1. In Realtime report, scroll to **Event count by Event name**
2. You should see:
   - `page_view` - When you load pages
   - `session_start` - When you first visit
   - `user_engagement` - As you interact

### Test 3: Check Form Tracking
1. Fill out the contact form on staging site
2. Submit it
3. In GA4 Realtime → Events, look for `lead_submit`

---

## 📊 What Gets Tracked Automatically

Your site is already configured to track:

| Event | When It Fires | Where to See It |
|-------|---------------|-----------------|
| `page_view` | Every page load | Realtime → Events |
| `session_start` | First visit | Realtime → Users |
| `lead_submit` | Quote form submitted | Conversions |
| `click_to_call` | Phone number clicked | Conversions |
| `service_view` | Service page viewed | Custom Reports |

---

## 🎯 Mark Events as Conversions

After 24 hours of data collection:

1. Go to **Admin** → **Events**
2. Find `lead_submit` → Toggle **Mark as conversion** ✓
3. Find `click_to_call` → Toggle **Mark as conversion** ✓

This lets you track which pages/sources drive the most leads!

---

## 📈 Useful Reports to Set Up

### 1. Lead Generation Report
**Question:** Which pages generate the most leads?

**Setup:**
1. Go to **Explore** → **Free form**
2. Add dimensions:
   - Page path
   - Landing page
3. Add metrics:
   - lead_submit (conversions)
   - Users
4. Save as "Lead Sources"

### 2. Phone Call Tracking
**Question:** Which pages make people call?

**Setup:**
1. Go to **Explore** → **Free form**
2. Add dimension: Page path
3. Add metric: click_to_call (conversions)
4. Save as "Call Drivers"

### 3. Service Interest Report
**Question:** Which services are most popular?

**Setup:**
1. Go to **Explore** → **Free form**
2. Add dimension: Page path (filter: contains "/fuel-delivery", "/def", "/tanks", etc.)
3. Add metrics: Users, Engagement time
4. Save as "Service Popularity"

---

## 🔍 Common Issues & Fixes

### Issue 1: Not seeing any data
**Solution:**
- Check NEXT_PUBLIC_GA4_ID is set in Vercel env vars
- Make sure site redeployed after adding env var
- Check browser dev console for errors
- Disable ad blockers when testing

### Issue 2: Events not showing up
**Solution:**
- Events take 24-48 hours to show in standard reports
- Use **Realtime** reports for immediate feedback
- Check DebugView (Admin → DebugView) for event details

### Issue 3: Wrong measurement ID
**Solution:**
```bash
# Remove old env var
vercel env rm NEXT_PUBLIC_GA4_ID

# Add correct one
vercel env add NEXT_PUBLIC_GA4_ID
```

---

## 📱 Mobile App Tracking (Future)

If you create a Penley Oil mobile app:
1. Add iOS data stream
2. Add Android data stream
3. Use Firebase SDK for app tracking

---

## 🎓 Learning Resources

**Official Guides:**
- GA4 Setup: https://support.google.com/analytics/answer/9304153
- Events Overview: https://support.google.com/analytics/answer/9322688
- Conversions: https://support.google.com/analytics/answer/9267568

**Video Tutorials:**
- Google Analytics 4 Tutorial: https://www.youtube.com/watch?v=GvDbkgJN9Tc
- Conversion Tracking: https://www.youtube.com/watch?v=9FLzhHx7cT0

---

## 🎉 Success Checklist

After setup, you should see:

- [ ] Realtime users appear when you visit the site
- [ ] `page_view` events tracking correctly
- [ ] `lead_submit` fires when form submitted
- [ ] `click_to_call` fires when phone clicked
- [ ] Data appears in standard reports after 24 hours
- [ ] Conversions marked for lead events

---

## 💡 Pro Tips

1. **Set up email alerts** for zero traffic (catch issues early)
2. **Link to Google Search Console** (Admin → Search Console Links)
3. **Create a dashboard** with your top 5 KPIs
4. **Set goals** (e.g., 50 leads/month) and track progress
5. **Review weekly** - schedule 15 min every Monday

---

**Questions?** Contact Google Analytics support or check the analytics code in:
- `app/layout.tsx` (lines 92-108)
- `lib/analytics.ts` (custom event tracking)
- `components/PageViewTracker.tsx` (page view tracking)
