'use client';

import Script from 'next/script';

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
  return (
    <div className={`${inline ? '' : 'bg-white p-8 rounded-lg shadow-lg'}`}>
      {!inline && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-800">{description}</p>
        </div>
      )}

      {/* GHL Form Embed */}
      <div style={{ minHeight: '939px' }}>
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/oz7Xh4PduNHE58F5SW99"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-oz7Xh4PduNHE58F5SW99"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Penley Website Form"
          data-height="939"
          data-layout-iframe-id="inline-oz7Xh4PduNHE58F5SW99"
          data-form-id="oz7Xh4PduNHE58F5SW99"
          title="Penley Website Form"
        />
      </div>

      {/* GHL Form Script */}
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
