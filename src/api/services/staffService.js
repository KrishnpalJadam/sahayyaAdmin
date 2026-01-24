import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const staffService = {
  // Get all staff
  getAll: async () => {
    return apiClient.get(ENDPOINTS.STAFF.LIST);
  },

  // Add new staff
  add: async (staffData) => {
    const formData = new FormData();
    Object.keys(staffData).forEach((key) => {
      if (staffData[key] !== undefined && staffData[key] !== null) {
        formData.append(key, staffData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.STAFF.ADD, formData);
  },

  // Update staff
  update: async (staffData) => {
    const formData = new FormData();
    Object.keys(staffData).forEach((key) => {
      if (staffData[key] !== undefined && staffData[key] !== null) {
        formData.append(key, staffData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.STAFF.UPDATE, formData);
  },

  // Get active staff today
  getActiveToday: async () => {
    return apiClient.get(ENDPOINTS.STAFF.ACTIVE_TODAY);
  },
};

export default staffService;
