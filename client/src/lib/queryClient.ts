import { QueryClient } from '@tanstack/react-query';
import { ApiResponse } from '../../../shared/schema';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Default fetcher function
export const apiRequest = async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'API request failed');
  }

  return data.data as T;
};

// Set up default query function
queryClient.setQueryDefaults(['default'], {
  queryFn: async ({ queryKey }) => {
    const [url] = queryKey as [string];
    return apiRequest(url);
  },
});

// Current user ID (in a real app, this would come from authentication)
export const CURRENT_USER_ID = '1';
export const CURRENT_USERNAME = '@creativevibe';