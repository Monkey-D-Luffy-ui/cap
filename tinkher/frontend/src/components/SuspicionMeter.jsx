import React from 'react';
import { Brain, AlertTriangle } from 'lucide-react';

export default function SuspicionMeter({ captchaCount }) {
  // Suspicion percentage starts at 15% and increases with each solved CAPTCHA up to 98%
  const suspicionPercent = Math.min(98, Math.round(15 + captchaCount * 3.8));

  let levelText = 'Probably Human';
  let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let barColor = 'bg-emerald-500';

  if (suspicionPercent >= 81) {
    levelText = 'Extremely Suspicious';
    badgeColor = 'bg-red-950 text-red-300 border-red-800';
    barColor = 'bg-red-600';
  } else if (suspicionPercent >= 61) {
    levelText = 'Highly Suspicious';
    badgeColor = 'bg-red-100 text-red-800 border-red-300';
    barColor = 'bg-red-500';
  } else if (suspicionPercent >= 31) {
    levelText = 'Slightly Suspicious';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    barColor = 'bg-amber-500';
  }

  return (
    <div className="naep-card p-4 space-y-2 border border-slate-700 shadow-md">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Human Suspicion: {suspicionPercent}%</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${badgeColor}`}>
          {levelText}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${suspicionPercent}%` }}
        />
      </div>
    </div>
  );
}
