// //services.js
// import axios from 'axios';

// // Configure axios defaults
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle 401 errors (Unauthorized)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       // Try to refresh token if refresh endpoint exists
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
//             refresh_token: refreshToken,
//           });
          
//           localStorage.setItem('token', data.access_token);
//           localStorage.setItem('refreshToken', data.refresh_token);
          
//           originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           // If refresh fails, logout user
//           localStorage.removeItem('token');
//           localStorage.removeItem('refreshToken');
//           window.location.href = '/login';
//           return Promise.reject(refreshError);
//         }
//       } else {
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Authentication APIs
// export const authAPI = {
//   login: (email, password) => 
//     api.post('/auth/login', { email, password }),
  
//   logout: () => 
//     api.post('/auth/logout'),
  
//   register: (userData) => 
//     api.post('/auth/register', userData),
  
//   forgotPassword: (email) => 
//     api.post('/auth/forgot-password', { email }),
  
//   resetPassword: (token, password) => 
//     api.post('/auth/reset-password', { token, password }),
  
//   getProfile: () => 
//     api.get('/auth/profile'),
  
//   updateProfile: (userData) => 
//     api.put('/auth/profile', userData),
// };

// // Alerts APIs
// export const alertsAPI = {
//   getLiveAlerts: (params = {}) => 
//     api.get('/alerts/live', { params }),
  
//   getAlertById: (id) => 
//     api.get(`/alerts/${id}`),
  
//   updateAlertStatus: (id, status) => 
//     api.patch(`/alerts/${id}/status`, { status }),
  
//   acknowledgeAlert: (id) => 
//     api.post(`/alerts/${id}/acknowledge`),
  
//   getAlertStatistics: (period = 'today') => 
//     api.get(`/alerts/statistics?period=${period}`),
// };

// // Violations APIs
// export const violationsAPI = {
//   getRecentViolations: (limit = 10, page = 1) => 
//     api.get('/violations/recent', { params: { limit, page } }),
  
//   getAllViolations: (filters = {}) => 
//     api.get('/violations', { params: filters }),
  
//   getViolationById: (id) => 
//     api.get(`/violations/${id}`),
  
//   createViolation: (violationData) => 
//     api.post('/violations', violationData),
  
//   updateViolation: (id, violationData) => 
//     api.put(`/violations/${id}`, violationData),
  
//   deleteViolation: (id) => 
//     api.delete(`/violations/${id}`),
  
//   getViolationTypes: () => 
//     api.get('/violations/types'),
  
//   getViolationStats: (startDate, endDate) => 
//     api.get('/violations/stats', { params: { startDate, endDate } }),
// };

// // Evidence APIs
// export const evidenceAPI = {
//   getAllEvidence: (filters = {}) => 
//     api.get('/evidence', { params: filters }),
  
//   getEvidenceById: (id) => 
//     api.get(`/evidence/${id}`),
  
//   getEvidenceByVehicleId: (vehicleId) => 
//     api.get(`/evidence/vehicle/${vehicleId}`),
  
//   uploadEvidence: (formData) => 
//     api.post('/evidence/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     }),
  
//   deleteEvidence: (id) => 
//     api.delete(`/evidence/${id}`),
  
//   updateEvidenceMetadata: (id, metadata) => 
//     api.patch(`/evidence/${id}/metadata`, metadata),
  
//   verifyEvidenceHash: (id, hash) => 
//     api.post(`/evidence/${id}/verify`, { hash }),
  
//   getEvidenceByViolationId: (violationId) => 
//     api.get(`/evidence/violation/${violationId}`),
// };

// // Reports APIs
// export const reportsAPI = {
//   getAllReports: () => 
//     api.get('/reports'),
  
//   getReportById: (id) => 
//     api.get(`/reports/${id}`),
  
//   generateReport: (reportConfig) => 
//     api.post('/reports/generate', reportConfig),
  
//   downloadReport: (id) => 
//     api.get(`/reports/${id}/download`, { responseType: 'blob' }),
  
//   deleteReport: (id) => 
//     api.delete(`/reports/${id}`),
  
//   getReportTemplates: () => 
//     api.get('/reports/templates'),
  
