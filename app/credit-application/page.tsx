import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { generateOrganizationSchema, generateFAQSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import CreditAppWizard from '@/components/CreditAppWizard';

export const metadata: Metadata = generatePageMetadata({
  title: 'Commercial Credit Application | Penley Oil',
  description: 'Apply for commercial terms with Penley Oil. Secure online form, document upload, and fast review.',
  ogTitle: 'Apply for Business Credit in 5 Minutes',
  ogDescription: 'Fast approval. Flexible terms. Convenient billing. Get approved online today.',
  path: '/credit-application',
  ogImage: 'credit-application.jpg',
  keywords: ['business credit application', 'commercial fuel account', 'Oklahoma fuel credit']
});

const creditFAQs = [
  {
    question: 'How long does the credit approval process take?',
    answer: 'Most applications are reviewed within 1-2 business days. You will receive notification of your credit decision via email and phone.'
  },
  {
    question: 'What documents are required?',
    answer: 'We require a completed application, W-9 form, and business bank reference. Tax exemption certificates and resale certificates should be included if applicable. Certificate of Insurance (COI) is optional but recommended.'
  },
  {
    question: 'Is a Personal Guaranty required?',
    answer: 'Personal Guaranty requirements vary based on entity type and credit evaluation. It may be required for newer businesses or certain entity structures.'
  },
  {
    question: 'How is my information used and protected?',
    answer: 'All information is encrypted, securely stored, and used solely for credit evaluation purposes. We comply with all applicable privacy laws and industry standards. Your data is never sold or shared with third parties except as required for credit checks.'
  }
];

export default function CreditApplicationPage() {
  const schema = [
    generateOrganizationSchema(),
    generateFAQSchema(creditFAQs),
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Apply for Business Credit
            </h1>
            <p className="text-xl text-gray-100">
              Fast approval • Flexible terms • Convenient billing for Oklahoma businesses
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CreditAppWizard />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {creditFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-[--penley-green] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
          <p className="text-lg mb-6">
            Our credit team is here to help with your application.
          </p>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            className="inline-block bg-white text-[--penley-green] px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors"
          >
            Call {SITE_CONFIG.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
