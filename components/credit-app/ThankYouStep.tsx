'use client';

import CTAButton from '@/components/CTAButton';
import { SITE_CONFIG } from '@/lib/config';

export default function ThankYouStep({ submissionId, pdfUrl }: { submissionId: string | null; pdfUrl: string | null }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[--penley-green] mb-4">Application Submitted!</h1>
        <p className="text-xl text-black mb-6">
          Thank you for applying for credit with Penley Oil Company.
        </p>
        {submissionId && (
          <p className="text-sm text-black mb-6">
            Reference ID: <span className="font-mono font-bold">{submissionId}</span>
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-xl font-bold mb-4">What Happens Next?</h2>
        <ul className="text-left space-y-3 text-black">
          <li className="flex items-start">
            <span className="text-[--penley-green] mr-2">1.</span>
            <span>Our credit team will review your application within 1-2 business days</span>
          </li>
          <li className="flex items-start">
            <span className="text-[--penley-green] mr-2">2.</span>
            <span>We may contact you for additional information or clarification</span>
          </li>
          <li className="flex items-start">
            <span className="text-[--penley-green] mr-2">3.</span>
            <span>You'll receive a decision via email and phone</span>
          </li>
          <li className="flex items-start">
            <span className="text-[--penley-green] mr-2">4.</span>
            <span>Once approved, we'll set up your account and schedule your first delivery</span>
          </li>
        </ul>
      </div>

      {pdfUrl && (
        <div className="mb-8">
          <CTAButton href={pdfUrl} variant="secondary" size="lg">
            Download Your Application PDF
          </CTAButton>
        </div>
      )}

      <div className="border-t pt-8">
        <p className="text-black mb-4">Questions about your application?</p>
        <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
          Call {SITE_CONFIG.contact.phone}
        </CTAButton>
      </div>
    </div>
  );
}
