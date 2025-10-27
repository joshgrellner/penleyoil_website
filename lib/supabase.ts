import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (safe for browser use)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side Supabase client with service role (for API routes only)
// Only initialize on server-side to avoid exposing service role key
let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

export const supabaseAdmin = (() => {
  // Only create admin client on server-side
  if (typeof window === 'undefined') {
    if (!_supabaseAdmin) {
      _supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );
    }
    return _supabaseAdmin;
  }
  // Return regular client on client-side (fallback, shouldn't be used)
  return supabase;
})();

// Database types (will be auto-generated later)
export interface CreditApplication {
  id: string;
  company_name: string;
  submitted_at: string;
  status: 'New' | 'Under Review' | 'Approved' | 'Declined';
  estimated_monthly_gallons: number;
  data: any; // Full application JSON
  files: any; // File URLs JSON
  internal_notes?: string;
  created_at: string;
  updated_at: string;
}
