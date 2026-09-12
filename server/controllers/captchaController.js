const captchaService = require('../services/captchaService');
const Applicant = require('../models/Applicant');
const CaptchaAttempt = require('../models/CaptchaAttempt');

// POST /api/captcha/generate
exports.generateCaptcha = async (req, res) => {
  try {
    const { applicationId, forceType, gridSize, isDemoMode } = req.body;
    
    // Generate challenge using server-side service
    const challenge = captchaService.generateCaptcha({
      forceType,
      gridSize: gridSize || 9,
      isDemoMode: Boolean(isDemoMode)
    });

    res.json({
      success: true,
      captcha: challenge
    });
  } catch (err) {
    console.error('Error generating CAPTCHA:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/captcha/verify
exports.verifyCaptcha = async (req, res) => {
  try {
    const { captchaId, applicationId, userAnswer, captchaType, question } = req.body;

    if (!captchaId || !applicationId) {
      return res.status(400).json({
        success: false,
        message: 'captchaId and applicationId are required'
      });
    }

    // Server-side verification
    const result = captchaService.verifyCaptcha(captchaId, userAnswer);

    // Find applicant and update statistics in MongoDB
    let applicant = await Applicant.findOne({ applicationId });
    if (!applicant && applicationId.match(/^[0-9a-fA-F]{24}$/)) {
      applicant = await Applicant.findById(applicationId);
    }

    let attemptNumber = 1;
    if (applicant) {
      if (result.correct) {
        applicant.captchaCount += 1;
      } else {
        applicant.failedCaptchaCount += 1;
      }
      attemptNumber = applicant.captchaCount + applicant.failedCaptchaCount;
      await applicant.save();
    }

    // Save attempt log in MongoDB
    const attempt = new CaptchaAttempt({
      applicationId: applicant ? applicant.applicationId : applicationId,
      captchaType: captchaType || 'image',
      challenge: question || 'Human verification challenge',
      correct: result.correct,
      selectedAnswer: userAnswer,
      attemptNumber
    });
    await attempt.save();

    res.json({
      correct: result.correct,
      message: result.message,
      captchaCount: applicant ? applicant.captchaCount : attemptNumber,
      failedCaptchaCount: applicant ? applicant.failedCaptchaCount : 0
    });
  } catch (err) {
    console.error('Error verifying CAPTCHA:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/captcha/stats/:applicationId
exports.getCaptchaStats = async (req, res) => {
  try {
    const { applicationId } = req.params;

    let applicant = await Applicant.findOne({ applicationId });
    if (!applicant && applicationId.match(/^[0-9a-fA-F]{24}$/)) {
      applicant = await Applicant.findById(applicationId);
    }

    const attempts = await CaptchaAttempt.find({
      applicationId: applicant ? applicant.applicationId : applicationId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      captchaCount: applicant ? applicant.captchaCount : attempts.filter(a => a.correct).length,
      failedCaptchaCount: applicant ? applicant.failedCaptchaCount : attempts.filter(a => !a.correct).length,
      totalAttempts: attempts.length,
      attempts
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
