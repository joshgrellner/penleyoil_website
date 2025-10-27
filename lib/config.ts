// Site configuration and business data

export const SITE_CONFIG = {
  name: 'Penley Oil Company',
  description: 'Oklahoma\'s premier fuel, DEF, and lubricants distributor since 1958. Same-day diesel delivery, bulk DEF supply, tank rentals, and emergency fueling across Oklahoma City and statewide.',
  url: 'https://penleyoil.com',
  founded: 1958,

  contact: {
    phone: '(405) 235-7553',
    phoneRaw: '4052357553',
    email: 'info@penleyoil.com',
    address: {
      street: '2627 W. Reno Ave',
      city: 'Oklahoma City',
      state: 'OK',
      zip: '73107',
      full: '2627 W. Reno Ave, Oklahoma City, OK 73107'
    }
  },

  hours: {
    weekday: 'Monday-Thursday: 7:00 AM - 4:30 PM',
    friday: 'Friday: 7:00 AM - 4:00 PM',
    weekend: 'Saturday-Sunday: Closed (Weekend delivery available upon request)',
    structured: [
      { days: 'Monday', hours: '7:00 AM - 4:30 PM' },
      { days: 'Tuesday', hours: '7:00 AM - 4:30 PM' },
      { days: 'Wednesday', hours: '7:00 AM - 4:30 PM' },
      { days: 'Thursday', hours: '7:00 AM - 4:30 PM' },
      { days: 'Friday', hours: '7:00 AM - 4:00 PM' },
      { days: 'Saturday', hours: 'Closed' },
      { days: 'Sunday', hours: 'Closed' }
    ]
  },

  social: {
    facebook: '',
    linkedin: '',
    // Add when available
  },

  analytics: {
    gaId: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
    gtmId: 'GTM-XXXXXXX'  // Replace with actual GTM ID
  }
} as const;

export const SERVICES = {
  fuel: {
    slug: 'fuel-delivery',
    title: 'Fuel Delivery',
    shortDescription: 'Same-day diesel, gasoline, and kerosene delivery across Oklahoma',
    products: [
      { name: 'Off-Road Diesel (Dyed)', description: 'Tax-exempt dyed diesel for off-road equipment, construction, and agriculture' },
      { name: 'On-Road Diesel (Clear)', description: 'Ultra-low sulfur diesel for highway vehicles and fleets' },
      { name: 'Unleaded Gasoline (E-10)', description: 'Regular unleaded gasoline with 10% ethanol' },
      { name: '100% Gasoline', description: 'Ethanol-free gasoline for sensitive equipment' },
      { name: 'Super Unleaded', description: 'Premium gasoline for high-performance engines' },
      { name: 'K-1 Kerosene', description: 'Clean-burning kerosene for heaters, generators, and equipment' },
      { name: 'Solvent', description: 'Industrial-grade solvents for cleaning and operations' }
    ],
    features: [
      'Same-day and next-day delivery',
      '24/7 emergency fueling available',
      'On-site fleet fueling',
      'Automatic delivery programs',
      'Mobile tanks and equipment',
      'Generator fuel and top-offs',
      'Real-time delivery alerts'
    ]
  },

  def: {
    slug: 'def',
    title: 'DEF Supply (Diesel Exhaust Fluid)',
    shortDescription: 'ISO 22241 & API certified DEF with guaranteed supply and statewide delivery',
    description: 'Over 20,000 gallons of DEF storage on-site. We package our own 2.5-gallon jugs and deliver bulk to fleets, resellers, and end users across Oklahoma and surrounding states.',
    packages: [
      { size: '1 Gallon', description: 'Retail jugs for individual use' },
      { size: '2.5 Gallon', description: 'Our signature package, filled on-site' },
      { size: '55 Gallon Drum', description: 'For equipment and small fleets' },
      { size: '330 Gallon Tote', description: 'Popular bulk option for fleets and resellers' },
      { size: 'Bulk (6,000+ gallons)', description: 'Transport and bobtail delivery for large operations' }
    ],
    certifications: ['ISO 22241 Certified', 'API Certified'],
    features: [
      'Multi-point supply network',
      '>20,000 gallon local storage',
      'On-site packaging facility',
      'Statewide Oklahoma delivery',
      'Service to TX, KS, NM',
      'DEF equipment and pumps available',
      'Quality testing and compliance'
    ]
  },

  lubricants: {
    slug: 'lubricants',
    title: 'Lubricants & Fluids',
    shortDescription: 'Bulk and packaged motor oils, hydraulic fluids, grease, and specialty lubricants',
    products: [
      'Motor Oils (conventional, synthetic, high-mileage)',
      'Hydraulic Oils',
      'Gear Oils',
      'Greases',
      'Antifreeze & Coolants',
      'Transmission Fluids',
      'Specialty Fluids',
      'Cleaners & Degreasers',
      'Methanol',
      'WD-40 products'
    ],
    packaging: ['Bulk delivery', 'Kegs', 'Pails', 'Cases', 'Individual bottles'],
    brands: ['Phillips 66', 'Mystik', 'Other premium brands'],
    equipment: ['Fluid pumps', 'Grease guns', 'Dispensing equipment']
  },

  additives: {
    slug: 'additives',
    title: 'Fuel Additives & Tank Management',
    shortDescription: 'BG Products fuel additives with free tank sampling and monitoring program',
    products: [
      { sku: 'BG DFC Plus', description: 'Diesel fuel conditioner with cetane boost' },
      { sku: 'BG DOC', description: 'Diesel oxidation control' },
      { sku: 'BG 109', description: 'Diesel fuel treatment' },
      { sku: 'BG Supercharge II', description: 'High-performance diesel additive' },
      { sku: 'BG 44K', description: 'Premium gasoline fuel system cleaner' }
    ],
    program: {
      name: 'Tank Management Program',
      description: 'Free bottom sampling every 6 months to monitor fuel quality, prevent contamination, and extend tank life',
      benefits: [
        'Free fuel sampling every 6 months',
        'Early contamination detection',
        'Extend fuel and tank life',
        'Compliance support',
        'Expert recommendations'
      ]
    }
  },

  tanks: {
    slug: 'tanks',
    title: 'Fuel Tank Solutions',
    shortDescription: 'Tank rentals, sales, installation, and maintenance for fuel and DEF storage',
    options: [
      { type: 'Single Wall', sizes: ['500 gal', '1,000 gal', '2,000 gal'], use: 'Standard fuel storage' },
      { type: 'Double Wall', sizes: ['500 gal', '1,000 gal', '2,000 gal'], use: 'Enhanced environmental protection' },
      { type: 'Stationary', sizes: ['500-2,000 gal'], use: 'Permanent on-site installation' },
      { type: 'Portable/Mobile', sizes: ['500-1,000 gal'], use: 'Flexible jobsite fueling' },
      { type: 'DEF Tanks', sizes: ['Various'], use: 'Dedicated DEF storage systems' }
    ],
    rental: {
      terms: 'Short-term and long-term rentals available',
      pricing: 'Free tank rental with minimum fuel purchase commitment',
      included: ['Delivery', 'Installation', 'Service', 'Maintenance']
    },
    services: [
      'Tank sales and rentals',
      'Delivery and installation',
      'Compliance and safety consultation',
      'Maintenance and service',
      'Tank removal and disposal'
    ]
  }
} as const;

