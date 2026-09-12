import React, { useState } from 'react';
import { Bot, HelpCircle, X } from 'lucide-react';

export default function AiAdvisor() {
  const [showWhyModal, setShowWhyModal] = useState(false);

  return (
    <div className="naep-card p-4 space-y-2.5 border border-indigo-700/60 bg-indigo-950/40 shadow-md relative">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5 font-bold text-indigo-200">
          <Bot className="w-4 h-4 text-indigo-400 animate-bounce" />
          <span>Fake AI Advisor</span>
        </div>
        <span className="text-[10px] font-mono bg-indigo-900/80 text-indigo-200 font-bold px-2 py-0.5 rounded border border-indigo-700 uppercase">
          LLM-v0.0.1
        </span>
      </div>

      <div className="bg-slate-900/90 p-3 rounded-lg border border-indigo-900/60 text-xs space-y-2">
        <p className="font-extrabold text-slate-200 flex items-center justify-between">
          <span>AI Recommendation:</span>
          <span className="text-indigo-300 font-mono">Continue trying.</span>
        </p>

        <button
          onClick={() => setShowWhyModal(true)}
          className="text-[11px] text-indigo-300 hover:text-indigo-200 font-bold underline flex items-center gap-1 transition-colors"
        >
          <HelpCircle className="w-3 h-3" />
          Why?
        </button>
      </div>

      {/* "Why?" Modal */}
      {showWhyModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xs w-full p-6 shadow-2xl border-4 border-indigo-600 text-center space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <Bot className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">AI Explanation</h4>
              <p className="text-2xl font-black text-indigo-900 tracking-tight">
                Because.
              </p>
            </div>
            <button
              onClick={() => setShowWhyModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase"
            >
              UNDERSTOOD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
