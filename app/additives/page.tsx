import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Fuel Additives & Tank Care Program | Oklahoma',
  description: 'Fuel additive program to prevent gelling and deposit issues. Routine tank checks and bottom sampling included.',
  openGraph: {
    title: 'Fuel Additives & Tank Care Program | Oklahoma',
    description: 'Fuel additive program to prevent gelling and deposit issues. Routine tank checks and bottom sampling included.',
    url: `${SITE_CONFIG.url}/additives`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/additives.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Fuel Additives & Tank Care'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fuel Additives & Tank Care Program | Oklahoma',
    description: 'Fuel additive program to prevent gelling and deposit issues. Routine tank checks and bottom sampling included.',
    images: [`${SITE_CONFIG.url}/og/additives.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/additives`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function AdditivesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">BG PRODUCTS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Fuel Additives
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Premium BG Products additives to protect and enhance your fuel
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Request Information
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Why Use Additives */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Why Use Fuel Additives?</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              Modern fuels and equipment demand more than ever. Fuel additives help protect your investment
              and maximize performance.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Performance Benefits</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Improved combustion efficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Increased fuel economy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Better cold-weather starting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Smoother engine operation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Protection Benefits</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents fuel system deposits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Cleans injectors and pumps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Protects against corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Extends equipment life</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BG Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Available BG Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Diesel Additives */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⛽</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Diesel Fuel Additives</h3>
                <p className="text-gray-800 mb-4">
                  Comprehensive diesel fuel treatment to improve cetane, clean injectors, and protect fuel systems.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Increases cetane rating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Cleans fuel injectors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents fuel degradation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Water dispersant</span>
                  </li>
                </ul>
              </div>

              {/* Anti-Gel */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">❄️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Anti-Gel Treatment</h3>
                <p className="text-gray-800 mb-4">
                  Essential for Oklahoma winters. Prevents diesel fuel from gelling in cold weather.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Lowers pour point</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents wax crystallization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Ensures cold starts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Protects fuel filters</span>
                  </li>
                </ul>
              </div>

              {/* Cetane Booster */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Cetane Booster</h3>
                <p className="text-gray-800 mb-4">
                  Improves combustion quality and engine performance by increasing fuel cetane number.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Better ignition quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Smoother engine operation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Reduces engine noise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Improved fuel economy</span>
                  </li>
                </ul>
              </div>

              {/* Fuel Stabilizer */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Fuel Stabilizer</h3>
                <p className="text-gray-800 mb-4">
                  Keeps stored fuel fresh longer. Perfect for seasonal equipment and backup generators.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents fuel oxidation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Extends storage life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents varnish deposits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Works with diesel & gasoline</span>
                  </li>
                </ul>
              </div>

              {/* Injector Cleaner */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🧼</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Injector Cleaner</h3>
                <p className="text-gray-800 mb-4">
                  Deep-cleaning formula removes deposits from fuel injectors and combustion chambers.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Restores spray patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Removes carbon deposits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Improves fuel atomization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Restores power & efficiency</span>
                  </li>
                </ul>
              </div>

              {/* Biocide */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🦠</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Diesel Biocide</h3>
                <p className="text-gray-800 mb-4">
                  Eliminates microbial growth in diesel fuel tanks that can cause filter plugging and corrosion.
                </p>
                <ul className="space-y-2 text-gray-800 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Kills bacteria & fungi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prevents filter plugging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Stops corrosion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Long-lasting protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">How to Use Fuel Additives</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Bulk Fuel Delivery</h3>
                <p className="text-gray-800">
                  When ordering bulk fuel delivery, tell us which additives you want included. We'll add
                  the correct treatment ratio directly during delivery. It's that simple.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Packaged Products</h3>
                <p className="text-gray-800">
                  Purchase additives in bottles, jugs, or drums to treat your existing fuel supply. Each
                  product includes clear instructions for proper dosing based on fuel quantity.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Ongoing Treatment Programs</h3>
                <p className="text-gray-800">
                  Set up an automatic additive program where every fuel delivery includes treatment. Perfect
                  for fleets and operations that want consistent fuel quality without thinking about it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use What */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">When to Use Each Additive</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">❄️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Winter (October - March)</h3>
                    <p className="text-gray-800">
                      <strong>Essential:</strong> Anti-gel treatment for all diesel fuel.
                      <br />
                      <strong>Recommended:</strong> Cetane booster for better cold starting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Spring/Summer (April - September)</h3>
                    <p className="text-gray-800">
                      <strong>Essential:</strong> Biocide treatment to prevent microbial growth in warm weather.
                      <br />
                      <strong>Recommended:</strong> Fuel stabilizer for stored fuel and backup equipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Maintenance & Troubleshooting</h3>
                    <p className="text-gray-800">
                      <strong>Performance issues:</strong> Injector cleaner to restore power and efficiency.
                      <br />
                      <strong>Long-term storage:</strong> Fuel stabilizer for seasonal equipment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">Year-Round Protection</h3>
                    <p className="text-gray-800">
                      <strong>Preventative maintenance:</strong> Multi-function diesel treatment with every fill.
                      <br />
                      <strong>Best practice:</strong> Consistent additive use extends equipment life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BG Products */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Why BG Products?</h2>
            <p className="text-xl mb-8 text-gray-100">
              BG Products has been the trusted name in fuel and oil additives for over 50 years. Used by
              professional technicians and fleet operators worldwide, BG additives are proven to deliver results.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">50+</div>
                <div className="font-semibold">Years of Innovation</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">100%</div>
                <div className="font-semibold">Performance Guaranteed</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
                <div className="text-3xl font-black text-[--penley-gold] mb-2">Pro</div>
                <div className="font-semibold">Grade Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions About Fuel Additives?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Our team can help you choose the right products for your equipment and operation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href={`tel:${SITE_CONFIG.contact.phoneRaw}`} size="lg">
              Call {SITE_CONFIG.contact.phone}
            </CTAButton>
            <CTAButton href="/contact" variant="outline" size="lg">
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