//   createReportTemplate: (template) => 
//     api.post('/reports/templates', template),
// };

// // Dashboard APIs
// export const dashboardAPI = {
//   getDashboardStats: () => 
//     api.get('/dashboard/stats'),
  
//   getActivityFeed: (limit = 10) => 
//     api.get('/dashboard/activity', { params: { limit } }),
  
//   getCameraStatus: () => 
//     api.get('/dashboard/cameras/status'),
  
//   getViolationTrends: (period = '7d') => 
//     api.get('/dashboard/trends', { params: { period } }),
// };

// // Camera APIs
// export const camerasAPI = {
//   getAllCameras: () => 
//     api.get('/cameras'),
  
//   getCameraById: (id) => 
//     api.get(`/cameras/${id}`),
  
//   updateCamera: (id, cameraData) => 
//     api.put(`/cameras/${id}`, cameraData),
  
//   getCameraFeed: (cameraId) => 
//     api.get(`/cameras/${cameraId}/feed`),
  
//   getCameraStatus: (cameraId) => 
//     api.get(`/cameras/${cameraId}/status`),
  
//   updateCameraSettings: (cameraId, settings) => 
//     api.patch(`/cameras/${cameraId}/settings`, settings),
// };

// // Settings APIs
// export const settingsAPI = {
//   getSystemSettings: () => 
//     api.get('/settings'),
  
//   updateSystemSettings: (settings) => 
//     api.put('/settings', settings),
  
//   getNotificationSettings: () => 
//     api.get('/settings/notifications'),
  
//   updateNotificationSettings: (settings) => 
//     api.put('/settings/notifications', settings),
  
//   getUserPreferences: () => 
//     api.get('/settings/preferences'),
  
//   updateUserPreferences: (preferences) => 
//     api.put('/settings/preferences', preferences),
// };

// // Real-time Event APIs
// export const eventsAPI = {
//   // For Server-Sent Events (SSE)
//   getEventSource: () => 
//     new EventSource(`${API_BASE_URL}/events`),
  
//   // For WebSocket connections (video streams)
//   getWebSocket: (vehicleId) => 
//     new WebSocket(`ws://${window.location.host}/stream/${vehicleId}`),
// };

// // Helper function for SSE connection
// export const setupSSEConnection = (onMessage, onError) => {
//   const eventSource = eventsAPI.getEventSource();
  
//   eventSource.onmessage = (event) => {
//     try {
//       const data = JSON.parse(event.data);
//       onMessage(data);
//     } catch (error) {
//       console.error('Error parsing SSE data:', error);
//     }
//   };
  
//   eventSource.onerror = (error) => {
//     console.error('SSE connection error:', error);
//     if (onError) onError(error);
//   };
  
//   return eventSource;
// };

// // Export all APIs
// export default {
//   auth: authAPI,
//   alerts: alertsAPI,
//   violations: violationsAPI,
//   evidence: evidenceAPI,
//   reports: reportsAPI,
//   dashboard: dashboardAPI,
//   cameras: camerasAPI,
//   settings: settingsAPI,
//   events: eventsAPI,
// };





