import axios from 'axios';
import keycloak from '../keycloak';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(async (config) => {
    // Ensure we have a token
    if (keycloak.token) {
        try {
            // Attempt to refresh token if needed (validity < 30s)
            await keycloak.updateToken(30);
        } catch (error) {
            console.warn("Token refresh failed, using existing token", error);
        }
        // Always attach the token if it exists
        config.headers.Authorization = `Bearer ${keycloak.token}`;
    } else {
        console.warn("No Keycloak token found! Request might fail.");
    }
    return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Course API calls
export const courseService = {
    // Get all courses
    getAllCourses: () => api.get('/courses').then(res => res.data),

    // Get course by ID
    getCourseById: (id) => api.get(`/courses/${id}`).then(res => res.data),

    // Create new course
    createCourse: (courseData) => api.post('/courses', courseData).then(res => res.data),

    // Update course
    updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData).then(res => res.data),

    // Delete course
    deleteCourse: (id) => api.delete(`/courses/${id}`),

    // Search courses
    searchCourses: (keyword) => api.get(`/courses/search?keyword=${keyword}`).then(res => res.data)
};

// Student API calls (if you have them)
export const studentService = {
    getAllStudents: () => api.get('/students').then(res => res.data),
    // Add more student endpoints as needed
};

// Stats API calls
export const statsService = {
    getDashboardStats: () => api.get('/dashboard/stats').then(res => res.data),
};

export default api;