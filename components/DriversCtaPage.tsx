'use client';

import { SITE_CONFIG } from '@/lib/config';
import CTAButton from '@/components/CTAButton';
import { track } from '@/lib/analytics'; // analytics: verified

export default function DriversCtaPage() {
  const foleyLink = process.env.NEXT_PUBLIC_FOLEY_LINK || 'https://apply.foleyservices.com/penleyoil';
  const foleyIframeEmbed = process.env.NEXT_PUBLIC_FOLEY_IFRAME_EMBED === 'true';

  const handleApplyClick = () => {
    // analytics: verified - Track driver application click
    track('drivers_apply_click', {
      link_destination: foleyLink,
      page_title: 'Drivers Page',
    });
  };

  const faqs = [
    {
      question: 'What CDL endorsements do I need?',
      answer: 'A valid Class A or B CDL is required. Tanker and Hazmat endorsements are preferred but we can help you obtain them if needed.'
    },
    {
      question: 'What routes do you run?',
      answer: 'We primarily serve Oklahoma City metro and surrounding areas within a 1-hour radius. Most routes are local with consistent home time.'
    },
    {
      question: 'Do you hire owner-operators?',
      answer: 'Yes! We work with both company drivers and owner-operators. Contact us to discuss owner-operator opportunities and rates.'
    },
    {
      question: 'What are the safety requirements?',
      answer: 'Clean driving record, DOT physical, drug screening, and compliance with all FMCSA regulations. Safety is our top priority.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">NOW HIRING</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Drive for Penley Oil Company
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Join Oklahoma's premier fuel distributor. Competitive pay, consistent routes, and a family-owned company that values safety and professionalism.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton
                href={foleyLink}
                size="lg"
                onClick={handleApplyClick}
              >
                Apply Now via Foley →
              </CTAButton>
              <CTAButton
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                variant="outline"
                size="lg"
              >
                Questions? Call {SITE_CONFIG.contact.phone}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Hire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[--penley-green]">Who We Hire</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Company Drivers</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Valid Class A or B CDL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Tanker/Hazmat endorsements (or willing to obtain)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Clean driving record</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>2+ years commercial driving experience preferred</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Owner-Operators</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>DOT-compliant tanker equipment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Current insurance and operating authority</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Hazmat certified and compliant</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[--penley-green] mr-2">✓</span>
                    <span>Professional track record</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routes & Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[--penley-green]">Routes & Service Areas</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Primary Service Area</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Oklahoma City Metro</li>
                    <li>• Norman, Edmond, Moore</li>
                    <li>• Yukon, Mustang, El Reno</li>
                    <li>• Guthrie, Stillwater region</li>
                    <li>• Within 1-hour radius of OKC</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Extended Routes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Statewide DEF delivery</li>
                    <li>• Regional fuel transport</li>
                    <li>• Consistent schedules</li>
                    <li>• Home daily or same-day</li>
                    <li>• Predictable routes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Compliance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[--penley-green]">Safety & Compliance</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                At Penley Oil Company, safety isn't just a priority—it's a core value. Since 1958, we've maintained an exceptional safety record through rigorous training, modern equipment, and a culture of accountability.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="font-bold mb-2">DOT Compliant</h3>
                  <p className="text-sm text-gray-800">Full compliance with FMCSA regulations and safety standards</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-bold mb-2">Modern Equipment</h3>
                  <p className="text-sm text-gray-800">Well-maintained fleet with latest safety technology</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-4xl mb-4">📋</div>
                  <h3 className="font-bold mb-2">Ongoing Training</h3>
                  <p className="text-sm text-gray-800">Regular safety training and certification programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pay & Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[--penley-green]">Compensation</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 mb-6">
                We offer competitive pay rates based on experience, route type, and endorsements. Pay cadence is consistent with industry standards—bi-weekly direct deposit.
              </p>
              <div className="border-l-4 border-[--penley-gold] pl-6 py-4 bg-gray-50">
                <p className="font-semibold text-gray-900">
                  Specific compensation details are discussed during the application process. Contact our HR team for current rates and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Iframe Fallback (if enabled) */}
      {foleyIframeEmbed && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Apply Online</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src={foleyLink}
                  className="w-full h-[800px] border-0"
                  title="Foley Application"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply now through Foley or call us to learn more about driving opportunities at Penley Oil Company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href={foleyLink}
              size="lg"
              variant="secondary"
              onClick={handleApplyClick}
            >
              Apply Now via Foley →
            </CTAButton>
            <CTAButton
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              variant="outline"
              size="lg"
            >
              📞 {SITE_CONFIG.contact.phone}
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
