import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import QuoteForm from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Contact Penley Oil',
  description: 'Questions or orders? Call (405) 235-7553 or message us for fast fuel, DEF, lubricants, and tank support.',
  openGraph: {
    title: 'Contact Penley Oil',
    description: 'Questions or orders? Call (405) 235-7553 or message us for fast fuel, DEF, lubricants, and tank support.',
    url: `${SITE_CONFIG.url}/contact`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/contact.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact Penley Oil Company'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Penley Oil',
    description: 'Questions or orders? Call (405) 235-7553 or message us for fast fuel, DEF, lubricants, and tank support.',
    images: [`${SITE_CONFIG.url}/og/contact.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function ContactPage() {
  const schema = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[--penley-green-dark] to-[--penley-green] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-100">
              Get in touch for fuel delivery, quotes, or general inquiries
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-[--penley-green]">Get In Touch</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Phone</h3>
                    <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="text-[--penley-green] hover:underline text-lg font-semibold">
                      {SITE_CONFIG.contact.phone}
                    </a>
                    <p className="text-gray-700 text-sm mt-1">{SITE_CONFIG.hours.weekday}</p>
                    <p className="text-gray-700 text-sm">{SITE_CONFIG.hours.friday}</p>
                    <p className="text-gray-700 text-sm">Weekend: By Request</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Address</h3>
                    <p className="text-gray-800">{SITE_CONFIG.contact.address.street}</p>
                    <p className="text-gray-800">
                      {SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.contact.address.full)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--penley-green] hover:underline text-sm mt-2 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[--penley-green] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-gray-900">Email</h3>
                    <a href="mailto:info@penleyoil.com" className="text-[--penley-green] hover:underline">
                      info@penleyoil.com
                    </a>
                  </div>
                </div>

                {/* Emergency */}
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-6">
                  <h3 className="font-bold text-lg mb-1 text-red-800">Emergency Fueling</h3>
                  <p className="text-gray-800 mb-2">24/7 emergency service available</p>
                  <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="text-red-700 hover:underline font-semibold">
                    Call {SITE_CONFIG.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-[--penley-green]">Send Us a Message</h2>
              <QuoteForm
                inline
                title=""
                description=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Visit Our Location</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(SITE_CONFIG.contact.address.full)}`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Penley Oil Company Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[--penley-green] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call us today or schedule a delivery online
          </p>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            className="inline-block bg-[--penley-gold] text-white px-8 py-4 rounded-full font-bold hover:bg-[--penley-gold-dark] transition-colors text-lg"
          >
            📞 {SITE_CONFIG.contact.phone}
          </a>
        </div>
      </section>
    </>
  );
}
