'use client';

import Link from 'next/link';
import { SITE_CONFIG, SERVICES } from '@/lib/config';
import { trackClickToCall } from '@/lib/analytics'; // analytics: verified

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-[--penley-gold]">PENLEY</span> OIL
            </h3>
            <p className="text-sm mb-4">
              Oklahoma's premier fuel, DEF, and lubricants distributor since 1958.
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                  className="hover:text-[--penley-gold] font-semibold"
                  onClick={() => trackClickToCall(SITE_CONFIG.contact.phone)} // analytics: verified
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
              <div className="text-gray-300">
                {SITE_CONFIG.contact.address.street}<br />
                {SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div className="font-semibold text-white mb-1">Hours</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>Mon-Thu: 7:00 AM - 4:30 PM</div>
                <div>Fri: 7:00 AM - 4:00 PM</div>
                <div>Weekend delivery by request</div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fuel-delivery" className="hover:text-[--penley-gold]">
                  Fuel Delivery
                </Link>
              </li>
              <li>
                <Link href="/def" className="hover:text-[--penley-gold]">
                  DEF Supply
                </Link>
              </li>
              <li>
                <Link href="/lubricants" className="hover:text-[--penley-gold]">
                  Lubricants & Fluids
                </Link>
              </li>
              <li>
                <Link href="/additives" className="hover:text-[--penley-gold]">
                  Fuel Additives
                </Link>
              </li>
              <li>
                <Link href="/tanks" className="hover:text-[--penley-gold]">
                  Tank Solutions
                </Link>
              </li>
              <li>
                <Link href="/deliveries" className="hover:text-[--penley-gold]">
                  Delivery Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold mb-4">Industries We Serve</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/industries/construction" className="hover:text-[--penley-gold]">
                  Construction
                </Link>
              </li>
              <li>
                <Link href="/industries/agriculture" className="hover:text-[--penley-gold]">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link href="/industries/trucking-logistics" className="hover:text-[--penley-gold]">
                  Trucking & Logistics
                </Link>
              </li>
              <li>
                <Link href="/industries/municipalities" className="hover:text-[--penley-gold]">
                  Municipalities & Schools
                </Link>
              </li>
              <li>
                <Link href="/industries/hospitals-data-centers" className="hover:text-[--penley-gold]">
                  Hospitals & Data Centers
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-[--penley-gold]">
                  View All Industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/about" className="hover:text-[--penley-gold]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-[--penley-gold]">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[--penley-gold]">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="bg-[--penley-green] p-4 rounded-md">
              <div className="text-white font-semibold mb-2">Emergency Fueling</div>
              <div className="text-sm mb-2">24/7 availability for critical needs</div>
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="text-white font-bold hover:text-[--penley-gold-light]"
                onClick={() => trackClickToCall(SITE_CONFIG.contact.phone)} // analytics: verified
              >
                Call {SITE_CONFIG.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div>
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0">
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-[--penley-gold]">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-[--penley-gold]">
                  Terms of Service
                </Link>
              </div>
              <div className="hidden md:block text-gray-800">|</div>
              <div>
                Family Owned & Operated Since {SITE_CONFIG.founded}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
