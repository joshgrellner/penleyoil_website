import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Norman Fuel & DEF Delivery | Penley Oil',
  description: 'Fuel and DEF delivery in Norman, Oklahoma—diesel, gasoline, DEF, and tanks. Same/next-day service. Get a quote.',
  openGraph: {
    title: 'Norman Fuel & DEF Delivery | Penley Oil',
    description: 'Fuel and DEF delivery in Norman, Oklahoma—diesel, gasoline, DEF, and tanks. Same/next-day service. Get a quote.',
    url: `${SITE_CONFIG.url}/service-areas/norman-ok`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/service-areas.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Service Areas - Norman OK'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Norman Fuel & DEF Delivery | Penley Oil',
    description: 'Fuel and DEF delivery in Norman, Oklahoma—diesel, gasoline, DEF, and tanks. Same/next-day service. Get a quote.',
    images: [`${SITE_CONFIG.url}/og/service-areas.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/service-areas/norman-ok`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

const normanFAQs = [
  {
    question: 'Do you deliver diesel fuel to Norman, OK?',
    answer: 'Yes! We provide same-day and next-day diesel fuel delivery throughout Norman, Oklahoma and the surrounding areas. We serve residential, commercial, construction, agriculture, and industrial customers across all of Norman including Campus Corner, Brookhaven, and Lake Thunderbird areas.'
  },
  {
    question: 'How quickly can you deliver fuel in Norman?',
    answer: 'For Norman customers, we offer next-business-day delivery as our standard service. Same-day expedited delivery is available for urgent needs (additional fee applies). For emergency situations like generator fuel or equipment breakdowns, we provide 24/7 emergency service. Call (405) 235-7553 for same-day delivery or (405) 500-7269 for emergency delivery to Norman.'
  },
  {
    question: 'Do you serve the University of Oklahoma area?',
    answer: 'Absolutely. We deliver fuel and DEF to the University of Oklahoma campus area, Campus Corner, and all surrounding Norman neighborhoods. We serve OU facilities, research operations, campus construction projects, and nearby businesses.'
  },
  {
    question: 'What fuel services do you offer in Norman?',
    answer: 'We deliver on-road diesel, off-road (dyed) diesel, gasoline, DEF, lubricants, and fuel additives throughout Norman. We also offer free fuel tank rentals (500-2,000 gallons) with fuel purchase commitments, perfect for construction sites and businesses in the Norman area.'
  }
];

export default function NormanOKPage() {
  const schema = [
    generateServiceSchema({
      name: 'Diesel Fuel Delivery in Norman, OK',
      description: 'Same-day diesel, DEF, and lubricants delivery serving all of Norman, Oklahoma including University of Oklahoma area.',
      areaServed: 'Norman, Oklahoma'
    }),
    generateFAQSchema(normanFAQs),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.url },
      { name: 'Service Areas', url: `${SITE_CONFIG.url}/service-areas` },
      { name: 'Norman, OK', url: `${SITE_CONFIG.url}/service-areas/norman-ok` }
    ])
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">SERVING NORMAN SINCE 1958</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Diesel Fuel Delivery in Norman, OK
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Same-day diesel, DEF, and lubricants delivery serving all of Norman, Oklahoma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
                📞 {SITE_CONFIG.contact.phone}
              </CTAButton>
              <CTAButton href="/contact?quote=true" variant="outline" size="lg">
                Request a Quote
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--penley-green]">Fuel Delivery Services in Norman</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⛽</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Diesel Fuel Delivery</h3>
                <p className="text-gray-800">
                  On-road and off-road diesel delivered to your Norman location. Perfect for construction sites, farms, and fleets.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💧</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">DEF Supply</h3>
                <p className="text-gray-800">
                  ISO 22241 certified DEF in jugs, drums, totes, or bulk. 20,000+ gallons always in stock.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🛢️</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Free Tank Rentals</h3>
                <p className="text-gray-800">
                  500-2,000 gallon fuel tanks available free with fuel purchase commitment. Delivery & installation included.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Norman Areas We Serve</h3>
              <div className="grid md:grid-cols-3 gap-4 text-gray-800">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Downtown Norman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>University of Oklahoma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Campus Corner</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Brookhaven</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Lake Thunderbird</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>East Norman</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>West Norman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>North Norman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>South Norman</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries in Norman */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--penley-green]">Norman Industries We Serve</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">🏗️ Construction Companies</h3>
                <p className="text-gray-800">
                  Fuel for residential development, commercial building, and infrastructure projects across Norman.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">🏫 University of Oklahoma</h3>
                <p className="text-gray-800">
                  OU facilities, research operations, campus construction, and Norman Public Schools diesel delivery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">🌾 Agriculture & Farming</h3>
                <p className="text-gray-800">
                  Farm diesel and DEF for agricultural operations in southern Oklahoma County and Cleveland County.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">🏛️ Municipal Services</h3>
                <p className="text-gray-800">
                  City of Norman vehicles, public works equipment, and emergency services fueling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[--penley-green]">Norman Fuel Delivery FAQs</h2>

            <div className="space-y-6">
              {normanFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-800">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[--penley-green] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Fuel Delivery in Norman?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call us today or request a quote online for diesel and DEF delivery in Norman, OK
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg" variant="outline">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" size="lg">
              Request a Quote
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
