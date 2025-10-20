/**
 * RAG Page Ingest Script
 * Crawls website pages, generates embeddings, and stores in Supabase
 *
 * Usage:
 *   npx tsx scripts/ingest-pages.ts
 *   npx tsx scripts/ingest-pages.ts --pages=/fuel-delivery,/def
 *   npx tsx scripts/ingest-pages.ts --force (re-index all)
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import * as cheerio from 'cheerio';

// Load environment variables
config({ path: '.env.local' });

// Configuration
const SITE_URL = process.env.RAG_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Pages to index
const DEFAULT_PAGES = [
  '/fuel-delivery',
  '/def',
  '/lubricants',
  '/additives',
  '/tanks',
  '/deliveries',
  '/credit-application',
];

interface PageContent {
  url: string;
  page_title: string;
  page_type: string;
  content: string;
  content_hash: string;
  excerpt: string;
  keywords: string[];
  category: string;
  token_count: number;
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Fetch page HTML content
 */
async function fetchPage(url: string): Promise<string> {
  console.log(`📄 Fetching: ${url}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'PenleyOil-RAG-Ingest/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return await response.text();
}

/**
 * Extract clean text content from HTML
 */
function extractContent(html: string, url: string): PageContent {
  const $ = cheerio.load(html);

  // Remove unwanted elements
  $('script, style, nav, header, footer, .chatbot, button').remove();

  // Extract title
  const page_title = $('h1').first().text().trim() || $('title').text().trim();

  // Extract main content
  const mainContent = $('main').text() || $('body').text();
  const content = mainContent
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim()
    .substring(0, 8000); // Limit to prevent token overflow

  // Extract excerpt (first paragraph or meta description)
  const excerpt = $('meta[name="description"]').attr('content') ||
    $('p').first().text().trim().substring(0, 300);

  // Determine category from URL
  const category = url.split('/').filter(Boolean).pop() || 'home';

  // Determine page type
  let page_type = 'info';
  if (url.includes('delivery')) page_type = 'service';
  if (url.includes('credit-application')) page_type = 'form';
  if (url.includes('def') || url.includes('lubricants') || url.includes('additives')) page_type = 'product';

  // Extract keywords from content
  const keywords = extractKeywords(content, page_title);

  // Calculate content hash
  const content_hash = createHash('sha256').update(content).digest('hex');

  // Estimate token count (rough: ~4 chars per token)
  const token_count = Math.ceil(content.length / 4);

  return {
    url,
    page_title,
    page_type,
    content,
    content_hash,
    excerpt,
    keywords,
    category,
    token_count
  };
}

/**
 * Extract relevant keywords from content
 */
function extractKeywords(content: string, title: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might']);

  // Extract potential keywords
  const words = text.match(/\b[a-z]{3,}\b/g) || [];
  const wordCounts = new Map<string, number>();

  words.forEach(word => {
    if (!commonWords.has(word)) {
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  });

  // Get top keywords
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}

/**
 * Generate embedding using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set. Skipping embedding generation.');
    return Array(1536).fill(0); // Return zero vector as placeholder
  }

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text.substring(0, 8000) // OpenAI limit
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Check if page needs re-indexing
 */
async function needsReindex(url: string, content_hash: string, force: boolean): Promise<boolean> {
  if (force) return true;

  const { data } = await supabase
    .from('page_embeddings')
    .select('content_hash')
    .eq('url', url)
    .single();

  if (!data) return true; // New page
  return data.content_hash !== content_hash; // Content changed
}

/**
 * Upsert page embedding to database
 */
async function upsertEmbedding(pageData: PageContent, embedding: number[]): Promise<void> {
  const { error } = await supabase
    .from('page_embeddings')
    .upsert({
      url: pageData.url,
      page_title: pageData.page_title,
      page_type: pageData.page_type,
      content: pageData.content,
      content_hash: pageData.content_hash,
      excerpt: pageData.excerpt,
      keywords: pageData.keywords,
      category: pageData.category,
      token_count: pageData.token_count,
      embedding,
      indexed_at: new Date().toISOString()
    }, {
      onConflict: 'url'
    });

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }
}

/**
 * Ingest a single page
 */
async function ingestPage(url: string, force: boolean): Promise<{ status: string; message: string }> {
  try {
    const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

    // Fetch and extract content
    const html = await fetchPage(fullUrl);
    const pageData = extractContent(html, url);

    // Check if re-indexing is needed
    const shouldIndex = await needsReindex(url, pageData.content_hash, force);

    if (!shouldIndex) {
      return {
        status: 'skipped',
        message: 'Content unchanged'
      };
    }

    // Generate embedding
    console.log(`🤖 Generating embedding for: ${pageData.page_title}`);
    const embedding = await generateEmbedding(
      `${pageData.page_title}\n\n${pageData.excerpt}\n\n${pageData.content}`
    );

    // Store in database
    console.log(`💾 Storing: ${url}`);
    await upsertEmbedding(pageData, embedding);

    return {
      status: 'indexed',
      message: `${pageData.token_count} tokens`
    };

  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Main ingest function
 */
async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const pagesArg = args.find(arg => arg.startsWith('--pages='));
  const pages = pagesArg
    ? pagesArg.split('=')[1].split(',')
    : DEFAULT_PAGES;

  console.log('🚀 Starting RAG Page Ingest');
  console.log(`📍 Site URL: ${SITE_URL}`);
  console.log(`📊 Pages to process: ${pages.length}`);
  console.log(`🔄 Force re-index: ${force}\n`);

  if (!OPENAI_API_KEY) {
    console.warn('⚠️  Warning: OPENAI_API_KEY not set. Embeddings will be zero vectors.\n');
  }

  const results = {
    indexed: 0,
    skipped: 0,
    errors: 0
  };

  // Process pages sequentially to avoid rate limits
  for (const page of pages) {
    console.log(`\n${'='.repeat(60)}`);
    const result = await ingestPage(page, force);

    console.log(`✓ ${result.status.toUpperCase()}: ${page}`);
    console.log(`  ${result.message}`);

    results[result.status as keyof typeof results]++;

    // Rate limit: wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Print summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 INGEST SUMMARY:');
  console.log(`   ✅ Indexed: ${results.indexed}`);
  console.log(`   ⏭️  Skipped: ${results.skipped}`);
  console.log(`   ❌ Errors: ${results.errors}`);
  console.log(`\n✨ Ingest complete!\n`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

export { ingestPage, extractContent, generateEmbedding };
