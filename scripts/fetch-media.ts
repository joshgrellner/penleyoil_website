#!/usr/bin/env ts-node
/**
 * Media Fetching Script
 * Downloads images from Unsplash/Pexels and vendor logos from official sources
 * Updates content/images.json and content/vendors.json with actual file data
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { createApi } from 'unsplash-js';

// Type definitions
interface ImageManifest {
  images: {
    [category: string]: Array<{
      id: string;
      filename: string;
      webp: string;
      alt: string;
      caption?: string | null;
      credit: {
        source: string;
        photographer: string;
        url: string;
        license: string;
      };
      approved: boolean;
      searchQuery: string;
      usage: string[];
      dimensions?: {
        width: number;
        height: number;
      };
    }>;
  };
  metadata: {
    lastUpdated: string;
    totalImages: number;
    approvedImages: number;
    pendingImages: number;
    sources: string[];
    maxWidth: number;
    formats: string[];
  };
}

interface VendorManifest {
  vendors: Array<{
    name: string;
    url: string;
    logoPath: string;
    logoPathPng: string;
    usageNotes: {
      clearspace: string;
      background: string;
      colors: string;
      modifications: string;
    };
    approved: boolean;
    sourceUrl: string;
    licenseStatus: string;
  }>;
}

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Initialize Unsplash API
const unsplash = UNSPLASH_ACCESS_KEY
  ? createApi({ accessKey: UNSPLASH_ACCESS_KEY })
  : null;

/**
 * Download file from URL to destination
 */
async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          // Follow redirect
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            https.get(redirectUrl, (redirectResponse) => {
              redirectResponse.pipe(file);
              file.on('finish', () => {
                file.close();
                resolve();
              });
            });
          } else {
            reject(new Error('Redirect without location header'));
          }
        } else {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }
      })
      .on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
  });
}

/**
 * Search and download image from Unsplash
 */
async function fetchUnsplashImage(
  query: string,
  filename: string,
  category: string
): Promise<{ photographer: string; url: string; width: number; height: number } | null> {
  if (!unsplash) {
    console.warn('⚠️  Unsplash API key not configured. Skipping:', query);
    return null;
  }

  try {
    console.log(`🔍 Searching Unsplash for: "${query}"`);
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 3,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('❌ Unsplash API error:', result.errors);
      return null;
    }

    const photo = result.response?.results[0];
    if (!photo) {
      console.warn('⚠️  No results found for:', query);
      return null;
    }

    // Download regular size image
    const imageUrl = photo.urls.regular;
    const destPath = path.join(PUBLIC_DIR, 'images', category, filename);

    console.log(`⬇️  Downloading: ${photo.alt_description || 'image'}`);
    await downloadFile(imageUrl, destPath);
    console.log(`✅ Downloaded: ${destPath}`);

    // Trigger download tracking (required by Unsplash API guidelines)
    if (photo.links.download_location) {
      await unsplash.photos.trackDownload({
        downloadLocation: photo.links.download_location,
      });
    }

    return {
      photographer: photo.user.name,
      url: photo.links.html,
      width: photo.width,
      height: photo.height,
    };
  } catch (error) {
    console.error(`❌ Error fetching from Unsplash:`, error);
    return null;
  }
}

/**
 * Search and download image from Pexels
 */
async function fetchPexelsImage(
  query: string,
  filename: string,
  category: string
): Promise<{ photographer: string; url: string; width: number; height: number } | null> {
  if (!PEXELS_API_KEY) {
    console.warn('⚠️  Pexels API key not configured. Skipping:', query);
    return null;
  }

  try {
    console.log(`🔍 Searching Pexels for: "${query}"`);
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const data = await response.json();
    const photo = data.photos?.[0];

    if (!photo) {
      console.warn('⚠️  No results found for:', query);
      return null;
    }

    // Download large image
    const imageUrl = photo.src.large;
    const destPath = path.join(PUBLIC_DIR, 'images', category, filename);

    console.log(`⬇️  Downloading: ${photo.alt || 'image'}`);
    await downloadFile(imageUrl, destPath);
    console.log(`✅ Downloaded: ${destPath}`);

    return {
      photographer: photo.photographer,
      url: photo.url,
      width: photo.width,
      height: photo.height,
    };
  } catch (error) {
    console.error(`❌ Error fetching from Pexels:`, error);
    return null;
  }
}

