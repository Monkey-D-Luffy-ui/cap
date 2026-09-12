import React from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function PersonalDetails({ formData, updateFormData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="naep-card p-6 space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Step 1: Personal Information
        </h3>
        <p className="text-xs text-slate-500">Provide official identity details as per government document</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="e.g. Rahul Sharma"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth *</label>
          <input
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="rahul.sharma@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="+91 98765 43210"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address *</label>
          <textarea
            rows="2"
            required
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="123 Academic Block, Knowledge Park, New Delhi"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow transition-colors"
        >
          Save & Proceed to Step 2 →
        </button>
      </div>
    </form>
  );
}
