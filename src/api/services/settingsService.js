import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const settingsService = {
  // Get notification settings
  getNotificationSettings: async () => {
    return apiClient.get(ENDPOINTS.SETTINGS.NOTIFICATION);
  },

  // Save notification settings
  saveNotificationSettings: async (settings) => {
    const formData = new FormData();
    Object.keys(settings).forEach((key) => {
      if (settings[key] !== undefined && settings[key] !== null) {
        formData.append(key, settings[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.SETTINGS.NOTIFICATION, formData);
  },
};

export default settingsService;
