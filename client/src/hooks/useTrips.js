import { useQuery } from '@tanstack/react-query';
import { getTrips } from '../services/user/tripService';

export function useTrips(options = {}) {
  const { enabled = true } = options;

  const {
    data: trips = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['trips'],
    queryFn: getTrips,
    enabled,
  });

  return {
    trips,
    isLoading: isPending,
    error: isError
      ? (error?.response?.data?.message ?? 'Could not load trips.')
      : null,
  };
}
