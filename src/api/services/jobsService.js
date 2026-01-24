import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const jobsService = {
  // Get all jobs (admin authenticated)
  getAll: async () => {
    return apiClient.get(ENDPOINTS.JOBS.LIST);
  },

  // Add new job
  add: async (jobData) => {
    const formData = new FormData();
    Object.keys(jobData).forEach((key) => {
      if (jobData[key] !== undefined && jobData[key] !== null) {
        formData.append(key, jobData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.JOBS.ADD, formData);
  },

  // Update job
  update: async (jobData) => {
    const formData = new FormData();
    Object.keys(jobData).forEach((key) => {
      if (jobData[key] !== undefined && jobData[key] !== null) {
        formData.append(key, jobData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.JOBS.UPDATE, formData);
  },

  // Delete job
  delete: async (job_id) => {
    return apiClient.delete(ENDPOINTS.JOBS.DELETE, { job_id });
  },

  // Get job applications
  getApplications: async () => {
    return apiClient.get(ENDPOINTS.JOBS.APPLICATIONS);
  },

  // Update application status
  updateApplicationStatus: async (application_id, status) => {
    const formData = new FormData();
    formData.append('application_id', application_id);
    formData.append('status', status);

    return apiClient.putFormData(ENDPOINTS.JOBS.APPLICATION_STATUS, formData);
  },
};

export default jobsService;
