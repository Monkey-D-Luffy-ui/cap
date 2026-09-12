import React from 'react';
import { BookOpen } from 'lucide-react';

export default function ExamDetails({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="naep-card p-6 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Step 3: Examination Preferences
        </h3>
        <p className="text-xs text-slate-500">Select target examination paper and test center preferences</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Examination *</label>
          <input
            type="text"
            required
            value={formData.examination}
            onChange={(e) => updateFormData('examination', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
            readOnly
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Mode *</label>
          <select
            value={formData.examType}
            onChange={(e) => updateFormData('examType', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Computer Based Test (CBT)">Computer Based Test (CBT)</option>
            <option value="Proctored Online Exam">Proctored Online Exam</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Exam Centre *</label>
          <select
            value={formData.preferredCentre}
            onChange={(e) => updateFormData('preferredCentre', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Delhi NCR - Zone A">Delhi NCR - Zone A</option>
            <option value="Mumbai Central - Zone B">Mumbai Central - Zone B</option>
            <option value="Bengaluru Tech Park - Zone C">Bengaluru Tech Park - Zone C</option>
            <option value="Hyderabad Cyberabad - Zone D">Hyderabad Cyberabad - Zone D</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Specialization *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => updateFormData('subject', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Computer Science & Information Technology"
          />
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
          Proceed to Step 4 →
        </button>
      </div>
    </form>
  );
}
