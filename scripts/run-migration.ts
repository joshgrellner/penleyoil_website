/**
 * Run Supabase RAG Migration
 * Executes the database migration to create page_embeddings table
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('🚀 Running Supabase RAG Migration...\n');

  // Read migration SQL
  const migrationPath = join(process.cwd(), 'supabase-rag-migration.sql');
  const sql = readFileSync(migrationPath, 'utf-8');

  // Split by statement (naive split on semicolons outside strings)
  const statements = sql
    .split(/;(?=\s*(?:--|create|alter|drop|insert|update|delete|select)\s)/i)
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));

  console.log(`📊 Found ${statements.length} SQL statements\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    if (!stmt || stmt.length < 10) continue;

    // Get first line for logging
    const firstLine = stmt.split('\n')[0].substring(0, 80);
    console.log(`[${i + 1}/${statements.length}] ${firstLine}...`);

    try {
      const { error } = await supabase.rpc('exec_sql', { sql: stmt + ';' });

      if (error) {
        // Try direct query if RPC doesn't exist
        const { error: directError } = await supabase.from('_').select().limit(0);

        console.log(`   ⚠️  Note: Cannot execute via client (use Supabase SQL Editor)`);
        break;
      }

      console.log(`   ✅ Success`);
      successCount++;
    } catch (err) {
      console.log(`   ❌ Error: ${err}`);
      errorCount++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 MIGRATION SUMMARY:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n💡 To run this migration, copy the SQL from:`);
  console.log(`   ${migrationPath}`);
  console.log(`\n📝 Then paste into Supabase SQL Editor:`);
  console.log(`   ${SUPABASE_URL.replace('.supabase.co', '.supabase.co/project/_/sql')}`);
  console.log(`\n✨ Done!\n`);
}

runMigration().catch(console.error);
