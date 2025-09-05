import apiClient from '../client';

export const lawyersService = {
  getAllLawyers: async (filters = {}) => {
    const response = await apiClient.get('/lawyers', { params: filters });
    return response.data;
  },
  
  getLawyerById: async (id) => {
    const response = await apiClient.get(`/lawyers/${id}`);
    return response.data;
  },
  
  searchLawyers: async (query) => {
    const response = await apiClient.get('/lawyers/search', { params: { q: query } });
    return response.data;
  },
  
  bookConsultation: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },
  
  getConsultations: async () => {
    const response = await apiClient.get('/bookings/my-consultations');
    return response.data;
  },
  
  rateLawyer: async (lawyerId, rating, review) => {
    const response = await apiClient.post(`/lawyers/${lawyerId}/reviews`, {
      rating,
      review,
    });
    return response.data;
  },
};