'use client';

import Link from 'next/link';
import { trackQuoteCTA, trackClickToCall } from '@/lib/analytics'; // analytics: verified

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick
}: CTAButtonProps) {
  const baseClasses = 'font-bold rounded-full transition-all duration-300 inline-block text-center';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[--penley-green] to-[--penley-green-light] text-white hover:shadow-xl hover:scale-105 shadow-lg',
    secondary: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-xl hover:scale-105',
    outline: 'border-3 border-white text-white hover:bg-white hover:text-[--penley-green] backdrop-blur-sm bg-white/10'
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const handleClick = () => {
    // analytics: verified - Track CTA clicks
    const label = typeof children === 'string' ? children : 'CTA Click';
    const location = typeof window !== 'undefined' ? window.location.pathname : 'unknown';

    // Track tel: links as click-to-call
    if (href?.startsWith('tel:')) {
      trackClickToCall(href.replace('tel:', ''));
    } else {
      trackQuoteCTA(label, location);
    }

    if (onClick) onClick();
  };

  if (href) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={classes}>
      {children}
    </button>
  );
}
