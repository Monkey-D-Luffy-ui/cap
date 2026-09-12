import React, { useState, useEffect } from 'react';
import { Bell, Info, X } from 'lucide-react';

const MESSAGES = [
  "Your result is still unavailable.",
  "We noticed that you're still here.",
  "This notification was unnecessary.",
  "Please continue waiting patiently.",
  "Your result has moved slightly further away."
];

export default function UselessNotificationToast({ captchaCount }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Show a random toast notification every 12 seconds or when captchaCount changes
    const timer = setInterval(() => {
      const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setToast(randomMsg);

      setTimeout(() => {
        setToast(null);
      }, 4000);
    }, 14000);

    return () => clearInterval(timer);
  }, [captchaCount]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900 text-white border border-slate-700 p-3.5 rounded-xl shadow-2xl max-w-xs flex items-center gap-3 relative">
        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
          <Bell className="w-4 h-4 animate-bounce" />
        </div>
        <div className="pr-4 space-y-0.5">
          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
            SYSTEM NOTIFICATION
          </span>
          <p className="text-xs font-semibold text-slate-200">{toast}</p>
        </div>
        <button
          onClick={() => setToast(null)}
          className="text-slate-500 hover:text-white p-1 absolute top-1.5 right-1.5"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
