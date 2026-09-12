import React, { useEffect } from 'react';
import { Award, Lock, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EasterEggModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-4 border-amber-400 space-y-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
          <Award className="w-10 h-10 animate-bounce" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            🎓 RESULT READY!
          </h2>
          <p className="text-xs text-slate-500 font-mono">NATIONAL EXAMINATION RESULTS PORTAL</p>
        </div>

        {/* Candidate & Result Card */}
        <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3 text-left font-mono text-sm shadow-inner border border-slate-800">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400">Candidate:</span>
            <span className="font-bold text-amber-300">Registered Candidate</span>
          </div>

          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400">Result Scorecard:</span>
            <span className="bg-red-950 text-red-400 font-extrabold px-3 py-1 rounded border border-red-800 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> 🔒 CLASSIFIED
            </span>
          </div>

          <div className="pt-1">
            <span className="text-xs text-slate-400 block mb-1">Reason:</span>
            <blockquote className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded border border-slate-800">
              "The system still isn't sure you're human."
            </blockquote>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-4 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm uppercase tracking-wider"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          TRY ONE MORE CAPTCHA
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
