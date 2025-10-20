# RAG (Retrieval-Augmented Generation) Setup

## Overview

This RAG system enables the AI chatbot to provide accurate, context-aware responses by retrieving relevant content from your website pages and using vector embeddings for semantic search.

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Website   │────▶│ Ingest Script│────▶│  Supabase   │
│    Pages    │     │  (embeddings)│     │  (pgvector) │
└─────────────┘     └──────────────┘     └─────────────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │   Chatbot   │
                                         │  (queries)  │
                                         └─────────────┘
```

## Database Schema

### Table: `page_embeddings`

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `url` | text | Page URL (unique) |
| `page_title` | text | Page title |
| `page_type` | text | Type: service, product, info, form |
| `content` | text | Full page content (cleaned) |
| `content_hash` | text | SHA-256 hash for change detection |
| `excerpt` | text | Short summary/meta description |
| `keywords` | text[] | Extracted keywords |
| `category` | text | Page category (fuel-delivery, def, etc.) |
| `embedding` | vector(1536) | OpenAI ada-002 embedding |
| `indexed_at` | timestamp | When indexed |
| `last_updated` | timestamp | Last update |
| `token_count` | integer | Approximate token count |
| `chunk_index` | integer | Chunk number (0 for full page) |
| `total_chunks` | integer | Total chunks for this page |
| `tsv` | tsvector | Full-text search vector (auto-generated) |

### Indexes

- **Vector search:** HNSW index on `embedding` for fast cosine similarity
- **Full-text search:** GIN index on `tsv` for keyword search
- **Query optimization:** B-tree indexes on url, category, page_type

### Search Functions

#### `search_pages_by_embedding(query_embedding, match_threshold, match_count)`
Pure vector similarity search using cosine distance.

#### `hybrid_search_pages(query_text, query_embedding, match_count)`
Combines vector search (70%) + full-text search (30%) for best results.

## Setup Instructions

### 1. Run Database Migration

```bash
# In Supabase SQL Editor, paste and run:
cat supabase-rag-migration.sql
```

This creates:
- `page_embeddings` table with pgvector extension
- Search indexes (vector + full-text)
- Helper functions for querying
- Row-level security policies

### 2. Install Dependencies

```bash
npm install cheerio tsx
# cheerio: HTML parsing
# tsx: TypeScript execution
```

### 3. Configure Environment Variables

Add to `.env.local`:

```bash
# OpenAI API Key (for generating embeddings)
OPENAI_API_KEY=sk-...

# RAG Configuration
RAG_SITE_URL=https://www.penleyoil.com
RAG_MAX_PAGES=500

# Supabase (should already be configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Initial Ingest

```bash
# Ingest default pages (fuel-delivery, def, lubricants, etc.)
npx tsx scripts/ingest-pages.ts

# Ingest specific pages
npx tsx scripts/ingest-pages.ts --pages=/fuel-delivery,/def,/tanks

# Force re-index all (even if unchanged)
npx tsx scripts/ingest-pages.ts --force
```

## Indexed Pages

Default pages (7 total):
1. `/fuel-delivery` - Fuel delivery services
2. `/def` - DEF supply & information
3. `/lubricants` - Lubricants & oils
4. `/additives` - Fuel additives
5. `/tanks` - Tank solutions
6. `/deliveries` - Delivery information
7. `/credit-application` - Credit application info

## Usage in Chatbot

### Example Query Flow

1. **User asks:** "What DEF sizes do you offer?"

2. **Chatbot generates embedding** for the question using OpenAI

3. **Query Supabase:**
   ```typescript
   const { data } = await supabase.rpc('search_pages_by_embedding', {
     query_embedding: questionEmbedding,
     match_threshold: 0.78,
     match_count: 3
   });
   ```

4. **Get relevant context** from top matches

5. **Generate response** using retrieved context + LLM

### Sample Integration Code

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getRelevantContext(question: string): Promise<string> {
  // Generate embedding for question
  const embedding = await generateEmbedding(question);

  // Search for relevant pages
  const { data } = await supabase.rpc('search_pages_by_embedding', {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 3
  });

  // Combine top results
  return data
    .map((page: any) => `${page.page_title}\n${page.content}`)
    .join('\n\n---\n\n');
}

