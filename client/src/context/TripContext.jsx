import { createContext, useState } from 'react';
import {
  getTripItems,
  addTripItem,
  updateTripItem as updateTripItemRequest,
  deleteTripItem,
} from '../services/tripService';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripError, setTripError] = useState(null);
  const queryClient = useQueryClient();
  const { authLoading, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const {
    data: trip = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['trip'],
    queryFn: getTripItems,
    enabled: !authLoading && isAuthenticated,
  });

  function clearTrip() {
    queryClient.setQueryData(['trip'], []);
    setTripError(null);
  }
  const tripMutation = useMutation({
    mutationFn: ({ destinationId, shouldRemove }) => {
      if (shouldRemove) {
        return deleteTripItem(destinationId);
      }

      return addTripItem(destinationId);
    },
    onMutate: () => {
      setTripError(null);
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['trip'] });

      addToast(
        variables.shouldRemove
          ? 'Removed from trip'
          : 'Added to trip',
        'success',
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || 'Could not update trip';

      setTripError(message);
      addToast(message, 'error');
    },
  });
  const updateTripItemMutation = useMutation({
    mutationFn: ({ destinationId, updates }) =>
      updateTripItemRequest(destinationId, updates),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trip'],
      });

      addToast('Trip item updated', 'success');
    },
    onMutate: () => {
      setTripError(null);
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || 'Could not update trip item';

      setTripError(message);
      addToast(message, 'error');
    },
  });
  function toggleTripItem(destinationId) {
    const shouldRemove = isInTrip(destinationId);

    tripMutation.mutate({
      destinationId,
      shouldRemove,
    });
  }
  function isInTrip(destinationId) {
    return trip.some((item) => item.destinationId === destinationId);
  }

  function updateTripItem(destinationId, updates) {
    updateTripItemMutation.mutate({ destinationId, updates });
  }

  return (
    <TripContext.Provider
      value={{
        trip,
        isLoadingTrip: isAuthenticated && isPending,
        tripError: isError ? 'Could not load trip.' : tripError,
        updateTripItem,
        toggleTripItem,
        isInTrip,
        clearTrip,
        reloadTrip: refetch,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
