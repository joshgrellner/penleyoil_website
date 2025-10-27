'use client';

import { useState } from 'react';
import { trackLeadSubmit, trackClickToCall } from '@/lib/analytics'; // analytics: verified

interface QuoteFormProps {
  inline?: boolean;
  title?: string;
  description?: string;
}

export default function QuoteForm({
  inline = false,
  title = "Schedule a Delivery",
  description = "Get a quote or schedule your fuel delivery today"
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    product: '',
    quantity: '',
    timeframe: '',
    message: '',
    privacyConsent: false,
    smsConsent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Prepare message with all details
      const detailedMessage = [
        formData.message,
        `\nDelivery Details:`,
        `- Location: ${formData.city}`,
        `- Product: ${formData.product}`,
        formData.quantity && `- Quantity: ${formData.quantity}`,
        `- Timeframe: ${formData.timeframe}`,
      ].filter(Boolean).join('\n');

      // Submit to API
      const response = await fetch('/api/quote/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || undefined,
          phone: formData.phone,
          company: formData.company || undefined,
          message: detailedMessage,
          service: formData.product,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      // analytics: verified - Track form submission
      trackLeadSubmit('quote-form', typeof window !== 'undefined' ? window.location.pathname : 'unknown');

      // Show success message
      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          city: '',
          product: '',
          quantity: '',
          timeframe: '',
          message: '',
          privacyConsent: false,
          smsConsent: false
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit request. Please call us at (405) 235-7553.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value
    });
  };

  if (submitted) {
    return (
      <div className={`${inline ? 'p-6' : 'p-8'} bg-green-50 border-2 border-green-500 rounded-lg text-center`}>
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We've received your request and will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className={`${inline ? '' : 'bg-white p-8 rounded-lg shadow-lg'}`}>
      {!inline && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-800">{description}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g., Oklahoma City"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Product Needed *
            </label>
            <select
              id="product"
              name="product"
              required
              value={formData.product}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            >
              <option value="">Select a product...</option>
              <option value="diesel-clear">Clear Diesel (On-Road)</option>
              <option value="diesel-dyed">Dyed Diesel (Off-Road)</option>
              <option value="gasoline">Gasoline</option>
              <option value="kerosene">Kerosene</option>
              <option value="def">DEF (Diesel Exhaust Fluid)</option>
              <option value="lubricants">Lubricants</option>
              <option value="tank-rental">Tank Rental</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Quantity
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., 500 gallons"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
              When do you need it? *
            </label>
            <select
              id="timeframe"
              name="timeframe"
              required
              value={formData.timeframe}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
            >
              <option value="">Select timeframe...</option>
              <option value="emergency">Emergency (ASAP)</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="next-week">Next Week</option>
              <option value="recurring">Recurring Delivery</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your needs..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green] focus:border-transparent"
          />
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="privacyConsent"
              name="privacyConsent"
              required
              checked={formData.privacyConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-[--penley-green] border-gray-300 rounded focus:ring-[--penley-green]"
            />
            <label htmlFor="privacyConsent" className="text-sm text-gray-700">
              <span className="font-medium">Privacy Policy & Terms Consent *</span>
              <br />
              I agree to the <a href="/privacy" target="_blank" className="text-[--penley-green] hover:underline">Privacy Policy</a> and <a href="/terms" target="_blank" className="text-[--penley-green] hover:underline">Terms of Service</a>. I consent to Penley Oil Company collecting and processing my information as described.
            </label>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="smsConsent"
              name="smsConsent"
              checked={formData.smsConsent}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-[--penley-green] border-gray-300 rounded focus:ring-[--penley-green]"
            />
            <label htmlFor="smsConsent" className="text-sm text-gray-700">
              <span className="font-medium">SMS/Text Message Consent (Optional)</span>
              <br />
              I consent to receive automated text messages from Penley Oil Company at the phone number provided, including delivery notifications and service updates. Message and data rates may apply. Reply STOP to opt out. Consent is not required for purchase. <span className="text-xs text-gray-800">(TCPA Compliant)</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[--penley-green] text-white px-6 py-3 rounded-md font-semibold hover:bg-[--penley-green-dark] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>

        <p className="text-xs text-gray-700 text-center">
          Or call us directly at <a
            href="tel:4052357553"
            className="text-[--penley-green] font-semibold"
            onClick={() => trackClickToCall('(405) 235-7553')} // analytics: verified
          >(405) 235-7553</a>
        </p>
      </form>
    </div>
  );
}
