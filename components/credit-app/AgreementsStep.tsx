'use client';

import { useState, useEffect, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function AgreementsStep({ data, updateData }: any) {
  const [agreements, setAgreements] = useState(data.agreements || {
    creditInquiryConsent: false,
    tcpaEmailConsent: false,
    smsConsent: false,
    privacyPolicyConsent: false,
    authorizedSignerName: '',
    authorizedSignerTitle: '',
    signature: '',
    signatureType: 'drawn'
  });
  const sigCanvas = useRef<any>(null);

  useEffect(() => {
    updateData('agreements', agreements);
  }, [agreements]);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setAgreements({ ...agreements, signature: '' });
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL();
      setAgreements({ ...agreements, signature: dataUrl, signatureType: 'drawn' });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[--penley-green]">Agreements & Signature</h2>
      <p className="text-black">Review and sign the credit application</p>

      <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
        <label className="flex items-start">
          <input
            type="checkbox"
            required
            checked={agreements.privacyPolicyConsent}
            onChange={(e) => setAgreements({ ...agreements, privacyPolicyConsent: e.target.checked })}
            className="w-4 h-4 mt-1 text-[--penley-green] rounded focus:ring-[--penley-green]"
          />
          <span className="ml-2 text-sm">
            <strong>Privacy Policy & Terms Consent:</strong> I agree to the <a href="/privacy" target="_blank" className="text-[--penley-green] hover:underline">Privacy Policy</a> and <a href="/terms" target="_blank" className="text-[--penley-green] hover:underline">Terms of Service</a>. I consent to Penley Oil Company collecting and processing my information as described. *
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            required
            checked={agreements.creditInquiryConsent}
            onChange={(e) => setAgreements({ ...agreements, creditInquiryConsent: e.target.checked })}
            className="w-4 h-4 mt-1 text-[--penley-green] rounded focus:ring-[--penley-green]"
          />
          <span className="ml-2 text-sm">
            <strong>Credit Inquiry Consent:</strong> I authorize Penley Oil Company to obtain credit reports and verify the information provided in this application. *
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            required
            checked={agreements.tcpaEmailConsent}
            onChange={(e) => setAgreements({ ...agreements, tcpaEmailConsent: e.target.checked })}
            className="w-4 h-4 mt-1 text-[--penley-green] rounded focus:ring-[--penley-green]"
          />
          <span className="ml-2 text-sm">
            <strong>Email & Phone Communication Consent:</strong> I consent to receive communications from Penley Oil Company via phone and email regarding my account, credit application status, and services. *
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            checked={agreements.smsConsent}
            onChange={(e) => setAgreements({ ...agreements, smsConsent: e.target.checked })}
            className="w-4 h-4 mt-1 text-[--penley-green] rounded focus:ring-[--penley-green]"
          />
          <span className="ml-2 text-sm">
            <strong>SMS/Text Message Consent (Optional):</strong> I consent to receive automated text messages from Penley Oil Company at the phone number provided, including delivery notifications, account updates, and service alerts. Message and data rates may apply. Reply STOP to opt out. Consent is not required for credit approval. <span className="text-xs text-black">(TCPA Compliant)</span>
          </span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">Authorized Signer Name *</label>
          <input
            type="text"
            required
            value={agreements.authorizedSignerName}
            onChange={(e) => setAgreements({ ...agreements, authorizedSignerName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Title *</label>
          <input
            type="text"
            required
            value={agreements.authorizedSignerTitle}
            onChange={(e) => setAgreements({ ...agreements, authorizedSignerTitle: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[--penley-green]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">Signature *</label>
        <div className="border-2 border-gray-300 rounded-md bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{ className: 'w-full h-48' }}
            onEnd={saveSignature}
          />
        </div>
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 text-sm text-[--penley-green] hover:underline"
        >
          Clear Signature
        </button>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
        <p className="text-sm text-yellow-800">
          <strong>Legal Notice:</strong> By signing this application, you certify that all information provided is true and accurate. You authorize Penley Oil Company to verify this information and conduct credit checks as necessary.
        </p>
      </div>
    </div>
  );
}
