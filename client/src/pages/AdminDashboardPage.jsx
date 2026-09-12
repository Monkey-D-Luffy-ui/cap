import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../services/api';
import {
  Users,
  CheckCircle,
  XCircle,
  HelpCircle,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Lock,
  UserX,
  PieChart as PieIcon,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea'];

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await analyticsApi.getDashboardStats();
      if (res.data && res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
      setError('Could not connect to MongoDB backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000); // Auto-refresh every 5s for live demo
    return () => clearInterval(interval);
  }, []);

  const stats = data?.stats || {
    totalApplications: 0,
    totalCaptchaAttempts: 0,
    successfulAttempts: 0,
    failedAttempts: 0,
    averageCaptchasPerApplicant: 0,
    applicationsSubmitted: 0,
    humansVerified: 0,
    purposeOfSystem: 'UNKNOWN',
    abandonedCount: 0,
    abandonmentRate: '0%'
  };

  const distribution = data?.captchaTypeDistribution || [];
  const applications = data?.recentApplications || [];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight">NERP Security Analytics & Admin Dashboard</h1>
            <span className="bg-indigo-900 text-indigo-300 text-xs font-mono px-2.5 py-0.5 rounded border border-indigo-700">
              LIVE MONGO DB AUDIT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time human verification attempt telemetry & system performance tracking
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* Top 8 Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Result Searches */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-blue-500 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Result Searches</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{stats.totalApplications}</p>
          <p className="text-[11px] text-slate-400">Candidates searching results in system</p>
        </div>

        {/* Card 2: Total CAPTCHA Attempts */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-indigo-500 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total CAPTCHA Attempts</span>
            <BarChart3 className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{stats.totalCaptchaAttempts}</p>
          <p className="text-[11px] text-slate-400">Solved challenges across all sessions</p>
        </div>

        {/* Card 3: Successful Attempts */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-emerald-500 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Successful CAPTCHAs</span>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">{stats.successfulAttempts}</p>
          <p className="text-[11px] text-slate-400">Correctly answered challenges</p>
        </div>

        {/* Card 4: Failed Attempts */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-amber-500 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Failed Attempts</span>
            <XCircle className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-mono">{stats.failedAttempts}</p>
          <p className="text-[11px] text-slate-400">Incorrect answers recorded</p>
        </div>

        {/* Card 5: Average CAPTCHAs per applicant */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-purple-500 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Avg CAPTCHAs / Candidate</span>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-purple-300 font-mono">{stats.averageCaptchasPerApplicant}</p>
          <p className="text-[11px] text-slate-400">Loop density index</p>
        </div>

        {/* Card 6: Applications Submitted (ALWAYS 0) */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-red-600 bg-red-950/40 border-red-900/60">
          <div className="flex justify-between items-center text-red-300">
            <span className="text-xs font-bold uppercase tracking-wider">Submitted Applications</span>
            <Lock className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-extrabold text-red-400 font-mono">0</p>
          <p className="text-[11px] text-red-300 font-semibold">🔒 Permanently Locked System</p>
        </div>

        {/* Card 7: Humans Verified (ALWAYS 0) */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-slate-600 bg-slate-900 text-white border-slate-800">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-xs font-bold uppercase tracking-wider">Humans Verified</span>
            <UserX className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-mono">0</p>
          <p className="text-[11px] text-slate-400">Zero human certainty achieved</p>
        </div>

        {/* Card 8: Purpose of System (UNKNOWN) */}
        <div className="naep-card p-5 space-y-2 border-l-4 border-l-amber-500 bg-amber-950/40 border-amber-900/60">
          <div className="flex justify-between items-center text-amber-300">
            <span className="text-xs font-bold uppercase tracking-wider">Purpose of System</span>
            <HelpCircle className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-300 font-mono uppercase">UNKNOWN</p>
          <p className="text-[11px] text-amber-200 font-semibold">Abandonment Rate: {stats.abandonmentRate}</p>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: CAPTCHA Type Distribution Bar Chart */}
        <div className="naep-card p-6 space-y-4 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                CAPTCHA Type Distribution
              </h3>
              <p className="text-xs text-slate-400">Breakdown of challenge categories issued by server</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CAPTCHA Distribution Pie Chart */}
        <div className="naep-card p-6 space-y-4 border-slate-800 bg-slate-900/90">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-indigo-400" />
                Challenge Category Share
              </h3>
              <p className="text-xs text-slate-400">Visual breakdown of generated challenge types</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Admin Application Table */}
      <div className="naep-card p-6 space-y-4 border-slate-800 bg-slate-900/90">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Live Registered Candidate Telemetry
            </h3>
            <p className="text-xs text-slate-400">Live applicant status from MongoDB database collection</p>
          </div>
          <span className="text-xs font-mono bg-slate-950 text-slate-300 px-3 py-1 rounded border border-slate-800 font-semibold">
            {applications.length} Records Shown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 uppercase tracking-wider">
                <th className="p-3">Application ID</th>
                <th className="p-3">Applicant Name</th>
                <th className="p-3">Examination Paper</th>
                <th className="p-3 text-center">CAPTCHAs Solved</th>
                <th className="p-3 text-center">Failed Attempts</th>
                <th className="p-3">Verification Status</th>
                <th className="p-3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-slate-400">
                    No applications registered yet. Start a new registration to view live data.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id || app.applicationId} className="hover:bg-slate-800/50 font-medium">
                    <td className="p-3 font-mono font-bold text-blue-400">{app.applicationId}</td>
                    <td className="p-3 font-bold text-white">{app.fullName}</td>
                    <td className="p-3 text-slate-300">{app.examination}</td>
                    <td className="p-3 text-center font-mono font-bold text-emerald-400">{app.captchaCount || 0}</td>
                    <td className="p-3 text-center font-mono text-amber-400">{app.failedCaptchaCount || 0}</td>
                    <td className="p-3">
                      <span className="bg-blue-950 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-800 uppercase">
                        VERIFICATION IN PROGRESS
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 font-mono text-[11px]">
                      {new Date(app.createdAt || Date.now()).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
