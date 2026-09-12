const Applicant = require('../models/Applicant');

// Create new examination application
exports.createApplication = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      collegeName,
      course,
      semester,
      rollNumber,
      examination,
      examType,
      preferredCentre,
      subject,
      photo,
      idProof
    } = req.body;

    const applicant = new Applicant({
      fullName: fullName || 'Rahul Sharma',
      dateOfBirth: dateOfBirth || '2002-05-14',
      gender: gender || 'Male',
      email: email || 'rahul.sharma@example.com',
      phone: phone || '+91 98765 43210',
      address: address || '123 Academic Block, Knowledge Park, New Delhi',
      collegeName: collegeName || 'National Institute of Technology',
      course: course || 'B.Tech Computer Science',
      semester: semester || '6th Semester',
      rollNumber: rollNumber || 'CS2023-8891',
      examination: examination || 'National Graduate Entrance Exam 2026',
      examType: examType || 'Computer Based Test (CBT)',
      preferredCentre: preferredCentre || 'Delhi NCR - Zone A',
      subject: subject || 'Computer Science & Information Technology',
      photo: photo || '',
      idProof: idProof || '',
      applicationStatus: 'VERIFICATION_IN_PROGRESS',
      verificationStatus: 'IN_PROGRESS'
    });

    await applicant.save();

    res.status(201).json({
      success: true,
      message: 'Application registered successfully. Verification required.',
      application: applicant
    });
  } catch (err) {
    console.error('Error creating application:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get application by ID or application_id
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    let applicant = await Applicant.findOne({ applicationId: id });
    if (!applicant && id.match(/^[0-9a-fA-F]{24}$/)) {
      applicant = await Applicant.findById(id);
    }

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Application record not found' });
    }

    res.json({ success: true, application: applicant });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update application
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findOneAndUpdate(
      { $or: [{ applicationId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
      { $set: req.body },
      { new: true }
    );

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({ success: true, application: applicant });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get status sidebar details
exports.getApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let applicant = await Applicant.findOne({ applicationId: id });
    if (!applicant && id.match(/^[0-9a-fA-F]{24}$/)) {
      applicant = await Applicant.findById(id);
    }

    if (!applicant) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.json({
      success: true,
      statusSidebar: {
        personalInfo: true,
        academicInfo: true,
        examInfo: true,
        documents: true,
        review: true,
        humanVerification: applicant.verificationStatus === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'FAILED',
        submission: 'LOCKED'
      },
      captchaCount: applicant.captchaCount,
      failedCaptchaCount: applicant.failedCaptchaCount
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
