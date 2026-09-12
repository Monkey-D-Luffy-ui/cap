import React, { useState, useEffect } from 'react';
import { Radar, AlertTriangle, Compass, CheckCircle2, ArrowRight, Lock, ShieldAlert, MapPin } from 'lucide-react';

const DISTANCE_STEPS = ['2.4 km', '5.8 km', '17.3 km', '42.6 km'];
const MESSAGES = [
  "“Your result appears to be moving.”",
  "“Please remain calm.”",
  "“We recommend walking faster.”"
];

export default function ResultGpsModal({ isOpen, onProceed }) {
  const [stage, setStage] = useState('locating'); // 'locating' -> 'moved' -> 'lost' -> 'verification_required'
  const [checkCount, setCheckCount] = useState(0);
  const [distanceIndex, setDistanceIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showTrackButton, setShowTrackButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage('locating');
      setCheckCount(0);
      setDistanceIndex(0);
      setMessageIndex(0);
      setShowTrackButton(false);

      // --- STEP TIMELINE (~17.5 SECONDS TOTAL) ---
      // Step 1: 0.0s -> Locating header active
      
      // Step 2: 2.5s -> University Server - FOUND ✅
      const timer2 = setTimeout(() => setCheckCount(1), 2500);

      // Step 3: 5.0s -> Examination Database - FOUND ✅
      const timer3 = setTimeout(() => setCheckCount(2), 5000);

      // Step 4: 7.5s -> Your Result - FOUND ✅
      const timer4 = setTimeout(() => setCheckCount(3), 7500);

      // Step 5: 10.0s -> ⚠️ RESULT MOVED (2.4 km -> 5.8 km)
      const timer5 = setTimeout(() => {
        setStage('moved');
        setDistanceIndex(0);
        setMessageIndex(0);
      }, 10000);

      const timer5b = setTimeout(() => {
        setDistanceIndex(1);
        setMessageIndex(0);
      }, 11500);

      // Step 6: 12.5s -> Distance 17.3 km -> 42.6 km + Quotes
      const timer6a = setTimeout(() => {
        setDistanceIndex(2);
        setMessageIndex(1);
      }, 13000);

      const timer6b = setTimeout(() => {
        setDistanceIndex(3);
        setMessageIndex(2);
      }, 14500);

      // Step 7: 15.0s -> 🛰️ RESULT LOCATION LOST
      const timer7 = setTimeout(() => {
        setStage('lost');
      }, 16000);

      // Step 8: 17.5s -> Show 📍 TRACK MY RESULT button
      const timer8 = setTimeout(() => {
        setShowTrackButton(true);
      }, 17500);

      return () => {
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer5b);
        clearTimeout(timer6a);
        clearTimeout(timer6b);
        clearTimeout(timer7);
        clearTimeout(timer8);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-7 shadow-2xl border-4 border-slate-300 text-center space-y-6 animate-in zoom-in-95 duration-300 overflow-hidden relative">
        
        {/* STAGE 1: 📡 LOCATING YOUR RESULT... */}
        {stage === 'locating' && (
          <div className="space-y-5 animate-in fade-in duration-500">
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-md border-2 border-blue-300">
              <Radar className="w-11 h-11 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                📡 LOCATING YOUR RESULT...
              </h3>
              <p className="text-xs font-mono text-slate-500">NERP GEOSPATIAL RESULT TRACKER</p>
            </div>

            {/* Checklist with smooth fade transitions (2-3s intervals) */}
            <div className="bg-slate-950 text-white rounded-2xl p-4.5 space-y-3 font-mono text-xs text-left shadow-inner border border-slate-800">
              <div className="flex items-center justify-between">
                <span>University Server</span>
                <span className={checkCount >= 1 ? "text-emerald-400 font-bold flex items-center gap-1 transition-all duration-500 animate-in fade-in" : "text-slate-600"}>
                  {checkCount >= 1 ? "FOUND ✅" : "SEARCHING..."}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                <span>Examination Database</span>
                <span className={checkCount >= 2 ? "text-emerald-400 font-bold flex items-center gap-1 transition-all duration-500 animate-in fade-in" : "text-slate-600"}>
                  {checkCount >= 2 ? "FOUND ✅" : "SEARCHING..."}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                <span>Your Result</span>
                <span className={checkCount >= 3 ? "text-emerald-400 font-bold flex items-center gap-1 transition-all duration-500 animate-in fade-in" : "text-slate-600"}>
                  {checkCount >= 3 ? "FOUND ✅" : "SEARCHING..."}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: ⚠️ RESULT MOVED */}
        {stage === 'moved' && (
          <div className="space-y-5 animate-in fade-in duration-500">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md border-2 border-amber-300 animate-bounce">
              <AlertTriangle className="w-11 h-11" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-amber-950 tracking-tight">
                ⚠️ RESULT MOVED
              </h3>
              <p className="text-xs font-mono font-bold text-amber-700 uppercase">SERVER DRIFT DETECTED</p>
            </div>

            {/* Distance Display */}
            <div className="bg-amber-950 text-white rounded-2xl p-5 border-2 border-amber-500 shadow-lg space-y-2">
              <span className="text-xs text-amber-300 font-mono font-bold block uppercase tracking-wider flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                📍 Result Distance
              </span>
              <div className="text-4xl font-black text-amber-400 font-mono animate-pulse tracking-tight transition-all duration-500">
                {DISTANCE_STEPS[distanceIndex]}
              </div>
            </div>

            {/* Funny Messages */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl transition-all duration-500">
              <p className="text-xs text-amber-900 font-bold italic">
                {MESSAGES[messageIndex]}
              </p>
            </div>
          </div>
        )}

        {/* STAGE 3: 🛰️ RESULT LOCATION LOST */}
        {stage === 'lost' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-lg border-2 border-red-300">
              <Compass className="w-11 h-11 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                🛰️ RESULT LOCATION LOST
              </h3>
              <p className="text-xs text-red-800 font-medium bg-red-50 p-3 rounded-xl border border-red-200 leading-relaxed">
                Your result has temporarily left the server.
              </p>
            </div>

            {/* Action Button: 📍 TRACK MY RESULT (Appears after 17.5s) */}
            {showTrackButton ? (
              <button
                onClick={() => setStage('verification_required')}
                className="w-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-base uppercase tracking-wider animate-in fade-in duration-300"
              >
                <MapPin className="w-5 h-5 text-amber-200" />
                📍 TRACK MY RESULT
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <div className="text-[11px] font-mono text-slate-400 animate-pulse font-bold">
                CALCULATING TRAJECTORY...
              </div>
            )}
          </div>
        )}

        {/* STAGE 4: 🔐 HUMAN VERIFICATION REQUIRED */}
        {stage === 'verification_required' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-lg border-2 border-indigo-300">
              <ShieldAlert className="w-11 h-11" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
                🔐 HUMAN VERIFICATION REQUIRED
              </h3>
              <p className="text-xs text-slate-600 font-medium bg-slate-100 p-3.5 rounded-xl border border-slate-200 leading-relaxed text-left">
                You have to first complete the Human Verification before we can locate your result.
              </p>
            </div>

            {/* Final Button: 🔐 COMPLETE HUMAN VERIFICATION */}
            <button
              onClick={onProceed}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-base uppercase tracking-wider"
            >
              <Lock className="w-5 h-5 text-amber-300" />
              🔐 COMPLETE HUMAN VERIFICATION
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
