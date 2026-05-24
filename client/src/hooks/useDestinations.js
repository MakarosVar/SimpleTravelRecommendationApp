import { getDestinations } from '../services/destinationService';
import { useQuery } from '@tanstack/react-query';

export function useDestinations() {
  const {
    data: destinations = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['destinations'],
    queryFn: getDestinations,
  });

  return {
    destinations,
    isLoading: isPending,
    error: isError ? 'Could not load destinations.' : null,
    reloadDestinations: refetch,
  };
}
