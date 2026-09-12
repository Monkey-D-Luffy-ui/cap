import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { applicationApi, captchaApi } from '../services/api';
import ProgressTracker from '../components/ProgressTracker';
import ApplicationStatus from '../components/ApplicationStatus';
import CaptchaContainer from '../components/CaptchaContainer';
import SupportChat from '../components/SupportChat';
import GiveUpModal from '../components/GiveUpModal';
import EasterEggModal from '../components/EasterEggModal';
import SystemEventModal from '../components/SystemEventModal';
import SuspicionMeter from '../components/SuspicionMeter';
import PatienceScore from '../components/PatienceScore';
import UselessLoader from '../components/UselessLoader';
import AchievementToast from '../components/AchievementToast';
import CaptchaCourtModal from '../components/CaptchaCourtModal';
import TwistModal from '../components/TwistModal';
import FakeResultCard from '../components/FakeResultCard';
import ResultMetrics from '../components/ResultMetrics';
import AcademicBattery from '../components/AcademicBattery';
import AiAdvisor from '../components/AiAdvisor';
import UselessNotificationToast from '../components/UselessNotificationToast';
import EmergencyButton from '../components/EmergencyButton';
import FinalResultDashboard from '../components/FinalResultDashboard';
import VerificationExpiredModal from '../components/VerificationExpiredModal';
import FunnyMilestonePopup from '../components/FunnyMilestonePopup';
import { ShieldAlert, Frown } from 'lucide-react';
import confetti from 'canvas-confetti';

const FUNNY_MESSAGES = [
  { threshold: 1, text: "Easy." },
  { threshold: 3, text: "You are solving these suspiciously well." },
  { threshold: 5, text: "Your accuracy is becoming suspicious." },
  { threshold: 7, text: "The better you perform, the less we trust you." },
  { threshold: 9, text: "Final verification milestone reached." },
  { threshold: 10, text: "Human verification process 100% complete." }
];

