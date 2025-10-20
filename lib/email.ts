/**
 * Email Service
 * Handles all email notifications using Resend
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@penleyoil.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@penleyoil.com';
const CC_EMAILS = process.env.EMAIL_CC ? process.env.EMAIL_CC.split(',') : [];

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  service?: string;
}

export interface CreditAppData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  applicationId: string;
}

/**
 * Send quote form notification to admin
 */
export async function sendQuoteNotificationToAdmin(data: QuoteFormData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      cc: CC_EMAILS,
      subject: `New Quote Request - ${data.name}`,
      html: `
        <h2>New Quote Request Received</h2>

        <h3>Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
          ${data.company ? `<li><strong>Company:</strong> ${data.company}</li>` : ''}
          ${data.service ? `<li><strong>Service:</strong> ${data.service}</li>` : ''}
        </ul>

        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>

        <hr>
        <p style="color: #666; font-size: 12px;">
          Submitted from www.penleyoil.com quote form
        </p>
      `,
    });

    if (error) {
      console.error('Failed to send admin quote notification:', error);
      throw new Error('Failed to send email notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending quote notification:', error);
    throw error;
  }
}

/**
 * Send quote confirmation to customer
 */
export async function sendQuoteConfirmationToCustomer(data: QuoteFormData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Thank You for Your Quote Request - Penley Oil',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thank You for Your Quote Request</h2>

          <p>Hi ${data.name},</p>

          <p>We received your quote request and will get back to you shortly. Our team typically responds within 1 business day.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Request:</h3>
            ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
            <p><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
          </div>

          <p><strong>Need immediate assistance?</strong></p>
          <p>Call us at <a href="tel:+14052357553" style="color: #0066cc; text-decoration: none;">(405) 235-7553</a></p>

          <p style="margin-top: 30px;">Best regards,<br><strong>Penley Oil Company</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="color: #666; font-size: 12px;">
            Penley Oil Company<br>
            1400 W Reno Ave, Oklahoma City, OK 73106<br>
            Mon-Thu: 7:00 AM - 4:30 PM | Fri: 7:00 AM - 4:00 PM<br>
            <a href="https://www.penleyoil.com" style="color: #0066cc;">www.penleyoil.com</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send customer quote confirmation:', error);
      // Don't throw - customer confirmation is nice-to-have
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending quote confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Send credit application notification to admin
 */
export async function sendCreditAppNotificationToAdmin(data: CreditAppData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      cc: CC_EMAILS,
      subject: `New Credit Application - ${data.companyName}`,
      html: `
        <h2>New Credit Application Received</h2>

        <h3>Company Information:</h3>
        <ul>
          <li><strong>Company:</strong> ${data.companyName}</li>
          <li><strong>Contact:</strong> ${data.contactName}</li>
          <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
          <li><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></li>
          <li><strong>Application ID:</strong> ${data.applicationId}</li>
        </ul>

        <p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/credit-applications"
             style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            View Application
          </a>
        </p>

        <hr>
        <p style="color: #666; font-size: 12px;">
          Submitted from www.penleyoil.com credit application
        </p>
      `,
    });

    if (error) {
      console.error('Failed to send admin credit app notification:', error);
      throw new Error('Failed to send email notification');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending credit app notification:', error);
    throw error;
  }
}

/**
 * Send credit application confirmation to customer
 */
export async function sendCreditAppConfirmationToCustomer(data: CreditAppData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Credit Application Received - Penley Oil',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Credit Application Received</h2>

          <p>Dear ${data.contactName},</p>

          <p>Thank you for submitting your credit application for <strong>${data.companyName}</strong>.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Application ID:</strong> ${data.applicationId}</p>
            <p style="margin: 10px 0 0 0;"><strong>Status:</strong> Under Review</p>
          </div>

          <p>Our credit team will review your application and contact you within 2-3 business days.</p>

          <p><strong>Questions?</strong></p>
          <p>Contact our office at <a href="tel:+14052357553" style="color: #0066cc; text-decoration: none;">(405) 235-7553</a></p>

          <p style="margin-top: 30px;">Best regards,<br><strong>Penley Oil Company</strong></p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

          <p style="color: #666; font-size: 12px;">
            Penley Oil Company<br>
            1400 W Reno Ave, Oklahoma City, OK 73106<br>
            Mon-Thu: 7:00 AM - 4:30 PM | Fri: 7:00 AM - 4:00 PM<br>
            <a href="https://www.penleyoil.com" style="color: #0066cc;">www.penleyoil.com</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send customer credit app confirmation:', error);
      // Don't throw - customer confirmation is nice-to-have
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending credit app confirmation:', error);
    return { success: false, error };
  }
}
