import React, { useState, useEffect } from 'react';
import { Smile } from 'lucide-react';

export default function PatienceScore({ captchaCount }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Score decreases over time and captcha attempts, floor at 12
  const score = Math.max(12, Math.round(98 - (elapsedSeconds / 6) - (captchaCount * 2)));

  let desc = 'Surprisingly patient.';
  let descColor = 'text-emerald-300 bg-emerald-950/80 border-emerald-800';

  if (score < 30) {
    desc = 'Please touch grass.';
    descColor = 'text-purple-300 bg-purple-950/80 border-purple-800';
  } else if (score < 60) {
    desc = 'Getting frustrated.';
    descColor = 'text-amber-300 bg-amber-950/80 border-amber-800';
  } else if (score < 90) {
    desc = 'Still functioning.';
    descColor = 'text-blue-300 bg-blue-950/80 border-blue-800';
  }

  return (
    <div className="naep-card p-4 space-y-2 border border-slate-700 shadow-md">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Smile className="w-4 h-4 text-indigo-400" />
          <span>PATiENCE SCORE: <strong className="font-mono text-indigo-300">{score}/100</strong></span>
        </div>
      </div>
      <div className={`text-[11px] p-2 rounded-lg border font-medium text-center ${descColor}`}>
        "{desc}"
      </div>
    </div>
  );
}
