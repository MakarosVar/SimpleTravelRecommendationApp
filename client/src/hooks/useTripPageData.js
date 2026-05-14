import { useContext } from 'react';
import { useDestinations } from './useDestinations';
import { TripContext } from '../context/TripContext';

export default function useTripPageData() {
  const {
    trip,
    isLoadingTrip,
    tripError,
    reloadTrip,
    updateTripItem,
    removeFromTrip,
  } = useContext(TripContext);
  const { destinations, isLoading, error, reloadDestinations } =
    useDestinations();
  const pageError = error || tripError;
  const isPageLoading = isLoading || isLoadingTrip;
  const tripItems = trip
    .map((tripItem) => {
      const destination = destinations.find(
        (destination) => destination.id === tripItem.destinationId,
      );

      return {
        ...tripItem,
        destination,
      };
    })
    .filter((tripItem) => tripItem.destination);
  function retry() {
    if (error) reloadDestinations();
    if (tripError) reloadTrip();
  }
  return {
    tripItems,
    isPageLoading,
    pageError,
    retry,
    updateTripItem,
    removeFromTrip,
  };
}
