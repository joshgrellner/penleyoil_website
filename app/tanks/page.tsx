import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Fuel Tank Rentals & Sales | 500–2,000 Gallon',
  description: 'Fuel tank rentals and sales—500, 1,000, and 2,000 gal. Single/double-wall, DEF-ready. Delivery and setup available.',
  openGraph: {
    title: 'Fuel Tank Rentals & Sales | 500–2,000 Gallon',
    description: 'Fuel tank rentals and sales—500, 1,000, and 2,000 gal. Single/double-wall, DEF-ready. Delivery and setup available.',
    url: `${SITE_CONFIG.url}/tanks`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/tanks.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Fuel Tank Rentals & Sales'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Tank Rentals & Sales | 500–2,000 Gallon',
    description: 'Fuel tank rentals and sales—500, 1,000, and 2,000 gal. Single/double-wall, DEF-ready. Delivery and setup available.',
    images: [`${SITE_CONFIG.url}/og/tanks.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/tanks`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function TanksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">COMPLETE SOLUTIONS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Tank Solutions
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Fuel and DEF storage tank installation, monitoring, and management
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request Consultation
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Complete Tank Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏗️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Installation</h3>
                <p className="text-gray-800">
                  Professional installation of above-ground and below-ground fuel and DEF storage tanks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Monitoring</h3>
                <p className="text-gray-800">
                  Remote tank monitoring systems with real-time level tracking and automatic reordering
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔧</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Maintenance</h3>
                <p className="text-gray-800">
                  Ongoing tank maintenance, inspections, and compliance support for your peace of mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tank Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Tank Options</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Above-Ground Tanks */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">⬆️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Above-Ground Tanks</h3>
                <p className="text-gray-800 mb-6">
                  Above-ground storage tanks (ASTs) offer flexibility, easier maintenance, and lower
                  installation costs. Perfect for most commercial and industrial applications.
                </p>
                <h4 className="font-bold mb-3 text-gray-900">Benefits:</h4>
                <ul className="space-y-2 text-gray-800 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Lower installation costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Easier inspections and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Visual monitoring capability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Portable and relocatable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Faster installation</span>
                  </li>
                </ul>
                <h4 className="font-bold mb-3 text-gray-900">Available Sizes:</h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>500 - 1,000 gallons (Small operations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>1,000 - 5,000 gallons (Medium operations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>5,000 - 20,000 gallons (Large facilities)</span>
                  </li>
                </ul>
              </div>

              {/* Below-Ground Tanks */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">⬇️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Below-Ground Tanks</h3>
                <p className="text-gray-800 mb-6">
                  Underground storage tanks (USTs) maximize space, protect fuel from weather, and provide
                  a clean, professional appearance for your facility.
                </p>
                <h4 className="font-bold mb-3 text-gray-900">Benefits:</h4>
                <ul className="space-y-2 text-gray-800 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Saves valuable ground space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Protected from weather extremes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Clean, professional appearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Temperature-stable fuel storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Reduced fire risk</span>
                  </li>
                </ul>
                <h4 className="font-bold mb-3 text-gray-900">Available Sizes:</h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>2,000 - 5,000 gallons (Small facilities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>5,000 - 12,000 gallons (Medium facilities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[--penley-green] font-bold">•</span>
                    <span>12,000+ gallons (Large facilities)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tank Monitoring */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Remote Tank Monitoring</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              Never run out of fuel again with our advanced tank monitoring systems
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">How It Works</h3>
                <ol className="space-y-3 text-gray-800">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    <span>We install a wireless level sensor in your tank</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    <span>Sensor transmits real-time fuel level data</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                    <span>You and we monitor levels online 24/7</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                    <span>Automatic delivery scheduled when needed</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Features & Benefits</h3>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Real-time monitoring:</strong> Check levels anytime, anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Automatic alerts:</strong> Get notified when levels are low</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Usage tracking:</strong> Analyze consumption patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Leak detection:</strong> Early warning of potential problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Auto-reorder:</strong> Never run out of fuel</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[--penley-green] text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Stress-Free Fuel Management</h3>
              <p className="text-xl mb-6">
                With our monitoring system, you'll never have to think about fuel levels again. We handle
                everything automatically, ensuring your tanks are always full when you need them.
              </p>
              <CTAButton href="/contact?quote=true" variant="outline" size="lg">
                Learn More About Monitoring
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Tank Equipment */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Tank Equipment & Accessories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Dispensing Pumps</h3>
                <p className="text-gray-800">
                  Electric and manual pumps with flow meters for accurate fuel dispensing
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Nozzles & Hoses</h3>
                <p className="text-gray-800">
                  Automatic shut-off nozzles and high-quality fuel hoses in various lengths
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Level Gauges</h3>
                <p className="text-gray-800">
                  Visual and electronic level indicators for at-a-glance fuel monitoring
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Filtration Systems</h3>
                <p className="text-gray-800">
                  Fuel filters and water separators to protect your equipment
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Containment</h3>
                <p className="text-gray-800">
                  Spill containment systems and secondary containment solutions
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900">Security Features</h3>
                <p className="text-gray-800">
                  Lockable caps, key systems, and access control for theft prevention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Tank Installation Process</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Consultation & Assessment</h3>
                  <p className="text-gray-800">
                    We visit your site to assess your needs, evaluate space, and discuss tank options.
                    We'll provide recommendations based on your usage, budget, and facility layout.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Permitting & Compliance</h3>
                  <p className="text-gray-800">
                    We handle all necessary permits, environmental compliance paperwork, and regulatory
                    requirements. Our team knows Oklahoma regulations inside and out.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Site Preparation</h3>
                  <p className="text-gray-800">
                    We prepare the installation site, including excavation for underground tanks or pad
                    construction for above-ground tanks, along with all necessary containment systems.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Tank Installation</h3>
                  <p className="text-gray-800">
                    Professional installation of your tank, pumping equipment, monitoring systems, and all
                    safety features. We test everything thoroughly before commissioning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Training & Support</h3>
                  <p className="text-gray-800">
                    We train your staff on safe operation, provide all documentation, and set up ongoing
                    maintenance and fuel delivery schedules. We're here whenever you need us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Who Benefits from On-Site Tanks?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Construction Companies</h3>
                <p className="text-gray-800 mb-4">
                  Fuel your entire fleet and equipment from a central location. No more driving to gas stations
                  or waiting for deliveries at multiple job sites.
                </p>
                <p className="text-sm text-gray-700 italic">Typical savings: 15-20% on fuel costs</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Farms & Ranches</h3>
                <p className="text-gray-800 mb-4">
                  Keep tractors, combines, and equipment fueled during critical planting and harvest seasons.
                  DEF storage for modern Tier 4 equipment.
                </p>
                <p className="text-sm text-gray-700 italic">Typical savings: 10-15% on fuel costs</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Fleet Operations</h3>
                <p className="text-gray-800 mb-4">
                  Private fleet fueling saves time and money. Your drivers start each day with a full tank,
                  ready to work. Track fuel usage by vehicle.
                </p>
                <p className="text-sm text-gray-700 italic">Typical savings: 20-30% on fuel costs</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Industrial Facilities</h3>
                <p className="text-gray-800 mb-4">
                  Power backup generators, forklifts, and industrial equipment. Maintain operations during
                  power outages with reliable fuel supply.
                </p>
                <p className="text-sm text-gray-700 italic">Benefit: 99.9% uptime guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Install On-Site Fuel Storage?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Schedule a free consultation to discuss your tank needs and get a custom quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact?quote=true" variant="outline" size="lg">
              Request Consultation
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
