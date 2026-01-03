import apiClient from './api';

const AUTH_ENDPOINTS = {
  REGISTER: import.meta.env?.VITE_API_AUTH_REGISTER || '/auth/register',
  LOGIN: import.meta.env?.VITE_API_AUTH_LOGIN || '/auth/login',
  LOGOUT: import.meta.env?.VITE_API_AUTH_LOGOUT || '/auth/logout',
  VERIFY: import.meta.env?.VITE_API_AUTH_VERIFY || '/auth/verify',
};

export const authService = {
  register: async (userData) => {
    try {
      const response = await apiClient?.post(AUTH_ENDPOINTS?.REGISTER, userData);
      return { success: true, data: response?.data };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  },

  login: async (credentials) => {
    try {
      const response = await apiClient?.post(AUTH_ENDPOINTS?.LOGIN, credentials);
      const { token, user } = response?.data;
      
      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', user?.role || 'employee');
        localStorage.setItem('userEmail', user?.email);
        localStorage.setItem('userId', user?.id);
        localStorage.setItem('userName', user?.fullName || user?.name);
      }
      
      return { success: true, data: response?.data };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  },

  logout: async () => {
    try {
      await apiClient?.post(AUTH_ENDPOINTS?.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient?.get(AUTH_ENDPOINTS?.VERIFY);
      return { success: true, data: response?.data };
    } catch (error) {
      return { success: false, error: 'Token verification failed' };
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  getUserRole: () => {
    return localStorage.getItem('userRole');
  },
};

export default authService;
