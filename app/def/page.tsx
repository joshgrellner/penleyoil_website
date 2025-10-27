import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = generatePageMetadata({
  title: 'Diesel Exhaust Fluid (DEF) Supplier in Oklahoma',
  description: 'ISO 22241/API-compliant DEF in jugs, drums, totes, and bulk. Fast delivery across Oklahoma. Request pricing or schedule now.',
  ogTitle: '20,000+ Gallons DEF Always In Stock',
  ogDescription: 'ISO certified. Packaged on-site. Never run out. Bulk & retail DEF for all equipment.',
  path: '/def',
  ogImage: 'def.jpg',
  keywords: ['DEF supplier Oklahoma', 'diesel exhaust fluid', 'bulk DEF Oklahoma City', 'DEF delivery']
});

const defFAQs = [
  {
    question: 'What is DEF and why do I need it?',
    answer: 'DEF (Diesel Exhaust Fluid) is a solution of 32.5% urea and 67.5% deionized water that reduces harmful nitrogen oxide (NOx) emissions from diesel engines. It is required by federal emissions standards for all diesel vehicles and equipment manufactured after 2010 with Selective Catalytic Reduction (SCR) systems. Without DEF, your equipment will not run properly and may experience reduced power or refuse to start.'
  },
  {
    question: 'How much DEF do Penley Oil keep in stock?',
    answer: 'We maintain over 20,000 gallons of ISO 22241 certified DEF in stock at our Oklahoma City facility at all times. We also package our own 2.5-gallon jugs on-site to ensure continuous availability. We have never run out of DEF.'
  },
  {
    question: 'What sizes of DEF do you offer?',
    answer: 'We offer DEF in multiple package sizes: 2.5-gallon jugs (packaged on-site), 55-gallon drums, 275-330 gallon IBC totes, and bulk delivery from 500 to 6,000+ gallons. We can accommodate everyone from individual truck owners to large fleet operations and DEF resellers.'
  },
  {
    question: 'Is your DEF certified and tested?',
    answer: 'Yes, all our DEF is ISO 22241 and API certified. We conduct regular quality testing and store DEF in climate-controlled conditions to prevent contamination and degradation. We follow strict handling procedures to ensure every gallon meets or exceeds specifications.'
  },
  {
    question: 'Where do you deliver DEF?',
    answer: 'We deliver DEF throughout Oklahoma and to surrounding states including Texas, Kansas, and New Mexico. In the Oklahoma City metro area, we offer next-day standard delivery and same-day expedited service. For bulk DEF orders (330-gallon totes and larger), we service a wider geographic area across the central plains.'
  },
  {
    question: 'Can you set up a DEF storage tank at our facility?',
    answer: 'Yes, we can help you install on-site DEF storage tanks ranging from 500 to 5,000 gallons, complete with dispensing pumps and automated monitoring systems. This is ideal for high-volume fleet operations and allows you to fuel your equipment on-demand. Contact us at (405) 235-7553 to discuss your DEF storage needs.'
  },
  {
    question: 'How should I store DEF properly?',
    answer: 'DEF should be stored between 12°F and 86°F, out of direct sunlight, and in DEF-compatible containers only. Never store DEF in containers that have held diesel fuel or other substances as contamination will ruin the DEF and damage your SCR system. We provide guidance on proper DEF storage with every order.'
  }
];

