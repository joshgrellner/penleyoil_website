/**
 * Quote Form Submission API
 * Handles quote requests from the website
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  sendQuoteNotificationToAdmin,
  sendQuoteConfirmationToCustomer,
  type QuoteFormData,
} from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare quote data
    const quoteData: QuoteFormData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: body.company?.trim() || undefined,
      message: message.trim(),
      service: body.service?.trim() || undefined,
    };

    // Store in database
    const { data: savedQuote, error: dbError } = await supabase
      .from('quote_submissions')
      .insert({
        name: quoteData.name,
        email: quoteData.email,
        phone: quoteData.phone,
        company: quoteData.company,
        message: quoteData.message,
        service: quoteData.service,
        status: 'new',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error saving quote:', dbError);
      // Continue anyway - email is more critical than database
    }

    // Send email notification to admin
    try {
      await sendQuoteNotificationToAdmin(quoteData);
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      return NextResponse.json(
        { error: 'Failed to send notification. Please call us at (405) 235-7553.' },
        { status: 500 }
      );
    }

    // Send confirmation to customer (non-blocking)
    sendQuoteConfirmationToCustomer(quoteData).catch((err) => {
      console.error('Failed to send customer confirmation:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: savedQuote?.id,
    });
  } catch (error) {
    console.error('Error processing quote submission:', error);
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
