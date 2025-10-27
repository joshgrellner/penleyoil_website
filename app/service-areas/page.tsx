import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Service Areas | Oklahoma City & Beyond | Penley Oil Company',
  description: 'Penley Oil serves Oklahoma City metro and surrounding areas. Fuel and DEF delivery across central Oklahoma. Check if we serve your location.',
  openGraph: {
    title: 'Service Areas - Penley Oil Company',
    description: 'Fuel and DEF delivery across Oklahoma City and central Oklahoma.',
    url: `${SITE_CONFIG.url}/service-areas`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/service-areas`
  }
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Service Areas
            </h1>
            <p className="text-xl text-gray-100 mb-4">
              Reliable fuel and DEF delivery across Oklahoma City and central Oklahoma
            </p>
            <CTAButton href="/contact?quote=true" size="lg">
              Check Your Location
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Primary Service Area */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Primary Service Area</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              We provide next-day standard delivery and same-day expedited service throughout the
              Oklahoma City metropolitan area
            </p>

            <div className="bg-gray-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Oklahoma City Metro</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Oklahoma City</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Edmond</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Norman</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Moore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Midwest City</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Yukon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Mustang</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Del City</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Bethany</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>The Village</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Warr Acres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Nichols Hills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Piedmont</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Newcastle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Tuttle</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-800 mb-6">
                <strong>Delivery within 30 miles of Oklahoma City:</strong> Next-day standard delivery included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Service Area */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-[--penley-green]">Extended Service Area</h2>
            <p className="text-xl text-gray-800 text-center mb-12">
              We regularly serve customers throughout central Oklahoma and can arrange delivery
              to most locations statewide for bulk orders
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* North */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">⬆️</span> North of OKC
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Guthrie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Stillwater</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Enid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Perry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Ponca City</span>
                  </li>
                </ul>
              </div>

              {/* South */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">⬇️</span> South of OKC
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Purcell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Blanchard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Chickasha</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Pauls Valley</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Ardmore</span>
                  </li>
                </ul>
              </div>

              {/* East */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">➡️</span> East of OKC
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Shawnee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Chandler</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Seminole</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Prague</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Meeker</span>
                  </li>
                </ul>
              </div>

              {/* West */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                  <span className="text-2xl">⬅️</span> West of OKC
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>El Reno</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Weatherford</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Clinton</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Anadarko</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Hinton</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-800">
                <strong>Extended area delivery:</strong> Available with minimum order requirements.
                Contact us for details on delivery to your location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Statewide */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[--penley-green]">Bulk Statewide Delivery</h2>
            <p className="text-xl text-gray-800 mb-8">
              For large bulk orders, we can arrange delivery to most locations across Oklahoma.
              Perfect for major construction projects, agricultural operations, and industrial facilities.
            </p>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Minimum Order Requirements:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2 text-gray-900">Diesel & Gasoline:</h4>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>500+ gallons (within 50 miles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>1,000+ gallons (50-100 miles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>2,000+ gallons (100+ miles)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-gray-900">DEF (Diesel Exhaust Fluid):</h4>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>250+ gallons (within 50 miles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>500+ gallons (50-100 miles)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>1,000+ gallons (100+ miles)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Service Levels */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Service Level by Area</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Primary Zone</h3>
                <p className="text-gray-800 text-center mb-4">Within 30 miles of OKC</p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Next-day standard delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Same-day expedited available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>24/7 emergency service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>No minimum order</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Extended Zone</h3>
                <p className="text-gray-800 text-center mb-4">30-100 miles from OKC</p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>1-2 day delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Expedited service on request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Emergency service available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Minimum order may apply</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">Statewide Zone</h3>
                <p className="text-gray-800 text-center mb-4">100+ miles from OKC</p>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Scheduled bulk delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>2-3 day lead time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Large orders preferred</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Minimum order required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Not Sure If We Serve Your Area?</h2>
            <p className="text-xl mb-8">
              Give us a call or send us a message. We're always expanding our service area and may be
              able to arrange special delivery to your location, especially for bulk orders.
            </p>
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur mb-8">
              <p className="text-2xl font-bold mb-2">We're flexible and customer-focused</p>
              <p className="text-lg">
                If you're close to our service area or have a significant fuel need, we'll work hard to
                find a solution that works for both of us.
              </p>
            </div>
            <CTAButton href="/contact" variant="outline" size="lg">
              Contact Us About Your Location
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Schedule Delivery?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Call us today to confirm service availability and get a quote
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
