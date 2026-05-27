import { useQuery } from '@tanstack/react-query';
import { getPackageById } from '../services/public/packageService';

export function usePackageDetails(packageId) {
  const {
    data: packageItem,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: Boolean(packageId),
  });

  return {
    packageItem,
    isLoading: isPending,
    error: isError
      ? (error?.response?.data?.message ?? 'Could not load package.')
      : null,
  };
}
