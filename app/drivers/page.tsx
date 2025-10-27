import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { generateOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import DriversCtaPage from '@/components/DriversCtaPage';

export const metadata: Metadata = {
  title: 'Drivers & Owner-Operators — Apply via Foley',
  description: 'Experienced CDL drivers and owner-operators—apply via Foley. Regional lanes with steady freight.',
  openGraph: {
    title: 'Drivers & Owner-Operators — Apply via Foley',
    description: 'Experienced CDL drivers and owner-operators—apply via Foley. Regional lanes with steady freight.',
    url: `${SITE_CONFIG.url}/drivers`,
    siteName: 'Penley Oil Company',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/og/drivers.jpg`,
        width: 1200,
        height: 630,
        alt: 'Penley Oil Driver Careers'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drivers & Owner-Operators — Apply via Foley',
    description: 'Experienced CDL drivers and owner-operators—apply via Foley. Regional lanes with steady freight.',
    images: [`${SITE_CONFIG.url}/og/drivers.jpg`]
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/drivers`
  },
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  }
};

export default function DriversPage() {
  const schema = generateOrganizationSchema();

  return (
    <>
      <SchemaMarkup schema={schema} />
      <DriversCtaPage />
    </>
  );
}