export default function VerificationPage({ isDemoMode }) {
  const { applicationId } = useParams();

  const [applicant, setApplicant] = useState(null);
  const [captchaCount, setCaptchaCount] = useState(0);
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUselessLoader, setShowUselessLoader] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [funnyMessage, setFunnyMessage] = useState('');

  // Modals
  const [isGiveUpOpen, setIsGiveUpOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [isCourtOpen, setIsCourtOpen] = useState(false);
  const [isTwistOpen, setIsTwistOpen] = useState(false);
  const [isFinalDashboardOpen, setIsFinalDashboardOpen] = useState(false);
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);
  const [isFunnyPopupOpen, setIsFunnyPopupOpen] = useState(false);
  const [systemEvent, setSystemEvent] = useState(null);

  const fetchApplicationDetails = async () => {
    try {
      const res = await applicationApi.getById(applicationId);
      if (res.data && res.data.success) {
        setApplicant(res.data.application);
        setCaptchaCount(res.data.application.captchaCount || 0);
      }
    } catch (err) {
      console.error('Error fetching applicant:', err);
    }
  };

  const loadNewCaptcha = async (forceType) => {
    setLoading(true);
    setFeedback(null);
    setShowUselessLoader(false);
    try {
      const res = await captchaApi.generate({
        applicationId,
        forceType,
        isDemoMode
      });
      if (res.data && res.data.success) {
        setCaptcha(res.data.captcha);
      }
    } catch (err) {
      console.error('Error loading CAPTCHA:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationDetails();
    loadNewCaptcha();
  }, [applicationId]);

  // Evaluate escalating message and trigger funny popup at CAPTCHAs 2, 4, 6, 8, 10
  useEffect(() => {
    const matched = [...FUNNY_MESSAGES]
      .reverse()
      .find(m => captchaCount >= m.threshold);

    if (matched) {
      setFunnyMessage(matched.text);
    } else {
      setFunnyMessage("Verify that you are human to proceed.");
    }

    // Trigger Funny Milestone Popup at 2, 4, 6, 8, 10
    if ([2, 4, 6, 8, 10].includes(captchaCount)) {
      setIsFunnyPopupOpen(true);
    }
  }, [captchaCount]);

  // Handle Funny Popup Completion
  const handlePopupComplete = () => {
    setIsFunnyPopupOpen(false);
    if (captchaCount === 10) {
      // After CAPTCHA 10 popup finishes -> Trigger 100% completion & Expired Session modal
      setIsExpiredModalOpen(true);
    } else {
      setShowUselessLoader(true);
    }
  };

  // Handle Restart Human Verification
  const handleRestartVerification = () => {
    setCaptchaCount(0);
    setIsExpiredModalOpen(false);
    setIsFunnyPopupOpen(false);
    setIsCourtOpen(false);
    setIsTwistOpen(false);
    setIsFinalDashboardOpen(false);
    setFeedback(null);
    setShowUselessLoader(false);
    loadNewCaptcha();
  };

  // Handle verification submission
  const handleVerify = async (captchaId, userAnswer, captchaType, question) => {
    try {
      const res = await captchaApi.verify({
        captchaId,
        applicationId,
        userAnswer,
        captchaType,
        question
      });

      const data = res.data;
      if (data.correct) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
        const nextCount = captchaCount + 1;
        setCaptchaCount(nextCount);
        setFeedback({ correct: true, message: 'Verification successful!' });

        // If not a popup count, show standard useless loader
        if (![2, 4, 6, 8, 10].includes(nextCount)) {
          setShowUselessLoader(true);
        } else {
          setShowUselessLoader(false);
        }
      } else {
        setFeedback({ correct: false, message: 'Verification failed. Incorrect answer. Please try again.' });
      }
    } catch (err) {
      console.error('Error verifying CAPTCHA:', err);
      setFeedback({ correct: false, message: 'Network error verifying CAPTCHA.' });
    }
  };

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Toast Achievements & Useless System Notifications */}
      <AchievementToast captchaCount={captchaCount} />
      <UselessNotificationToast captchaCount={captchaCount} />

      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 space-y-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h2 className="text-xl font-black flex items-center gap-2 text-white">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              🔐 Verify Before Viewing Result
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              CANDIDATE ID: <span className="text-blue-300 font-bold">{applicationId}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsGiveUpOpen(true)}
              className="text-xs bg-red-900/70 hover:bg-red-800 text-red-200 font-bold px-3.5 py-1.5 rounded-lg border border-red-700/60 flex items-center gap-1 transition-colors"
            >
              <Frown className="w-3.5 h-3.5" />
              Give Up
            </button>
          </div>
        </div>

        {/* Main Tagline Strip */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 text-blue-200 text-xs p-2.5 rounded-lg border border-blue-800/60 font-mono font-bold flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
            <span>“The better you prove you're human, the less we trust you.”</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase hidden sm:inline">NERP VERIFY.EXE v5.0</span>
        </div>
      </div>

      {/* Progress Tracker Banner */}
      <ProgressTracker captchaCount={captchaCount} />

      {/* Main Grid: Status Sidebar (Left) & CAPTCHA Engine (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Status Sidebar & Useless Widgets */}
        <div className="space-y-5">
          <ApplicationStatus applicant={applicant} captchaCount={captchaCount} />
          <ResultMetrics captchaCount={captchaCount} />
          <AcademicBattery captchaCount={captchaCount} />
          <AiAdvisor />
          <SuspicionMeter captchaCount={captchaCount} />
          <PatienceScore captchaCount={captchaCount} />
          <FakeResultCard applicant={applicant} />
          <EmergencyButton onTrigger={() => loadNewCaptcha()} />
        </div>

        {/* Right Column: Interactive Infinite CAPTCHA Engine or 99% Useless Loader */}
        <div className="lg:col-span-2 space-y-6">
          {showUselessLoader ? (
            <UselessLoader onComplete={loadNewCaptcha} />
          ) : (
            <CaptchaContainer
              captcha={captcha}
              loading={loading}
              onVerify={handleVerify}
              onRefresh={() => loadNewCaptcha()}
              feedback={feedback}
              funnyMessage={funnyMessage}
              captchaCount={captchaCount}
            />
          )}
        </div>
      </div>

      {/* Floating Fake Support Chat */}
      <SupportChat />

      {/* Give Up Modal */}
      <GiveUpModal
        isOpen={isGiveUpOpen}
        onClose={() => setIsGiveUpOpen(false)}
        captchaCount={captchaCount}
        applicationId={applicationId}
        onAbandonSuccess={handleRestartVerification}
      />

      {/* 100 CAPTCHA Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => {
          setIsEasterEggOpen(false);
          loadNewCaptcha();
        }}
      />

      {/* Humanity Tribunal Modal */}
      <CaptchaCourtModal
        isOpen={isCourtOpen}
        onClose={() => {
          setIsCourtOpen(false);
          loadNewCaptcha();
        }}
      />

      {/* Final Twist Modal */}
      <TwistModal
        isOpen={isTwistOpen}
        onClose={() => {
          setIsTwistOpen(false);
          loadNewCaptcha();
        }}
      />

      {/* Dramatic Final Useless Result Dashboard */}
      <FinalResultDashboard
        isOpen={isFinalDashboardOpen}
        onClose={() => {
          setIsFinalDashboardOpen(false);
          loadNewCaptcha();
        }}
        captchaCount={captchaCount}
      />

      {/* Funny Milestone Popup (Every 2 CAPTCHAs: 2, 4, 6, 8, 10) */}
      <FunnyMilestonePopup
        captchaCount={captchaCount}
        isOpen={isFunnyPopupOpen}
        onComplete={handlePopupComplete}
      />

      {/* EXACT 10 CAPTCHAs: 🎉 HUMAN VERIFICATION COMPLETE (100%) -> ⏰ VERIFICATION EXPIRED Modal */}
      <VerificationExpiredModal
        isOpen={isExpiredModalOpen}
        onRestart={handleRestartVerification}
      />

      {/* Random System Event Modal */}
      <SystemEventModal
        eventType={systemEvent}
        isOpen={Boolean(systemEvent)}
        onClose={() => setSystemEvent(null)}
      />
    </div>
  );
}
