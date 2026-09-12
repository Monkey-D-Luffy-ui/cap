import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TwistModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('verified'); // 'verified' -> 'rejected'

  useEffect(() => {
    if (isOpen) {
      setPhase('verified');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      // After 2 seconds, switch to REJECTED!
      const timer = setTimeout(() => {
        setPhase('rejected');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-4 border-slate-800 space-y-6 text-center animate-in zoom-in-95 duration-200">
        {phase === 'verified' ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-3xl font-black text-emerald-600 tracking-tight">
              🎉 HUMANITY VERIFIED!
            </h2>
            <p className="text-sm font-bold text-slate-800">
              Congratulations! You have successfully proven that you are human.
            </p>
            <div className="text-xs text-slate-400 font-mono animate-pulse pt-2">
              [Finalizing result scorecard disclosure...]
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-md">
              <XCircle className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-red-600 tracking-tight">
                ❌ VERIFICATION REJECTED
              </h2>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                Our verification system does not trust its own decision.
              </p>
            </div>

            <div className="bg-red-950 text-red-200 p-4 rounded-xl font-mono text-sm border border-red-800 flex items-center justify-between">
              <span className="text-xs text-red-300 font-semibold">STATUS</span>
              <span className="font-extrabold text-red-400 flex items-center gap-1">
                <Lock className="w-4 h-4" /> RESULT ACCESS: 🔒 LOCKED
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
            >
              VERIFY AGAIN
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
