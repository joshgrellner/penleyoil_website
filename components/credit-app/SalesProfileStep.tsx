'use client';

import { useState, useEffect } from 'react';

export default function SalesProfileStep({ data, updateData }: any) {
  const [profile, setProfile] = useState(data.salesProfile || { products: [], estimatedMonthlyGallons: 0, typicalDeliveryCities: '', taxExempt: false });

  useEffect(() => {
    updateData('salesProfile', profile);
  }, [profile]);

  const toggleProduct = (product: string) => {
    const products = profile.products.includes(product)
      ? profile.products.filter((p: string) => p !== product)
      : [...profile.products, product];
    setProfile({ ...profile, products });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[--penley-green]">Sales Profile</h2>
      <p className="text-black">Tell us about your expected usage</p>
      
      <div>
        <label className="block text-sm font-medium text-black mb-2">Products Needed *</label>
        <div className="space-y-2">
          {['Fuel', 'DEF', 'Lubricants', 'Additives', 'Other'].map((product) => (
            <label key={product} className="flex items-center">
              <input
                type="checkbox"
                checked={profile.products.includes(product)}
                onChange={() => toggleProduct(product)}
                className="w-4 h-4 text-[--penley-green] rounded focus:ring-[--penley-green]"
              />
              <span className="ml-2">{product}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">Estimated Monthly Gallons *</label>
        <input
          type="number"
          required
          min="0"
          value={profile.estimatedMonthlyGallons}
          onChange={(e) => setProfile({ ...profile, estimatedMonthlyGallons: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">Typical Delivery Cities *</label>
        <input
          type="text"
          required
          placeholder="e.g., Oklahoma City, Norman, Edmond"
          value={profile.typicalDeliveryCities}
          onChange={(e) => setProfile({ ...profile, typicalDeliveryCities: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green]"
        />
      </div>

      <label className="flex items-center">
        <input
          type="checkbox"
          checked={profile.taxExempt}
          onChange={(e) => setProfile({ ...profile, taxExempt: e.target.checked })}
          className="w-4 h-4 text-[--penley-green] rounded focus:ring-[--penley-green]"
        />
        <span className="ml-2 text-sm">Tax-Exempt Status</span>
      </label>
    </div>
  );
}
