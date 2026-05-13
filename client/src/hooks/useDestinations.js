import { useEffect, useState } from 'react';
import { getDestinations } from '../services/destinationService';

export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDestinations() {
      try {
        setIsLoading(true);
        setError(null);

        const loadedDestinations = await getDestinations();

        setDestinations(loadedDestinations);
      } catch {
        setError('Could not load destinations.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDestinations();
  }, []);

  return {
    destinations,
    isLoading,
    error,
  };
}
