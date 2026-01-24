import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const salaryService = {
  // Get staff salary info
  getStaffSalary: async () => {
    return apiClient.get(ENDPOINTS.SALARY.STAFF_LIST);
  },

  // Get salary list
  getAll: async () => {
    return apiClient.get(ENDPOINTS.SALARY.LIST);
  },
};

export default salaryService;
