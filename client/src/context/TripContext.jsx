import { createContext, useEffect, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState(() => {
    const storedTrip = localStorage.getItem('travelBloomTrip');

    return storedTrip ? JSON.parse(storedTrip) : [];
  });
  useEffect(() => {
    localStorage.setItem('travelBloomTrip', JSON.stringify(trip));
  }, [trip]);

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
        updateTripItem,
        addToTrip,
        removeFromTrip,
        isInTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
