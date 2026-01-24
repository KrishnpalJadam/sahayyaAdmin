import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const dashboardService = {
  // Get dashboard data
  getData: async () => {
    return apiClient.get(ENDPOINTS.DASHBOARD.DATA);
  },
};

export default dashboardService;
