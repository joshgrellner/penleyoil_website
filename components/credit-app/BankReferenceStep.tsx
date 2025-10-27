'use client';

import { useState, useEffect } from 'react';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function BankReferenceStep({ data, updateData }: any) {
  const [bankRef, setBankRef] = useState(
    data.bankReference || {
      bankName: '',
      contactName: '',
      phone: '',
      city: '',
      state: 'OK',
      accountNumberLast4: '',
    }
  );

  useEffect(() => {
    updateData('bankReference', bankRef);
  }, [bankRef]);

  const updateField = (field: string, value: any) => {
    setBankRef({ ...bankRef, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[--penley-green] mb-2">Bank Reference</h2>
        <p className="text-black">Provide your primary business banking information</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        {/* Row 1: Bank Name and Contact Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Bank Name *
            </label>
            <input
              type="text"
              required
              value={bankRef.bankName}
              onChange={(e) => updateField('bankName', e.target.value)}
              placeholder="First National Bank"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Contact Name *
            </label>
            <input
              type="text"
              required
              value={bankRef.contactName}
              onChange={(e) => updateField('contactName', e.target.value)}
              placeholder="Business Banker Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>
        </div>

        {/* Row 2: Phone and Account Last 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Bank Phone *
            </label>
            <input
              type="tel"
              required
              value={bankRef.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="4051234567 or (405) 123-4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
            <p className="text-xs text-black mt-1">10 digits minimum</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Account Number (Last 4 Digits) *
            </label>
            <input
              type="text"
              required
              value={bankRef.accountNumberLast4}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  updateField('accountNumberLast4', value);
                }
              }}
              placeholder="1234"
              maxLength={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
            <p className="text-xs text-black mt-1">For verification purposes only</p>
          </div>
        </div>

        {/* Row 3: City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={bankRef.city}
              onChange={(e) => updateField('city', e.target.value)}
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
              value={bankRef.state}
              onChange={(e) => updateField('state', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            >
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-black">
          <strong>Privacy Note:</strong> Your banking information is used only for credit verification and will be kept confidential.
        </p>
      </div>
    </div>
  );
}
