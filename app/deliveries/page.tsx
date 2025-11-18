import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import { generateFAQSchema, generateOrganizationSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = generatePageMetadata({
  title: 'Schedule Fuel or DEF Delivery | Penley Oil',
  description: 'Schedule diesel, gasoline, or DEF delivery. Same/next-day windows, emergency fueling, and clear order cut-offs.',
  ogTitle: 'Fast Fuel Delivery — Next-Day or Same-Day',
  ogDescription: '24/7 emergency service. Scheduled auto-delivery. Never run out. Order by 2 PM for next-day.',
  path: '/deliveries',
  ogImage: 'deliveries.jpg',
  keywords: ['fuel delivery Oklahoma', 'diesel delivery OKC', 'emergency fueling', 'same day fuel delivery']
});

const deliveryFAQs = [
  {
    question: 'What are your delivery options?',
    answer: 'We offer three delivery options: Next-day standard delivery (no extra charge), same-day expedited delivery (small rush fee), and 24/7 emergency delivery for critical situations. Standard delivery requires orders by 2 PM, while expedited and emergency services are available when you need them.'
  },
  {
    question: 'Do you deliver on weekends?',
    answer: 'Yes, weekend delivery is available by request for an additional fee. We also offer 24/7 emergency delivery service for urgent fueling needs. Contact us at (405) 235-7553 for scheduling or call (405) 500-7269 for emergency delivery.'
  },
  {
    question: 'What is the minimum delivery order?',
    answer: 'Our standard minimum delivery is 300 gallons for diesel and gasoline fuel, and 250 gallons for bulk DEF. Smaller quantities can be delivered with an additional delivery charge. For packaged DEF (jugs, drums, or totes), we can accommodate smaller orders. Contact us to discuss your specific needs.'
  },
  {
    question: 'How do I schedule a fuel delivery?',
    answer: 'You can schedule deliveries by phone at (405) 235-7553, text message, email, or through our website contact form. For standard next-day delivery, place your order by 2 PM. We also offer automated delivery programs for regular customers.'
  },
  {
    question: 'Do you offer emergency fuel delivery?',
    answer: 'Yes, we provide 24/7 emergency fuel delivery across Oklahoma. If you run out of fuel or have an urgent need, call (405) 500-7269 anytime. Our emergency service ensures your operations never stop due to fuel shortages.'
  },
  {
    question: 'What areas do you deliver to?',
    answer: 'We deliver throughout Oklahoma City metro and statewide across Oklahoma. For DEF, we also service Texas, Kansas, Missouri, and Arkansas. Next-day and same-day service is available within the OKC metro area.'
  }
];

export default function DeliveriesPage() {
  const schema = [
    generateOrganizationSchema(),
    generateFAQSchema(deliveryFAQs)
  ];
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">FAST & RELIABLE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Delivery Information
            </h1>
            <p className="text-xl text-gray-100">
              Next-day standard delivery. Same-day expedited service. 24/7 emergency fueling.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Delivery Options</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Standard Delivery */}
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Standard Delivery</h3>
                <div className="mb-6">
                  <div className="text-3xl font-black text-[--penley-green] mb-2">Next Day</div>
                  <div className="text-gray-700 font-semibold">No Extra Charge</div>
                </div>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Order by 2 PM for next-day delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Scheduled delivery windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Ideal for planned refills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Call, text, or email orders</span>
                  </li>
                </ul>
              </div>

              {/* Expedited Delivery */}
              <div className="bg-[--penley-gold]/10 p-8 rounded-lg border-2 border-[--penley-gold]">
                <div className="w-16 h-16 bg-[--penley-gold] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Expedited Delivery</h3>
                <div className="mb-6">
                  <div className="text-3xl font-black text-[--penley-green] mb-2">Same Day</div>
                  <div className="text-gray-700 font-semibold">Small Rush Fee</div>
                </div>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Same-day delivery available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Priority scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Perfect for urgent needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Minimal additional cost</span>
                  </li>
                </ul>
              </div>

              {/* Emergency Service */}
              <div className="bg-red-50 p-8 rounded-lg border-2 border-red-500">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🚨</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Emergency Service</h3>
                <div className="mb-6">
                  <div className="text-3xl font-black text-red-700 mb-2">24/7</div>
                  <div className="text-gray-700 font-semibold">Always Available</div>
                </div>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Round-the-clock availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Weekends and holidays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Immediate response team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Keep your operations running</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t-2 border-red-200">
                  <a
                    href={`tel:${SITE_CONFIG.contact.emergency.phoneRaw}`}
                    className="block text-center bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                  >
                    Call {SITE_CONFIG.contact.emergency.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">How It Works</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Place Your Order</h3>
                  <p className="text-gray-800 text-lg">
                    Call, text, or email us with your fuel or DEF needs. Provide your location,
                    product type, and quantity. We'll confirm availability and schedule your delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">We Schedule & Confirm</h3>
                  <p className="text-gray-800 text-lg">
                    Our team schedules your delivery based on your preference—next-day standard,
                    same-day expedited, or emergency service. You'll receive confirmation with an
                    estimated delivery window.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Delivery & Service</h3>
                  <p className="text-gray-800 text-lg">
                    Our professional drivers arrive on time with your fuel or DEF. We handle all
                    fueling safely and efficiently. You'll receive a delivery ticket with all
                    details for your records.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Billing & Payment</h3>
                  <p className="text-gray-800 text-lg">
                    Choose from multiple payment options: credit account (apply online), invoice billing,
                    or pay on delivery. Flexible terms available for qualified businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automated Delivery Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Automated Delivery Programs</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              Never run out of fuel again. Let us monitor your tanks and schedule automatic deliveries.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Tank Monitoring</h3>
                <p className="text-gray-800 mb-4">
                  We can install remote tank monitoring systems that track your fuel levels in real-time.
                  When levels drop below your threshold, we automatically schedule a delivery.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Real-time level tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Automatic reorder triggers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Online dashboard access</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Scheduled Auto-Delivery</h3>
                <p className="text-gray-800 mb-4">
                  Based on your historical usage patterns, we'll schedule regular deliveries to keep
                  your tanks full without you having to place orders.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Usage-based scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Predictive delivery planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Seasonal adjustments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Level Agreement */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Service Commitment</h2>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">Delivery Guarantee</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>Next-day delivery standard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>Same-day expedited available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>24/7 emergency response</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Quality Standards</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>ISO 22241 certified DEF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>Premium fuel grades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[--penley-gold] font-bold">✓</span>
                      <span>Professional drivers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Area */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[--penley-green]">Delivery Service Area</h2>
            <p className="text-xl text-gray-800 mb-6">
              We serve the entire Oklahoma City metro area and surrounding regions. Bulk deliveries
              available statewide for qualified orders.
            </p>
            <Link
              href="/service-areas"
              className="inline-block text-[--penley-green] font-bold hover:underline text-lg"
            >
              View Full Service Area Map →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Schedule a Delivery?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Call us now or request a quote online. Fast, reliable delivery when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" variant="outline" size="lg">
              Request a Quote
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[--penley-green]">Delivery FAQs</h2>
            <div className="space-y-6">
              {deliveryFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-800">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
