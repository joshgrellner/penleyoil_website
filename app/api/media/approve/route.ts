import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { type, category, id, approved } = await request.json();

    if (type === 'image') {
      const imagesPath = path.join(process.cwd(), 'content', 'images.json');
      const data = JSON.parse(fs.readFileSync(imagesPath, 'utf-8'));

      // Find and update the image
      if (data.images[category]) {
        const image = data.images[category].find((img: any) => img.id === id);
        if (image) {
          image.approved = approved;

          // Update metadata counts
          const allImages = Object.values(data.images).flat() as any[];
          data.metadata.approvedImages = allImages.filter((img: any) => img.approved).length;
          data.metadata.pendingImages = allImages.length - data.metadata.approvedImages;
          data.metadata.lastUpdated = new Date().toISOString();

          fs.writeFileSync(imagesPath, JSON.stringify(data, null, 2));
          return NextResponse.json({ success: true });
        }
      }
    } else if (type === 'vendor') {
      const vendorsPath = path.join(process.cwd(), 'content', 'vendors.json');
      const data = JSON.parse(fs.readFileSync(vendorsPath, 'utf-8'));

      // Find and update the vendor
      const vendor = data.vendors.find((v: any) => v.name === id);
      if (vendor) {
        vendor.approved = approved;
        vendor.licenseStatus = approved ? 'approved' : 'pending';

        fs.writeFileSync(vendorsPath, JSON.stringify(data, null, 2));
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  } catch (error) {
    console.error('Error approving media:', error);
    return NextResponse.json(
      { error: 'Failed to approve media' },
      { status: 500 }
    );
  }
}
