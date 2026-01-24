import { API_CONFIG } from './config';

class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Get auth token from localStorage
  getAuthToken() {
    const loginDetails = localStorage.getItem('login_details');
    if (loginDetails) {
      try {
        const parsed = JSON.parse(loginDetails);
        return parsed.token || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  // Build headers for JSON requests
  getJsonHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Build headers for FormData requests (no Content-Type - browser sets it)
  getFormDataHeaders(customHeaders = {}) {
    const headers = { ...customHeaders };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle response
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      // Handle 401 Unauthorized - redirect to login
      if (response.status === 401) {
        localStorage.removeItem('login_details');
        localStorage.removeItem('user_id');
        window.location.href = '/';
      }

      const error = {
        status: response.status,
        message: data?.message || data || 'Something went wrong',
        data: data,
      };
      throw error;
    }

    return data;
  }

  // Request with timeout
  async fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw { status: 408, message: 'Request timeout' };
      }
      throw error;
    }
  }

  // GET request with token
  async get(endpoint, params = {}, customHeaders = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await this.fetchWithTimeout(url.toString(), {
      method: 'GET',
      headers: this.getJsonHeaders(customHeaders),
    });

    return this.handleResponse(response);
  }

  // POST request with token (JSON body)
  async post(endpoint, body = {}, customHeaders = {}) {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getJsonHeaders(customHeaders),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  // POST request with FormData (multipart/form-data)
  async postFormData(endpoint, formData, customHeaders = {}) {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getFormDataHeaders(customHeaders),
      body: formData,
    });

    return this.handleResponse(response);
  }

  // PUT request with token (JSON body)
  async put(endpoint, body = {}, customHeaders = {}) {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getJsonHeaders(customHeaders),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }

  // PUT request with FormData (multipart/form-data)
  async putFormData(endpoint, formData, customHeaders = {}) {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getFormDataHeaders(customHeaders),
      body: formData,
    });

    return this.handleResponse(response);
  }

  // DELETE request with token
  async delete(endpoint, body = {}, customHeaders = {}) {
    const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getJsonHeaders(customHeaders),
      body: JSON.stringify(body),
    });

    return this.handleResponse(response);
  }
}

// Export singleton instance
const apiClient = new ApiClient();
export default apiClient;
