import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { creditApplicationSchema } from '@/lib/credit-app-schema';
import {
  sendCreditAppNotificationToAdmin,
  sendCreditAppConfirmationToCustomer,
} from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const applicationDataRaw = formData.get('application');

    if (!applicationDataRaw || typeof applicationDataRaw !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid application data' },
        { status: 400 }
      );
    }

    const applicationData = JSON.parse(applicationDataRaw);

    // Validate with Zod
    const validated = creditApplicationSchema.parse(applicationData);

    // Upload files to Supabase Storage
    const files: Record<string, string> = {};
    const fileFields = ['w9', 'taxExemptionCert', 'coi'];

    for (const field of fileFields) {
      const file = formData.get(field);
      if (file && file instanceof File) {
        const fileName = `${Date.now()}-${field}-${file.name}`;
        const { data, error } = await supabaseAdmin.storage
          .from('credit-app-files')
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (error) {
          console.error(`Error uploading ${field}:`, error);
        } else if (data) {
          files[field] = data.path;
        }
      }
    }

    // Handle multiple "other docs"
    const otherDocs: string[] = [];
    for (let i = 0; i < 5; i++) {
      const file = formData.get(`otherDoc${i}`);
      if (file && file instanceof File) {
        const fileName = `${Date.now()}-other-${i}-${file.name}`;
        const { data, error } = await supabaseAdmin.storage
          .from('credit-app-files')
          .upload(fileName, file, {
            contentType: file.type,
          });

        if (error) {
          console.error(`Error uploading otherDoc${i}:`, error);
        } else if (data) {
          otherDocs.push(data.path);
        }
      }
    }

    if (otherDocs.length > 0) {
      files.otherDocs = JSON.stringify(otherDocs);
    }

    // Add IP address and timestamp to agreements
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    validated.agreements.ipAddress = ipAddress;
    validated.agreements.timestamp = new Date().toISOString();

    // Create a simple hash of the agreement for verification
    const agreementText = `${validated.agreements.creditInquiryConsent}-${validated.agreements.tcpaEmailConsent}-${validated.agreements.authorizedSignerName}-${validated.agreements.timestamp}`;
    validated.agreements.agreementHash = Buffer.from(agreementText).toString('base64');

    // Insert into database
    const { data: submission, error: dbError } = await supabaseAdmin
      .from('credit_applications')
      .insert({
        company_name: validated.companyInfo.legalName,
        estimated_monthly_gallons: validated.salesProfile.estimatedMonthlyGallons,
        data: validated,
        files: files,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save application');
    }

    // TODO: Generate PDF (implement with @react-pdf/renderer)
    // const pdfUrl = await generatePDF(validated, submission.id);

    // Send email notifications
    try {
      await sendCreditAppNotificationToAdmin({
        companyName: validated.companyInfo.legalName,
        contactName: `${validated.companyInfo.firstName} ${validated.companyInfo.lastName}`,
        email: validated.companyInfo.email,
        phone: validated.companyInfo.phone,
        applicationId: submission.id,
      });

      // Send customer confirmation (non-blocking)
      sendCreditAppConfirmationToCustomer({
        companyName: validated.companyInfo.legalName,
        contactName: validated.companyInfo.firstName,
        email: validated.companyInfo.email,
        phone: validated.companyInfo.phone,
        applicationId: submission.id,
      }).catch((err) => {
        console.error('Failed to send customer confirmation:', err);
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
      // Don't fail the whole request if email fails
    }

    // Track GA4 event (client-side will handle this)
    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      pdfUrl: null, // TODO: implement PDF generation
      message: 'Application submitted successfully',
    });
  } catch (error: any) {
    console.error('Credit application submission error:', error);

    // Return validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: 'Submission failed. Please try again or contact us at (405) 235-7553.',
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'Credit Application API',
    timestamp: new Date().toISOString(),
  });
}
