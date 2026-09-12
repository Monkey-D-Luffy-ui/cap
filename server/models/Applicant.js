const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      unique: true,
      required: true,
      default: () => 'NAEP-' + Math.floor(10000 + Math.random() * 90000)
    },
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },

    collegeName: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    rollNumber: { type: String, required: true },

    examination: { type: String, required: true },
    examType: { type: String, required: true },
    preferredCentre: { type: String, required: true },
    subject: { type: String, required: true },

    photo: { type: String, default: '' },
    idProof: { type: String, default: '' },

    applicationStatus: {
      type: String,
      enum: ['DRAFT', 'DETAILS_COMPLETED', 'REVIEW', 'VERIFICATION_IN_PROGRESS', 'NEVER_SUBMITTED'],
      default: 'VERIFICATION_IN_PROGRESS'
    },
    verificationStatus: {
      type: String,
      enum: ['IN_PROGRESS', 'LOCKED'],
      default: 'IN_PROGRESS'
    },

    captchaCount: { type: Number, default: 0 },
    failedCaptchaCount: { type: Number, default: 0 },
    isAbandoned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Applicant', applicantSchema);
