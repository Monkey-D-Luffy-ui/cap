import React from 'react';
import { Zap, RefreshCw, BarChart2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { demoApi } from '../services/api';

export default function DemoBar({ isDemoMode, setIsDemoMode, currentAppId, onResetDemo }) {
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      if (currentAppId) {
        await demoApi.reset(currentAppId);
      }
      if (onResetDemo) {
        onResetDemo();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to reset demo:', err);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs py-2 px-4 shadow-md flex flex-wrap justify-between items-center gap-3 border-b border-amber-500">
      <div className="flex items-center gap-2 font-bold">
        <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
        <span>HACKATHON DEMO CONTROL BAR</span>
        <span className="bg-amber-950/40 text-amber-200 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-400/40">
          FOR JUDGES
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-4">
        {/* Toggle Demo Mode */}
        <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-amber-100">
          <input
            type="checkbox"
            checked={isDemoMode}
            onChange={(e) => setIsDemoMode(e.target.checked)}
            className="w-4 h-4 rounded text-amber-800 focus:ring-amber-400 cursor-pointer"
          />
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            Fast Demo Mode (Rapid Escalation)
          </span>
        </label>

        {/* Reset Demo Button */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-900 text-amber-200 hover:text-white px-3 py-1 rounded font-medium border border-amber-400/30 transition-all active:scale-95"
          title="Reset current applicant verification count for judge demo"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo Session
        </button>

        {/* Quick Admin Link */}
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1 bg-amber-950/60 hover:bg-amber-950 text-white px-3 py-1 rounded font-medium border border-amber-300/40 transition-all"
        >
          <BarChart2 className="w-3.5 h-3.5 text-amber-300" />
          Live Admin Stats
        </button>
      </div>
    </div>
  );
}
