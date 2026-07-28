import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth';

// Stream a signed URL for an uploaded credit-application file.
// Requires an authenticated admin session; the storage bucket stays private.
export async function GET(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const path = request.nextUrl.searchParams.get('path');
  if (!path || path.includes('..') || path.startsWith('/')) {
    return NextResponse.json(
      { success: false, error: 'Invalid file path' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin.storage
    .from('credit-app-files')
    .createSignedUrl(path, 60 * 10); // valid for 10 minutes

  if (error || !data?.signedUrl) {
    console.error('Error creating signed URL:', error);
    return NextResponse.json(
      { success: false, error: 'File not found' },
      { status: 404 }
    );
  }

  return NextResponse.redirect(data.signedUrl);
}
