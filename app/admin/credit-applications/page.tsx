import type { Metadata } from 'next';
import CreditAppAdmin from '@/components/CreditAppAdmin';

export const metadata: Metadata = {
  title: 'Credit Applications - Admin | Penley Oil Company',
  robots: 'noindex, nofollow', // Don't index admin pages
};

export default function CreditApplicationsAdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CreditAppAdmin />
    </div>
  );
}
