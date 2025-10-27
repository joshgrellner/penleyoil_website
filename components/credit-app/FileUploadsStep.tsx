'use client';

export default function FileUploadsStep({ uploadedFiles, setUploadedFiles }: any) {
  const handleFileChange = (field: string, files: FileList | null) => {
    if (!files) return;
    if (field === 'otherDocs') {
      setUploadedFiles({ ...uploadedFiles, [field]: Array.from(files) });
    } else {
      setUploadedFiles({ ...uploadedFiles, [field]: files[0] });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[--penley-green]">Documents Upload</h2>
      <p className="text-black">Upload required documents (PDF, JPG, PNG - Max 10MB per file)</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">W-9 Form *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('w9', e.target.files)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Tax Exemption / Resale Certificate</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('taxExemptionCert', e.target.files)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Certificate of Insurance (COI)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('coi', e.target.files)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">Other Supporting Documents (Max 5 files)</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(e) => handleFileChange('otherDocs', e.target.files)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> All files are securely encrypted and stored. We only use your information for credit evaluation purposes.
        </p>
      </div>
    </div>
  );
}
