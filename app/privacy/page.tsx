import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Penley Oil Company',
  description: 'Privacy Policy for Penley Oil Company. Learn how we collect, use, and protect your personal information.',
  openGraph: {
    title: 'Privacy Policy | Penley Oil Company',
    description: 'Learn how we collect, use, and protect your personal information.',
    url: `${SITE_CONFIG.url}/privacy`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function PrivacyPage() {
  const lastUpdated = 'October 21, 2025';

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-100">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <p className="text-gray-800 mb-0">
                <strong>Your Privacy Matters.</strong> Penley Oil Company is committed to protecting your privacy and handling your personal information with care and respect.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1 Information You Provide</h3>
            <p className="text-gray-700 mb-4">When you use our services, request quotes, or create an account, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Name, email address, and phone number</li>
              <li>Business name and address</li>
              <li>Delivery addresses and site locations</li>
              <li>Payment and billing information</li>
              <li>Credit application details (for commercial accounts)</li>
              <li>Tank and equipment information</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages viewed and time spent on our site</li>
              <li>Referral source and navigation paths</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Provide Services:</strong> Process orders, schedule deliveries, and manage your account</li>
              <li><strong>Communications:</strong> Send order confirmations, delivery alerts, and service updates</li>
              <li><strong>Customer Support:</strong> Respond to inquiries and provide technical assistance</li>
              <li><strong>Improve Services:</strong> Analyze usage patterns and enhance our website and services</li>
              <li><strong>Marketing:</strong> Send promotional offers and newsletters (with your consent)</li>
              <li><strong>Compliance:</strong> Meet legal and regulatory requirements</li>
              <li><strong>Safety:</strong> Ensure safe delivery and handling of fuel products</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">3. SMS/Text Messaging</h2>
            <p className="text-gray-700 mb-4">
              If you opt in to receive text messages from Penley Oil Company:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>We may send delivery notifications, order updates, and service alerts</li>
              <li>Message and data rates may apply</li>
              <li>You can opt out at any time by replying STOP</li>
              <li>We will not sell or share your phone number with third parties for marketing</li>
              <li>Message frequency varies based on your account activity</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>TCPA Compliance:</strong> By providing your phone number and opting in, you consent to receive automated text messages from Penley Oil Company at the number provided. Consent is not a condition of purchase.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">4. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and user behavior</li>
              <li>Improve website functionality and performance</li>
              <li>Deliver personalized content and advertising</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. However, disabling cookies may limit some website features.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">5. Information Sharing</h2>
            <p className="text-gray-700 mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Service Providers:</strong> Payment processors, delivery partners, and IT service providers</li>
              <li><strong>Business Partners:</strong> Suppliers and manufacturers for order fulfillment</li>
              <li><strong>Legal Requirements:</strong> Law enforcement, regulatory agencies, or as required by law</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sale of assets</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>We do not sell your personal information to third parties.</strong>
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">6. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>SSL encryption for data transmission</li>
              <li>Secure servers and data storage</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="text-gray-700 mb-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correct:</strong> Update or correct inaccurate information</li>
              <li><strong>Delete:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails or text messages</li>
              <li><strong>Cookies:</strong> Manage cookie preferences through your browser</li>
            </ul>
            <p className="text-gray-700 mb-4">
              To exercise these rights, contact us at <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[--penley-green] hover:underline">{SITE_CONFIG.contact.email}</a> or call <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="text-[--penley-green] hover:underline">{SITE_CONFIG.contact.phone}</a>.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">10. California Privacy Rights</h2>
            <p className="text-gray-700 mb-4">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-[--penley-green] mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices, contact us:
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
                Related: <Link href="/terms" className="text-[--penley-green] hover:underline">Terms of Service</Link>
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
