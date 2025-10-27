#!/usr/bin/env node

/**
 * Ads Archive Audit Script
 *
 * Validates CSV data quality and generates summary statistics
 * for the Penley Oil advertising archive.
 *
 * Usage:
 *   node scripts/audit-ads.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const ADS_ARCHIVE = path.join(ROOT, 'ads-archive');

// Required fields for each ad
const REQUIRED_FIELDS = ['platform', 'status', 'start_date', 'final_url', 'source_link'];

// Fields that should be present for text ads
const TEXT_AD_FIELDS = ['headline_1', 'description_1'];

// Fields that should be present for image/video ads
const CREATIVE_AD_FIELDS = ['creative_file'];

console.log('🔍 Auditing Penley Oil Ads Archive...\n');

// Parse CSV (simple parser - assumes no commas in quoted fields for now)
function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) {
    return { headers: [], rows: [] };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = lines[0].split(',');
  const rows = lines.slice(1)
    .filter(line => line.trim().length > 0)
    .map(line => {
      const values = line.split(',');
      const row = {};
      headers.forEach((header, i) => {
        row[header] = values[i] || '';
      });
      return row;
    });

  return { headers, rows };
}

// Check if creative file exists
function checkCreativeExists(platform, filename) {
  if (!filename || filename.trim() === '') return true; // No creative specified

  const creativePath = path.join(ADS_ARCHIVE, platform, 'creatives', filename);
  return fs.existsSync(creativePath);
}

// Audit a single platform
function auditPlatform(platform) {
  console.log(`\n📊 ${platform.toUpperCase()}`);
  console.log('─'.repeat(60));

  const csvPath = path.join(ADS_ARCHIVE, platform, 'ads.csv');
  const { headers, rows } = parseCSV(csvPath);

  if (rows.length === 0) {
    console.log('⚠️  No ads found in CSV');
    return {
      platform,
      total: 0,
      active: 0,
      inactive: 0,
      errors: [],
      warnings: []
    };
  }

  console.log(`✅ Found ${rows.length} ad(s) in CSV`);

  const errors = [];
  const warnings = [];
  let active = 0;
  let inactive = 0;

  rows.forEach((row, index) => {
    const rowNum = index + 2; // +2 because: 1-indexed and skip header row

    // Check status
    const status = row.status?.toLowerCase();
    if (status === 'active') {
      active++;
    } else {
      inactive++;
    }

    // Check required fields
    REQUIRED_FIELDS.forEach(field => {
      if (!row[field] || row[field].trim() === '') {
        errors.push(`Row ${rowNum}: Missing required field "${field}"`);
      }
    });

    // Check for either text ad fields OR creative file
    const hasTextFields = TEXT_AD_FIELDS.some(field => row[field] && row[field].trim() !== '');
    const hasCreative = row.creative_file && row.creative_file.trim() !== '';

    if (!hasTextFields && !hasCreative) {
      warnings.push(`Row ${rowNum}: No ad copy (headline/description) and no creative file`);
    }

    // Check creative file exists if specified
    if (hasCreative) {
      if (!checkCreativeExists(platform, row.creative_file)) {
        errors.push(`Row ${rowNum}: Creative file "${row.creative_file}" not found in ${platform}/creatives/`);
      }
    }

    // Validate URL format
    if (row.final_url && !row.final_url.startsWith('http')) {
      warnings.push(`Row ${rowNum}: final_url should start with http:// or https://`);
    }

    // Validate date format (basic check)
    if (row.start_date && !row.start_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      warnings.push(`Row ${rowNum}: start_date should be in YYYY-MM-DD format`);
    }
  });

  // Print errors
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} Error(s):`);
    errors.forEach(err => console.log(`   ${err}`));
  }

  // Print warnings
  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} Warning(s):`);
    warnings.forEach(warn => console.log(`   ${warn}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ No issues found!');
  }

  console.log(`\nStatus: ${active} active, ${inactive} paused/ended`);

  return {
    platform,
    total: rows.length,
    active,
    inactive,
    errors,
    warnings
  };
}

// Check creative files in directories
function auditCreatives(platform) {
  const creativesDir = path.join(ADS_ARCHIVE, platform, 'creatives');

  if (!fs.existsSync(creativesDir)) {
    return [];
  }

  const files = fs.readdirSync(creativesDir);
  return files.filter(f => !f.startsWith('.') && f !== '.gitkeep');
}

// Main audit
function main() {
  const platforms = ['google', 'meta', 'microsoft'];
  const results = platforms.map(auditPlatform);

  // Summary
  console.log('\n\n' + '═'.repeat(60));
  console.log('📈 SUMMARY');
  console.log('═'.repeat(60));

  const totals = results.reduce((acc, r) => ({
    total: acc.total + r.total,
    active: acc.active + r.active,
    inactive: acc.inactive + r.inactive,
    errors: acc.errors + r.errors.length,
    warnings: acc.warnings + r.warnings.length
  }), { total: 0, active: 0, inactive: 0, errors: 0, warnings: 0 });

  console.log(`\nTotal Ads: ${totals.total}`);
  console.log(`  Active: ${totals.active}`);
  console.log(`  Paused/Ended: ${totals.inactive}`);
  console.log(`\nData Quality:`);
  console.log(`  Errors: ${totals.errors}`);
  console.log(`  Warnings: ${totals.warnings}`);

  console.log('\n\nPer Platform:');
  results.forEach(r => {
    const creatives = auditCreatives(r.platform);
    const status = r.total === 0 ? '🔴' : r.errors.length > 0 ? '🟡' : '🟢';
    console.log(`  ${status} ${r.platform.padEnd(10)} - ${r.total} ads, ${creatives.length} creatives`);
  });

  // Check for orphaned creatives
  console.log('\n\n🖼️  Creative Files:');
  platforms.forEach(platform => {
    const creatives = auditCreatives(platform);
    if (creatives.length > 0) {
      console.log(`  ${platform}: ${creatives.length} file(s)`);
      creatives.forEach(f => console.log(`    - ${f}`));
    } else {
      console.log(`  ${platform}: No creatives yet`);
    }
  });

  // Final grade
  console.log('\n\n' + '═'.repeat(60));
  console.log('📊 OVERALL STATUS');
  console.log('═'.repeat(60));

  if (totals.total === 0) {
    console.log('\n🔴 NOT STARTED');
    console.log('   Data collection has not begun. See ads-archive/README.md\n');
  } else if (totals.errors > 0) {
    console.log('\n🟡 NEEDS ATTENTION');
    console.log(`   ${totals.errors} error(s) must be fixed before analysis\n`);
  } else if (totals.warnings > 0) {
    console.log('\n🟢 GOOD (with warnings)');
    console.log(`   Data is valid but ${totals.warnings} warning(s) should be reviewed\n`);
  } else {
    console.log('\n🟢 EXCELLENT');
    console.log('   All data validated successfully!\n');
  }

  // Next steps
  console.log('═'.repeat(60));
  console.log('📋 NEXT STEPS');
  console.log('═'.repeat(60));

  if (totals.total === 0) {
    console.log(`
1. Visit the transparency centers and collect ad data:
   - Google: https://adstransparency.google.com
   - Meta: https://www.facebook.com/ads/library
   - Microsoft: https://about.ads.microsoft.com/en-us/resources/ad-transparency

2. Add rows to the CSV files in ads-archive/{platform}/ads.csv

3. Download/screenshot creatives to ads-archive/{platform}/creatives/

4. Run this audit again: node scripts/audit-ads.mjs
`);
  } else if (totals.errors > 0) {
    console.log(`
1. Fix the ${totals.errors} error(s) listed above

2. Ensure all creative files exist in the creatives/ folders

3. Run this audit again: node scripts/audit-ads.mjs
`);
  } else {
    console.log(`
1. ✅ Data collection complete!

2. Review ads-archive/index.md for summary

3. Request campaign export from Thryv for:
   - Keywords and targeting details
   - Performance data (spend, CTR, conversions)
   - Campaign structure and settings

4. Grade Thryv's campaign quality and document findings
`);
  }

  console.log('═'.repeat(60));
  console.log('');

  // Exit with error code if there are errors
  process.exit(totals.errors > 0 ? 1 : 0);
}

main();
