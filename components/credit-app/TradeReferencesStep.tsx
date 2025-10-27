'use client';

import { useState, useEffect } from 'react';

export default function TradeReferencesStep({ data, updateData }: any) {
  const [refs, setRefs] = useState(
    data.tradeReferences?.references || [
      { companyName: '', contactName: '', email: '', phone: '' },
      { companyName: '', contactName: '', email: '', phone: '' },
      { companyName: '', contactName: '', email: '', phone: '' },
    ]
  );

  useEffect(() => {
    updateData('tradeReferences', { references: refs });
  }, [refs]);

  const updateReference = (index: number, field: string, value: string) => {
    const newRefs = [...refs];
    newRefs[index] = { ...newRefs[index], [field]: value };
    setRefs(newRefs);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[--penley-green] mb-2">Trade References</h2>
        <p className="text-black">
          Provide 3 business trade references (vendors or suppliers you currently do business with)
        </p>
      </div>

      {refs.map((ref: any, index: number) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-black">
            Reference #{index + 1}
          </h3>

          {/* Row 1: Company Name and Contact Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={ref.companyName}
                onChange={(e) => updateReference(index, 'companyName', e.target.value)}
                placeholder="ABC Supply Company"
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
                value={ref.contactName}
                onChange={(e) => updateReference(index, 'contactName', e.target.value)}
                placeholder="Account Manager Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 2: Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={ref.email}
                onChange={(e) => updateReference(index, 'email', e.target.value)}
                placeholder="contact@company.com"
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
                value={ref.phone}
                onChange={(e) => updateReference(index, 'phone', e.target.value)}
                placeholder="4051234567 or (405) 123-4567"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
              <p className="text-xs text-black mt-1">10 digits minimum</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-black">
          <strong>Note:</strong> Please ensure all contact information is accurate. We may contact these references during the credit review process.
        </p>
      </div>
    </div>
  );
}
