import apiClient from '../apiClient';
import { ENDPOINTS } from '../config';

const kycService = {
  // Send Aadhaar OTP
  sendAadhaarOtp: async (aadhar_number) => {
    const formData = new FormData();
    formData.append('aadhar_number', aadhar_number);

    return apiClient.postFormData(ENDPOINTS.KYC.AADHAR_SEND_OTP, formData);
  },

  // Verify Aadhaar with OTP
  verifyAadhaar: async (aadhar_number, otp) => {
    const formData = new FormData();
    formData.append('aadhar_number', aadhar_number);
    formData.append('otp', otp);

    return apiClient.postFormData(ENDPOINTS.KYC.AADHAR_VERIFY, formData);
  },

  // Upload KYC documents
  upload: async (kycData) => {
    const formData = new FormData();
    Object.keys(kycData).forEach((key) => {
      if (kycData[key] !== undefined && kycData[key] !== null) {
        formData.append(key, kycData[key]);
      }
    });

    return apiClient.postFormData(ENDPOINTS.KYC.UPLOAD, formData);
  },

  // Update address
  updateAddress: async (addressData) => {
    const formData = new FormData();
    Object.keys(addressData).forEach((key) => {
      if (addressData[key] !== undefined && addressData[key] !== null) {
        formData.append(key, addressData[key]);
      }
    });

    return apiClient.putFormData(ENDPOINTS.KYC.ADDRESS_UPDATE, formData);
  },
};

export default kycService;
