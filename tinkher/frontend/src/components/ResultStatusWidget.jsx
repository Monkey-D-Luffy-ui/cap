import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Activity, Brain } from 'lucide-react';

const STATUS_MESSAGES = [
  "🔍 Your result is being located...",
  "📚 Your result is reviewing your attendance...",
  "🤔 Your result is thinking about your marks...",
  "☕ Your result is taking a coffee break...",
  "🏃 Your result is running away...",
  "🗣️ Your result is discussing your future with the server...",
  "😴 Your result is currently sleeping...",
  "🧮 Your result is calculating your luck...",
  "🕵️ Your result is hiding from you...",
  "🚦 Your result is stuck in traffic...",
  "🧘 Your result is meditating...",
  "💻 Your result is arguing with the server...",
  "🎓 Your result is attending another exam...",
  "🏖️ Your result is currently on vacation...",
  "🔄 Your result is reconsidering its life choices..."
];

export default function ResultStatusWidget() {
  const [selectedSequence, setSelectedSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFound, setIsFound] = useState(false);
  const [fadeState, setFadeState] = useState('fade-in'); // 'fade-in' | 'fade-out'

  useEffect(() => {
    // Shuffle messages and select 5 random non-repeating messages on mount
    const shuffled = [...STATUS_MESSAGES].sort(() => 0.5 - Math.random());
    const sequence = shuffled.slice(0, 5);
    setSelectedSequence(sequence);
    setCurrentIndex(0);
    setIsFound(false);
  }, []);

  useEffect(() => {
    if (selectedSequence.length === 0 || isFound) return;

    // Change message every 3.5 seconds (3500ms) with smooth fade
    const timer = setInterval(() => {
      setFadeState('fade-out');

      setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev >= selectedSequence.length - 1) {
            clearInterval(timer);
            setIsFound(true);
            return prev;
          }
          setFadeState('fade-in');
          return prev + 1;
        });
      }, 400); // 400ms fade-out duration
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedSequence, isFound]);

  return (
    <div className="bg-slate-950/90 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-500/40 space-y-6 relative overflow-hidden my-4">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-400 animate-pulse" />
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
            🧠 WHAT IS YOUR RESULT DOING RIGHT NOW?
          </h2>
        </div>
        <div className="bg-blue-500/20 text-blue-300 text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          LIVE TELEMETRY
        </div>
      </div>

      {/* Main Content Area */}
      {!isFound ? (
        <div className="py-4 text-center space-y-4">
          <div className="min-h-[80px] flex items-center justify-center py-2">
            <p
              className={`text-xl sm:text-2xl font-black text-amber-300 tracking-wide transition-opacity duration-500 ${
                fadeState === 'fade-in' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {selectedSequence[currentIndex] || "🔍 Initializing result search..."}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <span>LIVE STATUS STEP {currentIndex + 1} OF {selectedSequence.length}</span>
            <span>•</span>
            <span className="animate-pulse">UPDATES EVERY 3.5S</span>
          </div>
        </div>
      ) : (
        /* FINAL FOUND STATE */
        <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              🎉 YOUR RESULT HAS BEEN FOUND!
            </h1>
            <p className="text-lg font-semibold text-emerald-400">
              We finally found it. 🎓
            </p>
          </div>

          {/* LARGE MAIN BUTTON: ✅ CHECK MY RESULT */}
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 uppercase tracking-wider w-full sm:w-auto"
            >
              <CheckCircle2 className="w-7 h-7 text-emerald-200" />
              ✅ CHECK MY RESULT
              <ArrowRight className="w-7 h-7" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
