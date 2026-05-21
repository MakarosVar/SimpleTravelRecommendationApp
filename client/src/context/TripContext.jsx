import { createContext, useEffect, useState } from 'react';
import {
  getTripItems,
  addTripItem,
  updateTripItem as updateTripItemRequest,
  deleteTripItem,
} from '../services/tripService';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState([]);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);
  const [tripError, setTripError] = useState(null);

  function clearTrip() {
    setTrip([]);
  }
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

  async function addToTrip(destinationId) {
    try {
      setTripError(null);

      await addTripItem(destinationId);
      await loadTrip();
    } catch (e) {
      setTripError(e.message);
    }
  }

  async function removeFromTrip(destinationId) {
    try {
      setTripError(null);
      await deleteTripItem(destinationId);
      await loadTrip();
    } catch (e) {
      setTripError(e.message);
    }
  }

  function isInTrip(destinationId) {
    return trip.some((item) => item.destinationId === destinationId);
  }

  async function updateTripItem(destinationId, updates) {
    try {
      setTripError(null);
      await updateTripItemRequest(destinationId, updates);
      await loadTrip();
    } catch (e) {
      setTripError(e.message);
    }
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
        clearTrip,
        reloadTrip: loadTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
