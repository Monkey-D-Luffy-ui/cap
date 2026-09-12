import { generateCaptcha, verifyCaptcha } from './captchaEngine';

const APPLICANTS_STORAGE_KEY = 'naep_applicants_db';
const ATTEMPTS_STORAGE_KEY = 'naep_attempts_db';

function getStoredApplicants() {
  try {
    const data = localStorage.getItem(APPLICANTS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

function saveStoredApplicants(applicants) {
  try {
    localStorage.setItem(APPLICANTS_STORAGE_KEY, JSON.stringify(applicants));
  } catch (e) {}
}

function getStoredAttempts() {
  try {
    const data = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveStoredAttempts(attempts) {
  try {
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
  } catch (e) {}
}

export const applicationApi = {
  create: async (data) => {
    const applicationId = 'APP_' + Math.random().toString(36).substring(2, 9).toUpperCase() + '_' + Date.now().toString().slice(-4);
    const applicant = {
      _id: applicationId,
      applicationId,
      fullName: data.fullName || 'Candidate',
      registerNumber: data.registerNumber || 'REG' + Math.floor(100000 + Math.random() * 900000),
      dob: data.dob || '2000-01-01',
      examType: data.examType || 'B.Tech',
      captchaCount: 0,
      failedCaptchaCount: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const applicants = getStoredApplicants();
    applicants[applicationId] = applicant;
    saveStoredApplicants(applicants);

    return { data: { success: true, application: applicant } };
  },

  getById: async (id) => {
    const applicants = getStoredApplicants();
    const applicant = applicants[id] || {
      _id: id,
      applicationId: id,
      fullName: 'Candidate',
      registerNumber: 'REG123456',
      dob: '2000-01-01',
      examType: 'B.Tech',
      captchaCount: 0,
      failedCaptchaCount: 0,
      status: 'pending'
    };
    return { data: { success: true, application: applicant } };
  },

  update: async (id, data) => {
    const applicants = getStoredApplicants();
    const applicant = applicants[id] || {
      _id: id,
      applicationId: id,
      captchaCount: 0,
      failedCaptchaCount: 0
    };
    Object.assign(applicant, data);
    applicants[id] = applicant;
    saveStoredApplicants(applicants);
    return { data: { success: true, application: applicant } };
  },

  getStatus: async (id) => {
    const applicants = getStoredApplicants();
    const applicant = applicants[id] || { captchaCount: 0, failedCaptchaCount: 0, status: 'pending' };
    return { data: { success: true, status: applicant.status, captchaCount: applicant.captchaCount, failedCaptchaCount: applicant.failedCaptchaCount } };
  }
};

export const captchaApi = {
  generate: async (params) => {
    const challenge = generateCaptcha(params || {});
    return { data: { success: true, captcha: challenge } };
  },

  verify: async (payload) => {
    const { captchaId, applicationId, userAnswer, captchaType, question } = payload;
    const result = verifyCaptcha(captchaId, userAnswer);

    const applicants = getStoredApplicants();
    let applicant = applicants[applicationId];
    if (!applicant) {
      applicant = {
        _id: applicationId,
        applicationId,
        captchaCount: 0,
        failedCaptchaCount: 0,
        status: 'pending'
      };
    }

    if (result.correct) {
      applicant.captchaCount += 1;
    } else {
      applicant.failedCaptchaCount += 1;
    }
    applicants[applicationId] = applicant;
    saveStoredApplicants(applicants);

    const attempts = getStoredAttempts();
    const newAttempt = {
      id: 'att_' + Date.now(),
      applicationId,
      captchaType: captchaType || 'image',
      challenge: question || 'Human verification challenge',
      correct: result.correct,
      selectedAnswer: userAnswer,
      attemptNumber: applicant.captchaCount + applicant.failedCaptchaCount,
      createdAt: new Date().toISOString()
    };
    attempts.unshift(newAttempt);
    saveStoredAttempts(attempts);

    return {
      data: {
        correct: result.correct,
        message: result.message,
        captchaCount: applicant.captchaCount,
        failedCaptchaCount: applicant.failedCaptchaCount
      }
    };
  },

  getStats: async (applicationId) => {
    const applicants = getStoredApplicants();
    const applicant = applicants[applicationId] || { captchaCount: 0, failedCaptchaCount: 0 };
    const attempts = getStoredAttempts().filter(a => a.applicationId === applicationId);

    return {
      data: {
        success: true,
        captchaCount: applicant.captchaCount,
        failedCaptchaCount: applicant.failedCaptchaCount,
        totalAttempts: attempts.length,
        attempts
      }
    };
  }
};

export const analyticsApi = {
  getDashboardStats: async () => {
    const applicants = Object.values(getStoredApplicants());
    const attempts = getStoredAttempts();

    const totalApplications = Math.max(applicants.length, 142);
    const totalCaptchasSolved = Math.max(attempts.filter(a => a.correct).length + applicants.reduce((acc, a) => acc + (a.captchaCount || 0), 0), 1284);
    const totalFailedCaptchas = Math.max(attempts.filter(a => !a.correct).length + applicants.reduce((acc, a) => acc + (a.failedCaptchaCount || 0), 0), 349);

    return {
      data: {
        success: true,
        stats: {
          totalApplications,
          totalCaptchasSolved,
          totalFailedCaptchas,
          activeSessionCount: 42,
          recentApplications: applicants.slice(-5)
        }
      }
    };
  }
};

export const demoApi = {
  reset: async (applicationId) => {
    const applicants = getStoredApplicants();
    if (applicants[applicationId]) {
      applicants[applicationId].captchaCount = 0;
      applicants[applicationId].failedCaptchaCount = 0;
      saveStoredApplicants(applicants);
    }
    return { data: { success: true, message: 'Demo reset successful' } };
  },

  abandon: async (applicationId) => {
    return { data: { success: true, message: 'Session abandoned' } };
  }
};

export default {
  applicationApi,
  captchaApi,
  analyticsApi,
  demoApi
};
