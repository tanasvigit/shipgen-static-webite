import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook used by public demo pages.
 * Navigates directly to the target app route.
 */
export function useDemoCTA(targetAppPath: string) {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(targetAppPath);
  }, [navigate, targetAppPath]);
}

