import React from 'react';
import { UploadCloud, FileCheck } from 'lucide-react';

export default function DocumentUpload({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="naep-card p-6 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-blue-600" />
          Step 4: Document Upload
        </h3>
        <p className="text-xs text-slate-500">Upload passport photograph and identity proof (simulated upload)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center space-y-3 bg-slate-50/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800">Passport Photograph *</h4>
            <p className="text-xs text-slate-500 mt-1">JPEG/PNG format, max 2MB</p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <FileCheck className="w-4 h-4" />
            photo_applicant_2026.jpg (Attached)
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center space-y-3 bg-slate-50/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800">Government Photo ID Proof *</h4>
            <p className="text-xs text-slate-500 mt-1">PDF/JPEG format, max 5MB</p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <FileCheck className="w-4 h-4" />
            national_id_card.pdf (Attached)
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onPrev}
          className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow transition-colors"
        >
          Proceed to Final Review →
        </button>
      </div>
    </form>
  );
}
