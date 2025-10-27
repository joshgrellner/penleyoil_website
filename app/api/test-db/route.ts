import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('credit_applications')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        hint: 'Make sure you have run the supabase-setup.sql file in your Supabase SQL Editor',
      }, { status: 500 });
    }

    // Test storage bucket
    const { data: buckets, error: storageError } = await supabaseAdmin
      .storage
      .listBuckets();

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      database: {
        connected: true,
        table: 'credit_applications exists',
      },
      storage: {
        connected: !storageError,
        buckets: buckets?.map(b => b.name) || [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    }, { status: 500 });
  }
}
