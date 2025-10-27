'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageItem {
  id: string;
  filename: string;
  webp: string;
  alt: string;
  caption?: string | null;
  credit: {
    source: string;
    photographer: string;
    url: string;
    license: string;
  };
  approved: boolean;
  searchQuery: string;
  usage: string[];
  dimensions?: {
    width: number;
    height: number;
  };
}

interface VendorItem {
  name: string;
  url: string;
  logoPath: string;
  logoPathPng: string;
  usageNotes: {
    clearspace: string;
    background: string;
    colors: string;
    modifications: string;
  };
  approved: boolean;
  sourceUrl: string;
  licenseStatus: string;
}

interface ImagesManifest {
  images: {
    [category: string]: ImageItem[];
  };
  metadata: any;
}

interface VendorsManifest {
  vendors: VendorItem[];
}

export default function MediaReviewPage() {
  const [imagesData, setImagesData] = useState<ImagesManifest | null>(null);
  const [vendorsData, setVendorsData] = useState<VendorsManifest | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'logos'>('images');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Check access (simple env-based gate)
  const [hasAccess, setHasAccess] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Simple password gate - in production use proper auth
    const savedAccess = sessionStorage.getItem('mediaReviewAccess');
    if (savedAccess === 'granted') {
      setHasAccess(true);
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = async () => {
    try {
      const [imagesRes, vendorsRes] = await Promise.all([
        fetch('/api/media/images'),
        fetch('/api/media/vendors'),
      ]);

      if (imagesRes.ok && vendorsRes.ok) {
        const images = await imagesRes.json();
        const vendors = await vendorsRes.json();
        setImagesData(images);
        setVendorsData(vendors);
      }
    } catch (error) {
      console.error('Error loading media data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    // Simple password check - replace with proper auth
    if (password === 'penley2025' || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem('mediaReviewAccess', 'granted');
      setHasAccess(true);
      loadData();
    } else {
      alert('Incorrect password');
    }
  };

  const handleApprove = async (type: 'image' | 'vendor', category: string, id: string) => {
    try {
      const response = await fetch('/api/media/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, category, id, approved: true }),
      });

      if (response.ok) {
        loadData(); // Reload to show updated status
      }
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (type: 'image' | 'vendor', category: string, id: string) => {
    const reason = prompt('Reason for rejection (will be saved as note):');
    if (!reason) return;

    try {
      const response = await fetch('/api/media/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, category, id, reason }),
      });

      if (response.ok) {
        alert('Marked for replacement. Run fetch-media.ts again with updated search query.');
        loadData();
      }
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  // Login gate
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Media Review Access</h1>
          <p className="text-gray-800 mb-4">
            This page is restricted. Enter password to continue.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 text-gray-900"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[--penley-green] text-white py-2 rounded-lg hover:opacity-90"
          >
            Access Review
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-900">Loading media...</div>
      </div>
    );
  }

  const categories = imagesData
    ? ['all', ...Object.keys(imagesData.images)]
    : [];

  const filteredImages =
    selectedCategory === 'all'
      ? Object.entries(imagesData?.images || {}).flatMap(([cat, imgs]) =>
          imgs.map((img) => ({ ...img, category: cat }))
        )
      : (imagesData?.images[selectedCategory] || []).map((img) => ({
          ...img,
          category: selectedCategory,
        }));

  const approvedCount = filteredImages.filter((img) => img.approved).length;
  const pendingCount = filteredImages.length - approvedCount;

  const vendorApprovedCount =
    vendorsData?.vendors.filter((v) => v.approved).length || 0;
  const vendorPendingCount =
    (vendorsData?.vendors.length || 0) - vendorApprovedCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Media Review Dashboard</h1>
          <p className="text-gray-800 mt-1">
            Review and approve images and logos before production deployment
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'images'
                ? 'border-[--penley-green] text-[--penley-green]'
                : 'border-transparent text-gray-800 hover:text-gray-900'
            }`}
          >
            Images ({pendingCount} pending)
          </button>
          <button
            onClick={() => setActiveTab('logos')}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === 'logos'
                ? 'border-[--penley-green] text-[--penley-green]'
                : 'border-transparent text-gray-800 hover:text-gray-900'
            }`}
          >
            Vendor Logos ({vendorPendingCount} pending)
          </button>
        </div>

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div className="mt-6">
            {/* Category filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Images grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredImages.map((image: any) => (
                <div
                  key={`${image.category}-${image.id}`}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                    image.approved ? 'border-green-500' : 'border-yellow-500'
                  }`}
                >
                  {/* Image preview */}
                  <div className="relative h-64 bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      Image preview: {image.filename}
                      <br />
                      <span className="text-sm">
                        (Run fetch-media.ts to download)
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">
                        {image.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          image.approved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {image.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>Category:</strong> {image.category}
                      </p>
                      <p>
                        <strong>Alt text:</strong> {image.alt}
                      </p>
                      <p>
                        <strong>Source:</strong> {image.credit.source}
                      </p>
                      <p>
                        <strong>Photographer:</strong>{' '}
                        {image.credit.photographer}
                      </p>
                      <p>
                        <strong>License:</strong> {image.credit.license}
                      </p>
                      <p>
                        <strong>Usage:</strong> {image.usage.join(', ')}
                      </p>
                      {image.dimensions && (
                        <p>
                          <strong>Dimensions:</strong> {image.dimensions.width}×
                          {image.dimensions.height}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    {!image.approved && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() =>
                            handleApprove('image', image.category, image.id)
                          }
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() =>
                            handleReject('image', image.category, image.id)
                          }
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
                        >
                          ✗ Replace
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logos Tab */}
        {activeTab === 'logos' && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vendorsData?.vendors.map((vendor) => (
                <div
                  key={vendor.name}
                  className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${
                    vendor.approved ? 'border-green-500' : 'border-yellow-500'
                  }`}
                >
                  {/* Logo preview - light background */}
                  <div className="relative h-40 bg-white border-b border-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="font-semibold">{vendor.name}</div>
                      <div className="text-sm mt-1">Logo on light background</div>
                      <div className="text-xs mt-1">
                        (Download from {vendor.sourceUrl})
                      </div>
                    </div>
                  </div>

                  {/* Logo preview - dark background */}
                  <div className="relative h-40 bg-gray-900 border-b border-gray-700 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-sm">Logo on dark background</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900">
                        {vendor.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          vendor.approved
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {vendor.approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <p>
                        <strong>Website:</strong>{' '}
                        <a
                          href={vendor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {vendor.url}
                        </a>
                      </p>
                      <p>
                        <strong>License Status:</strong> {vendor.licenseStatus}
                      </p>
                      <p>
                        <strong>SVG Path:</strong> {vendor.logoPath}
                      </p>
                      <p>
                        <strong>PNG Path:</strong> {vendor.logoPathPng}
                      </p>
                    </div>

                    {/* Usage notes */}
                    <details className="mb-4">
                      <summary className="cursor-pointer font-semibold text-gray-900">
                        Usage Guidelines
                      </summary>
                      <div className="mt-2 pl-4 space-y-1 text-sm text-gray-700">
                        <p>
                          <strong>Clearspace:</strong>{' '}
                          {vendor.usageNotes.clearspace}
                        </p>
                        <p>
                          <strong>Background:</strong>{' '}
                          {vendor.usageNotes.background}
                        </p>
                        <p>
                          <strong>Colors:</strong> {vendor.usageNotes.colors}
                        </p>
                        <p>
                          <strong>Modifications:</strong>{' '}
                          {vendor.usageNotes.modifications}
                        </p>
                      </div>
                    </details>

                    {/* Actions */}
                    {!vendor.approved && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleApprove('vendor', '', vendor.name)
                          }
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleReject('vendor', '', vendor.name)}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
                        >
                          ✗ Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
