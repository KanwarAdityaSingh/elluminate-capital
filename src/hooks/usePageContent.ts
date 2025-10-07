'use client';

import { useState, useEffect, useCallback } from 'react';
import { PageType, HeroContent } from '../types/api';
import { getPageContent } from '../services/api';

interface UsePageContentReturn {
  data: HeroContent | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePageContent = (pageType: PageType): UsePageContentReturn => {
  const [data, setData] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await getPageContent(pageType);
      
      if (data) {
        setData(data);
      } else {
        setError('No data available');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Error fetching page content:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pageType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData is memoized with useCallback, so this won't cause infinite loops

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
