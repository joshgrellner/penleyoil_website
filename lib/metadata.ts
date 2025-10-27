// Metadata helpers for Next.js 15 Metadata API
// Ensures SEO best practices like 155-char description limits

import type { Metadata } from 'next';
import { SITE_CONFIG } from './config';

export interface PageMetadataOptions {
  title: string;
  description: string;
  ogTitle?: string; // Optional shorter, punchier OG title
  ogDescription?: string; // Optional shorter, punchier OG description
  path: string; // e.g., "/def" or "/deliveries"
  ogImage?: string; // e.g., "def.jpg"
  keywords?: string[];
}

/**
 * Generate SEO-optimized metadata for a page
 * - Automatically limits description to 155 characters
 * - Provides unique descriptions per URL
 * - Generates punchier OG titles/descriptions for social media
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    ogTitle,
    ogDescription,
    path,
    ogImage,
    keywords
  } = options;

  // Ensure description is limited to 155 characters
  const truncatedDescription = description.length > 155
    ? description.slice(0, 152) + '...'
    : description;

  // Use custom OG title/description if provided, otherwise use standard ones
  const socialTitle = ogTitle || title;
  const socialDescription = ogDescription || truncatedDescription;

  const canonicalUrl = `${SITE_CONFIG.url}${path}`;
  const ogImageUrl = ogImage
    ? `${SITE_CONFIG.url}/og/${ogImage}`
    : `${SITE_CONFIG.url}/og/home.jpg`;

  return {
    title,
    description: truncatedDescription,
    keywords,
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      siteName: 'Penley Oil Company',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: socialTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: socialDescription,
      images: [ogImageUrl]
    },
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: process.env.VERCEL_ENV !== 'preview',
      follow: process.env.VERCEL_ENV !== 'preview',
    }
  };
}

/**
 * Truncate text to max length, adding ellipsis if needed
 */
export function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Validate that a description is within SEO best practices
 */
export function validateDescription(description: string): {
  valid: boolean;
  length: number;
  message?: string;
} {
  const length = description.length;

  if (length < 50) {
    return {
      valid: false,
      length,
      message: 'Description too short (minimum 50 characters)'
    };
  }

  if (length > 155) {
    return {
      valid: false,
      length,
      message: `Description too long (${length} chars, max 155)`
    };
  }

  return {
    valid: true,
    length
  };
}
