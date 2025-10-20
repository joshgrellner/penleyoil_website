-- Penley Oil Website - RAG Embeddings Migration
-- Version: 1.0
-- Purpose: Store page content embeddings for chatbot RAG retrieval
-- Run this SQL in your Supabase SQL Editor

-- =============================================
-- 1. ENABLE VECTOR EXTENSION
-- =============================================

-- Enable pgvector extension for embeddings
create extension if not exists vector;

-- =============================================
-- 2. CREATE PAGE EMBEDDINGS TABLE
-- =============================================

create table if not exists page_embeddings (
  id uuid default gen_random_uuid() primary key,

  -- Page identification
  url text not null unique,
  page_title text not null,
  page_type text not null, -- 'service', 'product', 'info', 'form'

  -- Content
  content text not null,
  content_hash text not null, -- SHA-256 hash to detect content changes
  excerpt text, -- Short summary for preview

  -- Metadata
  keywords text[], -- Array of relevant keywords
  category text, -- 'fuel-delivery', 'def', 'lubricants', etc.

  -- Embeddings (OpenAI ada-002 = 1536 dimensions)
  embedding vector(1536),

  -- Indexing status
  indexed_at timestamp with time zone default now(),
  last_updated timestamp with time zone default now(),

  -- Stats
  token_count integer, -- Approximate token count
  chunk_index integer default 0, -- For chunked content (0 = full page)
  total_chunks integer default 1,

  -- Search optimization
  tsv tsvector generated always as (
    setweight(to_tsvector('english', coalesce(page_title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) stored
);

-- =============================================
-- 3. CREATE INDEXES
-- =============================================

-- Vector similarity search index (HNSW for fast approximate search)
create index if not exists idx_page_embeddings_vector
  on page_embeddings
  using hnsw (embedding vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- Full-text search index
create index if not exists idx_page_embeddings_tsv
  on page_embeddings
  using gin(tsv);

-- Query optimization indexes
create index if not exists idx_page_embeddings_url on page_embeddings(url);
create index if not exists idx_page_embeddings_category on page_embeddings(category);
create index if not exists idx_page_embeddings_page_type on page_embeddings(page_type);
create index if not exists idx_page_embeddings_indexed_at on page_embeddings(indexed_at desc);

-- =============================================
-- 4. CREATE UPDATED_AT TRIGGER
-- =============================================

create trigger update_page_embeddings_updated_at
  before update on page_embeddings
  for each row
  execute function update_updated_at_column();

-- =============================================
-- 5. ROW LEVEL SECURITY
-- =============================================

alter table page_embeddings enable row level security;

-- Policy: Public read access (for chatbot queries)
create policy "Anyone can read page embeddings"
  on page_embeddings
  for select
  using (true);

-- Policy: Only service role can insert/update (ingest scripts)
create policy "Service role can manage embeddings"
  on page_embeddings
  for all
  using (auth.role() = 'service_role');

-- =============================================
-- 6. HELPER FUNCTIONS
-- =============================================

-- Function: Search pages by vector similarity
create or replace function search_pages_by_embedding(
  query_embedding vector(1536),
  match_threshold float default 0.78,
  match_count int default 5
)
returns table (
  id uuid,
  url text,
  page_title text,
  content text,
  excerpt text,
  category text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    page_embeddings.id,
    page_embeddings.url,
    page_embeddings.page_title,
    page_embeddings.content,
    page_embeddings.excerpt,
    page_embeddings.category,
    1 - (page_embeddings.embedding <=> query_embedding) as similarity
  from page_embeddings
  where 1 - (page_embeddings.embedding <=> query_embedding) > match_threshold
  order by page_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Function: Hybrid search (vector + full-text)
create or replace function hybrid_search_pages(
  query_text text,
  query_embedding vector(1536),
  match_count int default 5
)
returns table (
  id uuid,
  url text,
  page_title text,
  content text,
  excerpt text,
  category text,
  similarity float,
  rank float
)
language plpgsql
as $$
begin
  return query
  select
    page_embeddings.id,
    page_embeddings.url,
    page_embeddings.page_title,
    page_embeddings.content,
    page_embeddings.excerpt,
    page_embeddings.category,
    1 - (page_embeddings.embedding <=> query_embedding) as similarity,
    ts_rank(page_embeddings.tsv, plainto_tsquery('english', query_text)) as rank
  from page_embeddings
  where page_embeddings.tsv @@ plainto_tsquery('english', query_text)
     or 1 - (page_embeddings.embedding <=> query_embedding) > 0.75
  order by
    (1 - (page_embeddings.embedding <=> query_embedding)) * 0.7 +
    ts_rank(page_embeddings.tsv, plainto_tsquery('english', query_text)) * 0.3 desc
  limit match_count;
end;
$$;

-- =============================================
-- 7. QUERY LOGS (OPTIONAL - FOR ANALYTICS)
-- =============================================

create table if not exists rag_query_logs (
  id uuid default gen_random_uuid() primary key,
  query_text text not null,
  results_count integer,
  avg_similarity float,
  response_time_ms integer,
  user_session_id text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_rag_query_logs_created on rag_query_logs(created_at desc);

alter table rag_query_logs enable row level security;

create policy "Service role can manage query logs"
  on rag_query_logs
  for all
  using (auth.role() = 'service_role');

-- =============================================
-- 8. VERIFICATION QUERY
-- =============================================

-- Run this to verify everything was created successfully
select
  'page_embeddings table' as item,
  count(*) as count,
  pg_size_pretty(pg_total_relation_size('page_embeddings')) as size
from page_embeddings
union all
select
  'rag_query_logs table' as item,
  count(*) as count,
  pg_size_pretty(pg_total_relation_size('rag_query_logs')) as size
from rag_query_logs;

-- Check if vector extension is enabled
select installed_version from pg_available_extensions where name = 'vector';

-- If you see results, everything is set up correctly!
