import React from 'react';
import { Scale, XCircle, ArrowRight, Gavel } from 'lucide-react';

export default function CaptchaCourtModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-4 border-red-600 space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-red-950 text-red-500 border border-red-700 flex items-center justify-center mx-auto shadow-lg">
          <Gavel className="w-10 h-10 animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            ⚖️ HUMANITY TRIBUNAL
          </h2>
          <p className="text-xs text-red-400 font-mono font-bold uppercase tracking-widest">
            OFFICIAL SECURITY PROSECUTION
          </p>
        </div>

        {/* Evidence Card */}
        <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3 text-left">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            Evidence Against You
          </h4>
          <ul className="space-y-2 text-xs font-mono font-bold text-red-300">
            <li className="flex justify-between items-center bg-red-950/40 p-2 rounded border border-red-900/40">
              <span>Answered too quickly</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </li>
            <li className="flex justify-between items-center bg-red-950/40 p-2 rounded border border-red-900/40">
              <span>Accuracy too high</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </li>
            <li className="flex justify-between items-center bg-red-950/40 p-2 rounded border border-red-900/40">
              <span>Solved too many CAPTCHAs</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </li>
            <li className="flex justify-between items-center bg-red-950/40 p-2 rounded border border-red-900/40">
              <span>Refused to give up</span>
              <XCircle className="w-4 h-4 text-red-500" />
            </li>
          </ul>
        </div>

        {/* Verdict & Sentence */}
        <div className="space-y-2 bg-red-950/80 p-4 rounded-xl border border-red-800">
          <span className="text-[10px] font-mono text-red-300 uppercase font-bold tracking-widest block">
            VERDICT
          </span>
          <h3 className="text-2xl font-black text-amber-400 uppercase tracking-wider">
            SUSPICIOUSLY HUMAN
          </h3>
          <p className="text-xs text-slate-300 font-semibold pt-1 border-t border-red-900">
            Sentence: <strong className="text-white font-mono">One more CAPTCHA.</strong>
          </p>
        </div>

        {/* Accept Sentence Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-black py-4 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm uppercase tracking-wider"
        >
          ACCEPT SENTENCE
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