export default function DEFPage() {
  const schema = [
    generateProductSchema({
      name: 'Diesel Exhaust Fluid (DEF)',
      description: 'ISO 22241 & API certified Diesel Exhaust Fluid available in bulk, totes, drums, and packaged jugs. Over 20,000 gallons in stock.',
      category: 'Diesel Exhaust Fluid',
      offers: {
        availability: 'https://schema.org/InStock'
      }
    }),
    generateFAQSchema(defFAQs),
    generateBreadcrumbSchema([
      { name: 'Home', url: SITE_CONFIG.url },
      { name: 'DEF Supply', url: `${SITE_CONFIG.url}/def` }
    ])
  ];
  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">ISO 22241 CERTIFIED</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              DEF Supply
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Diesel Exhaust Fluid for all your equipment and fleet needs
            </p>
            <p className="text-2xl font-bold text-[--penley-gold] mb-8">
              20,000+ Gallons Always In Stock
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request a DEF Quote
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-black text-[--penley-green] mb-2">20K+</div>
                <div className="text-gray-800 font-semibold">Gallons In Stock</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[--penley-green] mb-2">100%</div>
                <div className="text-gray-800 font-semibold">ISO 22241 Certified</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[--penley-green] mb-2">On-Site</div>
                <div className="text-gray-800 font-semibold">Packaged Here</div>
              </div>
              <div>
                <div className="text-4xl font-black text-[--penley-green] mb-2">Never</div>
                <div className="text-gray-800 font-semibold">Run Out</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEF Package Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">DEF Package Options</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Bulk Delivery</h3>
                <p className="text-gray-800 mb-4">
                  Direct bulk delivery to your storage tanks. Perfect for high-volume users and fleet operations.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>500+ gallon loads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Metered delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Best per-gallon pricing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">275-330 Gallon Totes</h3>
                <p className="text-gray-800 mb-4">
                  IBC totes with dispensing pumps. Ideal for medium-sized operations and job sites.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Returnable containers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Easy dispensing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>No storage tank needed</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🛢️</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">55-Gallon Drums</h3>
                <p className="text-gray-800 mb-4">
                  Standard drums perfect for smaller operations, workshops, and backup supply.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Portable & stackable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Manual or pump dispensing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Easy to store</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-[--penley-gold]">
                <div className="w-16 h-16 bg-[--penley-gold] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">💧</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">2.5-Gallon Jugs</h3>
                <p className="text-gray-800 mb-4">
                  <strong>Packaged on-site!</strong> Convenient sizes for individual trucks and equipment.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Easy pour spouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Always in stock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Case pricing available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is DEF */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-[--penley-green]">What is DEF?</h2>
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-xl leading-relaxed mb-6">
                Diesel Exhaust Fluid (DEF) is a non-toxic solution of 32.5% urea and 67.5% deionized water.
                It's used in Selective Catalytic Reduction (SCR) systems to reduce harmful nitrogen oxide (NOx)
                emissions from diesel engines.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                <strong>Required by federal emissions standards</strong>, DEF is essential for all modern diesel
                trucks, equipment, and vehicles manufactured after 2010. Without DEF, your SCR-equipped equipment
                won't run properly and may experience reduced power or won't start at all.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Quality Matters</h3>
                <p className="text-gray-800 mb-4">
                  Using contaminated or low-quality DEF can damage your SCR system, leading to expensive repairs
                  and downtime. That's why we only supply <strong>ISO 22241 certified DEF</strong> and maintain
                  strict storage and handling procedures.
                </p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Meets all API standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Stored in climate-controlled conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Protected from contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Regular quality testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEF Storage & Handling */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">DEF Storage Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Bulk DEF Tanks</h3>
                <p className="text-gray-800 mb-4">
                  We can help you set up on-site DEF storage tanks with dispensing systems. Perfect for
                  high-volume users who want the convenience of on-demand DEF access.
                </p>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>500-5,000 gallon capacity options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Above-ground and below-ground tanks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Automated monitoring and reordering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Dispensing pumps and nozzles</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Proper DEF Storage Tips</h3>
                <p className="text-gray-800 mb-4">
                  DEF has specific storage requirements to maintain its quality and effectiveness.
                  Follow these guidelines:
                </p>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Store between 12°F and 86°F</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Keep out of direct sunlight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Use only DEF-compatible containers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Avoid contamination from diesel fuel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Using DEF */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Who Needs DEF?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Trucking & Logistics</h3>
                  <p className="text-gray-800">Semi-trucks, delivery fleets, and long-haul operations</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Construction</h3>
                  <p className="text-gray-800">Excavators, dozers, cranes, and heavy equipment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Agriculture</h3>
                  <p className="text-gray-800">Modern tractors, combines, and farm equipment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Mining & Oil/Gas</h3>
                  <p className="text-gray-800">Off-road vehicles and industrial equipment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Waste Management</h3>
                  <p className="text-gray-800">Garbage trucks and refuse collection vehicles</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Municipalities</h3>
                  <p className="text-gray-800">City vehicles, buses, and public works equipment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for DEF */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Penley Oil for Your DEF Supply?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h3 className="text-xl font-bold mb-3">Always In Stock</h3>
                <p className="text-gray-100">
                  With over 20,000 gallons on hand at all times and our own on-site packaging operation,
                  we never run out. Your DEF is always available when you need it.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
                <p className="text-gray-100">
                  ISO 22241 and API certified DEF. We test regularly and maintain proper storage conditions
                  to ensure every gallon meets specifications.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                <p className="text-gray-100">
                  Next-day standard delivery across the Oklahoma City metro area. Same-day expedited service
                  available. Emergency delivery 24/7.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <h3 className="text-xl font-bold mb-3">Competitive Pricing</h3>
                <p className="text-gray-100">
                  Get the best DEF prices in Oklahoma without compromising on quality. Volume discounts
                  available for bulk orders and regular customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[--penley-green]">DEF Frequently Asked Questions</h2>

            <div className="space-y-6">
              {defFAQs.map((faq, index) => (
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order DEF?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Get a DEF quote or schedule your first delivery today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" variant="outline" size="lg">
              Request a DEF Quote
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
