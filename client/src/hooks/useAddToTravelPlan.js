import { useTrips } from './useTrips';
import { useAuth } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../context/ToastContext';
import { addTripItem } from '../services/user/tripService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAddToTravelPlan() {
  const navigate = useNavigate();
  const [isPlanPickerOpen, setIsPlanPickerOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] =
    useState(null);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuth();
  const { trips, isLoading, error } = useTrips({
    enabled: isAuthenticated,
  });
  const addToTripPlanMutation = useMutation({
    mutationFn: ({ tripId, destinationId }) =>
      addTripItem(tripId, destinationId),
    onSuccess: async (updatedTrip) => {
      await queryClient.invalidateQueries({ queryKey: ['trips'] });
      await queryClient.invalidateQueries({
        queryKey: ['trip', updatedTrip._id],
      });
      addToast('Destination added successfully', 'success');
      closeAddToPlan();
    },
    onError: (error) => {
      addToast(
        error?.response?.data?.message ??
          'Could not add destination to travel plan',
        'error',
      );
    },
  });

  function openAddToPlan(destination) {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSelectedDestination(destination);
    setSelectedTripId(null);
    setIsPlanPickerOpen(true);
  }
  function closeAddToPlan() {
    setSelectedDestination(null);
    setSelectedTripId(null);
    setIsPlanPickerOpen(false);
  }
  function submitAddToPlan(e) {
    e.preventDefault();

    if (!selectedTripId || !selectedDestination) return;

    addToTripPlanMutation.mutate({
      tripId: selectedTripId,
      destinationId: selectedDestination._id,
    });
  }
  return {
    openAddToPlan,
    modalProps: {
      isOpen: isPlanPickerOpen,
      onClose: closeAddToPlan,
      trips,
      isTripsLoading: isLoading,
      isTripsError: Boolean(error),
      selectedTripId,
      onSelectTrip: setSelectedTripId,
      onSubmit: submitAddToPlan,
      isPending: addToTripPlanMutation.isPending,
      destinationId: selectedDestination?._id,
    },
  };
}
