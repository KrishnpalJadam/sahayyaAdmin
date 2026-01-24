import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const categoryService = {
  // Get all categories
  getAll: async () => {
    return apiClient.get(ENDPOINTS.CATEGORY.LIST);
  },

  // Get subcategories
  getSubcategories: async () => {
    return apiClient.get(ENDPOINTS.CATEGORY.SUBCATEGORIES);
  },
};

export default categoryService;
