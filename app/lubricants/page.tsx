import type { Metadata } from 'next';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Industrial Lubricants & Grease in Oklahoma',
  description: 'Industrial oils and greases—motor, hydraulic, gear, antifreeze. Bulk, kegs, pails, and cases delivered statewide.',
  openGraph: {
    title: 'Industrial Lubricants & Grease in Oklahoma',
    description: 'Industrial oils and greases—motor, hydraulic, gear, antifreeze. Bulk, kegs, pails, and cases delivered statewide.',
    url: `${SITE_CONFIG.url}/lubricants`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/lubricants.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Industrial Lubricants & Grease'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Lubricants & Grease in Oklahoma',
    description: 'Industrial oils and greases—motor, hydraulic, gear, antifreeze. Bulk, kegs, pails, and cases delivered statewide.',
    images: [`${SITE_CONFIG.url}/og/lubricants.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/lubricants`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function LubricantsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lubes/lubes-hero.jpg"
            alt="Mechanic pouring golden motor oil into vehicle engine at Penley Oil lubricants service"
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
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">PREMIUM QUALITY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Lubricants & Oils
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Premium lubricants from Phillips 66 and Mystik for all your equipment
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request a Quote
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[--penley-green]">Trusted Brands You Know</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Phillips 66</h3>
                <p className="text-gray-800 text-lg">
                  Industry-leading lubricants trusted by professionals worldwide. Premium performance
                  for demanding applications.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Mystik</h3>
                <p className="text-gray-800 text-lg">
                  High-quality lubricants at competitive prices. Proven performance for everyday
                  equipment and vehicle needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Product Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Motor Oils */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚗</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Motor Oils</h3>
                <p className="text-gray-800 mb-4">
                  Conventional, synthetic blend, and full synthetic motor oils for gasoline and diesel engines.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>5W-20, 5W-30, 10W-30, 10W-40</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>15W-40 diesel engine oil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Full synthetic options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>API certified</span>
                  </li>
                </ul>
              </div>

              {/* Hydraulic Fluids */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Hydraulic Fluids</h3>
                <p className="text-gray-800 mb-4">
                  Premium hydraulic oils for construction equipment, agricultural machinery, and industrial systems.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>AW 32, 46, 68 hydraulic oil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Multi-viscosity formulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Anti-wear protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Biodegradable options</span>
                  </li>
                </ul>
              </div>

              {/* Gear Oils */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gear Oils</h3>
                <p className="text-gray-800 mb-4">
                  Heavy-duty gear lubricants for transmissions, differentials, and industrial gearboxes.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>75W-90, 80W-90 gear oil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>GL-4 and GL-5 ratings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Synthetic options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Extreme pressure additives</span>
                  </li>
                </ul>
              </div>

              {/* Transmission Fluids */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Transmission Fluids</h3>
                <p className="text-gray-800 mb-4">
                  Automatic and manual transmission fluids for smooth shifting and long transmission life.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>ATF Dexron/Mercon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>CVT fluids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Heavy-duty transmissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>OEM specifications</span>
                  </li>
                </ul>
              </div>

              {/* Greases */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🛠️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Greases</h3>
                <p className="text-gray-800 mb-4">
                  Multi-purpose and specialty greases for bearings, chassis, and heavy equipment.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Multi-purpose lithium grease</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>High-temp and EP greases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Food-grade options</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Cartridges and pails</span>
                  </li>
                </ul>
              </div>

              {/* Specialty Products */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🔬</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Specialty Products</h3>
                <p className="text-gray-800 mb-4">
                  Specialized lubricants for specific applications and extreme conditions.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Compressor oils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Two-stroke oils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Chain and bar oils</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Food-grade lubricants</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Package Options</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Bulk Delivery</h3>
                <p className="text-gray-800">Direct delivery to your storage tanks</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🛢️</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">55-Gallon Drums</h3>
                <p className="text-gray-800">Perfect for shops and facilities</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🪣</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">5-Gallon Pails</h3>
                <p className="text-gray-800">Convenient mid-size quantities</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧴</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Quarts & Gallons</h3>
                <p className="text-gray-800">Small quantities for retail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Industries We Serve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Construction</h3>
                  <p className="text-gray-800">Heavy equipment hydraulic fluids, gear oils, and greases</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Agriculture</h3>
                  <p className="text-gray-800">Tractor hydraulics, universal tractor fluid, implement oils</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Automotive</h3>
                  <p className="text-gray-800">Motor oils, transmission fluids, differential oils</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Manufacturing</h3>
                  <p className="text-gray-800">Industrial lubricants, compressor oils, hydraulic systems</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Fleet Operations</h3>
                  <p className="text-gray-800">Bulk motor oil programs, fleet maintenance supplies</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Mining & Energy</h3>
                  <p className="text-gray-800">Heavy-duty lubricants for extreme conditions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Why Choose Our Lubricants?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Premium Quality Brands</h3>
                  <p className="text-gray-800">
                    Phillips 66 and Mystik are trusted names in the lubrication industry. Every product
                    meets or exceeds OEM specifications and industry standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Expert Product Selection</h3>
                  <p className="text-gray-800">
                    Not sure which lubricant is right for your equipment? Our experienced team can help
                    you select the optimal products for your specific applications.
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
                    Get wholesale pricing on quality lubricants. Volume discounts available for bulk
                    purchases and regular customers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Convenient Delivery</h3>
                  <p className="text-gray-800">
                    We deliver lubricants along with your fuel orders, or schedule separate deliveries.
                    Keep your maintenance supplies stocked without extra trips.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Large Inventory</h3>
                  <p className="text-gray-800">
                    We stock a wide selection of viscosities and formulations. Find what you need when
                    you need it, without special orders or long wait times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Lubricants for Your Equipment?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Contact us for product recommendations and pricing
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
    </>
  );
}
