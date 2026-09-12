import React, { useState } from 'react';
import { AlertTriangle, Flame, RefreshCw, XCircle } from 'lucide-react';
import { demoApi } from '../services/api';

export default function GiveUpModal({ isOpen, onClose, captchaCount, applicationId, onAbandonSuccess }) {
  const [abandoned, setAbandoned] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirmGiveUp = async () => {
    setLoading(true);
    try {
      if (applicationId) {
        await demoApi.abandon(applicationId);
      }
      setAbandoned(true);
    } catch (err) {
      console.error(err);
      setAbandoned(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setAbandoned(false);
    onClose();
    if (onAbandonSuccess) onAbandonSuccess();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
        {!abandoned ? (
          <>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                ⚠️ VERIFICATION ABANDONMENT
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You have completed <strong className="text-red-600 font-mono">{captchaCount} CAPTCHA challenges</strong>.
                If you leave now, all your verification progress will be permanently lost.
              </p>
            </div>

            <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center text-xs text-red-800 font-medium">
              Are you sure your humanity isn't worth just one more CAPTCHA?
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-amber-300" />
                STAY AND SUFFER
              </button>
              <button
                onClick={handleConfirmGiveUp}
                disabled={loading}
                className="flex-1 bg-slate-200 hover:bg-red-600 hover:text-white text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
              >
                GIVE UP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto animate-bounce">
              <XCircle className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-red-600">
                ❌ HUMAN VERIFICATION FAILED
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your commitment to giving up has been successfully verified. Our system has logged your weakness.
              </p>
            </div>

            <div className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[11px] font-mono text-center">
              STATUS: CANDIDATE DISQUALIFIED (ROBOT SUSPICION: 99.9%)
            </div>

            <button
              onClick={handleTryAgain}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              TRY AGAIN (RESTART VERIFICATION)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
