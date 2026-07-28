import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth';

function isAuthenticated(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('credit_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      applications: data || [],
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update application status
export async function PATCH(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status, internal_notes } = body;

    const updates: any = {};
    if (status) updates.status = status;
    if (internal_notes !== undefined) updates.internal_notes = internal_notes;

    const { data, error } = await supabaseAdmin
      .from('credit_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating application:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update application' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      application: data,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
