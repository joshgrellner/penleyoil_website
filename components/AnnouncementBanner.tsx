'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[--penley-green] via-[--penley-green-dark] to-[--penley-green] text-white py-3 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-center gap-3 flex-wrap text-center">
          <span className="inline-flex items-center bg-[--penley-gold] text-gray-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            🎉 New Partnership
          </span>
          <p className="text-sm md:text-base font-semibold">
            Now distributing <span className="text-[--penley-gold] font-black">MULTI SEAL®</span> industrial tire sealant — Reduce flats by up to 95%!
          </p>
          <Link
            href="/multiseal"
            className="inline-flex items-center bg-white text-[--penley-green] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[--penley-gold] hover:text-gray-900 transition-colors"
          >
            Learn More →
          </Link>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
