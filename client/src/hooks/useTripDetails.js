import { useQuery } from '@tanstack/react-query';
import { getTripById } from '../services/user/tripService';

export function useTripDetails(tripId) {
  const {
    data: trip,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTripById(tripId),
    enabled: Boolean(tripId),
  });

  return {
    trip,
    isLoading: isPending,
    error: isError
      ? (error?.response?.data?.message ?? 'Could not load trip.')
      : null,
  };
}
