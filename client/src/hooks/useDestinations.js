import { getDestinations } from '../services/public/destinationService';
import { useQuery } from '@tanstack/react-query';

export function useDestinations(params) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['destinations', params],
    queryFn: () => getDestinations(params),
  });
  const destinations = data?.items ?? [];
  const filters = {
    types: data?.filters?.types ?? [],
    tags: data?.filters?.tags ?? [],
  };
  const pagination = {
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 9,
    totalPages: data?.totalPages ?? 1,
  };
  return {
    destinations,
    pagination,
    filters,
    isLoading: isPending,
    error: isError ? 'Could not load destinations.' : null,
    reloadDestinations: refetch,
  };
}
