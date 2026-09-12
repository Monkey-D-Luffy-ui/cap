import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ProgressTracker({ captchaCount }) {
  // 10 CAPTCHA flow: 10% increment per solved CAPTCHA, cap at 100%
  const progressPercentage = Math.min(100, captchaCount * 10);
  const isComplete = captchaCount >= 10;

  return (
    <div className="naep-card p-5 space-y-4 border border-slate-700 shadow-xl">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <h3 className="font-extrabold text-white text-base flex items-center gap-2">
            🔐 Human Verification Status
          </h3>
          <p className="text-xs text-slate-300">
            Before revealing your examination result, please verify that you are human.
          </p>
        </div>
        <div className="flex gap-2 font-mono text-xs">
          <span className="bg-blue-950/80 text-blue-200 font-bold px-3 py-1 rounded-full border border-blue-800">
            CAPTCHAs Completed: {captchaCount} / 10
          </span>
          <span className="bg-amber-950/80 text-amber-200 font-bold px-3 py-1 rounded-full border border-amber-800">
            {isComplete ? '100% COMPLETE' : `Remaining: ${10 - captchaCount}`}
          </span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-300">Human Verification Progress</span>
          <span className="text-blue-400 font-mono font-bold">{progressPercentage}%</span>
        </div>

        <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {isComplete && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-950/80 px-3 py-1.5 rounded-md border border-emerald-800 animate-pulse mt-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">Human verification reached 100% completion!</span>
          </div>
        )}
      </div>
    </div>
  );
}
