import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const imagesPath = path.join(process.cwd(), 'content', 'images.json');
    const data = fs.readFileSync(imagesPath, 'utf-8');
    const images = JSON.parse(data);

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading images.json:', error);
    return NextResponse.json(
      { error: 'Failed to load images' },
      { status: 500 }
    );
  }
}
