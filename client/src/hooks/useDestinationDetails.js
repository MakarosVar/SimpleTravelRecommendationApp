// import { useEffect, useState } from 'react';
import { getDestinationById } from '../services/destinationService';
import { useQuery } from '@tanstack/react-query';

export function useDestinationDetails(destinationId) {
  const {
    data: destination,
    isPending: isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: () => getDestinationById(destinationId),
    enabled: Boolean(destinationId),
  });
  return {
    destination,
    isLoading,
    error: isError ? 'Could not load destination.' : null,
    reloadDestination: refetch,
  };
}
