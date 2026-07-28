import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth';
import { renderCreditAppPdf, type CreditAppPdfRow } from '@/lib/credit-app-pdf';

export const runtime = 'nodejs';

// Generate a branded PDF of a submitted credit application.
export async function GET(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Missing application id' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('credit_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    const row = data as unknown as CreditAppPdfRow;
    const pdfBuffer = await renderCreditAppPdf(row);

    const safeName =
      (row.company_name || 'application')
        .replace(/[^A-Za-z0-9 _-]/g, '')
        .trim()
        .replace(/\s+/g, '-') || 'application';
    const dateStamp = new Date(row.submitted_at).toISOString().split('T')[0];

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="credit-application-${safeName}-${dateStamp}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Error generating credit application PDF:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
