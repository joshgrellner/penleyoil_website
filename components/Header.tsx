'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { trackClickToCall, trackQuoteCTA } from '@/lib/analytics'; // analytics: verified

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Contact Info with Gold Accent */}
      <div className="bg-gradient-to-r from-[--penley-green-dark] to-[--penley-green] text-white py-3 text-sm border-b-2 border-[--penley-gold]">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className="hover:text-[--penley-gold] font-bold transition-colors"
              onClick={() => trackClickToCall(SITE_CONFIG.contact.phone)} // analytics: verified
            >
              📞 {SITE_CONFIG.contact.phone}
            </a>
            <span className="hidden md:inline text-[--penley-gold]">|</span>
            <span className="hidden md:inline text-gray-100 font-medium">
              {SITE_CONFIG.contact.address.full}
            </span>
          </div>
          <div className="text-[--penley-gold] text-xs font-bold tracking-wide">
            MON-THU 7AM-4:30PM • FRI 7AM-4PM
          </div>
        </div>
      </div>

      {/* Main Header - Modern & Clean */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <img src="/logo.png" alt="Penley Oil Company" width="180" height="56" className="h-14 w-auto transition-transform group-hover:scale-105" />
              <div className="hidden md:block text-xs font-bold text-[--penley-green] border-l-2 border-[--penley-gold] pl-4">
                <div className="text-[--penley-gold] tracking-wider">SERVING OKLAHOMA</div>
                <div className="text-[--penley-green]">SINCE 1958</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="relative group">
                <button className="text-gray-700 hover:text-[--penley-green] font-medium py-2">
                  Services
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/fuel-delivery" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">Fuel Delivery</div>
                    <div className="text-xs text-gray-800">Diesel, Gasoline, Kerosene</div>
                  </Link>
                  <Link href="/def" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">DEF Supply</div>
                    <div className="text-xs text-gray-800">Bulk & Packaged DEF</div>
                  </Link>
                  <Link href="/lubricants" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">Lubricants</div>
                    <div className="text-xs text-gray-800">Oils, Fluids, Grease</div>
                  </Link>
                  <Link href="/additives" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">Fuel Additives</div>
                    <div className="text-xs text-gray-800">BG Products & Tank Management</div>
                  </Link>
                  <Link href="/tanks" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">Tank Solutions</div>
                    <div className="text-xs text-gray-800">Rentals, Sales, Service</div>
                  </Link>
                  <Link href="/multiseal" className="block px-4 py-3 hover:bg-green-50">
                    <div className="font-semibold text-gray-900">MULTI SEAL Tire Sealant</div>
                    <div className="text-xs text-gray-800">Industrial Tire Protection</div>
                  </Link>
                </div>
              </div>

              <Link href="/deliveries" className="text-gray-700 hover:text-[--penley-green] font-medium">
                Deliveries
              </Link>

              <Link href="/industries" className="text-gray-700 hover:text-[--penley-green] font-medium">
                Industries
              </Link>

              <Link href="/service-areas" className="text-gray-700 hover:text-[--penley-green] font-medium">
                Service Areas
              </Link>

              <Link href="/about" className="text-gray-700 hover:text-[--penley-green] font-medium">
                About
              </Link>

              <Link href="/contact" className="text-gray-700 hover:text-[--penley-green] font-medium">
                Contact
              </Link>

              <div className="relative group">
                <button className="text-gray-700 hover:text-[--penley-green] font-medium py-2">
                  Resources
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/credit-application" className="block px-4 py-3 hover:bg-green-50 border-b">
                    <div className="font-semibold text-gray-900">Credit Application</div>
                    <div className="text-xs text-gray-800">Apply for business credit</div>
                  </Link>
                  <Link href="/drivers" className="block px-4 py-3 hover:bg-green-50">
                    <div className="font-semibold text-gray-900">Driver Careers</div>
                    <div className="text-xs text-gray-800">Join our team</div>
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact?quote=true"
                className="bg-gradient-to-r from-[--penley-green] to-[--penley-green-light] text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-[--penley-gold]/20"
                onClick={() => trackQuoteCTA('Schedule Delivery', 'header')} // analytics: verified
              >
                Schedule Delivery →
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2">
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-700 mb-2">Services</div>
                <Link href="/fuel-delivery" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Fuel Delivery
                </Link>
                <Link href="/def" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  DEF Supply
                </Link>
                <Link href="/lubricants" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Lubricants
                </Link>
                <Link href="/additives" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Fuel Additives
                </Link>
                <Link href="/tanks" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Tank Solutions
                </Link>
                <Link href="/multiseal" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  MULTI SEAL Tire Sealant
                </Link>
              </div>

              <Link href="/deliveries" className="block py-2 text-gray-700 hover:text-[--penley-green] border-t pt-2">
                Deliveries
              </Link>
              <Link href="/industries" className="block py-2 text-gray-700 hover:text-[--penley-green]">
                Industries
              </Link>
              <Link href="/service-areas" className="block py-2 text-gray-700 hover:text-[--penley-green]">
                Service Areas
              </Link>
              <Link href="/about" className="block py-2 text-gray-700 hover:text-[--penley-green]">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-gray-700 hover:text-[--penley-green]">
                Contact
              </Link>

              <div className="border-t pt-4">
                <div className="font-semibold text-gray-700 mb-2">Resources</div>
                <Link href="/credit-application" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Credit Application
                </Link>
                <Link href="/drivers" className="block pl-4 py-2 text-gray-800 hover:text-[--penley-green]">
                  Driver Careers
                </Link>
              </div>

              <div className="pt-4">
                <Link
                  href="/contact?quote=true"
                  className="block w-full text-center bg-[--penley-green] text-white px-6 py-3 rounded-md font-semibold hover:bg-[--penley-green-dark]"
                  onClick={() => trackQuoteCTA('Schedule Delivery', 'mobile-menu')} // analytics: verified
                >
                  Schedule Delivery
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
