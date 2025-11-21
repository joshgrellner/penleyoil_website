import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SITE_CONFIG, SERVICES, INDUSTRIES, CITIES } from '@/lib/config';
import { generateOrganizationSchema, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema';
import { generatePageMetadata } from '@/lib/metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';
import QuoteForm from '@/components/QuoteForm';
import LogoStrip from '@/components/LogoStrip';

export const metadata: Metadata = generatePageMetadata({
  title: 'Home — Fuel, DEF & Lubricants in Oklahoma | Penley Oil',
  description: 'Same/next-day diesel, DEF, lubricants, and tank solutions across Oklahoma. Call (405) 235-7553 or schedule a delivery online.',
  ogTitle: "Oklahoma's #1 Fuel & DEF Supplier Since 1958",
  ogDescription: 'Fast diesel & DEF delivery. Free tank rentals. 24/7 emergency service. Family-owned since 1958.',
  path: '',
  ogImage: 'home.jpg',
  keywords: ['fuel delivery Oklahoma', 'DEF supplier', 'diesel delivery', 'lubricants Oklahoma City']
});

const homeFAQs = [
  {
    question: 'What are your fuel delivery times in Oklahoma City?',
    answer: 'We offer reliable next-business-day delivery as our standard service. Same-day delivery is available for expedited orders (additional fee applies). For emergency fueling needs, we provide 24/7 service. Order before 2 PM for next-day delivery.'
  },
  {
    question: 'What is DEF and do I need it for my equipment?',
    answer: 'DEF (Diesel Exhaust Fluid) is required for all Tier 4 diesel engines manufactured after 2010. We supply ISO 22241 and API certified DEF in packages from 1 gallon to bulk transport delivery. We have over 20,000 gallons in stock and package our own 2.5-gallon jugs on-site.'
  },
  {
    question: 'Are fuel tank rentals really free?',
    answer: 'Yes! We provide free fuel tank rentals (500, 1,000, and 2,000-gallon options) when you purchase fuel from us on a regular basis. This includes delivery, installation, and maintenance of single-wall and double-wall tanks.'
  },
  {
    question: 'What areas do you deliver to?',
    answer: 'We deliver fuel and lubricants within the Oklahoma City metro area (approximately 1 hour radius). For DEF, we service all of Oklahoma plus Texas, Kansas, Missouri, and Arkansas. We serve construction sites, farms, fleets, and commercial facilities throughout our service area.'
  }
];

export default function HomePage() {
  const schema = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateServiceSchema({
      name: 'Fuel Delivery Service',
      description: 'Diesel, gasoline, and kerosene delivery throughout Oklahoma',
      areaServed: 'Oklahoma'
    }),
    generateServiceSchema({
      name: 'DEF Supply',
      description: 'Bulk and packaged Diesel Exhaust Fluid with guaranteed supply',
      areaServed: 'Oklahoma, Texas, Kansas, Missouri, Arkansas'
    }),
    generateFAQSchema(homeFAQs)
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero Section - Bold & Modern */}
      <section className="relative text-white py-24 md:py-40 overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/home-hero-1.png"
            alt="Penley Oil fuel delivery bobtail truck refilling commercial fuel tank at Oklahoma construction site"
            fill
            priority
            quality={95}
            className="object-cover object-center scale-95"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[--penley-green-dark]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-[--penley-green-dark]/30"></div>
        </div>

        {/* Accent decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[--penley-gold] opacity-10 rounded-full blur-3xl z-[1]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[--penley-gold] opacity-5 rounded-full blur-3xl z-[1]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            <div className="inline-flex items-center bg-[--penley-gold]/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-bold mb-8 border border-[--penley-gold]/30">
              <span className="text-[--penley-gold]">★</span>
              <span className="ml-2">SERVING OKLAHOMA SINCE 1958</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)' }}>
              Oklahoma's Premier<br />
              <span className="text-[--penley-gold]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.6)' }}>Fuel & DEF</span> Distributor
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 font-medium max-w-3xl leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)' }}>
              Next-day fuel delivery • Guaranteed DEF supply • Free tank rentals • 24/7 emergency service available
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/contact?quote=true" size="lg">
                Schedule a Delivery →
              </CTAButton>
              <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} variant="outline" size="lg">
                📞 {SITE_CONFIG.contact.phone}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props - Modern Card Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[--penley-gold]">
              <div className="w-16 h-16 bg-gradient-to-br from-[--penley-green] to-[--penley-green-light] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-black mb-3 text-[--penley-green]">Fastest Response</h3>
              <p className="text-gray-800 leading-relaxed">
                Reliable next-day delivery across Oklahoma City metro. Same-day and emergency fueling available 24/7.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[--penley-gold]">
              <div className="w-16 h-16 bg-gradient-to-br from-[--penley-green] to-[--penley-green-light] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-black mb-3 text-[--penley-green]">Guaranteed DEF Supply</h3>
              <p className="text-gray-800 leading-relaxed">
                Over 20,000 gallons in stock. ISO 22241 & API certified. We never run out.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[--penley-gold]">
              <div className="w-16 h-16 bg-gradient-to-br from-[--penley-green] to-[--penley-green-light] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-2xl font-black mb-3 text-[--penley-green]">Family Owned Since 1958</h3>
              <p className="text-gray-800 leading-relaxed">
                Three generations of fuel delivery experience. Real Oklahoma operations expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Bold Modern Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-[--penley-gold]/10 px-6 py-2 rounded-full mb-4">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">OUR SERVICES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[--penley-green]">
              Diesel Fuel & DEF Delivery Services
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              From same-day diesel delivery to guaranteed DEF supply to free tank rentals, we handle all your fuel needs with unmatched reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fuel Delivery */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/fuel-delivery" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  Fuel Delivery
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                On-road diesel, off-road diesel, gasoline, kerosene, and solvents delivered to your site.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ Next-day delivery standard</li>
                <li>✓ 24/7 emergency fueling</li>
                <li>✓ Automatic delivery programs</li>
                <li>✓ Fleet & jobsite fueling</li>
              </ul>
              <Link href="/fuel-delivery" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* DEF Supply */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/def" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  DEF Supply
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                ISO 22241 & API certified Diesel Exhaust Fluid. Bulk and packaged options.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ 1-gal, 2.5-gal, 55-gal, 330-gal totes</li>
                <li>✓ Bulk delivery (6,000+ gal)</li>
                <li>✓ Multi-state coverage (OK, TX, KS, NM)</li>
                <li>✓ Guaranteed supply</li>
              </ul>
              <Link href="/def" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Lubricants */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/lubricants" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  Lubricants & Fluids
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                Motor oils, hydraulic fluids, gear oils, grease, and specialty fluids.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ Phillips 66 & Mystik brands</li>
                <li>✓ Bulk, keg, pail, case delivery</li>
                <li>✓ Equipment & dispensing tools</li>
                <li>✓ Antifreeze & coolants</li>
              </ul>
              <Link href="/lubricants" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Additives */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/additives" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  Fuel Additives
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                BG Products fuel treatments with free tank management program.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ BG DFC Plus, DOC, 109, 44K</li>
                <li>✓ Free fuel sampling every 6 months</li>
                <li>✓ Contamination prevention</li>
                <li>✓ Tank life extension</li>
              </ul>
              <Link href="/additives" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Tanks */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/tanks" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  Tank Solutions
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                Fuel tank rentals, sales, installation, and service.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ 500, 1,000, 2,000-gal tanks</li>
                <li>✓ Single & double-wall options</li>
                <li>✓ FREE rental with fuel purchase</li>
                <li>✓ Delivery & installation included</li>
              </ul>
              <Link href="/tanks" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Deliveries */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/deliveries" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  Delivery Service
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                Flexible delivery options with predictive ordering and automatic refills.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ Next business day standard</li>
                <li>✓ Same-day available (expedited)</li>
                <li>✓ Weekend delivery by request</li>
                <li>✓ Emergency 24/7 response</li>
              </ul>
              <Link href="/deliveries" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Multiseal */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[--penley-green] transition-colors">
              <h3 className="text-2xl font-bold mb-3">
                <Link href="/multiseal" className="text-[--penley-green] hover:text-[--penley-green-dark]">
                  MULTI SEAL Tire Sealant
                </Link>
              </h3>
              <p className="text-gray-800 mb-4">
                Industrial tire protection that reduces flats by up to 95%. Authorized distributor.
              </p>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li>✓ HYDRO 1500, PRO HD 2500, ARMOR 3500</li>
                <li>✓ Lifetime tire protection</li>
                <li>✓ Commercial & industrial fleets</li>
                <li>✓ FlatOut for recreational use</li>
              </ul>
              <Link href="/multiseal" className="text-[--penley-green] font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-800">
              Trusted by businesses across Oklahoma for reliable fuel and DEF delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.slice(0, 8).map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-[--penley-green]">{industry.name}</h3>
                <p className="text-sm text-gray-800">{industry.description.substring(0, 80)}...</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/industries" className="text-[--penley-green] font-semibold text-lg hover:underline">
              View All Industries →
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Suppliers - Logo Strip */}
      <LogoStrip
        heading="Trusted Suppliers"
        subheading="We carry premium products from industry-leading brands"
        showOnlyApproved={false}
        variant="light"
      />

      {/* Service Area */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Oklahoma & Beyond</h2>
            <p className="text-xl text-gray-800">
              Fuel & lubricants within 1 hour of OKC • DEF delivery statewide & across OK, TX, KS, NM
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CITIES.filter(c => c.metro && c.priority === 1).map((city) => (
              <Link
                key={`${city.name}-${city.state}`}
                href={`/service-areas/${city.name.toLowerCase().replace(/\s+/g, '-')}-${city.state.toLowerCase()}`}
                className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-[--penley-green] transition-colors text-center"
              >
                <h3 className="font-bold text-gray-900">{city.name}, {city.state}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/service-areas" className="text-[--penley-green] font-semibold text-lg hover:underline">
              View All Service Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-[--penley-green]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {homeFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-[--penley-green]">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Call us today for same-day fuel delivery, bulk DEF supply, or tank rental quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" variant="outline" size="lg">
              Request a Quote Online
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
