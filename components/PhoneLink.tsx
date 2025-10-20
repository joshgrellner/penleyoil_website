'use client';

import { trackClickToCall } from '@/lib/analytics';

interface PhoneLinkProps {
  phone: string;
  displayText?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * PhoneLink - Client component wrapper for tel: links with analytics
 * Use this for all phone number links to ensure click_to_call tracking
 */
export default function PhoneLink({
  phone,
  displayText,
  className = '',
  children
}: PhoneLinkProps) {
  const handleClick = () => {
    // analytics: verified - Track all phone link clicks
    trackClickToCall(displayText || phone);
  };

  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
      className={className}
      onClick={handleClick}
    >
      {children || displayText || phone}
    </a>
  );
}
