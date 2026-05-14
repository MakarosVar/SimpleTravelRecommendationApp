import { useEffect, useState } from 'react';
import { getDestinationById } from '../services/destinationService';

export function useDestinationDetails(destinationId) {
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  async function loadDestination(id) {
    try {
      setIsLoading(true);
      setError(null);

      const loadedDestination = await getDestinationById(id);

      setDestination(loadedDestination);
    } catch {
      setError('Could not load destination.');
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadDestination(destinationId);
  }, [destinationId]);
  return {
    destination,
    isLoading,
    error,
    reloadDestination: () => loadDestination(destinationId),
  };
}
