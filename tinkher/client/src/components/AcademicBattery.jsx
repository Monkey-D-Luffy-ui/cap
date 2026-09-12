import React from 'react';
import { Battery, BatteryLow, AlertCircle, HeartPulse } from 'lucide-react';

export default function AcademicBattery({ captchaCount }) {
  // Battery decreases by ~5% per CAPTCHA, min 4%
  const energyPercent = Math.max(4, Math.round(100 - (captchaCount * 4.8)));

  let emotionalState = 'Calm';
  let emotionBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';

  if (captchaCount >= 19) {
    emotionalState = 'Regretting Life Choices';
    emotionBadge = 'bg-red-950 text-red-300 border-red-800 animate-pulse';
  } else if (captchaCount >= 13) {
    emotionalState = 'Frustrated';
    emotionBadge = 'bg-red-100 text-red-800 border-red-300';
  } else if (captchaCount >= 8) {
    emotionalState = 'Suspicious';
    emotionBadge = 'bg-amber-100 text-amber-900 border-amber-300';
  } else if (captchaCount >= 3) {
    emotionalState = 'Confused';
    emotionBadge = 'bg-blue-100 text-blue-800 border-blue-300';
  }

  const isLowEnergy = energyPercent <= 30;

  return (
    <div className="naep-card p-4 space-y-3 border border-slate-700 shadow-md">
      {/* Item 3: Academic Battery */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-200">
            {isLowEnergy ? (
              <BatteryLow className="w-4 h-4 text-red-400 animate-pulse" />
            ) : (
              <Battery className="w-4 h-4 text-emerald-400" />
            )}
            <span>Academic Energy: {energyPercent}%</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 font-bold">BATTERY-HEALTH</span>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLowEnergy ? 'bg-red-600 animate-pulse' : 'bg-emerald-500'
            }`}
            style={{ width: `${energyPercent}%` }}
          />
        </div>

        {isLowEnergy && (
          <div className="flex items-center gap-1.5 text-[11px] text-red-300 bg-red-950/80 p-2 rounded border border-red-800 font-bold mt-1">
            <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span>Your academic energy is critically low. Another verification is required.</span>
          </div>
        )}
      </div>

      {/* Item 4: Emotional State Detector */}
      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <HeartPulse className="w-4 h-4 text-rose-400" />
          <span>Emotional State</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${emotionBadge}`}>
          {emotionalState}
        </span>
      </div>
    </div>
  );
}
