import { createContext, useEffect, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripItems, setTripItems] = useState(() => {
    const storedTrip = localStorage.getItem('travelBloomTrip');

    return storedTrip ? JSON.parse(storedTrip) : [];
  });
  useEffect(() => {
    localStorage.setItem(
      'travelBloomTrip',
      JSON.stringify(tripItems),
    );
  }, [tripItems]);

  function addToTrip(destinationId) {
    setTripItems((currentTrip) => {
      const newTrips = [...currentTrip, destinationId];
      return newTrips;
    });
  }
  function removeFromTrip(destinationId) {
    setTripItems((currentTrip) => {
      const newTrip = currentTrip.filter(
        (id) => id !== destinationId,
      );
      return newTrip;
    });
  }
  function isInTrip(destinationId) {
    return tripItems.includes(destinationId);
  }

  return (
    <TripContext.Provider
      value={{
        tripItems,
        addToTrip,
        removeFromTrip,
        isInTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