export const SERVICE_AREAS = {
  primary: {
    name: 'Oklahoma City Metro',
    description: 'Full-service fuel, DEF, and lubricants delivery within 1 hour of OKC',
    radius: '60 miles'
  },
  oklahoma: {
    name: 'Oklahoma Statewide',
    description: 'DEF and bulk fuel delivery throughout Oklahoma',
    coverage: 'statewide'
  },
  regional: {
    name: 'Multi-State DEF Supply',
    description: 'DEF delivery to Oklahoma, Texas, Kansas, and New Mexico',
    states: ['OK', 'TX', 'KS', 'NM']
  }
} as const;

export const CITIES = [
  // Oklahoma City Metro (primary service area)
  { name: 'Oklahoma City', state: 'OK', metro: true, priority: 1 },
  { name: 'Edmond', state: 'OK', metro: true, priority: 1 },
  { name: 'Norman', state: 'OK', metro: true, priority: 1 },
  { name: 'Moore', state: 'OK', metro: true, priority: 1 },
  { name: 'Yukon', state: 'OK', metro: true, priority: 1 },
  { name: 'El Reno', state: 'OK', metro: true, priority: 1 },
  { name: 'Mustang', state: 'OK', metro: true, priority: 2 },
  { name: 'Midwest City', state: 'OK', metro: true, priority: 2 },

  // Oklahoma - Major Cities
  { name: 'Tulsa', state: 'OK', metro: false, priority: 1 },
  { name: 'Stillwater', state: 'OK', metro: false, priority: 2 },
  { name: 'Lawton', state: 'OK', metro: false, priority: 2 },
  { name: 'Enid', state: 'OK', metro: false, priority: 2 },
  { name: 'Broken Arrow', state: 'OK', metro: false, priority: 2 },

  // Near North Texas
  { name: 'Wichita Falls', state: 'TX', metro: false, priority: 3 },
  { name: 'Gainesville', state: 'TX', metro: false, priority: 3 },
  { name: 'Ardmore', state: 'OK', metro: false, priority: 2 }
] as const;

