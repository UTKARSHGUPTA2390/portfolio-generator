// services/authService.js
// Centralized API layer — all auth API calls go through here
// Interview concept: Separation of Concerns (no API calls inside components)
// Uses withCredentials so the browser sends/receives httpOnly cookies automatically

import axios from 'axios';

// Dedicated axios instance for auth — ensures cookies are always included
const authApi = axios.create({
    baseURL: '/api/auth',
    withCredentials: true, // Required: tells browser to send httpOnly cookies
});

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Object} data - { success, message, data: { id, name, email } }
 */
export const registerUser = async (userData) => {
    const response = await authApi.post('/register', userData);
    return response.data;
};

/**
 * Login an existing user (server sets httpOnly cookie)
 * @param {Object} credentials - { email, password }
 * @returns {Object} data - { success, message, data: { id, name, email } }
 */
export const loginUser = async (credentials) => {
    const response = await authApi.post('/login', credentials);
    return response.data;
};

/**
 * Logout — clears the httpOnly cookie on the server
 * @returns {Object} data - { success, message }
 */
export const logoutUser = async () => {
    const response = await authApi.post('/logout');
    return response.data;
};

/**
 * Get current authenticated user (validates the httpOnly cookie session)
 * Used by AuthContext on app mount to restore auth state after refresh
 * @returns {Object} data - { success, data: { id, name, email } }
 */
export const getMe = async () => {
    const response = await authApi.get('/me');
    return response.data;
};
