import { createContext, useEffect, useState } from 'react';
import { getTripItems, saveTripItems } from '../services/tripService';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState([]);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);
  const [tripError, setTripError] = useState(null);

  async function loadTrip() {
    try {
      setIsLoadingTrip(true);
      setTripError(null);

      const storedTrip = await getTripItems();

      setTrip(storedTrip);
    } catch {
      setTripError('Could not load trip.');
    } finally {
      setIsLoadingTrip(false);
    }
  }
  useEffect(() => {
    loadTrip();
  }, []);

  useEffect(() => {
    if (isLoadingTrip) {
      return;
    }

    async function persistTrip() {
      try {
        setTripError(null);

        await saveTripItems(trip);
      } catch {
        setTripError('Could not save trip.');
      }
    }

    persistTrip();
  }, [trip, isLoadingTrip]);

  function addToTrip(destinationId) {
    setTrip((currentTrip) => {
      if (
        currentTrip.some(
          (item) => item.destinationId === destinationId,
        )
      ) {
        return currentTrip;
      }

      return [
        ...currentTrip,
        {
          destinationId,
          note: '',
          priority: 'medium',
        },
      ];
    });
  }

  function removeFromTrip(destinationId) {
    setTrip((currentTrip) =>
      currentTrip.filter(
        (item) => item.destinationId !== destinationId,
      ),
    );
  }

  function isInTrip(destinationId) {
    return trip.some((item) => item.destinationId === destinationId);
  }

  function updateTripItem(destinationId, updates) {
    setTrip((currentTrip) =>
      currentTrip.map((item) =>
        item.destinationId === destinationId
          ? { ...item, ...updates }
          : item,
      ),
    );
  }

  return (
    <TripContext.Provider
      value={{
        trip,
        isLoadingTrip,
        tripError,
        updateTripItem,
        addToTrip,
        removeFromTrip,
        isInTrip,
        reloadTrip: loadTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
