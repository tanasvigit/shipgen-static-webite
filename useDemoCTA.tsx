import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook used by public demo pages.
 * Navigates to the contact page for demo requests.
 */
export function useDemoCTA() {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate('/contact');
  }, [navigate]);
}
