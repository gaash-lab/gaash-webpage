import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  withCredentials: true,
});

// Request interceptor to add auth token and CSRF token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = sessionStorage.getItem('csrfToken');
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      Cookies.remove('token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('Access denied. You do not have permission to perform this action.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
  forgotPassword: (data) => api.post('/auth/forgotpassword', data),
  resetPassword: (token, data) => api.put(`/auth/resetpassword/${token}`, data),
  getCSRFToken: () => api.get('/auth/csrf-token'),
  register: (data) => api.post('/auth/register', data),
};

// News API
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/news/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/news/${id}`),
  getStats: () => api.get('/news/stats'),
};

// Team API
export const teamAPI = {
  getAll: (params) => api.get('/team', { params }),
  getById: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/team/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/team/${id}`),
  reorder: (data) => api.put('/team/reorder', data),
  getStats: () => api.get('/team/stats'),
};

// Publications API
export const publicationsAPI = {
  getAll: (params) => api.get('/publications', { params }),
  getById: (id) => api.get(`/publications/${id}`),
  create: (data) => api.post('/publications', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/publications/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/publications/${id}`),
  getStats: () => api.get('/publications/stats'),
  getByYear: () => api.get('/publications/by-year'),
};

// Dashboard API
export const dashboardAPI = {
  getOverview: () => api.get('/dashboard/overview'),
  getSystemStats: () => api.get('/dashboard/system-stats'),
  getAuditLogs: (params) => api.get('/dashboard/audit-logs', { params }),
  exportData: (type) => api.get(`/dashboard/export/${type}`),
};

export default api;