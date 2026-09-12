import React from 'react';
import { Users, Navigation, CloudSun } from 'lucide-react';

export default function ResultMetrics({ captchaCount }) {
  // Queue position increases randomly with every CAPTCHA solved
  const queuePosition = 1842 + (captchaCount * 423) + (captchaCount > 0 ? (captchaCount % 7) * 118 : 0);

  // Result distance increases randomly with every CAPTCHA solved
  const distanceKm = (2.4 + (captchaCount * 6.3) + (captchaCount > 0 ? (captchaCount % 5) * 1.7 : 0)).toFixed(1);

  return (
    <div className="naep-card p-4 space-y-3 border border-slate-700 shadow-md">
      <h4 className="font-extrabold text-xs text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center gap-1.5">
        <Navigation className="w-4 h-4 text-blue-400" />
        Live Result Telemetry
      </h4>

      {/* Item 1: Useless Queue */}
      <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>Queue Position</span>
        </div>
        <span className="font-mono font-black text-indigo-300 text-sm">
          #{queuePosition}
        </span>
      </div>

      {/* Item 2: Result Distance */}
      <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Navigation className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Result Distance</span>
        </div>
        <span className="font-mono font-black text-blue-300 text-sm">
          {distanceKm} km away
        </span>
      </div>

      {/* Item 6: Result Weather */}
      <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-800 space-y-1.5 font-mono text-[11px]">
        <div className="flex justify-between items-center text-slate-300 font-bold border-b border-slate-800 pb-1">
          <span className="flex items-center gap-1 text-amber-400">
            <CloudSun className="w-3.5 h-3.5" /> Forecast:
          </span>
          <span className="text-amber-300 uppercase">Cloudy</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Chance of seeing result:</span>
          <span className="font-bold text-red-400">2%</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>CAPTCHA probability:</span>
          <span className="font-bold text-emerald-400">100%</span>
        </div>
      </div>
    </div>
  );
}
