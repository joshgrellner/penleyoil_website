'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { trackCreditApp, trackCreditAppCompleted, track } from '@/lib/analytics'; // analytics: verified
import {
  companyInfoSchema,
  ownersSchema,
  bankReferenceSchema,
  tradeReferencesSchema,
  salesProfileSchema,
  agreementsSchema,
  type CreditApplication,
  type CompanyInfo,
  type Owner,
  type BankReference,
  type TradeReference,
  type SalesProfile,
  type Agreements,
} from '@/lib/credit-app-schema';
import CompanyInfoStep from './credit-app/CompanyInfoStep';
import OwnersStep from './credit-app/OwnersStep';
import BankReferenceStep from './credit-app/BankReferenceStep';
import TradeReferencesStep from './credit-app/TradeReferencesStep';
import SalesProfileStep from './credit-app/SalesProfileStep';
import FileUploadsStep from './credit-app/FileUploadsStep';
import AgreementsStep from './credit-app/AgreementsStep';
import ThankYouStep from './credit-app/ThankYouStep';

const STEPS = [
  { id: 1, name: 'Company Info', component: CompanyInfoStep },
  { id: 2, name: 'Owners/Principals', component: OwnersStep },
  { id: 3, name: 'Bank Reference', component: BankReferenceStep },
  { id: 4, name: 'Trade References', component: TradeReferencesStep },
  { id: 5, name: 'Sales Profile', component: SalesProfileStep },
  { id: 6, name: 'Documents', component: FileUploadsStep },
  { id: 7, name: 'Sign & Submit', component: AgreementsStep },
];

export default function CreditAppWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreditApplication>>({
    companyInfo: undefined,
    owners: undefined,
    bankReference: undefined,
    tradeReferences: undefined,
    salesProfile: undefined,
    agreements: undefined,
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    w9?: File;
    taxExemptionCert?: File;
    coi?: File;
    otherDocs?: File[];
  }>({});

  // analytics: verified - Track credit app start on mount
  useEffect(() => {
    trackCreditApp();
  }, []);

  const updateFormData = (step: keyof CreditApplication, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleNext = () => {
    // analytics: verified - Track progress event
    track('credit_app_step_completed', {
      step_number: currentStep,
      step_name: STEPS[currentStep - 1].name,
    });
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      // Validate all data
      const validatedData: CreditApplication = {
        companyInfo: companyInfoSchema.parse(formData.companyInfo),
        owners: ownersSchema.parse(formData.owners),
        bankReference: bankReferenceSchema.parse(formData.bankReference),
        tradeReferences: tradeReferencesSchema.parse(formData.tradeReferences),
        salesProfile: salesProfileSchema.parse(formData.salesProfile),
        agreements: agreementsSchema.parse(formData.agreements),
      };

      // Submit to API
      const formDataToSend = new FormData();
      formDataToSend.append('application', JSON.stringify(validatedData));

      if (uploadedFiles.w9) formDataToSend.append('w9', uploadedFiles.w9);
      if (uploadedFiles.taxExemptionCert) formDataToSend.append('taxExemptionCert', uploadedFiles.taxExemptionCert);
      if (uploadedFiles.coi) formDataToSend.append('coi', uploadedFiles.coi);
      if (uploadedFiles.otherDocs) {
        uploadedFiles.otherDocs.forEach((file, index) => {
          formDataToSend.append(`otherDoc${index}`, file);
        });
      }

      const response = await fetch('/api/credit-application/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      setSubmissionId(result.submissionId);
      setPdfUrl(result.pdfUrl);
      setIsSubmitted(true);

      // analytics: verified - Track completion event
      trackCreditAppCompleted();
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  if (isSubmitted) {
    return <ThankYouStep submissionId={submissionId} pdfUrl={pdfUrl} />;
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component;
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-[--penley-green] h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STEPS.map((step) => (
          <button
            key={step.id}
            onClick={() => step.id < currentStep && setCurrentStep(step.id)}
            disabled={step.id > currentStep}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              step.id === currentStep
                ? 'bg-[--penley-green] text-white'
                : step.id < currentStep
                ? 'bg-[--penley-green]/20 text-[--penley-green] hover:bg-[--penley-green]/30 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step.name}
          </button>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <CurrentStepComponent
          data={formData}
          updateData={updateFormData}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          ← Previous
        </button>

        {currentStep < STEPS.length ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[--penley-green] text-white rounded-md font-medium hover:bg-[--penley-green-dark] transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[--penley-gold] text-white rounded-md font-bold hover:bg-[--penley-gold-dark] transition-colors"
          >
            Submit Application
          </button>
        )}
      </div>

      {/* Save & Resume */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            // TODO: Implement save & resume via magic link
            alert('Save & Resume feature coming soon! Your progress is saved in your browser for now.');
          }}
          className="text-[--penley-green] hover:underline text-sm"
        >
          💾 Save & Resume Later
        </button>
      </div>
    </div>
  );
}
