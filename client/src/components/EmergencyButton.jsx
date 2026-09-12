import React, { useState } from 'react';
import { AlertOctagon, CheckCircle } from 'lucide-react';

export default function EmergencyButton({ onTrigger }) {
  const [showNotice, setShowNotice] = useState(false);

  const handleClick = () => {
    setShowNotice(true);
  };

  const handleConfirm = () => {
    setShowNotice(false);
    if (onTrigger) onTrigger();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:from-red-700 hover:to-amber-700 text-white font-black py-3 px-4 rounded-xl shadow-lg border-2 border-red-400 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-xs uppercase tracking-wider animate-pulse"
      >
        <AlertOctagon className="w-4 h-4" />
        🚨 SHOW MY RESULT NOW
      </button>

      {/* Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border-4 border-red-600 text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-300">
              <AlertOctagon className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest block">
                EMERGENCY PRIORITY UPDATE
              </span>
              <p className="text-sm font-bold text-slate-800 leading-snug">
                Emergency request received. Priority changed from <strong className="text-slate-900">NORMAL</strong> to <strong className="text-red-600 font-extrabold uppercase">EXTREMELY NORMAL</strong>.
              </p>
            </div>

            <p className="text-xs text-slate-500 font-mono">
              Redirecting back to mandatory human verification...
            </p>

            <button
              onClick={handleConfirm}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              RETURN TO VERIFICATION
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