export const INDUSTRIES = [
  {
    slug: 'construction',
    name: 'Construction',
    icon: '🏗️',
    description: 'Fuel, DEF, and lubricants for construction equipment, fleets, and jobsites',
    needs: ['Off-road diesel delivery', 'On-site mobile fueling', 'DEF for Tier 4 equipment', 'Hydraulic oils', 'K-1 kerosene for heaters', 'Portable tank rentals'],
    keywords: ['construction fuel delivery', 'jobsite diesel', 'construction equipment fuel']
  },
  {
    slug: 'agriculture',
    name: 'Agriculture & Farming',
    icon: '🌾',
    description: 'Farm and ranch fuel delivery, bulk DEF, and equipment lubricants',
    needs: ['Dyed diesel for tractors', 'Bulk fuel delivery to farms', 'DEF for modern farm equipment', 'Hydraulic and gear oils', 'Seasonal fuel programs', 'On-farm tank installation'],
    keywords: ['farm fuel delivery', 'agricultural diesel', 'ranch fuel', 'farm DEF']
  },
  {
    slug: 'trucking-logistics',
    name: 'Trucking & Logistics',
    icon: '🚚',
    description: 'Fleet fueling, bulk DEF, and lubricants for transportation companies',
    needs: ['On-road diesel delivery', 'Bulk DEF programs (330-gal totes)', 'Fleet fueling at yards', 'Motor oils and fluids', 'Automatic delivery schedules', 'DEF equipment and pumps'],
    keywords: ['fleet fuel delivery', 'trucking fuel', 'bulk DEF for fleets', 'logistics fuel']
  },
  {
    slug: 'municipalities',
    name: 'Municipalities & Schools',
    icon: '🏛️',
    description: 'Government fleet fueling, school bus diesel, and emergency generator fuel',
    needs: ['Clear diesel for buses', 'DEF for municipal fleets', 'Generator fuel delivery', 'Emergency fueling services', 'Fuel management programs', 'Compliance support'],
    keywords: ['municipal fuel', 'school bus diesel', 'government fleet fuel']
  },
  {
    slug: 'hospitals-data-centers',
    name: 'Hospitals & Data Centers',
    icon: '🏥',
    description: 'Emergency generator fuel delivery, monitoring, and 24/7 support',
    needs: ['Generator diesel delivery', 'Emergency fuel top-offs', '24/7 availability', 'Predictive monitoring', 'Storm preparation fueling', 'Fuel quality management'],
    keywords: ['hospital generator fuel', 'data center diesel', 'emergency generator fuel', 'backup generator delivery']
  },
  {
    slug: 'convenience-stores',
    name: 'Convenience Stores & Travel Centers',
    icon: '⛽',
    description: 'Bulk fuel and DEF supply for retail locations and truck stops',
    needs: ['Bulk fuel delivery', 'Packaged DEF (1-gal, 2.5-gal)', 'Reseller DEF programs', 'Reliable supply schedules', 'Competitive wholesale pricing'],
    keywords: ['convenience store fuel', 'retail DEF supplier', 'truck stop DEF']
  },
  {
    slug: 'industrial',
    name: 'Industrial Facilities',
    icon: '🏭',
    description: 'Industrial fuel, lubricants, and on-site equipment fueling',
    needs: ['Bulk diesel delivery', 'Industrial lubricants', 'Equipment fueling', 'Stationary tank rentals', 'Predictive ordering', 'Fuel additives'],
    keywords: ['industrial fuel delivery', 'manufacturing diesel', 'industrial lubricants']
  },
  {
    slug: 'def-resellers',
    name: 'DEF Resellers',
    icon: '📦',
    description: 'Wholesale DEF supply for distributors and resellers',
    needs: ['Bulk DEF (330-gal totes, transports)', 'Packaged DEF (2.5-gal jugs)', 'Consistent supply guarantee', 'Competitive wholesale pricing', 'Multi-state delivery', 'ISO/API certified product'],
    keywords: ['wholesale DEF', 'DEF distributor', 'bulk DEF supplier']
  }
] as const;

export const DELIVERY_SLAS = {
  standard: {
    name: 'Standard Delivery',
    timing: 'Next business day',
    cutoff: '2:00 PM day prior',
    description: 'Scheduled deliveries for routine fuel and DEF orders'
  },
  sameDay: {
    name: 'Same-Day Delivery',
    timing: 'Same business day',
    cutoff: '10:00 AM same day',
    description: 'Expedited delivery for urgent fuel needs'
  },
  emergency: {
    name: 'Emergency Fueling',
    timing: '24/7 availability',
    contact: '(405) 235-7553',
    description: 'Critical fuel delivery for generators, hospitals, fleets, and equipment breakdowns'
  },
  weekend: {
    name: 'Weekend Delivery',
    timing: 'By appointment',
    contact: 'Request when placing order',
    description: 'Weekend and after-hours delivery available upon request'
  }
} as const;
