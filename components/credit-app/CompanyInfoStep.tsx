'use client';

import { useState, useEffect } from 'react';
import { type CompanyInfo } from '@/lib/credit-app-schema';

interface CompanyInfoStepProps {
  data: any;
  updateData: (step: string, data: any) => void;
}

export default function CompanyInfoStep({ data, updateData }: CompanyInfoStepProps) {
  const [formData, setFormData] = useState<Partial<CompanyInfo>>(
    data.companyInfo || {
      legalName: '',
      dba: '',
      entityType: 'LLC' as const,
      fein: '',
      yearsInBusiness: 0,
      billingAddress: {
        street: '',
        city: '',
        state: 'OK',
        zip: '',
      },
      apContact: {
        name: '',
        email: '',
        phone: '',
      },
      poRequired: false,
    }
  );

  useEffect(() => {
    updateData('companyInfo', formData);
  }, [formData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev as any)[parent], [field]: value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[--penley-green]">Company Information</h2>
        <p className="text-black mb-6">Tell us about your business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Legal Business Name *
          </label>
          <input
            type="text"
            required
            value={formData.legalName}
            onChange={(e) => handleChange('legalName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            DBA (If different)
          </label>
          <input
            type="text"
            value={formData.dba}
            onChange={(e) => handleChange('dba', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Entity Type *
          </label>
          <select
            required
            value={formData.entityType}
            onChange={(e) => handleChange('entityType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
          >
            <option value="Sole Proprietor">Sole Proprietor</option>
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Federal EIN *
          </label>
          <input
            type="text"
            required
            placeholder="XX-XXXXXXX"
            value={formData.fein}
            onChange={(e) => handleChange('fein', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Years in Business *
        </label>
        <input
          type="number"
          required
          min="0"
          value={formData.yearsInBusiness}
          onChange={(e) => handleChange('yearsInBusiness', parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">Billing Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              value={formData.billingAddress?.street}
              onChange={(e) => handleNestedChange('billingAddress', 'street', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">City *</label>
              <input
                type="text"
                required
                value={formData.billingAddress?.city}
                onChange={(e) => handleNestedChange('billingAddress', 'city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">State *</label>
              <input
                type="text"
                required
                maxLength={2}
                value={formData.billingAddress?.state}
                onChange={(e) => handleNestedChange('billingAddress', 'state', e.target.value.toUpperCase())}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">ZIP *</label>
              <input
                type="text"
                required
                value={formData.billingAddress?.zip}
                onChange={(e) => handleNestedChange('billingAddress', 'zip', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold mb-4">Accounts Payable Contact</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.apContact?.name}
              onChange={(e) => handleNestedChange('apContact', 'name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.apContact?.email}
              onChange={(e) => handleNestedChange('apContact', 'email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Phone *</label>
            <input
              type="tel"
              required
              value={formData.apContact?.phone}
              onChange={(e) => handleNestedChange('apContact', 'phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="poRequired"
          checked={formData.poRequired}
          onChange={(e) => handleChange('poRequired', e.target.checked)}
          className="w-4 h-4 text-[--penley-green] border-gray-300 rounded focus:ring-[--penley-green]"
        />
        <label htmlFor="poRequired" className="ml-2 text-sm text-black">
          Purchase Order (PO) required for all orders
        </label>
      </div>
    </div>
  );
}
