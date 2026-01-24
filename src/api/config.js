// API Configuration
export const API_CONFIG = {
  // Production URL
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://sahayya.co.in/public/api/',
  TIMEOUT: 30000,
};

// API Endpoints - Admin Routes Only
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: 'customer/login',
    VERIFY_OTP: 'verify-otp',
    RESEND_OTP: 'resend-otp',
    LOGOUT: 'logout',
    PROFILE: 'profile',
    PROFILE_UPDATE: 'profile/update',
  },

  // Admin - Members Management
  MEMBERS: {
    LIST: 'admin/members/list',
    ADD: 'admin/members/store',
    UPDATE: 'admin/members',
    DELETE: 'admin/delete-user',
    DELETE_MEMBER: (id) => `delete/member/${id}`,
  },

  // Admin - Jobs Management
  JOBS: {
    LIST: 'admin/auth-jobs',
    ADD: 'admin/jobs',
    UPDATE: 'admin/jobs',
    DELETE: 'admin/jobs/delete',
    APPLICATIONS: 'admin/jobs',
    APPLICATION_STATUS: 'admin/applications',
  },

  // Household - Staff Management
  STAFF: {
    LIST: 'staff/list',
    ADD: 'staff/add',
    UPDATE: 'staff/update',
    ACTIVE_TODAY: 'housersold/staff/active-today',
  },

  // Household - Attendance
  ATTENDANCE: {
    MARK: 'housersold/attendance',
    AUTO_PRESENT: 'settings/AutoPresent',
  },

  // Household - Salary Management
  SALARY: {
    STAFF_LIST: 'housesold/salary/staff',
    LIST: 'housesold/salary/list',
  },

  // Leave Management
  LEAVE: {
    TYPE_LIST: 'customer/leave-type-list',
    LIST: 'customer/leave-list',
    APPROVE: (id) => `customer/leave-approve/${id}`,
    REJECT: (id) => `customer/leave-reject/${id}`,
  },

  // Dashboard
  DASHBOARD: {
    DATA: 'customer/dashbord-data',
  },

  // Settings & Notifications
  SETTINGS: {
    NOTIFICATION: 'settings/notification',
  },

  // KYC & Verification
  KYC: {
    AADHAR_SEND_OTP: 'aadhar/send-otp',
    AADHAR_VERIFY: 'aadhar/verify',
    UPLOAD: 'kyc/upload',
    ADDRESS_UPDATE: 'addresses/update',
  },

  // Categories
  CATEGORY: {
    LIST: 'category',
    SUBCATEGORIES: 'category/subcategories',
  },

  // Subscriptions
  SUBSCRIPTIONS: 'subscriptions',
};
