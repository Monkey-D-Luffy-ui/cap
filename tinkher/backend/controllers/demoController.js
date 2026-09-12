const Applicant = require('../models/Applicant');

// POST /api/demo/reset
exports.resetDemo = async (req, res) => {
  try {
    const { applicationId } = req.body;

    if (applicationId) {
      const applicant = await Applicant.findOne({ applicationId });
      if (applicant) {
        applicant.captchaCount = 0;
        applicant.failedCaptchaCount = 0;
        applicant.isAbandoned = false;
        applicant.verificationStatus = 'IN_PROGRESS';
        await applicant.save();
      }
    }

    res.json({
      success: true,
      message: 'Demo session reset successfully. Verification state cleared.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/demo/abandon
exports.abandonApplication = async (req, res) => {
  try {
    const { applicationId } = req.body;

    let applicant = await Applicant.findOne({ applicationId });
    if (!applicant && applicationId && applicationId.match(/^[0-9a-fA-F]{24}$/)) {
      applicant = await Applicant.findById(applicationId);
    }

    if (applicant) {
      applicant.isAbandoned = true;
      applicant.verificationStatus = 'LOCKED';
      await applicant.save();
    }

    res.json({
      success: true,
      message: 'HUMAN VERIFICATION FAILED: Your commitment to giving up has been successfully verified.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
