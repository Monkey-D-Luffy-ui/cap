import React, { useState, useEffect } from 'react';
import { Award, Sparkles, X } from 'lucide-react';

const ACHIEVEMENTS = [
  { count: 1, title: '🥉 First Victim', desc: 'You solved your first CAPTCHA. The trap is sprung.' },
  { count: 5, title: '🏅 CAPTCHA Survivor', desc: '5 CAPTCHAs completed. Hope is starting to fade.' },
  { count: 10, title: '🏆 Professional CAPTCHA Solver', desc: '10 CAPTCHAs solved. Add this to your resume.' },
  { count: 20, title: '💀 Still Here?', desc: '20 CAPTCHAs solved. Do you have nothing else to do?' },
  { count: 30, title: '👑 Why Are You Still Doing This?', desc: '30 CAPTCHAs. You deserve an award for useless dedication.' }
];

export default function AchievementToast({ captchaCount }) {
  const [currentAchievement, setCurrentAchievement] = useState(null);

  useEffect(() => {
    const found = ACHIEVEMENTS.find(a => a.count === captchaCount);
    if (found) {
      setCurrentAchievement(found);
      const timer = setTimeout(() => {
        setCurrentAchievement(null);
      }, 5000); // Dismiss after 5s
      return () => clearTimeout(timer);
    }
  }, [captchaCount]);

  if (!currentAchievement) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-slate-900 text-white border-2 border-amber-400 p-4 rounded-xl shadow-2xl max-w-sm flex items-start gap-3 relative">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-0.5 pr-4">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
            UNLOCKED USELESS ACHIEVEMENT
          </span>
          <h5 className="font-extrabold text-sm text-white">{currentAchievement.title}</h5>
          <p className="text-xs text-slate-300">{currentAchievement.desc}</p>
        </div>
        <button
          onClick={() => setCurrentAchievement(null)}
          className="text-slate-400 hover:text-white p-1 absolute top-2 right-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
