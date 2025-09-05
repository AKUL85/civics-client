import { useQuery as useTanStackQuery } from '@tanstack/react-query';

export const useQuery = (key, queryFn, options = {}) => {
  return useTanStackQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

export const useLawyersQuery = (filters = {}) => {
  return useQuery(
    ['lawyers', filters],
    () => {
      // Mock API call - replace with actual API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockLawyers);
        }, 1000);
      });
    }
  );
};

export const useGuidesQuery = (category = '') => {
  return useQuery(
    ['guides', category],
    () => {
      // Mock API call - replace with actual API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockGuides);
        }, 1000);
      });
    }
  );
};