/**
 * Download vendor logo from official source
 */
async function fetchVendorLogo(
  vendorName: string,
  logoPath: string
): Promise<boolean> {
  console.log(`\n🏢 Fetching logo for: ${vendorName}`);
  console.log(
    `⚠️  Note: Manual download may be required from brand guidelines pages`
  );

  // For now, log instructions. In production, you'd implement specific
  // downloaders for each vendor's brand assets page
  const instructions: Record<string, string> = {
    'Phillips 66':
      'Visit https://www.phillips66.com/about/brand-guidelines and download official logo assets',
    'VP Racing Fuels':
      'Contact VP Racing Fuels for official logo usage permission and assets',
    'Mystik Lubricants':
      'Visit https://www.mystiklubricants.com and download logo from press/media kit',
    'BG Products':
      'Contact BG Products for authorized distributor logo assets',
  };

  console.log(`📝 ${instructions[vendorName] || 'Contact vendor for logo assets'}`);
  console.log(`   Expected path: ${logoPath}`);

  return false; // Return false to indicate manual download needed
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting media fetch process...\n');

  // Load manifests
  const imagesManifestPath = path.join(CONTENT_DIR, 'images.json');
  const vendorsManifestPath = path.join(CONTENT_DIR, 'vendors.json');

  const imagesManifest: ImageManifest = JSON.parse(
    fs.readFileSync(imagesManifestPath, 'utf-8')
  );
  const vendorsManifest: VendorManifest = JSON.parse(
    fs.readFileSync(vendorsManifestPath, 'utf-8')
  );

  // Process images
  console.log('📸 Processing images...\n');
  let downloadedCount = 0;

  for (const [category, images] of Object.entries(imagesManifest.images)) {
    console.log(`\n📁 Category: ${category}`);

    for (const image of images) {
      if (image.approved) {
        console.log(`✓ Already approved: ${image.id}`);
        continue;
      }

      // Try Unsplash first, fallback to Pexels
      let result = null;

      if (image.credit.source === 'Unsplash' || !PEXELS_API_KEY) {
        result = await fetchUnsplashImage(
          image.searchQuery,
          image.filename,
          category
        );
      }

      if (!result && PEXELS_API_KEY) {
        result = await fetchPexelsImage(
          image.searchQuery,
          image.filename,
          category
        );
      }

      if (result) {
        // Update manifest with actual photographer and URL
        image.credit.photographer = result.photographer;
        image.credit.url = result.url;
        if (!image.dimensions) {
          image.dimensions = {
            width: result.width,
            height: result.height,
          };
        }
        downloadedCount++;
      }

      // Rate limiting - be nice to APIs
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // Save updated images manifest
  imagesManifest.metadata.lastUpdated = new Date().toISOString();
  fs.writeFileSync(
    imagesManifestPath,
    JSON.stringify(imagesManifest, null, 2)
  );

  console.log(`\n📸 Downloaded ${downloadedCount} images`);

  // Process vendor logos
  console.log('\n\n🏢 Processing vendor logos...\n');
  console.log('⚠️  Vendor logos require manual download from official sources:');

  for (const vendor of vendorsManifest.vendors) {
    if (!vendor.approved) {
      await fetchVendorLogo(vendor.name, vendor.logoPath);
    }
  }

  console.log('\n\n✅ Media fetch process complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Manually download vendor logos to /public/logos/[vendor]/');
  console.log('2. Run: npm run dev');
  console.log('3. Visit: http://localhost:3000/admin/media-review');
  console.log('4. Review and approve/replace images and logos');
  console.log('5. After approval, images will be used in production\n');
}

// Execute
if (require.main === module) {
  main().catch(console.error);
}

export { fetchUnsplashImage, fetchPexelsImage, fetchVendorLogo };
