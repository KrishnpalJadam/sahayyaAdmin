import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const leaveService = {
  // Get leave types
  getLeaveTypes: async () => {
    return apiClient.get(ENDPOINTS.LEAVE.TYPE_LIST);
  },

  // Get leave list
  getAll: async () => {
    return apiClient.get(ENDPOINTS.LEAVE.LIST);
  },

  // Approve leave
  approve: async (id) => {
    return apiClient.postFormData(ENDPOINTS.LEAVE.APPROVE(id), new FormData());
  },

  // Reject leave
  reject: async (id) => {
    return apiClient.postFormData(ENDPOINTS.LEAVE.REJECT(id), new FormData());
  },
};

export default leaveService;
