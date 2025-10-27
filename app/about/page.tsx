import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { generateOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'About Penley Oil Company',
  description: 'Since 1958, Penley Oil has supplied fuel, DEF, lubricants, and tanks across Oklahoma with fast, reliable service.',
  openGraph: {
    title: 'About Penley Oil Company',
    description: 'Since 1958, Penley Oil has supplied fuel, DEF, lubricants, and tanks across Oklahoma with fast, reliable service.',
    url: `${SITE_CONFIG.url}/about`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/about.jpg`,
        width: 1200,
        height: 630,
        alt: 'About Penley Oil Company'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Penley Oil Company',
    description: 'Since 1958, Penley Oil has supplied fuel, DEF, lubricants, and tanks across Oklahoma with fast, reliable service.',
    images: [`${SITE_CONFIG.url}/og/about.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function AboutPage() {
  const schema = generateOrganizationSchema();

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[--penley-gold]/20 px-6 py-2 rounded-full mb-6">
              <span className="text-[--penley-gold] font-bold text-sm tracking-wider">SINCE 1958</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              About Penley Oil Company
            </h1>
            <p className="text-xl text-gray-100">
              Three generations of family-owned fuel delivery excellence across Oklahoma
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-[--penley-green]">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-800">
              <p className="text-xl leading-relaxed mb-6">
                Founded in 1958, Penley Oil Company has been Oklahoma's trusted partner for fuel delivery,
                DEF supply, and lubricants for over six decades. What started as a small local fuel distributor
                has grown into one of Oklahoma's premier petroleum and DEF suppliers, while maintaining our
                commitment to personalized service and reliability.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                As a third-generation family-owned business, we understand the importance of building lasting
                relationships with our customers. Our deep roots in Oklahoma mean we're invested in the success
                of the communities we serve—from construction companies and farms to commercial fleets and
                industrial facilities.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Penley Oil Company continues to evolve with the industry, offering cutting-edge solutions
                like bulk DEF supply, automated delivery programs, and comprehensive tank management services.
                Yet our core values remain unchanged: reliability, quality, and exceptional customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-[--penley-green]">Why Choose Penley Oil?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">65+ Years of Experience</h3>
                <p className="text-gray-700">
                  Since 1958, we've built a reputation for reliability and expertise. Three generations
                  of fuel delivery knowledge at your service.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">👨‍👩‍👦</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Family Owned & Operated</h3>
                <p className="text-gray-700">
                  Not just a business—it's our family legacy. We treat every customer relationship with
                  the care and attention it deserves.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Guaranteed Supply</h3>
                <p className="text-gray-700">
                  Over 20,000 gallons of DEF in stock at all times. We package our own 2.5-gallon jugs
                  on-site and never run out.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Fast Response</h3>
                <p className="text-gray-700">
                  Next-day delivery standard. Same-day expedited service available. 24/7 emergency
                  fueling when you need it most.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Local Expertise</h3>
                <p className="text-gray-700">
                  Born and raised in Oklahoma. We understand the unique needs of Oklahoma businesses,
                  farms, and construction sites.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[--penley-green] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">💚</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Quality Products</h3>
                <p className="text-gray-700">
                  ISO 22241 & API certified DEF. Phillips 66 and Mystik lubricants. BG Products fuel
                  additives. Only the best for our customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-20 bg-[--penley-green] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[--penley-gold]">1958</div>
              <div className="text-lg">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[--penley-gold]">3</div>
              <div className="text-lg">Generations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[--penley-gold]">20K+</div>
              <div className="text-lg">Gallons DEF In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black mb-2 text-[--penley-gold]">24/7</div>
              <div className="text-lg">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-[--penley-green]">Our Commitment</h2>
            <p className="text-xl text-gray-800 leading-relaxed mb-8">
              At Penley Oil Company, we're committed to providing more than just fuel and DEF—we deliver
              peace of mind. Whether it's ensuring your equipment stays running, your deliveries arrive on
              time, or your emergency needs are met instantly, we're here for you.
            </p>
            <p className="text-xl text-gray-800 leading-relaxed">
              We look forward to serving you with the same dedication and integrity that has defined our
              family business for over six decades.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white">
            Experience the Penley Oil difference. Call us today or schedule your first delivery.
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
