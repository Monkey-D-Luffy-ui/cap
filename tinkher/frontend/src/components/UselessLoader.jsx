import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function UselessLoader({ onComplete }) {
  const [phase, setPhase] = useState('analyzing'); // 'analyzing' -> 'incomplete'

  useEffect(() => {
    // Phase 1: Stuck at 99% for 1.8 seconds
    const t1 = setTimeout(() => {
      setPhase('incomplete');
    }, 1800);

    // Phase 2: Show "Analysis incomplete. Another verification required." then load next CAPTCHA
    const t2 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className="naep-card p-8 text-center space-y-5 border-2 border-blue-400 shadow-2xl bg-white animate-in zoom-in-95 duration-200">
      {phase === 'analyzing' ? (
        <div className="space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
          <h4 className="text-base font-bold text-slate-800">
            Analyzing your humanity...
          </h4>

          {/* 99% Useless Loading Bar */}
          <div className="space-y-1.5 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-mono font-bold text-blue-900">
              <span>PROGRESS</span>
              <span>99%</span>
            </div>
            <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
              <div className="h-full bg-blue-600 rounded-full w-[99%] animate-pulse" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-black text-amber-950">
              Analysis incomplete.
            </h4>
            <p className="text-sm font-bold text-red-600">
              Another verification required.
            </p>
          </div>
          <p className="text-xs text-slate-400 font-mono animate-pulse">
            Generating next security challenge...
          </p>
        </div>
      )}
    </div>
  );
}
