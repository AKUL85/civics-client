import apiClient from '../client';

export const aiService = {
  askQuestion: async (question, language = 'bn') => {
    const response = await apiClient.post('/ai/ask', {
      question,
      language,
    });
    return response.data;
  },
  
  validateResponse: async (responseId, validation) => {
    const response = await apiClient.post(`/ai/validate/${responseId}`, {
      validation,
    });
    return response.data;
  },
  
  getConversationHistory: async () => {
    const response = await apiClient.get('/ai/history');
    return response.data;
  },
  
  clearHistory: async () => {
    const response = await apiClient.delete('/ai/history');
    return response.data;
  },
};