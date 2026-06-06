import { useQuery } from '@tanstack/react-query';
import { getPackages } from '../services/public/packageService';

export function usePackages(params) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['packages', params],
    queryFn: () => getPackages(params),
  });

  const packages = data?.items ?? [];
  const packageFilters = {
    travelStyles: data?.filters?.travelStyles ?? [],
    durations: data?.filters?.durations ?? [],
  };
  const packagePagination = {
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 9,
    totalPages: data?.totalPages ?? 1,
  };
  return {
    packages,
    packagePagination,
    packageFilters,
    isPackagesLoading: isPending,
    packagesError: isError
      ? (error?.response?.data?.message ?? 'Could not load packages.')
      : null,
    reloadPackages: refetch,
  };
}
