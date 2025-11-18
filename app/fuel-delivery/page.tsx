import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Diesel & Fuel Delivery Across Oklahoma',
  description: 'On-road/off-road diesel, gasoline, and kerosene delivered statewide. Generator top-offs and emergency fueling available.',
  openGraph: {
    title: 'Diesel & Fuel Delivery Across Oklahoma',
    description: 'On-road/off-road diesel, gasoline, and kerosene delivered statewide. Generator top-offs and emergency fueling available.',
    url: `${SITE_CONFIG.url}/fuel-delivery`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/fuel-delivery.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Diesel & Fuel Delivery Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diesel & Fuel Delivery Across Oklahoma',
    description: 'On-road/off-road diesel, gasoline, and kerosene delivered statewide. Generator top-offs and emergency fueling available.',
    images: [`${SITE_CONFIG.url}/og/fuel-delivery.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/fuel-delivery`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

const fuelFAQs = [
  {
    question: 'How much does diesel fuel delivery cost in Oklahoma City?',
    answer: 'Diesel delivery pricing depends on volume and delivery location. We offer competitive rates with volume discounts for regular customers. Standard minimum delivery is 300 gallons, though smaller quantities can be delivered with an additional delivery charge. Contact us at (405) 235-7553 for a custom quote based on your specific needs and location.'
  },
  {
    question: 'Do you deliver diesel fuel on weekends in Oklahoma?',
    answer: 'Yes, weekend diesel delivery is available upon request in Oklahoma City and surrounding areas. Weekend and after-hours delivery can be arranged when you place your order. For emergency fueling needs, we provide 24/7 service. Call (405) 235-7553 to schedule weekend delivery or (405) 500-7269 for emergency service.'
  },
  {
    question: 'What types of diesel fuel do you deliver?',
    answer: 'We deliver both on-road (clear) diesel and off-road (dyed) diesel. On-road diesel is ultra-low sulfur diesel (ULSD) for highway vehicles and fleets. Dyed diesel is tax-exempt and used for construction equipment, agricultural machinery, generators, and other off-road applications. We also offer winterized diesel blends to prevent gelling in cold weather.'
  },
  {
    question: 'What is the minimum order for bulk fuel delivery?',
    answer: 'Our standard minimum delivery is 300 gallons for fuel in the Oklahoma City metro area. Smaller quantities can be delivered with an additional delivery charge. We offer flexible delivery options including one-time orders, scheduled deliveries, and automated refill programs. Contact us to discuss your specific needs.'
  },
  {
    question: 'How quickly can you deliver fuel in an emergency?',
    answer: 'We provide 24/7 emergency fuel delivery service for critical situations like generator fuel, stranded equipment, or unexpected shortages. Emergency deliveries typically arrive within a few hours depending on your location and our driver availability. Call (405) 500-7269 immediately for emergency fueling needs.'
  },
  {
    question: 'Can you fuel equipment on construction sites or remote locations?',
    answer: 'Yes, we deliver directly to construction sites, farm fields, remote job sites, and other locations across Oklahoma. Our trucks can access most locations and we specialize in flexible on-site fueling. We deliver to your equipment, storage tanks, or temporary fuel tanks at your work site.'
  }
];

export default function FuelDeliveryPage() {
  const schema = [
    generateServiceSchema({
      name: 'Fuel Delivery Service',
      description: 'Professional diesel and gasoline fuel delivery across Oklahoma for construction, agriculture, commercial fleets, and industrial operations. Same-day and emergency delivery available.',
      areaServed: 'Oklahoma'
    }),
    generateFAQSchema(fuelFAQs),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.url },
      { name: 'Fuel Delivery', url: `${SITE_CONFIG.url}/fuel-delivery` }
    ])
  ];
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fuel/fuel-hero.jpg"
            alt="Fuel tanker truck delivering diesel at commercial site with hoses and safety equipment"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[--penley-green-dark]/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">BULK FUEL DELIVERY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Fuel Delivery Services
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Reliable diesel and gasoline delivery to keep your equipment and fleet running
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request a Fuel Quote
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Fuel Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Available Fuel Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⛽</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Diesel Fuel</h3>
                <p className="text-gray-800">
                  Ultra-low sulfur diesel (ULSD) for trucks, equipment, and generators
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Unleaded Gasoline</h3>
                <p className="text-gray-800">
                  Regular and premium grades for vehicles and small equipment
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Dyed Diesel</h3>
                <p className="text-gray-800">
                  Tax-exempt off-road diesel for agriculture and construction
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🏮</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Kerosene</h3>
                <p className="text-gray-800">
                  K-1 kerosene for heaters, generators, and equipment
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">❄️</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Winter Diesel</h3>
                <p className="text-gray-800">
                  Winterized blends to prevent gelling in cold Oklahoma weather
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Industries We Serve</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Construction</h3>
                <p className="text-gray-800 mb-4">
                  Keep your excavators, bulldozers, cranes, and heavy equipment fueled on-site. We deliver
                  directly to your job sites across Oklahoma.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Job site delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Bulk diesel & gasoline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Flexible scheduling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Agriculture</h3>
                <p className="text-gray-800 mb-4">
                  Dyed diesel for tractors, combines, and farm equipment. Bulk delivery to your farm
                  during planting and harvest seasons.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Tax-exempt dyed diesel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Farm delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Seasonal scheduling</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Commercial Fleets</h3>
                <p className="text-gray-800 mb-4">
                  Fuel your delivery trucks, service vehicles, and commercial fleets. We deliver to your
                  facility or install on-site tanks.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Fleet fueling programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>On-site tank installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Automated delivery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Industrial</h3>
                <p className="text-gray-800 mb-4">
                  Power generators, forklifts, and industrial equipment. Reliable fuel supply for
                  manufacturing and processing facilities.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Generator fuel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Forklift propane</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Industrial diesel</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Emergency Services</h3>
                <p className="text-gray-800 mb-4">
                  Keep emergency generators and vehicles fueled. Priority delivery for fire departments,
                  hospitals, and emergency responders.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Priority service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>24/7 availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Emergency delivery</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Municipalities</h3>
                <p className="text-gray-800 mb-4">
                  Fuel city vehicles, public works equipment, and municipal facilities. Government pricing
                  and convenient billing.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Government pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Invoice billing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Multiple locations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Fuel Delivery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Why Choose Penley Oil for Fuel Delivery?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Premium Quality Fuel</h3>
                  <p className="text-gray-800">
                    We source only high-quality diesel and gasoline from trusted suppliers. Every gallon
                    meets or exceeds industry standards for performance and reliability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Competitive Pricing</h3>
                  <p className="text-gray-800">
                    Get the best fuel prices in Oklahoma without sacrificing quality or service. Volume
                    discounts available for large orders and regular customers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Flexible Delivery Options</h3>
                  <p className="text-gray-800">
                    Next-day standard delivery, same-day expedited service, or 24/7 emergency fueling.
                    We work around your schedule and operational needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Professional Drivers</h3>
                  <p className="text-gray-800">
                    Our experienced, certified drivers handle every delivery safely and professionally.
                    All drivers are background-checked and fully insured.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Modern Fleet</h3>
                  <p className="text-gray-800">
                    Our well-maintained delivery trucks are equipped with modern safety features and
                    metering systems for accurate delivery every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Additives */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Fuel Enhancement Available</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              Ask about adding BG Products fuel additives to improve performance and protect your equipment
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Cetane Boosters</h3>
                <p className="text-gray-800">Improve combustion and performance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Anti-Gel Additives</h3>
                <p className="text-gray-800">Prevent fuel gelling in winter</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold mb-2 text-gray-900">Fuel Stabilizers</h3>
                <p className="text-gray-800">Extend shelf life for stored fuel</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/additives" className="text-[--penley-green] font-bold hover:underline text-lg">
                Learn More About Fuel Additives →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[--penley-green]">Fuel Delivery FAQs</h2>

            <div className="space-y-6">
              {fuelFAQs.map((faq, index) => (
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
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Schedule Fuel Delivery?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Get a fuel quote or schedule your first delivery today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" variant="outline" size="lg">
              Request a Fuel Quote
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
