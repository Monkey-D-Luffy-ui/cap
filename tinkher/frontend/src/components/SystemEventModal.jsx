import React from 'react';
import { AlertTriangle, Bot, Brain, ArrowRight } from 'lucide-react';

const EVENTS = {
  fast: {
    icon: AlertTriangle,
    iconColor: 'text-amber-600 bg-amber-100',
    title: '⚠️ You answered too quickly',
    message: 'Our machine-learning monitors detected inhuman speed. Please complete another verification.',
    buttonText: 'Acknowledge & Continue'
  },
  human: {
    icon: Bot,
    iconColor: 'text-blue-600 bg-blue-100',
    title: '🤖 Suspiciously human behavior detected',
    message: 'Your answer exhibited emotional nuance and hesitation. Additional verification required.',
    buttonText: 'Prove Humanity Again'
  },
  trust: {
    icon: Brain,
    iconColor: 'text-purple-600 bg-purple-100',
    title: '🧠 Our system is having difficulty trusting you',
    message: 'One more verification should solve this trust issue.',
    buttonText: 'Solve Trust Issue'
  }
};

export default function SystemEventModal({ eventType, isOpen, onClose }) {
  if (!isOpen || !eventType || !EVENTS[eventType]) return null;

  const event = EVENTS[eventType];
  const Icon = event.icon;

  return (
    <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 text-center animate-in zoom-in-95 duration-150">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${event.iconColor}`}>
          <Icon className="w-7 h-7 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {event.message}
          </p>
        </div>

        <div className="bg-slate-100 p-2.5 rounded-lg text-[11px] font-mono text-slate-600">
          EVENT_CODE: NAEP_ERR_TRUST_EVAL_CYCLE
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-lg flex items-center justify-center gap-2"
        >
          {event.buttonText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
