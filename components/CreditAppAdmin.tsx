'use client';

import { useState, useEffect } from 'react';
import type { CreditApplication } from '@/lib/credit-app-schema';

interface CreditApplicationRow {
  id: string;
  company_name: string;
  submitted_at: string;
  status: string;
  estimated_monthly_gallons: number;
  data: CreditApplication;
  files: any;
  internal_notes?: string;
  created_at: string;
}

export default function CreditAppAdmin() {
  const [applications, setApplications] = useState<CreditApplicationRow[]>([]);
  const [selectedApp, setSelectedApp] = useState<CreditApplicationRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password protection
  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'penley-admin-2025';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin-auth', 'true');
      fetchApplications();
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin-auth') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'penley-admin-2025';

    try {
      const response = await fetch('/api/admin/credit-applications', {
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const result = await response.json();
      setApplications(result.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('Error loading applications. Please try again.');
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'penley-admin-2025';

    try {
      const response = await fetch('/api/admin/credit-applications', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      fetchApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'penley-admin-2025';

    try {
      const response = await fetch('/api/admin/credit-applications', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, internal_notes: notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, internal_notes: notes });
      }
    } catch (error) {
      console.error('Error updating notes:', error);
      alert('Error updating notes');
    }
  };

  const exportCSV = () => {
    const headers = ['Company', 'Submitted', 'Status', 'Monthly Gallons', 'Products', 'Contact Email', 'Contact Phone'];
    const rows = applications.map(app => [
      app.company_name,
      new Date(app.submitted_at).toLocaleDateString(),
      app.status,
      app.estimated_monthly_gallons,
      app.data.salesProfile.products.join(', '),
      app.data.companyInfo.apContact.email,
      app.data.companyInfo.apContact.phone,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credit-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[--penley-green]">Admin Login</h1>
            <p className="text-gray-800 mt-2">Credit Applications Dashboard</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green]"
                placeholder="Enter admin password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-[--penley-green] text-white px-6 py-3 rounded-md font-semibold hover:bg-[--penley-green-dark]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-800">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[--penley-green]">Credit Applications</h1>
            <p className="text-gray-800 mt-1">{applications.length} total applications</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={exportCSV}
              className="bg-[--penley-gold] text-white px-6 py-2 rounded-md font-semibold hover:bg-[--penley-gold-dark]"
            >
              📊 Export CSV
            </button>
            <button
              onClick={fetchApplications}
              className="bg-gray-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Monthly Gallons
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{app.company_name}</div>
                    <div className="text-sm text-gray-700">{app.data.companyInfo.legalName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        app.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'Under Review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : app.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {app.estimated_monthly_gallons?.toLocaleString()} gal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="text-[--penley-green] hover:text-[--penley-green-dark]"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12 text-gray-700">
            <p className="text-lg">No credit applications yet</p>
            <p className="text-sm mt-2">Applications will appear here when submitted</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedApp.company_name}</h2>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-gray-700 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Update */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedApp.status}
                  onChange={(e) => updateStatus(selectedApp.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>

              {/* Company Info */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div>
                    <span className="font-medium">Legal Name:</span> {selectedApp.data.companyInfo.legalName}
                  </div>
                  <div>
                    <span className="font-medium">DBA:</span> {selectedApp.data.companyInfo.dba || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Entity Type:</span> {selectedApp.data.companyInfo.entityType}
                  </div>
                  <div>
                    <span className="font-medium">FEIN:</span> {selectedApp.data.companyInfo.fein}
                  </div>
                  <div>
                    <span className="font-medium">Years in Business:</span> {selectedApp.data.companyInfo.yearsInBusiness}
                  </div>
                  <div>
                    <span className="font-medium">PO Required:</span> {selectedApp.data.companyInfo.poRequired ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">AP Contact</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div>
                    <span className="font-medium">Name:</span> {selectedApp.data.companyInfo.apContact.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{' '}
                    <a href={`mailto:${selectedApp.data.companyInfo.apContact.email}`} className="text-blue-600">
                      {selectedApp.data.companyInfo.apContact.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{' '}
                    <a href={`tel:${selectedApp.data.companyInfo.apContact.phone}`} className="text-blue-600">
                      {selectedApp.data.companyInfo.apContact.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Billing Address</h3>
                <div className="text-sm text-black">
                  <div>{selectedApp.data.companyInfo.billingAddress.street}</div>
                  <div>
                    {selectedApp.data.companyInfo.billingAddress.city}, {selectedApp.data.companyInfo.billingAddress.state}{' '}
                    {selectedApp.data.companyInfo.billingAddress.zip}
                  </div>
                </div>
              </div>

              {/* Owners/Principals */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Owners & Principals</h3>
                {selectedApp.data.owners.owners.map((owner: any, idx: number) => (
                  <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-black">Owner #{idx + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                      <div>
                        <span className="font-medium">Name:</span> {owner.name}
                      </div>
                      <div>
                        <span className="font-medium">Title:</span> {owner.title}
                      </div>
                      <div>
                        <span className="font-medium">Ownership %:</span> {owner.ownershipPercent}%
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {owner.phone}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {owner.email}
                      </div>
                      <div>
                        <span className="font-medium">Personal Guaranty:</span> {owner.personalGuaranty ? 'Yes' : 'No'}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Home Address:</span> {owner.homeAddress.street},{' '}
                        {owner.homeAddress.city}, {owner.homeAddress.state} {owner.homeAddress.zip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Reference */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Bank Reference</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                  <div>
                    <span className="font-medium">Bank Name:</span> {selectedApp.data.bankReference.bankName}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {selectedApp.data.bankReference.contactName}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {selectedApp.data.bankReference.phone}
                  </div>
                  <div>
                    <span className="font-medium">Account Last 4:</span> {selectedApp.data.bankReference.accountNumberLast4}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {selectedApp.data.bankReference.city},{' '}
                    {selectedApp.data.bankReference.state}
                  </div>
                </div>
              </div>

              {/* Trade References */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Trade References</h3>
                {selectedApp.data.tradeReferences.references.map((ref: any, idx: number) => (
                  <div key={idx} className="mb-3 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-black">Reference #{idx + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-black">
                      <div>
                        <span className="font-medium">Company:</span> {ref.companyName}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {ref.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {ref.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {ref.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sales Profile */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Sales Profile</h3>
                <div className="text-sm space-y-2 text-black">
                  <div>
                    <span className="font-medium">Products:</span> {selectedApp.data.salesProfile.products.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Est. Monthly Gallons:</span>{' '}
                    {selectedApp.data.salesProfile.estimatedMonthlyGallons?.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Delivery Cities:</span> {selectedApp.data.salesProfile.typicalDeliveryCities}
                  </div>
                  <div>
                    <span className="font-medium">Tax Exempt:</span> {selectedApp.data.salesProfile.taxExempt ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Agreements & Signature */}
              <div>
                <h3 className="font-bold text-lg mb-2 text-black">Agreements & Signature</h3>
                <div className="text-sm space-y-2 text-black">
                  <div>
                    <span className="font-medium">Signer Name:</span> {selectedApp.data.agreements.authorizedSignerName}
                  </div>
                  <div>
                    <span className="font-medium">Signer Title:</span> {selectedApp.data.agreements.authorizedSignerTitle}
                  </div>
                  <div>
                    <span className="font-medium">Signed At:</span>{' '}
                    {selectedApp.data.agreements.timestamp
                      ? new Date(selectedApp.data.agreements.timestamp).toLocaleString()
                      : 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">IP Address:</span> {selectedApp.data.agreements.ipAddress || 'N/A'}
                  </div>
                  {selectedApp.data.agreements.signature && (
                    <div>
                      <span className="font-medium">Signature:</span>
                      <div className="mt-2 border border-gray-300 rounded p-2 bg-white">
                        <img
                          src={selectedApp.data.agreements.signature}
                          alt="Signature"
                          className="max-w-md h-24 object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
                <textarea
                  value={selectedApp.internal_notes || ''}
                  onChange={(e) => setSelectedApp({ ...selectedApp, internal_notes: e.target.value })}
                  onBlur={(e) => updateNotes(selectedApp.id, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Add internal notes..."
                />
              </div>

              {/* Files */}
              {selectedApp.files && Object.keys(selectedApp.files).length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-2 text-black">Uploaded Files</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedApp.files).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-blue-600">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
