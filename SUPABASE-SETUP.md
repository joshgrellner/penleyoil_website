# Supabase Setup Instructions

## ✅ What's Been Completed

1. ✅ Supabase credentials added to `.env.local`
2. ✅ Supabase JavaScript client installed (`@supabase/supabase-js`)
3. ✅ Supabase helper file created (`/lib/supabase.ts`)
4. ✅ API route for credit applications created (`/app/api/credit-application/submit/route.ts`)
5. ✅ SQL setup file created (`supabase-setup.sql`)
6. ✅ Database test endpoint created (`/app/api/test-db`)

## 🚀 Next Steps - Run This SQL

**You need to run the SQL setup in your Supabase dashboard:**

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/inpdkngpzficcwrueuyj
2. Click **SQL Editor** in left sidebar
3. Click **New Query**

### Step 2: Copy & Paste SQL
1. Open the file: `/home/josh/penleyoil-website/supabase-setup.sql`
2. Copy ALL the contents
3. Paste into the SQL Editor
4. Click **Run** (or Ctrl+Enter)

### Step 3: Verify Setup
After running the SQL, you should see a results table showing:
```
item                          | count
------------------------------|------
credit_applications table     | 0
contact_submissions table     | 0
storage bucket               | 1
```

If you see this, **you're all set!** ✅

## 🧪 Test the Connection

Once you've run the SQL, test the database connection:

1. Open your browser
2. Go to: **http://localhost:3000/api/test-db**
3. You should see:
```json
{
  "success": true,
  "message": "Supabase connection successful!",
  "database": {
    "connected": true,
    "table": "credit_applications exists"
  },
  "storage": {
    "connected": true,
    "buckets": ["credit-app-files"]
  }
}
```

## 🎯 Test Credit Application

After the SQL is set up and the test passes:

1. Go to: **http://localhost:3000/credit-application**
2. Fill out the multi-step form
3. Upload some test files
4. Sign with the signature pad
5. Submit the application

Then check your Supabase dashboard:
- **Table Editor** → `credit_applications` → You should see your submission!
- **Storage** → `credit-app-files` → You should see uploaded files!

## 📊 What Was Created

### Database Tables

#### `credit_applications`
- Stores all credit application submissions
- Includes full form data as JSON
- Tracks status (New, Under Review, Approved, Declined)
- Timestamped automatically

#### `contact_submissions` (bonus)
- Ready for future contact forms
- Can track general inquiries, quotes, etc.

### Storage Bucket

#### `credit-app-files`
- Stores W-9 forms
- Tax exemption certificates
- Certificates of Insurance
- Other supporting documents
- Private by default (only admins can view)

### Security

- **Row Level Security (RLS)** enabled
- Public can submit applications
- Only authenticated users can view/manage
- Files are private and encrypted

## 🔐 Admin Access (Future)

To access the admin panel later, you'll need to:

1. Create a Supabase user (dashboard → Authentication → Users → Add User)
2. Use that user to log in to your admin panel
3. Admin panel route will be: `/admin/credit-applications`

For now, you can view submissions directly in Supabase:
- **Table Editor** → `credit_applications`

## 🐛 Troubleshooting

### Error: "relation credit_applications does not exist"
- **Fix:** Run the `supabase-setup.sql` file in your Supabase SQL Editor

### Error: "bucket credit-app-files does not exist"
- **Fix:** The storage bucket creation is in the SQL file - make sure you ran all of it

### Test endpoint shows error
- Check that your `.env.local` has the correct keys
- Restart your dev server: `npm run dev`
- Make sure you ran the SQL setup

## 📞 Need Help?

If you encounter issues:
1. Check the SQL Editor for any error messages
2. Verify your `.env.local` has the correct Supabase URL and keys
3. Make sure your dev server restarted after adding the env vars

---

**Current Status:** Ready to test once SQL is run! 🎉
