import React from 'react';
import { Lock, FileText } from 'lucide-react';

export default function FakeResultCard({ applicant }) {
  const regNo = applicant?.registerNumber || 'RECORD-REGISTERED';
  const studentName = applicant?.fullName || 'Candidate';

  return (
    <div className="naep-card p-5 space-y-4 border-2 border-slate-300 bg-slate-900 text-white shadow-xl relative overflow-hidden">
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h4 className="font-black text-sm text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            Candidate Mark Ledger
          </h4>
          <p className="text-[10px] font-mono text-slate-400 mt-0.5">NERP-OFFICIAL-SCORECARD</p>
        </div>
        <span className="bg-red-950 text-red-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-red-800 flex items-center gap-1">
          <Lock className="w-3 h-3" /> RESTRICTED
        </span>
      </div>

      <div className="space-y-2.5 font-mono text-xs">
        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400">Candidate:</span>
          <span className="font-bold text-amber-300">{studentName}</span>
        </div>

        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400">Register No:</span>
          <span className="font-bold text-blue-300">{regNo}</span>
        </div>

        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400">Marks:</span>
          <span className="font-extrabold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900">
            🔒 CLASSIFIED
          </span>
        </div>

        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400">CGPA:</span>
          <span className="font-extrabold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900">
            🔒 CLASSIFIED
          </span>
        </div>

        <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded border border-slate-800">
          <span className="text-slate-400">Result:</span>
          <span className="font-extrabold text-red-500 bg-red-950 px-2 py-0.5 rounded border border-red-800">
            🔒 LOCKED
          </span>
        </div>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg text-[11px] text-slate-400 border border-slate-800">
        <span className="font-bold text-amber-400 block mb-0.5">Disclosure Restriction:</span>
        <p className="italic text-slate-300">"The system still isn't sure you're human."</p>
      </div>
    </div>
  );
}
