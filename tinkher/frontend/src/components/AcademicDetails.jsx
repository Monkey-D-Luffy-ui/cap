import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function AcademicDetails({ formData, updateFormData, onNext, onPrev }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="naep-card p-6 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Step 2: Academic Qualifications
        </h3>
        <p className="text-xs text-slate-500">Specify current institutional affiliation and roll details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">College / University Name *</label>
          <input
            type="text"
            required
            value={formData.collegeName}
            onChange={(e) => updateFormData('collegeName', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. National Institute of Technology"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Degree / Course *</label>
          <input
            type="text"
            required
            value={formData.course}
            onChange={(e) => updateFormData('course', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. B.Tech Computer Science"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Semester / Year *</label>
          <select
            value={formData.semester}
            onChange={(e) => updateFormData('semester', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="6th Semester">6th Semester</option>
            <option value="4th Semester">4th Semester</option>
            <option value="8th Semester">8th Semester</option>
            <option value="Graduated">Graduated / Passed Out</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Student Roll Number / Enrollment ID *</label>
          <input
            type="text"
            required
            value={formData.rollNumber}
            onChange={(e) => updateFormData('rollNumber', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="CS2023-8891"
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
          Proceed to Step 3 →
        </button>
      </div>
    </form>
  );
}
