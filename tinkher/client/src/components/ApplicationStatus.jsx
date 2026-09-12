import React from 'react';
import { CheckCircle, RefreshCw, Lock, ShieldAlert, Award } from 'lucide-react';

export default function ApplicationStatus({ applicant, captchaCount }) {
  return (
    <div className="naep-card p-5 space-y-4 shadow-lg border border-slate-700">
      <div className="border-b border-slate-800 pb-3">
        <h4 className="font-extrabold text-sm text-slate-100 tracking-wider uppercase flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          Result Verification Status
        </h4>
        {applicant && (
          <p className="text-[11px] font-mono text-slate-400 mt-1">
            REGISTER NO: <span className="font-bold text-blue-300">{applicant.registerNumber || applicant.applicationId}</span>
          </p>
        )}
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
          <span className="text-slate-300">Register Number Verified</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Validated
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
          <span className="text-slate-300">Date of Birth Match</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Verified
          </span>
        </div>

        <div className="flex items-center justify-between p-2 rounded bg-slate-900/80 border border-slate-800">
          <span className="text-slate-300">Result Scorecard Availability</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Ready
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded bg-blue-950/80 border border-blue-800/80">
          <span className="text-blue-200 font-bold">CAPTCHAs completed</span>
          <span className="bg-blue-600 text-white font-mono font-extrabold px-2.5 py-0.5 rounded-full text-xs shadow-sm">
            {captchaCount}
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded bg-red-950/80 border border-red-800/80">
          <span className="text-red-200 font-extrabold">Result Access</span>
          <span className="text-red-400 font-black flex items-center gap-1 font-mono">
            <Lock className="w-4 h-4 text-red-400" /> 🔒 LOCKED
          </span>
        </div>
      </div>

      <div className="bg-slate-900/90 p-3 rounded-lg text-[11px] text-slate-300 border border-slate-800">
        <p className="font-bold text-slate-100 mb-0.5">Result Disclosure Notice:</p>
        Candidate mark disclosure remains electronically locked until 100% human verification is confirmed by the system.
      </div>
    </div>
  );
}
