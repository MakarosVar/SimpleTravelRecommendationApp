import { useQuery } from '@tanstack/react-query';
import { getPackages } from '../services/public/packageService';

export function usePackages() {
  const {
    data: packages = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });

  return {
    packages,
    isPackagesLoading: isPending,
    packagesError: isError
      ? (error?.response?.data?.message ?? 'Could not load packages.')
      : null,
  };
}
