import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const attendanceService = {
  // Mark attendance
  mark: async (attendanceData) => {
    const formData = new FormData();
    Object.keys(attendanceData).forEach((key) => {
      if (attendanceData[key] !== undefined && attendanceData[key] !== null) {
        formData.append(key, attendanceData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.ATTENDANCE.MARK, formData);
  },

  // Set auto-present settings
  setAutoPresent: async (settings) => {
    const formData = new FormData();
    Object.keys(settings).forEach((key) => {
      if (settings[key] !== undefined && settings[key] !== null) {
        formData.append(key, settings[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.ATTENDANCE.AUTO_PRESENT, formData);
  },
};

export default attendanceService;
