-- Quote Submissions Table
-- Stores quote requests from the website form

CREATE TABLE IF NOT EXISTS quote_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Contact information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company TEXT,

  -- Request details
  message TEXT NOT NULL,
  service TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'declined')),

  -- Admin notes
  notes TEXT,
  assigned_to TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contacted_at TIMESTAMPTZ,
  quoted_at TIMESTAMPTZ
);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at
  ON quote_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_quote_submissions_status
  ON quote_submissions(status);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS idx_quote_submissions_email
  ON quote_submissions(email);

-- Enable Row Level Security
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can manage quotes (admin access only)
CREATE POLICY "Service role can manage quotes"
  ON quote_submissions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_quote_submissions_updated_at
  BEFORE UPDATE ON quote_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verification query
SELECT
  'quote_submissions table' AS item,
  COUNT(*) AS count,
  pg_size_pretty(pg_total_relation_size('quote_submissions')) AS size
FROM quote_submissions;