//services/api.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      if(!window.location.pathname.includes('/login')){
        window.location.href = '/login';
      toast.error('Session expired. Please login again.');}
      
    }
    
    if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    }
    
    if (error.response?.status === 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// API Endpoints
export const API = {
  // Auth
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    refresh: (refreshToken) => api.post('/auth/refresh', { refresh_token: refreshToken }),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (data) => api.post('/auth/reset-password', data),
    getProfile: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/me', data),
  },

  // Alerts
  alerts: {
    getAll: (params) => api.get('/alerts', { params }),
    getLive: () => api.get('/alerts/live'),
    getById: (id) => api.get(`/alerts/${id}`),
    create: (data) => api.post('/alerts', data),
    update: (id, data) => api.put(`/alerts/${id}`, data),
    delete: (id) => api.delete(`/alerts/${id}`),
    acknowledge: (id) => api.post(`/alerts/${id}/acknowledge`),
    resolve: (id) => api.post(`/alerts/${id}/resolve`),
    stats: () => api.get('/alerts/stats'),
    export: (format) => api.get(`/alerts/export?format=${format}`, { responseType: 'blob' }),
  },

  // Violations
  violations: {
    getAll: (params) => api.get('/violations', { params }),
    getRecent: (limit = 10) => api.get(`/violations/recent?limit=${limit}`),
    getById: (id) => api.get(`/violations/${id}`),
    create: (data) => api.post('/violations', data),
    update: (id, data) => api.put(`/violations/${id}`, data),
    delete: (id) => api.delete(`/violations/${id}`),
    types: () => api.get('/violations/types'),
    stats: (params) => api.get('/violations/stats', { params }),
    trends: (period) => api.get(`/violations/trends?period=${period}`),
  },

  // Evidence
  evidence: {
    getAll: (params) => api.get('/evidence', { params }),
    getById: (id) => api.get(`/evidence/${id}`),
    getByVehicle: (vehicleId) => api.get(`/evidence/vehicle/${vehicleId}`),
    upload: (formData) => api.post('/evidence/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
    delete: (id) => api.delete(`/evidence/${id}`),
    verify: (id, hash) => api.post(`/evidence/${id}/verify`, { hash }),
    download: (id) => api.get(`/evidence/${id}/download`, { responseType: 'blob' }),
    metadata: (id, data) => api.patch(`/evidence/${id}/metadata`, data),
    search: (query) => api.get(`/evidence/search?q=${query}`),
    bulkDelete: (ids) => api.post('/evidence/bulk-delete', { ids }),
  },

  // Reports
  reports: {
    getAll: (params) => api.get('/reports', { params }),
    getById: (id) => api.get(`/reports/${id}`),
    generate: (data) => api.post('/reports/generate', data),
    download: (id) => api.get(`/reports/${id}/download`, { responseType: 'blob' }),
    delete: (id) => api.delete(`/reports/${id}`),
    templates: () => api.get('/reports/templates'),
    createTemplate: (data) => api.post('/reports/templates', data),
    stats: () => api.get('/reports/stats'),
  },

  // Cameras
  cameras: {
    getAll: () => api.get('/cameras'),
    getById: (id) => api.get(`/cameras/${id}`),
    create: (data) => api.post('/cameras', data),
    update: (id, data) => api.put(`/cameras/${id}`, data),
    delete: (id) => api.delete(`/cameras/${id}`),
    status: () => api.get('/cameras/status'),
    feed: (id) => api.get(`/cameras/${id}/feed`),
    restart: (id) => api.post(`/cameras/${id}/restart`),
    settings: (id, data) => api.patch(`/cameras/${id}/settings`, data),
  },

  // Dashboard
  dashboard: {
    stats: () => api.get('/dashboard/stats'),
    activity: (limit = 10) => api.get(`/dashboard/activity?limit=${limit}`),
    trends: (period) => api.get(`/dashboard/trends?period=${period}`),
    heatmap: () => api.get('/dashboard/heatmap'),
    performance: () => api.get('/dashboard/performance'),
  },

  // Settings
  settings: {
    get: () => api.get('/settings'),
    update: (data) => api.put('/settings', data),
    notifications: () => api.get('/settings/notifications'),
    updateNotifications: (data) => api.put('/settings/notifications', data),
    system: () => api.get('/settings/system'),
    updateSystem: (data) => api.put('/settings/system', data),
    users: () => api.get('/settings/users'),
    createUser: (data) => api.post('/settings/users', data),
    updateUser: (id, data) => api.put(`/settings/users/${id}`, data),
    deleteUser: (id) => api.delete(`/settings/users/${id}`),
  },

  // Real-time Events
  events: {
    stream: () => new EventSource(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/events`),
    websocket: (channel) => new WebSocket(
      `ws://${window.location.hostname}:8000/ws/${channel}`
    ),
  },

  // Utility
  utility: {
    health: () => api.get('/health'),
    version: () => api.get('/version'),
    logs: (params) => api.get('/logs', { params }),
  },
};

// File upload helper
export const uploadFile = async (file, onProgress = null) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
  });
};

// WebSocket service
export class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected', null);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit('message', data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected', null);
      this.reconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    };
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      setTimeout(() => this.connect(), 3000 * this.reconnectAttempts);
    }
  }

  send(data) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default API;