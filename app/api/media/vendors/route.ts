import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const vendorsPath = path.join(process.cwd(), 'content', 'vendors.json');
    const data = fs.readFileSync(vendorsPath, 'utf-8');
    const vendors = JSON.parse(data);

    return NextResponse.json(vendors);
  } catch (error) {
    console.error('Error reading vendors.json:', error);
    return NextResponse.json(
      { error: 'Failed to load vendors' },
      { status: 500 }
    );
  }
}
