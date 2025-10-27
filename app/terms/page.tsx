import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Penley Oil Company',
  description: 'Terms of Service for Penley Oil Company. Review the terms and conditions governing the use of our website and services.',
  openGraph: {
    title: 'Terms of Service | Penley Oil Company',
    description: 'Review the terms and conditions governing the use of our website and services.',
    url: `${SITE_CONFIG.url}/terms`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function TermsPage() {
  const lastUpdated = 'October 21, 2025';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-100">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-gray-800 mb-0">
                <strong>Agreement to Terms.</strong> By accessing or using Penley Oil Company's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">1. Services Overview</h2>
            <p className="text-gray-700 mb-4">
              Penley Oil Company provides fuel delivery, diesel exhaust fluid (DEF), lubricants, fuel additives, and related petroleum products and services to commercial and industrial customers in Oklahoma and surrounding states.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">2. Account Registration and Use</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To access certain features or services, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Eligibility</h3>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old and have the legal authority to enter into binding contracts to use our services.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">3. Orders and Deliveries</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1 Ordering</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Orders may be placed via phone, email, website, or in person</li>
              <li>Order acceptance is subject to product availability and credit approval</li>
              <li>We reserve the right to refuse or cancel any order</li>
              <li>Minimum order quantities may apply for certain products or delivery areas</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2 Pricing</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Prices are subject to change based on market conditions</li>
              <li>Quoted prices are valid for the date quoted unless otherwise specified</li>
              <li>Fuel prices may fluctuate; final price is determined at time of delivery</li>
              <li>Additional fees may apply for delivery, equipment rental, or special services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.3 Delivery</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>You must provide safe and accessible delivery locations</li>
              <li>Emergency surcharges may apply for after-hours or weekend deliveries</li>
              <li>Weather, road conditions, or other factors may delay deliveries</li>
              <li>You are responsible for ensuring adequate space and access for delivery vehicles</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">4. Payment Terms</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1 Payment Methods</h3>
            <p className="text-gray-700 mb-4">
              We accept cash, check, credit cards, and approved commercial credit accounts.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2 Credit Accounts</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Credit applications are subject to approval and credit checks</li>
              <li>Payment terms are typically net 30 days unless otherwise agreed</li>
              <li>Late payments may incur interest charges and late fees</li>
              <li>We reserve the right to suspend or terminate credit accounts for non-payment</li>
              <li>Past-due accounts may be subject to collection activities</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3 Taxes</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for all applicable taxes unless you provide a valid tax exemption certificate.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">5. Tank Rentals and Equipment</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Tank rentals require a minimum fuel purchase commitment</li>
              <li>You are responsible for maintaining rented equipment in good condition</li>
              <li>You must comply with all safety and environmental regulations</li>
              <li>Damage to rented equipment may result in repair or replacement charges</li>
              <li>Equipment remains the property of Penley Oil Company</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">6. Product Quality and Specifications</h2>
            <p className="text-gray-700 mb-4">
              We warrant that our products meet industry standards and specifications at the time of delivery. However:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>You are responsible for proper storage and handling after delivery</li>
              <li>Product quality may degrade over time or with improper storage</li>
              <li>Claims for product defects must be made within 7 days of delivery</li>
              <li>We are not liable for damages resulting from improper use or storage</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">7. Safety and Hazardous Materials</h2>
            <p className="text-gray-700 mb-4">
              Petroleum products are flammable and hazardous. You agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Follow all safety instructions and regulations</li>
              <li>Maintain proper storage and handling procedures</li>
              <li>Comply with federal, state, and local environmental laws</li>
              <li>Report spills or accidents immediately</li>
              <li>Assume liability for improper handling or storage</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Penley Oil Company is not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount paid for the specific product or service</li>
              <li>We are not liable for delays, interruptions, or service unavailability</li>
              <li>Force majeure events (weather, acts of God, etc.) excuse performance obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">9. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless Penley Oil Company from any claims, damages, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Your use of our products or services</li>
              <li>Violation of these terms or applicable laws</li>
              <li>Improper storage, handling, or use of products</li>
              <li>Negligence or misconduct</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">10. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on our website, including text, graphics, logos, and software, is the property of Penley Oil Company and protected by copyright and trademark laws. You may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Copy, reproduce, or distribute our content without permission</li>
              <li>Use our trademarks or branding without authorization</li>
              <li>Reverse engineer or extract source code from our website</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">11. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-4">
              Your use of our services is also governed by our <Link href="/privacy" className="text-[--penley-green] hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">12. Modifications to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">13. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your access to our services at any time for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Violation of these Terms</li>
              <li>Non-payment or credit issues</li>
              <li>Fraudulent or illegal activity</li>
              <li>Any reason, with or without notice</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">14. Governing Law and Disputes</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the State of Oklahoma. Any disputes shall be resolved in the courts of Oklahoma County, Oklahoma. You waive any objection to venue or jurisdiction in these courts.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">15. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">16. Entire Agreement</h2>
            <p className="text-gray-700 mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Penley Oil Company regarding the use of our services.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">17. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="mb-2"><strong>Penley Oil Company</strong></p>
              <p className="mb-1">{SITE_CONFIG.contact.address.street}</p>
              <p className="mb-1">{SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}</p>
              <p className="mb-1">Phone: <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="text-[--penley-green] hover:underline">{SITE_CONFIG.contact.phone}</a></p>
              <p className="mb-0">Email: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[--penley-green] hover:underline">{SITE_CONFIG.contact.email}</a></p>
            </div>

            <div className="border-t border-gray-300 pt-6 mt-8">
              <p className="text-gray-800 text-sm">
                Related: <Link href="/privacy" className="text-[--penley-green] hover:underline">Privacy Policy</Link>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
