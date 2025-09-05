import apiClient from '../client';

export const guidesService = {
  getAllGuides: async (category = '') => {
    const response = await apiClient.get('/legal-guides', {
      params: category ? { category } : {},
    });
    return response.data;
  },
  
  getGuideById: async (id) => {
    const response = await apiClient.get(`/legal-guides/${id}`);
    return response.data;
  },
  
  searchGuides: async (query) => {
    const response = await apiClient.get('/legal-guides/search', {
      params: { q: query },
    });
    return response.data;
  },
  
  getCategories: async () => {
    const response = await apiClient.get('/legal-guides/categories');
    return response.data;
  },
  
  getGlossary: async () => {
    const response = await apiClient.get('/legal-guides/glossary');
    return response.data;
  },
};