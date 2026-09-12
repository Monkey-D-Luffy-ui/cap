import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileCheck, Award, Lock, AlertCircle } from 'lucide-react';
import ResultStatusWidget from '../components/ResultStatusWidget';

export default function LandingPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Announcement Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-400/30 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE: B.Tech, Degree & Diploma Results Released
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            National Examination Results Portal
          </h1>

          <p className="text-lg sm:text-xl text-blue-200 font-medium">
            Examination Results 2026
          </p>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Official portal for publishing national examination results, candidate marksheets, and digital grade cards. Enter your credentials to search and reveal your examination score.
          </p>

          {/* REPLACED SECTION: "🧠 WHAT IS YOUR RESULT DOING RIGHT NOW?" Live Ticker Section */}
          <div className="pt-2">
            <ResultStatusWidget />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
            <span className="font-mono">NERP Telemetry Registry</span>
            <Link
              to="/admin"
              className="text-blue-400 hover:text-blue-300 font-mono underline transition-colors"
            >
              Admin Audit Telemetry
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="naep-card p-6 space-y-3 border-t-4 border-t-blue-500 bg-slate-900/80">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Instant Result Lookup</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Search your examination score using your Register Number and Date of Birth.
          </p>
        </div>

        <div className="naep-card p-6 space-y-3 border-t-4 border-t-indigo-500 bg-slate-900/80">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Human Verification Required</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mandatory candidate identity verification prior to mark disclosure to prevent automated scraping.
          </p>
        </div>

        <div className="naep-card p-6 space-y-3 border-t-4 border-t-purple-500 bg-slate-900/80">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold border border-purple-500/30">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Verified Grade Cards</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Digital grade cards protected by 256-bit encryption and multi-factor security protocols.
          </p>
        </div>
      </div>

      {/* Official Notice Card */}
      <div className="bg-amber-950/50 border border-amber-500/40 rounded-2xl p-5 flex items-start gap-4 shadow-xl backdrop-blur-md">
        <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-200">
          <h4 className="font-bold text-amber-300 text-sm">IMPORTANT NOTICE FOR CANDIDATES</h4>
          <p className="leading-relaxed">
            Due to high server traffic, candidate result disclosure is subject to mandatory human security validation. Please ensure you complete the required security check to view your marks.
          </p>
        </div>
      </div>
    </div>
  );
}
