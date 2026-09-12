import React, { useState, useEffect } from 'react';
import { Award, Clock, RefreshCw, CheckCircle2, AlertTriangle, ShieldX } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VerificationExpiredModal({ isOpen, onRestart }) {
  const [phase, setPhase] = useState('complete'); // 'complete' -> 'expired'

  useEffect(() => {
    if (isOpen) {
      setPhase('complete');
      // Fire celebratory confetti for completion
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

      // After 1.5 seconds, transition to 'expired' phase
      const timer = setTimeout(() => {
        setPhase('expired');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl border-4 border-slate-300 space-y-6 text-center animate-in zoom-in-95 duration-200">
        {/* PHASE 1: 🎉 HUMAN VERIFICATION COMPLETE (100%) */}
        {phase === 'complete' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg border-2 border-emerald-300">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-emerald-950 tracking-tight flex items-center justify-center gap-2">
                🎉 HUMAN VERIFICATION COMPLETE
              </h2>
              <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                NATIONAL EXAMINATION RESULTS PORTAL
              </p>
            </div>

            {/* 100% Progress Bar */}
            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Verification Progress</span>
                <span className="text-emerald-600 font-extrabold text-sm">100%</span>
              </div>
              <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <div className="h-full bg-emerald-500 rounded-full w-full animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Validating final human biometric signature...
              </p>
            </div>
          </div>
        ) : (
          /* PHASE 2: ⏰ VERIFICATION EXPIRED */
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-lg border-2 border-red-300">
              <Clock className="w-12 h-12 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-red-950 tracking-tight flex items-center justify-center gap-2">
                ⏰ VERIFICATION EXPIRED
              </h2>
              <span className="bg-red-100 text-red-800 text-xs font-mono font-black px-3.5 py-1 rounded-full border border-red-300 uppercase inline-flex items-center gap-1.5">
                <ShieldX className="w-4 h-4 text-red-600" />
                Verification Status: EXPIRED
              </span>
            </div>

            {/* Expired Message Box */}
            <div className="bg-red-50/80 border-2 border-red-200 p-5 rounded-2xl text-left space-y-2">
              <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Session Security Notice</span>
              </div>
              <p className="text-xs text-red-950 font-medium leading-relaxed">
                Your human verification was completed successfully, but the verification session expired before your result could be accessed.
              </p>
            </div>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-base uppercase tracking-wider"
            >
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              🔄 RESTART HUMAN VERIFICATION
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
