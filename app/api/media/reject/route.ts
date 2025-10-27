import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { type, category, id, reason } = await request.json();

    if (type === 'image') {
      const imagesPath = path.join(process.cwd(), 'content', 'images.json');
      const data = JSON.parse(fs.readFileSync(imagesPath, 'utf-8'));

      // Find and mark the image for replacement
      if (data.images[category]) {
        const image = data.images[category].find((img: any) => img.id === id);
        if (image) {
          image.approved = false;
          image.rejectionReason = reason;
          image.needsReplacement = true;

          data.metadata.lastUpdated = new Date().toISOString();

          fs.writeFileSync(imagesPath, JSON.stringify(data, null, 2));

          // Log rejection for review
          const logPath = path.join(process.cwd(), 'content', 'media-rejections.log');
          const logEntry = `${new Date().toISOString()} | IMAGE | ${category}/${id} | ${reason}\n`;
          fs.appendFileSync(logPath, logEntry);

          return NextResponse.json({
            success: true,
            message: 'Image marked for replacement. Update searchQuery in images.json and re-run fetch-media.ts'
          });
        }
      }
    } else if (type === 'vendor') {
      const vendorsPath = path.join(process.cwd(), 'content', 'vendors.json');
      const data = JSON.parse(fs.readFileSync(vendorsPath, 'utf-8'));

      // Find and remove the vendor
      const vendorIndex = data.vendors.findIndex((v: any) => v.name === id);
      if (vendorIndex !== -1) {
        const removedVendor = data.vendors.splice(vendorIndex, 1)[0];

        fs.writeFileSync(vendorsPath, JSON.stringify(data, null, 2));

        // Log removal
        const logPath = path.join(process.cwd(), 'content', 'media-rejections.log');
        const logEntry = `${new Date().toISOString()} | VENDOR | ${id} | ${reason} | REMOVED\n`;
        fs.appendFileSync(logPath, logEntry);

        return NextResponse.json({
          success: true,
          message: 'Vendor removed from manifest'
        });
      }
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  } catch (error) {
    console.error('Error rejecting media:', error);
    return NextResponse.json(
      { error: 'Failed to reject media' },
      { status: 500 }
    );
  }
}
