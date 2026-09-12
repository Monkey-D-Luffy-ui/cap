import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, BarChart3, Lock, FileText } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      {/* Top Govt-Style Announcement Strip */}
      <div className="bg-slate-950 text-slate-400 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>National Examination Results Portal • Official Results System</span>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span>SERVER: NERP-PROD-DEL-04</span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Lock className="w-3 h-3 text-emerald-400" /> SSL 256-BIT ENCRYPTED
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center shadow-md border border-blue-400/30 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                NERP
              </h1>
              <span className="bg-blue-900/80 text-blue-300 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-blue-700">
                Official
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              National Examination Results Portal
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-1 sm:space-x-4">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Portal Home
          </Link>
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              location.pathname === '/admin'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Admin Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
