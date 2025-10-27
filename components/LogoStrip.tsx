'use client';

import Image from 'next/image';
import vendorsData from '@/content/vendors.json';

interface LogoStripProps {
  className?: string;
  heading?: string;
  subheading?: string;
  showOnlyApproved?: boolean;
  variant?: 'light' | 'dark';
}

export default function LogoStrip({
  className = '',
  heading = 'Trusted Suppliers',
  subheading = 'We carry premium products from industry-leading brands',
  showOnlyApproved = true,
  variant = 'light',
}: LogoStripProps) {
  // Filter vendors based on approval status
  const vendors = showOnlyApproved
    ? vendorsData.vendors.filter((v) => v.approved)
    : vendorsData.vendors;

  // If no approved vendors yet, don't render the component
  if (vendors.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-16 ${
        variant === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-3 ${
                variant === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {heading}
            </h2>
            {subheading && (
              <p
                className={`text-lg ${
                  variant === 'dark' ? 'text-gray-300' : 'text-gray-800'
                }`}
              >
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {vendors.map((vendor) => (
            <a
              key={vendor.name}
              href={vendor.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center p-6 rounded-lg transition-all duration-300 ${
                variant === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-100'
              } shadow-sm hover:shadow-md w-full h-32`}
              title={`${vendor.name} - Click to visit website`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Try SVG first, fallback to PNG */}
                <Image
                  src={vendor.logoPath}
                  alt={`${vendor.name} logo`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  onError={(e) => {
                    // Fallback to PNG if SVG fails to load
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('.svg')) {
                      target.src = vendor.logoPathPng;
                    }
                  }}
                />
              </div>
            </a>
          ))}
        </div>

        {/* Usage note for compliance */}
        <div
          className={`mt-8 text-center text-sm ${
            variant === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          <p>
            All logos are trademarks of their respective companies. Used with
            permission.
          </p>
        </div>
      </div>
    </section>
  );
}
