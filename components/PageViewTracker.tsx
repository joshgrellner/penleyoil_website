'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * PageViewTracker - Tracks page views on client-side navigation
 * Should be included in the root layout
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track if GA4 is configured
    if (process.env.NEXT_PUBLIC_GA4_ID) {
      // analytics: verified - Track pageview on route change
      trackPageView();
    }
  }, [pathname, searchParams]);

  return null;
}
