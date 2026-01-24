import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const membersService = {
  // Get all members
  getAll: async () => {
    return apiClient.get(ENDPOINTS.MEMBERS.LIST);
  },

  // Add new member
  add: async (memberData) => {
    const formData = new FormData();
    Object.keys(memberData).forEach((key) => {
      if (memberData[key] !== undefined && memberData[key] !== null) {
        formData.append(key, memberData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.MEMBERS.ADD, formData);
  },

  // Update member
  update: async (memberData) => {
    const formData = new FormData();
    Object.keys(memberData).forEach((key) => {
      if (memberData[key] !== undefined && memberData[key] !== null) {
        formData.append(key, memberData[key]);
      }
    });

    return apiClient.putFormData(ENDPOINTS.MEMBERS.UPDATE, formData);
  },

  // Delete user
  deleteUser: async (user_id) => {
    return apiClient.delete(ENDPOINTS.MEMBERS.DELETE, { user_id });
  },

  // Delete member by ID
  deleteMember: async (id, user_id) => {
    return apiClient.delete(ENDPOINTS.MEMBERS.DELETE_MEMBER(id), { user_id });
  },
};

export default membersService;
