// src/services/api.js
import axios from 'axios';

// Base API URL - update this based on your backend
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ==================== USER SERVICES ====================
export const userService = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getUserByEmail: (email) => api.get(`/users?email=${email}`)
};

// ==================== COACH SERVICES ====================
export const coachService = {
  getAllCoaches: () => api.get('/coaches'),
  getCoachById: (id) => api.get(`/coaches/${id}`),
  createCoach: (data) => api.post('/coaches', data),
  updateCoach: (id, data) => api.put(`/coaches/${id}`, data),
  deleteCoach: (id) => api.delete(`/coaches/${id}`)
};

// ==================== FACILITY SERVICES ====================
export const facilityService = {
  getAllFacilities: () => api.get('/facilities'),
  getFacilityById: (id) => api.get(`/facilities/${id}`),
  getAvailableFacilities: () => api.get('/facilities?availability=available'),
  createFacility: (data) => api.post('/facilities', data),
  updateFacility: (id, data) => api.put(`/facilities/${id}`, data),
  deleteFacility: (id) => api.delete(`/facilities/${id}`)
};

// ==================== BOOKING SERVICES ====================
export const bookingService = {
  getAllBookings: () => api.get('/bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  getUserBookings: (userId) => api.get(`/bookings?user_id=${userId}`),
  createBooking: (data) => api.post('/bookings', data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  approveBooking: (id) => api.put(`/bookings/${id}`, { status: 'approved' }),
  rejectBooking: (id) => api.put(`/bookings/${id}`, { status: 'rejected' }),
  deleteBooking: (id) => api.delete(`/bookings/${id}`)
};

// ==================== EVENT SERVICES ====================
export const eventService = {
  getAllEvents: () => api.get('/events'),
  getEventById: (id) => api.get(`/events/${id}`),
  getUpcomingEvents: () => api.get('/events?upcoming=true'),
  createEvent: (data) => api.post('/events', data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`)
};

// ==================== PARTICIPANT SERVICES ====================
export const participantService = {
  getAllParticipants: () => api.get('/participants'),
  getParticipantById: (id) => api.get(`/participants/${id}`),
  getUserParticipants: (userId) => api.get(`/participants?user_id=${userId}`),
  getEventParticipants: (eventId) => api.get(`/participants?event_id=${eventId}`),
  registerParticipant: (data) => api.post('/participants', data),
  updateParticipant: (id, data) => api.put(`/participants/${id}`, data),
  deleteParticipant: (id) => api.delete(`/participants/${id}`)
};

// ==================== ATTENDANCE SERVICES ====================
export const attendanceService = {
  getAllAttendance: () => api.get('/attendance'),
  getAttendanceById: (id) => api.get(`/attendance/${id}`),
  getUserAttendance: (userId) => api.get(`/attendance?user_id=${userId}`),
  getCoachAttendance: (coachId) => api.get(`/attendance?coach_id=${coachId}`),
  markAttendance: (data) => api.post('/attendance', data),
  updateAttendance: (id, data) => api.put(`/attendance/${id}`, data),
  deleteAttendance: (id) => api.delete(`/attendance/${id}`)
};

// ==================== FITNESS PROGRESS SERVICES ====================
// Note: You need to add these endpoints in your backend
export const fitnessService = {
  getAllProgress: (userId) => api.get(`/fitness-progress?user_id=${userId}`),
  getProgressById: (id) => api.get(`/fitness-progress/${id}`),
  addProgress: (data) => api.post('/fitness-progress', data),
  updateProgress: (id, data) => api.put(`/fitness-progress/${id}`, data),
  deleteProgress: (id) => api.delete(`/fitness-progress/${id}`)
};

// ==================== TRAINING SESSION SERVICES ====================
// Note: You need to add these endpoints in your backend
export const trainingService = {
  getAllSessions: () => api.get('/training-sessions'),
  getSessionById: (id) => api.get(`/training-sessions/${id}`),
  getCoachSessions: (coachId) => api.get(`/training-sessions?coach_id=${coachId}`),
  createSession: (data) => api.post('/training-sessions', data),
  updateSession: (id, data) => api.put(`/training-sessions/${id}`, data),
  deleteSession: (id) => api.delete(`/training-sessions/${id}`)
};

// ==================== REPORT SERVICES ====================
export const reportService = {
  getFacilityUsageReport: (startDate, endDate) => 
    api.get(`/reports/facility-usage?start=${startDate}&end=${endDate}`),
  getParticipationReport: (startDate, endDate) => 
    api.get(`/reports/participation?start=${startDate}&end=${endDate}`),
  getAttendanceReport: (coachId, startDate, endDate) => 
    api.get(`/reports/attendance?coach_id=${coachId}&start=${startDate}&end=${endDate}`),
  getEventReport: (eventId) => 
    api.get(`/reports/event/${eventId}`)
};

export default api;