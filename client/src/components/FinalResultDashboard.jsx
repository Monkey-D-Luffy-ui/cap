import React from 'react';
import { Lock, AlertTriangle, RefreshCw, Skull, Bot, CloudRain } from 'lucide-react';

export default function FinalResultDashboard({ isOpen, onClose, captchaCount }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border-4 border-red-600 space-y-6 my-auto animate-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-red-950 text-red-500 border-2 border-red-700 flex items-center justify-center mx-auto shadow-xl">
            <Skull className="w-10 h-10 animate-pulse" />
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">
            📊 OFFICIAL RESULT DASHBOARD
          </h2>
          <span className="bg-red-950 text-red-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-red-800 uppercase inline-block">
            NERP DECLASSIFIED AUDIT TERMINAL
          </span>
        </div>

        {/* Grid of Dramatic Useless Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">RESULT STATUS</span>
            <p className="text-base font-black text-red-500 flex items-center gap-1">
              <Lock className="w-4 h-4" /> CLASSIFIED
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Result Distance</span>
            <p className="text-base font-black text-blue-400">47.8 km away</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Queue Position</span>
            <p className="text-base font-black text-indigo-400">#3927</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Academic Energy</span>
            <p className="text-base font-black text-red-600">4% (CRITICAL)</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase">Emotional State</span>
            <p className="text-sm font-black text-amber-400">Regretting Everything</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase flex items-center gap-1">
              <Bot className="w-3.5 h-3.5 text-indigo-400" /> AI Recommendation
            </span>
            <p className="text-sm font-black text-indigo-300">Continue</p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5 font-bold">
            <CloudRain className="w-4 h-4 text-blue-400" /> Result Weather:
          </span>
          <span className="font-extrabold text-amber-400 uppercase">Heavy CAPTCHA</span>
        </div>

        {/* Estimated Result Availability: NEVER */}
        <div className="bg-red-950/80 border-2 border-red-700 p-4 rounded-2xl text-center space-y-1">
          <span className="text-[10px] font-mono text-red-300 uppercase font-bold tracking-widest block">
            ESTIMATED RESULT AVAILABILITY
          </span>
          <h3 className="text-3xl font-black text-white tracking-widest">
            NEVER
          </h3>
        </div>

        {/* TRY AGAIN Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
        >
          <RefreshCw className="w-4 h-4" />
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}
