import React, { useEffect } from 'react';
import { Zap, Bot, Brain, Eye, Sparkles, Clock } from 'lucide-react';

const POPUP_DATA = {
  2: {
    icon: Zap,
    iconColor: 'text-amber-500 bg-amber-100 border-amber-300',
    title: "⚡ You're typing too fast!",
    subtext: "Are you really human? 🤨",
    borderColor: 'border-amber-400'
  },
  4: {
    icon: Bot,
    iconColor: 'text-blue-500 bg-blue-100 border-blue-300',
    title: "🤖 Suspiciously fast!",
    subtext: "Even humans need time to think.",
    borderColor: 'border-blue-400'
  },
  6: {
    icon: Brain,
    iconColor: 'text-purple-500 bg-purple-100 border-purple-300',
    title: "🧠 Your accuracy is getting suspicious.",
    subtext: "Please try being less perfect.",
    borderColor: 'border-purple-400'
  },
  8: {
    icon: Eye,
    iconColor: 'text-red-500 bg-red-100 border-red-300',
    title: "👀 We're watching your clicking pattern.",
    subtext: "Something feels suspicious...",
    borderColor: 'border-red-400'
  },
  10: {
    icon: Sparkles,
    iconColor: 'text-emerald-500 bg-emerald-100 border-emerald-300',
    title: "🎉 WOW! You actually completed all 10!",
    subtext: "Unfortunately, your verification session has expired. ⏰",
    borderColor: 'border-emerald-400'
  }
};

export default function FunnyMilestonePopup({ captchaCount, isOpen, onComplete }) {
  const data = POPUP_DATA[captchaCount];

  useEffect(() => {
    if (isOpen && data) {
      // Auto-dismiss after 2.5 seconds (2500ms)
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, captchaCount, onComplete, data]);

  if (!isOpen || !data) return null;

  const IconComponent = data.icon;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className={`bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 ${data.borderColor} text-center space-y-4 animate-in zoom-in-95 duration-200`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md border-2 ${data.iconColor}`}>
          <IconComponent className="w-9 h-9 animate-bounce" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            {data.title}
          </h3>
          <p className="text-sm font-semibold text-slate-600 leading-normal">
            {data.subtext}
          </p>
        </div>

        {/* Micro progress indicator showing auto-dismissing bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-out fade-out fill-mode-forwards"
            style={{
              animation: 'progressCountdown 2.5s linear forwards'
            }}
          />
        </div>

        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
          AUTOMATICALLY PROCEEDING IN 2.5S...
        </span>
      </div>

      <style>{`
        @keyframes progressCountdown {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
