const Applicant = require('../models/Applicant');
const CaptchaAttempt = require('../models/CaptchaAttempt');

// GET /api/analytics/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalApplications = await Applicant.countDocuments();
    const totalCaptchaAttempts = await CaptchaAttempt.countDocuments();
    const successfulAttempts = await CaptchaAttempt.countDocuments({ correct: true });
    const failedAttempts = await CaptchaAttempt.countDocuments({ correct: false });
    const abandonedCount = await Applicant.countDocuments({ isAbandoned: true });

    // Calculate average CAPTCHAs per applicant
    const avgCaptchas = totalApplications > 0
      ? (totalCaptchaAttempts / totalApplications).toFixed(1)
      : '0.0';

    // Calculate abandonment rate
    const abandonmentRate = totalApplications > 0
      ? ((abandonedCount / totalApplications) * 100).toFixed(1) + '%'
      : '0.0%';

    // CAPTCHA type distribution aggregation
    const typeDistribution = await CaptchaAttempt.aggregate([
      {
        $group: {
          _id: '$captchaType',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedDistribution = typeDistribution.map(item => ({
      name: (item._id || 'image').toUpperCase(),
      count: item.count
    }));

    // Fetch recent 10 applicants for dashboard table
    const recentApplications = await Applicant.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      stats: {
        totalApplications,
        totalCaptchaAttempts,
        successfulAttempts,
        failedAttempts,
        averageCaptchasPerApplicant: parseFloat(avgCaptchas),
        applicationsSubmitted: 0, // ALWAYS 0
        humansVerified: 0,       // ALWAYS 0
        purposeOfSystem: 'UNKNOWN',
        abandonedCount,
        abandonmentRate
      },
      captchaTypeDistribution: formattedDistribution.length > 0 ? formattedDistribution : [
        { name: 'IMAGE', count: successfulAttempts || 12 },
        { name: 'NUMBER', count: Math.floor(successfulAttempts * 0.3) || 5 },
        { name: 'MATH', count: Math.floor(successfulAttempts * 0.25) || 4 },
        { name: 'CHOICE', count: Math.floor(successfulAttempts * 0.2) || 3 },
        { name: 'RIDICULOUS', count: Math.floor(successfulAttempts * 0.25) || 4 }
      ],
      recentApplications
    });
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
