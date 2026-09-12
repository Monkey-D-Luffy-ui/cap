import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';

export default function CaptchaContainer({ captcha, loading, onVerify, onRefresh, feedback, funnyMessage, captchaCount }) {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Reset inputs when a new captcha challenge is loaded
    setSelectedTiles([]);
    setTextInput('');
    setSelectedChoice('');
    setSubmitting(false);
  }, [captcha?.captchaId]);

  if (loading || !captcha) {
    return (
      <div className="naep-card p-12 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-200">Generating Secure Verification Challenge...</p>
      </div>
    );
  }

  const toggleTile = (tileId) => {
    if (captcha.type === 'ridiculous') {
      setSelectedTiles([tileId]); // Single selection for ridiculous
    } else {
      setSelectedTiles(prev =>
        prev.includes(tileId)
          ? prev.filter(id => id !== tileId)
          : [...prev, tileId]
      );
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    let userAnswer;

    if (captcha.type === 'image' || captcha.type === 'ridiculous') {
      userAnswer = selectedTiles;
    } else if (captcha.type === 'number' || captcha.type === 'math') {
      userAnswer = textInput.trim();
    } else if (captcha.type === 'multiple_choice') {
      userAnswer = selectedChoice;
    }

    await onVerify(captcha.captchaId, userAnswer, captcha.type, captcha.question);
    setSubmitting(false);
  };

  return (
    <div className="naep-card p-6 space-y-5 border border-slate-700 shadow-xl relative overflow-hidden">
      {/* CAPTCHA Header */}
      <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center shadow border border-slate-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded">
              CHALLENGE #{captchaCount + 1}
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {captcha.captchaId?.substring(0, 14)}...</span>
          </div>
          <h3 className="text-base font-bold text-slate-100">{captcha.question}</h3>
        </div>

        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Refresh Challenge"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Escalating Funny Message Banner */}
      {funnyMessage && (
        <div className="bg-indigo-950/80 text-indigo-200 text-xs p-3 rounded-lg border border-indigo-800 font-medium flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{funnyMessage}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">System Insight</span>
        </div>
      )}

      {/* Verification Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-lg text-xs font-semibold flex items-center gap-2 border animate-in fade-in duration-150 ${
            feedback.correct
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-800'
              : 'bg-red-950/80 text-red-200 border-red-800'
          }`}
        >
          {feedback.correct ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleVerifySubmit} className="space-y-6">
        {/* Render Type 1: Image Grid or Ridiculous Grid */}
        {(captcha.type === 'image' || captcha.type === 'ridiculous') && captcha.tiles && (
          <div className={`grid gap-3 ${captcha.tiles.length > 4 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
            {captcha.tiles.map((tile) => {
              const isSelected = selectedTiles.includes(tile.tileId);
              return (
                <div
                  key={tile.tileId}
                  onClick={() => toggleTile(tile.tileId)}
                  className={`captcha-tile relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 bg-slate-900 flex items-center justify-center p-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-950/50 ring-4 ring-blue-500/30 shadow-md'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={tile.url}
                    alt={tile.label}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 right-1 text-[10px] bg-slate-950/90 text-slate-200 px-1 py-0.5 rounded text-center truncate">
                    {tile.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Render Type 2: Number CAPTCHA */}
        {captcha.type === 'number' && (
          <div className="space-y-4 text-center">
            <div className="bg-slate-950 text-white p-6 rounded-xl font-mono text-3xl sm:text-4xl tracking-widest font-extrabold select-none shadow-inner border border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <span className="relative z-10 transform -rotate-1 inline-block text-amber-400">
                {captcha.numberValue}
              </span>
            </div>
            <input
              type="text"
              required
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter numbers shown above..."
              className="w-full max-w-sm mx-auto block px-4 py-2.5 bg-slate-950 text-white border border-slate-700 rounded-xl text-center font-mono text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
            />
          </div>
        )}

        {/* Render Type 3: Math CAPTCHA */}
        {captcha.type === 'math' && (
          <div className="space-y-4 text-center">
            <div className="bg-blue-950 text-white p-6 rounded-xl font-mono text-2xl sm:text-3xl font-extrabold shadow-inner border border-blue-800">
              {captcha.expression} = ?
            </div>
            <input
              type="number"
              required
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Your answer..."
              className="w-full max-w-xs mx-auto block px-4 py-2.5 bg-slate-950 text-white border border-slate-700 rounded-xl text-center font-mono text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
            />
          </div>
        )}

        {/* Render Type 4: Multiple Choice CAPTCHA */}
        {captcha.type === 'multiple_choice' && captcha.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {captcha.options.map((opt, idx) => {
              const isSelected = selectedChoice === opt;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedChoice(opt)}
                  className={`p-4 rounded-xl border-2 font-semibold text-sm text-left transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-950/60 text-white shadow-md ring-2 ring-blue-500/30'
                      : 'border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border-2 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Verify Submit Button */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 font-mono">
            SECURED BY NAEP CAPTCHA ENGINE v4.2
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 hover:-translate-y-0.5 transition-all text-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying Answer...
              </>
            ) : (
              'Verify Answer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
