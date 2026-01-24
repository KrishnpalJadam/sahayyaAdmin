import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const authService = {
  // Login with phone number
  login: async (phone_number, country_code = '+91') => {
    const formData = new FormData();
    formData.append('phone_number', phone_number);
    formData.append('country_code', country_code);

    return apiClient.postFormData(ENDPOINTS.AUTH.LOGIN, formData);
  },

  // Verify OTP and get token
  verifyOtp: async (otp, user_id, device_token = '', device_type = 'web') => {
    const formData = new FormData();
    formData.append('otp', otp);
    formData.append('user_id', user_id);
    formData.append('device_token', device_token);
    formData.append('device_type', device_type);

    const response = await apiClient.postFormData(ENDPOINTS.AUTH.VERIFY_OTP, formData);

    // Store token and user info on successful verification
    if (response.token) {
      localStorage.setItem('login_details', JSON.stringify(response));
      localStorage.setItem('user_id', response.user?.id || response.user_id);
    }

    return response;
  },

  // Resend OTP
  resendOtp: async (phone_number, country_code = '+91') => {
    const formData = new FormData();
    formData.append('phone_number', phone_number);
    formData.append('country_code', country_code);

    return apiClient.postFormData(ENDPOINTS.AUTH.RESEND_OTP, formData);
  },

  // Logout
  logout: async () => {
    try {
      await apiClient.postFormData(ENDPOINTS.AUTH.LOGOUT, new FormData());
    } finally {
      localStorage.removeItem('login_details');
      localStorage.removeItem('user_id');
    }
  },

  // Get profile
  getProfile: async () => {
    return apiClient.get(ENDPOINTS.AUTH.PROFILE);
  },

  // Update profile
  updateProfile: async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== undefined && profileData[key] !== null) {
        formData.append(key, profileData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.AUTH.PROFILE_UPDATE, formData);
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('login_details');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const details = localStorage.getItem('login_details');
    return details ? JSON.parse(details) : null;
  },

  // Get token
  getToken: () => {
    const details = localStorage.getItem('login_details');
    if (details) {
      try {
        return JSON.parse(details).token || null;
      } catch {
        return null;
      }
    }
    return null;
  },
};

export default authService;
