import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'MULTI SEAL Tire Sealant Distributor | Oklahoma',
  description: 'Authorized MULTI SEAL distributor. Industrial tire sealant reduces flats by 95%. HYDRO, PRO HD, and ARMOR formulas for heavy equipment and fleets.',
  openGraph: {
    title: 'MULTI SEAL Tire Sealant Distributor | Oklahoma',
    description: 'Authorized MULTI SEAL distributor. Industrial tire sealant reduces flats by 95%. HYDRO, PRO HD, and ARMOR formulas.',
    url: `${SITE_CONFIG.url}/multiseal`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/multiseal.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil MULTI SEAL Tire Sealant'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MULTI SEAL Tire Sealant Distributor | Oklahoma',
    description: 'Authorized MULTI SEAL distributor. Industrial tire sealant reduces flats by 95%. HYDRO, PRO HD, and ARMOR formulas.',
    images: [`${SITE_CONFIG.url}/og/multiseal.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/multiseal`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function MultiSealPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-[--penley-green-dark] to-[--penley-green]">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">AUTHORIZED DISTRIBUTOR</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              MULTI SEAL<sup>®</sup> Tire Sealant
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Reduce flat tire incidents by up to 95% with industrial-grade tire protection
            </p>
            <p className="text-lg text-gray-200 mb-8">
              Now available through Penley Oil Company - Your trusted Oklahoma distributor
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request Information
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Partnership Announcement */}
      <section className="py-16 bg-white border-b-4 border-[--penley-gold]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[--penley-green]">
              Penley Oil Partners with MULTI SEAL
            </h2>
            <p className="text-xl text-gray-800 leading-relaxed">
              We're proud to announce our partnership with MULTI SEAL Corporation to bring their
              proven industrial tire sealant technology to Oklahoma businesses. With over 40 years
              of experience, MULTI SEAL delivers the protection your fleet and equipment need to
              minimize downtime and maximize productivity.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[--penley-green]">
                See MULTI SEAL in Action
              </h2>
              <p className="text-xl text-gray-800">
                Watch how MULTI SEAL tire sealant prevents flats and keeps your equipment running
              </p>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                src="https://www.youtube.com/embed/widA_Q25Ywc"
                title="MULTI SEAL Tire Sealant Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Why Choose MULTI SEAL?</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              Industry-leading tire protection technology that saves time, money, and prevents costly downtime
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Up to 95% Flat Reduction</h3>
                    <p className="text-gray-800">
                      Proven to dramatically reduce flat tire incidents across industrial applications
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">⏱️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Lifetime Protection</h3>
                    <p className="text-gray-800">
                      One treatment lasts the entire life cycle of the tire - no reapplication needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">24/7 Active Protection</h3>
                    <p className="text-gray-800">
                      Continuous protection that activates and tightens as the tire moves to prevent leaks from reopening
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Installation</h3>
                    <p className="text-gray-800">
                      Applied through the valve stem in minutes - no tire dismounting required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Line */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">MULTI SEAL Product Line</h2>
            <div className="grid md:grid-cols-3 gap-8">

              {/* HYDRO 1500 */}
              <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg shadow-lg border-2 border-blue-200">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl">💧</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">HYDRO 1500™</h3>
                <p className="text-center text-sm text-blue-700 font-semibold mb-4">FOR BALLAST-FILLED TIRES</p>
                <p className="text-gray-800 mb-4">
                  Specifically formulated to work with water-ballasted tires common in agricultural and
                  construction equipment.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Compatible with ballast fluid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Prevents water-related corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Ideal for tractors & heavy equipment</span>
                  </li>
                </ul>
              </div>

              {/* PRO HD 2500 */}
              <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-lg shadow-lg border-2 border-[--penley-green]">
                <div className="w-20 h-20 bg-[--penley-green] rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl">⚙️</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">PRO HD 2500™</h3>
                <p className="text-center text-sm text-[--penley-green] font-semibold mb-4">WORKHORSE FORMULA</p>
                <p className="text-gray-800 mb-4">
                  The primary industrial formula for commercial trucks, fleets, and general industrial
                  equipment protection.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Proven fleet performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Maximum versatility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>On-road & off-road applications</span>
                  </li>
                </ul>
              </div>

              {/* ARMOR 3500 */}
              <div className="bg-gradient-to-b from-red-50 to-white p-6 rounded-lg shadow-lg border-2 border-red-300">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-4xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">ARMOR 3500™</h3>
                <p className="text-center text-sm text-red-700 font-semibold mb-4">EXTREME DUTY PROTECTION</p>
                <p className="text-gray-800 mb-4">
                  Designed for the harshest working environments where tire damage is most severe and
                  downtime is most costly.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Maximum protection level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Heavy construction sites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✓</span>
                    <span>Mining & quarry operations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Advanced Tire Protection Technology</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              MULTI SEAL uses proprietary technology to create an active seal that responds to punctures
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-gold] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">TangleTek™ Fibers</h3>
                    <p className="text-gray-800">
                      Proprietary synthetic fibers that interlock and create a permanent seal when forced
                      into punctures by escaping air pressure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-gold] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔩</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">DamRight™ Fillers</h3>
                    <p className="text-gray-800">
                      Advanced filling compounds that work with TangleTek fibers to create a solid,
                      permanent plug that seals the largest punctures in the industry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-gold] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Active Sealing Process</h3>
                    <p className="text-gray-800">
                      When a puncture occurs, escaping air forces MULTI SEAL into the wound. The fibers
                      and fillers create an airtight seal that activates and tightens with tire rotation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Industries & Applications</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              MULTI SEAL protects tires across a wide range of commercial and industrial operations
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🚛</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Commercial Fleets</h3>
                <p className="text-gray-800 text-sm">
                  Delivery trucks, service vehicles, and over-the-road commercial trucks
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🏗️</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Construction Equipment</h3>
                <p className="text-gray-800 text-sm">
                  Loaders, excavators, skid steers, and jobsite support equipment
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🌾</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Agricultural Operations</h3>
                <p className="text-gray-800 text-sm">
                  Tractors, combines, harvesters, and farm utility vehicles
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🏭</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Material Handling</h3>
                <p className="text-gray-800 text-sm">
                  Forklifts, warehouse equipment, and industrial yard vehicles
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">⛏️</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Mining & Quarry</h3>
                <p className="text-gray-800 text-sm">
                  Heavy mining equipment operating in extreme puncture environments
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-3">🏞️</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Off-Road Operations</h3>
                <p className="text-gray-800 text-sm">
                  Oil & gas, utilities, and remote site equipment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FlatOut Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-[--penley-green]">Also Available: FlatOut™</h2>
              <p className="text-xl text-gray-800">
                For recreational and lifestyle applications
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">FlatOut™ Tire Sealant</h3>
                  <p className="text-gray-800 mb-4">
                    The same proven technology in a formula designed for trailers, RVs, ATVs, UTVs,
                    lawn equipment, and outdoor power equipment.
                  </p>
                  <ul className="space-y-2 text-gray-800 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Seals punctures up to ½-inch diameter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>10+ year lifespan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Non-toxic, non-corrosive, freeze-resistant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Easy Dispensing Cap™</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3 text-gray-900">Perfect For:</h4>
                  <div className="space-y-2 text-gray-800">
                    <div className="flex items-center gap-2">
                      <span>🚐</span>
                      <span>RVs & Campers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⛵</span>
                      <span>Boat & Utility Trailers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🏍️</span>
                      <span>ATVs & UTVs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚜</span>
                      <span>Lawn Tractors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🔧</span>
                      <span>Outdoor Power Equipment</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    Note: Not recommended for passenger vehicle tires
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MULTI SEAL */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Over 40 Years of Innovation</h2>
            <p className="text-xl mb-8 text-gray-100">
              MULTI SEAL Corporation has been the trusted name in tire sealant technology for over four
              decades. Made in the USA in New Caney, Texas, their products are used by professional
              fleet operators, municipalities, and industrial operations worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">40+</div>
                <div className="font-semibold">Years of Experience</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">95%</div>
                <div className="font-semibold">Flat Reduction Rate</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">USA</div>
                <div className="font-semibold">Made in America</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Fleet?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Contact Penley Oil today to learn more about MULTI SEAL tire sealant and find the right
            formula for your operation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              Request Information
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
