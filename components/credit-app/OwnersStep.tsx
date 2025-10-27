'use client';

import { useState, useEffect } from 'react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function OwnersStep({ data, updateData }: any) {
  const [owners, setOwners] = useState(
    data.owners?.owners || [
      {
        name: '',
        title: '',
        homeAddress: { street: '', city: '', state: 'OK', zip: '' },
        ownershipPercent: 0,
        phone: '',
        email: '',
        personalGuaranty: false,
        guarantyInitials: '',
        guarantySignature: '',
      },
    ]
  );

  useEffect(() => {
    updateData('owners', { owners });
  }, [owners]);

  const updateOwner = (index: number, field: string, value: any) => {
    const newOwners = [...owners];
    if (field.startsWith('homeAddress.')) {
      const addressField = field.split('.')[1];
      newOwners[index] = {
        ...newOwners[index],
        homeAddress: {
          ...newOwners[index].homeAddress,
          [addressField]: value,
        },
      };
    } else {
      newOwners[index] = { ...newOwners[index], [field]: value };
    }
    setOwners(newOwners);
  };

  const addOwner = () => {
    setOwners([
      ...owners,
      {
        name: '',
        title: '',
        homeAddress: { street: '', city: '', state: 'OK', zip: '' },
        ownershipPercent: 0,
        phone: '',
        email: '',
        personalGuaranty: false,
        guarantyInitials: '',
        guarantySignature: '',
      },
    ]);
  };

  const removeOwner = (index: number) => {
    if (owners.length > 1) {
      setOwners(owners.filter((_: any, i: number) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[--penley-green] mb-2">Owners & Principals</h2>
        <p className="text-black">
          Provide information about business owners, officers, or principals with 20%+ ownership.
        </p>
      </div>

      {owners.map((owner: any, index: number) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-black">
              Owner/Principal #{index + 1}
            </h3>
            {owners.length > 1 && (
              <button
                type="button"
                onClick={() => removeOwner(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>

          {/* Row 1: Name and Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={owner.name}
                onChange={(e) => updateOwner(index, 'name', e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={owner.title}
                onChange={(e) => updateOwner(index, 'title', e.target.value)}
                placeholder="Owner, President, CEO, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 2: Ownership % and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Ownership % *
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={owner.ownershipPercent || ''}
                onChange={(e) =>
                  updateOwner(index, 'ownershipPercent', parseFloat(e.target.value) || 0)
                }
                placeholder="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={owner.phone}
                onChange={(e) => updateOwner(index, 'phone', e.target.value)}
                placeholder="4051234567 or (405) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
              <p className="text-xs text-black mt-1">10 digits minimum</p>
            </div>
          </div>

          {/* Row 3: Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={owner.email}
              onChange={(e) => updateOwner(index, 'email', e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          {/* Home Address Section */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-black mb-3">Home Address</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={owner.homeAddress.street}
                  onChange={(e) => updateOwner(index, 'homeAddress.street', e.target.value)}
                  placeholder="123 Main St"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={owner.homeAddress.city}
                    onChange={(e) => updateOwner(index, 'homeAddress.city', e.target.value)}
                    placeholder="Oklahoma City"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    State *
                  </label>
                  <select
                    required
                    value={owner.homeAddress.state}
                    onChange={(e) => updateOwner(index, 'homeAddress.state', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
                  >
                    {US_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={owner.homeAddress.zip}
                    onChange={(e) => updateOwner(index, 'homeAddress.zip', e.target.value)}
                    placeholder="73102"
                    maxLength={10}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
                  />
                  <p className="text-xs text-black mt-1">5 or 9 digits (e.g., 73102 or 73102-1234)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Guaranty */}
          <div className="border-t pt-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={owner.personalGuaranty}
                onChange={(e) => updateOwner(index, 'personalGuaranty', e.target.checked)}
                className="mt-1 h-5 w-5 text-[--penley-green] border-gray-300 rounded focus:ring-[--penley-green]"
              />
              <div>
                <span className="text-sm font-medium text-black">
                  Personal Guaranty
                </span>
                <p className="text-xs text-black mt-1">
                  I agree to personally guarantee payment for goods and services provided by Penley Oil Company.
                </p>
              </div>
            </label>
          </div>
        </div>
      ))}

      {/* Add Another Owner Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={addOwner}
          className="px-6 py-2 bg-gray-200 text-black rounded-md font-medium hover:bg-gray-300 transition-colors"
        >
          + Add Another Owner/Principal
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-black">
          <strong>Note:</strong> List all owners, officers, or principals with 20% or more ownership interest.
        </p>
      </div>
    </div>
  );
}
