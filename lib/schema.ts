// JSON-LD Schema.org helpers for SEO

import { SITE_CONFIG } from './config';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    foundingDate: SITE_CONFIG.founded.toString(),
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.zip,
      addressCountry: 'US'
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Oklahoma'
      },
      {
        '@type': 'City',
        name: 'Oklahoma City'
      }
    ],
    description: SITE_CONFIG.description
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/business-photo.jpg`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.city,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.zip,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '35.4676', // Approximate - replace with exact coordinates
      longitude: '-97.5534'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '07:00',
        closes: '16:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '07:00',
        closes: '16:00'
      }
    ],
    slogan: 'Oklahoma\'s Premier Fuel, DEF & Lubricants Distributor Since 1958'
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  areaServed?: string;
  additionalType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${SITE_CONFIG.url}/#organization`
    },
    areaServed: service.areaServed || {
      '@type': 'State',
      name: 'Oklahoma'
    },
    additionalType: service.additionalType,
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.contact.phone,
        contactType: 'customer service'
      }
    }
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  category?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.offers?.priceCurrency || 'USD',
      price: product.offers?.price,
      availability: product.offers?.availability || 'https://schema.org/InStock',
      seller: {
        '@id': `${SITE_CONFIG.url}/#organization`
      }
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateOfferSchema(offer: {
  name: string;
  description: string;
  validFrom?: string;
  validThrough?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.name,
    description: offer.description,
    seller: {
      '@id': `${SITE_CONFIG.url}/#organization`
    },
    availabilityStarts: offer.validFrom,
    availabilityEnds: offer.validThrough,
    availability: 'https://schema.org/InStock'
  };
}

// Helper to generate schema script tag for Next.js metadata
export function generateSchemaScript(schema: object | object[]): string {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  return schemaArray.map(s => JSON.stringify(s)).join('\n');
}
