import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Industries We Serve | Fuel & DEF Solutions | Penley Oil Company',
  description: 'Penley Oil serves construction, agriculture, transportation, manufacturing, and more. Custom fuel and DEF solutions for every industry in Oklahoma.',
  openGraph: {
    title: 'Industries We Serve - Penley Oil Company',
    description: 'Custom fuel and DEF solutions for construction, agriculture, transportation, and more.',
    url: `${SITE_CONFIG.url}/industries`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/industries`
  }
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-gray-100">
              Custom fuel and DEF solutions tailored to the unique needs of your industry
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Construction */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🏗️</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Construction</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Keep your heavy equipment, excavators, bulldozers, cranes, and construction fleet running
                  with reliable on-site fuel delivery. We understand construction deadlines are critical.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Construction:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Job site fuel delivery (diesel & gasoline)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Bulk DEF for Tier 4 equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Hydraulic fluids and greases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Emergency 24/7 delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Portable fuel tanks for remote sites</span>
                    </li>
                  </ul>
                </div>
                <Link href="/fuel-delivery" className="text-[--penley-green] font-bold hover:underline">
                  Learn More About Fuel Delivery →
                </Link>
              </div>

              {/* Agriculture */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚜</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Agriculture</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Farm and ranch fuel delivery for tractors, combines, irrigation pumps, and agricultural
                  equipment. Tax-exempt dyed diesel available. We understand planting and harvest can't wait.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Agriculture:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Tax-exempt dyed diesel (off-road)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Farm DEF delivery (bulk and packaged)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Tractor hydraulic fluids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Seasonal delivery scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>On-farm fuel storage tanks</span>
                    </li>
                  </ul>
                </div>
                <Link href="/def" className="text-[--penley-green] font-bold hover:underline">
                  Learn More About DEF Supply →
                </Link>
              </div>

              {/* Transportation & Logistics */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚛</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Transportation & Logistics</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Fleet fueling solutions for trucking companies, delivery services, and commercial fleets.
                  Keep your trucks on the road and on schedule with our reliable fuel supply.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Transportation:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>On-site fleet fueling terminals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Bulk DEF for SCR-equipped trucks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Automated fuel management systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Fuel tracking by vehicle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Volume pricing for large fleets</span>
                    </li>
                  </ul>
                </div>
                <Link href="/tanks" className="text-[--penley-green] font-bold hover:underline">
                  Learn More About Tank Solutions →
                </Link>
              </div>

              {/* Manufacturing & Industrial */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🏭</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Manufacturing & Industrial</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Fuel for backup generators, forklifts, and industrial equipment. Lubricants for manufacturing
                  machinery. Keep your facility running smoothly with reliable fuel and oil supply.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Manufacturing:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Backup generator diesel fuel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Forklift propane & diesel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Industrial lubricants & hydraulic fluids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Compressor oils</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Scheduled maintenance delivery</span>
                    </li>
                  </ul>
                </div>
                <Link href="/lubricants" className="text-[--penley-green] font-bold hover:underline">
                  Learn More About Lubricants →
                </Link>
              </div>

              {/* Mining & Energy */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⛏️</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Mining & Energy</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Heavy-duty fuel and lubricant solutions for mining operations and energy production. High-volume
                  delivery capabilities for demanding operations in Oklahoma's oil and gas sector.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Mining & Energy:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Bulk diesel for mining equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>High-volume DEF supply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Heavy-duty gear oils & greases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Remote site delivery capabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>24/7 emergency service</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Municipal & Government */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🏛️</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Municipal & Government</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Fuel and lubricant supply for city vehicles, public works equipment, and government facilities.
                  Government pricing, convenient billing, and service across multiple locations.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Municipalities:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Government contract pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Multiple location servicing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Consolidated billing & reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Public works equipment fuel & oils</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Emergency services priority</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Waste Management */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🗑️</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Waste Management</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Fuel and DEF for garbage trucks, recycling vehicles, and waste collection fleets. We understand
                  your routes start early and can't be delayed for fueling.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Waste Management:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>On-site fueling terminals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Automated DEF dispensing systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Heavy-duty diesel fuel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Hydraulic fluids for compactors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Fleet fuel management</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Emergency Services */}
              <div className="border-l-4 border-[--penley-green] pl-6">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🚒</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-[--penley-green]">Emergency Services</h2>
                <p className="text-lg text-gray-800 mb-6">
                  Priority fuel delivery for fire departments, hospitals, emergency responders, and critical
                  infrastructure. When lives are on the line, we deliver fast.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold mb-3 text-gray-900">Services for Emergency Services:</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Priority delivery scheduling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>24/7 emergency fuel availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Backup generator diesel storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Emergency vehicle fueling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Critical infrastructure support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Industries Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">
              Why Different Industries Trust Penley Oil
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Industry Expertise</h3>
                  <p className="text-gray-800">
                    65+ years serving Oklahoma businesses means we understand the unique challenges and requirements
                    of each industry. We don't just deliver fuel—we provide solutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Flexible Solutions</h3>
                  <p className="text-gray-800">
                    From small daily deliveries to bulk storage installations, we scale our services to match
                    your operation. Custom solutions designed around your specific needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Reliability You Can Count On</h3>
                  <p className="text-gray-800">
                    We know downtime costs money. That's why we maintain 20,000+ gallons of DEF in stock, offer
                    24/7 emergency service, and guarantee next-day standard delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Local Family Business</h3>
                  <p className="text-gray-800">
                    As a third-generation Oklahoma family business, we're invested in your success. You'll work
                    with people who know your name, not a call center.
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Let's discuss custom fuel and DEF solutions for your industry
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
