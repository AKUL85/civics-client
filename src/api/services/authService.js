import apiClient from '../client';

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData);
    return response.data;
  },
  
  enable2FA: async () => {
    const response = await apiClient.post('/auth/2fa/enable');
    return response.data;
  },
  
  verify2FA: async (code) => {
    const response = await apiClient.post('/auth/2fa/verify', { code });
    return response.data;
  },
};