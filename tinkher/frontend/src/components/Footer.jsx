import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-bold text-sm mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            National Academic Examination Portal (NAEP)
          </div>
          <p className="text-slate-500">
            Fictional examination registration system built for "Useless Project" Hackathon 2026.
          </p>
        </div>
        <div className="flex items-center gap-6 text-slate-400">
          <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-200 cursor-pointer">Terms of Verification</span>
          <span className="hover:text-slate-200 cursor-pointer flex items-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" /> Human Verification Engine v9.8.2
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/60 text-center text-slate-400 text-[11px]">
        © 2026 NAEP. Core Tagline: "You are human. We just don't believe you."
      </div>
    </footer>
  );
}
