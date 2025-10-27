-- Penley Oil Website - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste this entire file → Run

-- =============================================
-- 1. CREATE CREDIT APPLICATIONS TABLE
-- =============================================

create table if not exists credit_applications (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  submitted_at timestamp with time zone default now(),
  status text default 'New' check (status in ('New', 'Under Review', 'Approved', 'Declined')),
  estimated_monthly_gallons integer,
  data jsonb not null,
  files jsonb,
  internal_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add indexes for better query performance
create index if not exists idx_credit_apps_status on credit_applications(status);
create index if not exists idx_credit_apps_submitted on credit_applications(submitted_at desc);
create index if not exists idx_credit_apps_company on credit_applications(company_name);

-- Add updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_credit_applications_updated_at
  before update on credit_applications
  for each row
  execute function update_updated_at_column();

-- =============================================
-- 2. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
alter table credit_applications enable row level security;

-- Policy: Anyone can submit applications (public insert)
create policy "Anyone can submit credit applications"
  on credit_applications
  for insert
  with check (true);

-- Policy: Only authenticated users can read (admin panel)
create policy "Authenticated users can view applications"
  on credit_applications
  for select
  using (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
create policy "Authenticated users can update applications"
  on credit_applications
  for update
  using (auth.role() = 'authenticated');

-- =============================================
-- 3. STORAGE BUCKET FOR FILES
-- =============================================

-- Create storage bucket for credit application files
insert into storage.buckets (id, name, public)
values ('credit-app-files', 'credit-app-files', false)
on conflict (id) do nothing;

-- Storage policy: Anyone can upload files (for application submission)
create policy "Anyone can upload credit app files"
  on storage.objects
  for insert
  with check (bucket_id = 'credit-app-files');

-- Storage policy: Authenticated users can view files (admin panel)
create policy "Authenticated users can view credit app files"
  on storage.objects
  for select
  using (bucket_id = 'credit-app-files' and auth.role() = 'authenticated');

-- Storage policy: Authenticated users can delete files (admin management)
create policy "Authenticated users can delete credit app files"
  on storage.objects
  for delete
  using (bucket_id = 'credit-app-files' and auth.role() = 'authenticated');

-- =============================================
-- 4. CONTACT FORM SUBMISSIONS (OPTIONAL - FOR FUTURE)
-- =============================================

create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  form_type text default 'general', -- 'general', 'quote', 'emergency', etc.
  status text default 'New' check (status in ('New', 'Contacted', 'Resolved')),
  created_at timestamp with time zone default now()
);

create index if not exists idx_contact_submissions_created on contact_submissions(created_at desc);
create index if not exists idx_contact_submissions_status on contact_submissions(status);

alter table contact_submissions enable row level security;

create policy "Anyone can submit contact forms"
  on contact_submissions
  for insert
  with check (true);

create policy "Authenticated users can view contact submissions"
  on contact_submissions
  for select
  using (auth.role() = 'authenticated');

-- =============================================
-- 5. VERIFICATION QUERY
-- =============================================

-- Run this to verify everything was created successfully
select
  'credit_applications table' as item,
  count(*) as count
from credit_applications
union all
select
  'contact_submissions table' as item,
  count(*) as count
from contact_submissions
union all
select
  'storage bucket' as item,
  count(*) as count
from storage.buckets
where id = 'credit-app-files';

-- If you see results with 0 counts, everything is set up correctly!
