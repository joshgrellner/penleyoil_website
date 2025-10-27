#!/usr/bin/env ts-node
/**
 * Media Audit Script
 * Validates images and logos for:
 * - File existence
 * - Alt text quality
 * - License compliance
 * - WebP conversion
 * - Responsive variants
 * - Proper dimensions
 */

import fs from 'fs';
import path from 'path';

interface AuditResult {
  category: string;
  id: string;
  checks: {
    fileExists: boolean;
    webpExists: boolean;
    hasAltText: boolean;
    altTextQuality: 'good' | 'needs-improvement' | 'poor';
    hasPhotographer: boolean;
    hasLicense: boolean;
    hasDimensions: boolean;
    dimensionsValid: boolean;
    approved: boolean;
  };
  issues: string[];
  warnings: string[];
}

interface VendorAuditResult {
  name: string;
  checks: {
    svgExists: boolean;
    pngExists: boolean;
    hasUsageNotes: boolean;
    approved: boolean;
    licenseCleared: boolean;
  };
  issues: string[];
  warnings: string[];
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Check alt text quality
 */
function checkAltTextQuality(altText: string): {
  quality: 'good' | 'needs-improvement' | 'poor';
  reason?: string;
} {
  if (!altText || altText === 'TBD') {
    return { quality: 'poor', reason: 'Missing or placeholder alt text' };
  }

  const words = altText.split(' ').length;

  // Check for good practices
  const hasLocation = /oklahoma|okc|edmond|norman/i.test(altText);
  const hasContext = /fuel|diesel|DEF|tank|delivery|truck/i.test(altText);
  const tooShort = words < 5;
  const tooLong = words > 20;
  const startsWithImage = /^(image|photo|picture) of/i.test(altText);

  if (startsWithImage) {
    return {
      quality: 'needs-improvement',
      reason: 'Starts with "image of" - should be more direct',
    };
  }

  if (tooShort) {
    return {
      quality: 'needs-improvement',
      reason: 'Alt text too brief (< 5 words)',
    };
  }

  if (tooLong) {
    return {
      quality: 'needs-improvement',
      reason: 'Alt text too long (> 20 words) - be more concise',
    };
  }

  if (hasLocation && hasContext && words >= 8 && words <= 15) {
    return { quality: 'good' };
  }

  if (hasContext) {
    return { quality: 'good' };
  }

  return {
    quality: 'needs-improvement',
    reason: 'Could be more descriptive with location/context',
  };
}

/**
 * Audit images
 */
function auditImages(): AuditResult[] {
  const imagesManifestPath = path.join(CONTENT_DIR, 'images.json');
  const manifest = JSON.parse(fs.readFileSync(imagesManifestPath, 'utf-8'));

  const results: AuditResult[] = [];

  for (const [category, images] of Object.entries(manifest.images) as [
    string,
    any[]
  ][]) {
    for (const image of images) {
      const issues: string[] = [];
      const warnings: string[] = [];

      // Check file existence
      const imagePath = path.join(PUBLIC_DIR, 'images', category, image.filename);
      const webpPath = path.join(PUBLIC_DIR, 'images', category, image.webp);
      const fileExists = fs.existsSync(imagePath);
      const webpExists = fs.existsSync(webpPath);

      if (!fileExists) {
        issues.push(`Image file not found: ${image.filename}`);
      }

      if (!webpExists) {
        warnings.push(`WebP variant not found: ${image.webp}`);
      }

      // Check alt text
      const hasAltText = !!image.alt && image.alt !== 'TBD';
      const altQualityCheck = checkAltTextQuality(image.alt);

      if (!hasAltText) {
        issues.push('Missing alt text');
      } else if (altQualityCheck.quality !== 'good') {
        warnings.push(`Alt text: ${altQualityCheck.reason}`);
      }

      // Check photographer credit
      const hasPhotographer =
        image.credit?.photographer && image.credit.photographer !== 'TBD';
      if (!hasPhotographer) {
        warnings.push('Missing photographer credit');
      }

      // Check license
      const hasLicense =
        image.credit?.license &&
        image.credit.license !== 'TBD' &&
        !image.credit.license.includes('pending');
      if (!hasLicense) {
        warnings.push('License not confirmed');
      }

      // Check dimensions
      const hasDimensions = !!image.dimensions;
      const dimensionsValid =
        hasDimensions &&
        image.dimensions.width >= 1200 &&
        image.dimensions.width <= 2000 &&
        image.dimensions.height >= 600;

      if (!hasDimensions) {
        warnings.push('Missing dimensions metadata');
      } else if (!dimensionsValid) {
        warnings.push(
          `Dimensions may be suboptimal: ${image.dimensions.width}×${image.dimensions.height}`
        );
      }

      // Approval status
      if (!image.approved) {
        warnings.push('⚠️  Not yet approved for production use');
      }

      results.push({
        category,
        id: image.id,
        checks: {
          fileExists,
          webpExists,
          hasAltText,
          altTextQuality: altQualityCheck.quality,
          hasPhotographer,
          hasLicense,
          hasDimensions,
          dimensionsValid,
          approved: image.approved,
        },
        issues,
        warnings,
      });
    }
  }

  return results;
}

/**
 * Audit vendor logos
 */
function auditVendors(): VendorAuditResult[] {
  const vendorsManifestPath = path.join(CONTENT_DIR, 'vendors.json');
  const manifest = JSON.parse(fs.readFileSync(vendorsManifestPath, 'utf-8'));

  const results: VendorAuditResult[] = [];

  for (const vendor of manifest.vendors) {
    const issues: string[] = [];
    const warnings: string[] = [];

    // Check file existence
    const svgPath = path.join(PUBLIC_DIR, vendor.logoPath);
    const pngPath = path.join(PUBLIC_DIR, vendor.logoPathPng);
    const svgExists = fs.existsSync(svgPath);
    const pngExists = fs.existsSync(pngPath);

    if (!svgExists && !pngExists) {
      issues.push('No logo files found (SVG or PNG)');
    } else if (!svgExists) {
      warnings.push('SVG logo preferred but not found');
    } else if (!pngExists) {
      warnings.push('PNG fallback not found');
    }

    // Check usage notes
    const hasUsageNotes =
      vendor.usageNotes &&
      vendor.usageNotes.clearspace &&
      vendor.usageNotes.background &&
      vendor.usageNotes.colors;

    if (!hasUsageNotes) {
      warnings.push('Incomplete usage guidelines');
    }

    // Check license status
    const licenseCleared = vendor.licenseStatus === 'approved';
    if (!licenseCleared) {
      warnings.push(`License status: ${vendor.licenseStatus}`);
    }

    // Check approval
    if (!vendor.approved) {
      warnings.push('⚠️  Not yet approved for production use');
    }

    results.push({
      name: vendor.name,
      checks: {
        svgExists,
        pngExists,
        hasUsageNotes,
        approved: vendor.approved,
        licenseCleared,
      },
      issues,
      warnings,
    });
  }

  return results;
}

/**
 * Print audit report
 */
function printReport(
  imageResults: AuditResult[],
  vendorResults: VendorAuditResult[]
) {
  console.log('\n📋 MEDIA AUDIT REPORT\n');
  console.log('═'.repeat(60));

  // Images section
  console.log('\n📸 IMAGES\n');

  const imageIssuesCount = imageResults.filter((r) => r.issues.length > 0).length;
  const imageWarningsCount = imageResults.filter(
    (r) => r.warnings.length > 0
  ).length;
  const imagesApproved = imageResults.filter((r) => r.checks.approved).length;

  console.log(
    `Total: ${imageResults.length} | Approved: ${imagesApproved} | Issues: ${imageIssuesCount} | Warnings: ${imageWarningsCount}\n`
  );

  for (const result of imageResults) {
    if (result.issues.length === 0 && result.warnings.length === 0) continue;

    console.log(`\n${result.category}/${result.id}:`);

    if (result.issues.length > 0) {
      console.log('  ❌ Issues:');
      result.issues.forEach((issue) => console.log(`     - ${issue}`));
    }

    if (result.warnings.length > 0) {
      console.log('  ⚠️  Warnings:');
      result.warnings.forEach((warning) => console.log(`     - ${warning}`));
    }
  }

  // Vendors section
  console.log('\n\n🏢 VENDOR LOGOS\n');

  const vendorIssuesCount = vendorResults.filter(
    (r) => r.issues.length > 0
  ).length;
  const vendorWarningsCount = vendorResults.filter(
    (r) => r.warnings.length > 0
  ).length;
  const vendorsApproved = vendorResults.filter((r) => r.checks.approved).length;

  console.log(
    `Total: ${vendorResults.length} | Approved: ${vendorsApproved} | Issues: ${vendorIssuesCount} | Warnings: ${vendorWarningsCount}\n`
  );

  for (const result of vendorResults) {
    if (result.issues.length === 0 && result.warnings.length === 0) continue;

    console.log(`\n${result.name}:`);

    if (result.issues.length > 0) {
      console.log('  ❌ Issues:');
      result.issues.forEach((issue) => console.log(`     - ${issue}`));
    }

    if (result.warnings.length > 0) {
      console.log('  ⚠️  Warnings:');
      result.warnings.forEach((warning) => console.log(`     - ${warning}`));
    }
  }

  // Summary
  console.log('\n\n═'.repeat(60));
  console.log('📊 SUMMARY\n');

  const totalIssues = imageIssuesCount + vendorIssuesCount;
  const totalWarnings = imageWarningsCount + vendorWarningsCount;
  const totalApproved = imagesApproved + vendorsApproved;
  const totalAssets = imageResults.length + vendorResults.length;

  console.log(`Total Assets: ${totalAssets}`);
  console.log(`Approved: ${totalApproved}/${totalAssets}`);
  console.log(`Issues: ${totalIssues}`);
  console.log(`Warnings: ${totalWarnings}`);

  if (totalIssues === 0) {
    console.log('\n✅ No critical issues found!');
  } else {
    console.log('\n⚠️  Please resolve issues before production deployment.');
  }

  if (totalApproved < totalAssets) {
    console.log(
      `\n📝 ${totalAssets - totalApproved} assets pending approval. Visit /admin/media-review to review.`
    );
  }

  console.log('\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting media audit...\n');

  const imageResults = auditImages();
  const vendorResults = auditVendors();

  printReport(imageResults, vendorResults);

  // Exit with error code if there are critical issues
  const hasCriticalIssues = imageResults.some((r) => r.issues.length > 0) ||
                            vendorResults.some((r) => r.issues.length > 0);

  if (hasCriticalIssues) {
    process.exit(1);
  }
}

// Execute
if (require.main === module) {
  main();
}

export { auditImages, auditVendors, checkAltTextQuality };
