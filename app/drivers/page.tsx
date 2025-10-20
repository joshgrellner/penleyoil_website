import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { generateOrganizationSchema } from '@/lib/schema';
import SchemaMarkup from '@/components/SchemaMarkup';
import DriversCtaPage from '@/components/DriversCtaPage';

export const metadata: Metadata = {
  title: 'Drivers & Owner Operators | Penley Oil Company Careers',
  description: 'CDL driver & owner-operator jobs in Oklahoma. Competitive pay, consistent routes, family-owned company. Join Penley Oil—apply for driving jobs today.',
  openGraph: {
    title: 'Drivers & Owner Operators | Penley Oil Company',
    description: 'Hiring CDL drivers for fuel delivery routes across Oklahoma. Apply now.',
    url: `${SITE_CONFIG.url}/drivers`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/drivers`
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
