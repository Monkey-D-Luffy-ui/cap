const mongoose = require('mongoose');

const captchaAttemptSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true },
    captchaType: {
      type: String,
      required: true,
      enum: ['image', 'vehicle', 'animal', 'object', 'number', 'math', 'multiple_choice', 'ridiculous']
    },
    challenge: { type: String, required: true },
    correct: { type: Boolean, required: true },
    selectedAnswer: { type: mongoose.Schema.Types.Mixed },
    attemptNumber: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CaptchaAttempt', captchaAttemptSchema);