// Use in chatbot
const context = await getRelevantContext(userQuestion);
const response = await callLLM(userQuestion, context);
```

## Maintenance

### Re-index After Content Changes

When you update website content, re-run the ingest script:

```bash
# Re-index all pages (will skip unchanged pages by default)
npx tsx scripts/ingest-pages.ts

# Force re-index even if content hash matches
npx tsx scripts/ingest-pages.ts --force
```

### Monitor Indexed Pages

```sql
-- Check indexed pages
SELECT url, page_title, category, indexed_at, token_count
FROM page_embeddings
ORDER BY indexed_at DESC;

-- Check for stale pages (>30 days old)
SELECT url, indexed_at
FROM page_embeddings
WHERE indexed_at < NOW() - INTERVAL '30 days';

-- View embedding statistics
SELECT
  COUNT(*) as total_pages,
  SUM(token_count) as total_tokens,
  AVG(token_count) as avg_tokens_per_page,
  pg_size_pretty(pg_total_relation_size('page_embeddings')) as table_size
FROM page_embeddings;
```

### Query Analytics

```sql
-- View recent queries (if logging enabled)
SELECT query_text, results_count, avg_similarity, response_time_ms, created_at
FROM rag_query_logs
ORDER BY created_at DESC
LIMIT 20;

-- Popular queries
SELECT query_text, COUNT(*) as frequency
FROM rag_query_logs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY query_text
ORDER BY frequency DESC
LIMIT 10;
```

## Performance Optimization

### Vector Index Tuning

The HNSW index has two key parameters:

- **m (16):** Connections per layer. Higher = better recall, more memory
- **ef_construction (64):** Build-time accuracy. Higher = better index, slower build

For production with >1000 pages, consider:
```sql
-- Drop old index
DROP INDEX idx_page_embeddings_vector;

-- Create optimized index
CREATE INDEX idx_page_embeddings_vector
  ON page_embeddings
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 32, ef_construction = 128);
```

### Query Performance

- **match_threshold:** Lower = more results, less relevant (default 0.78)
- **match_count:** Limit results to save bandwidth (default 5)
- Use `hybrid_search_pages()` for best accuracy
- Use `search_pages_by_embedding()` for pure semantic search

## Cost Estimates

### OpenAI Embeddings (ada-002)

- **Cost:** $0.0001 per 1K tokens
- **7 pages @ ~2K tokens each:** ~$0.0014 per full ingest
- **Re-indexing:** Only changed pages (content hash check)

### Supabase Storage

- **pgvector:** ~6KB per embedding (1536 dimensions)
- **7 pages:** ~42KB for embeddings
- **500 pages:** ~3MB for embeddings
- Free tier: 500MB database (plenty of headroom)

## Troubleshooting

### Issue: "vector extension not found"

```sql
-- Enable in Supabase SQL Editor
CREATE EXTENSION IF NOT EXISTS vector;
```

### Issue: Embeddings are zero vectors

- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify API key is valid: https://platform.openai.com/api-keys

### Issue: Pages not indexing

```bash
# Check console output for errors
npx tsx scripts/ingest-pages.ts

# Test single page
npx tsx scripts/ingest-pages.ts --pages=/fuel-delivery
```

### Issue: Low search relevance

- Lower `match_threshold` (try 0.70 instead of 0.78)
- Increase `match_count` to get more results
- Use `hybrid_search_pages()` instead of pure vector search
- Re-index with `--force` to regenerate embeddings

## Future Enhancements

- [ ] Automatic re-indexing via webhook on content changes
- [ ] Chunk large pages for better context retrieval
- [ ] Add metadata fields (author, publish date, update frequency)
- [ ] Implement query result caching
- [ ] Add A/B testing for search algorithms
- [ ] Multi-language support (if expanding to Spanish market)

## References

- [Supabase pgvector Guide](https://supabase.com/docs/guides/ai/vector-columns)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [HNSW Index](https://github.com/nmslib/hnswlib)
