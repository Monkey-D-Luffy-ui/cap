import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const applicationApi = {
  create: (data) => api.post('/applications', data),
  getById: (id) => api.get(`/applications/${id}`),
  update: (id, data) => api.put(`/applications/${id}`, data),
  getStatus: (id) => api.get(`/applications/${id}/status`)
};

export const captchaApi = {
  generate: (params) => api.post('/captcha/generate', params),
  verify: (payload) => api.post('/captcha/verify', payload),
  getStats: (applicationId) => api.get(`/captcha/stats/${applicationId}`)
};

export const analyticsApi = {
  getDashboardStats: () => api.get('/analytics/dashboard')
};

export const demoApi = {
  reset: (applicationId) => api.post('/demo/reset', { applicationId }),
  abandon: (applicationId) => api.post('/demo/abandon', { applicationId })
};

export default api;
