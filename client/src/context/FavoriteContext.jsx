import { createContext, useEffect, useState } from 'react';
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from '../services/favoritesService';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [favoritesError, setFavoritesError] = useState(null);

  async function loadFavorites() {
    try {
      setIsLoadingFavorites(true);
      setFavoritesError(null);
      const storedFavorites = await getFavorites();
      setFavorites(storedFavorites);
    } catch (e) {
      setFavoritesError(e.message);
    } finally {
      setIsLoadingFavorites(false);
    }
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function toggleFavorite(destinationId) {
    try {
      setFavoritesError(null);
      if (isFavorite(destinationId)) {
        await deleteFavorite(destinationId);
      } else {
        await addFavorite(destinationId);
      }
      await loadFavorites();
    } catch (e) {
      setFavoritesError(e.message);
    }
  }

  function isFavorite(destinationId) {
    return favorites.some(
      (destination) => destination.id === destinationId,
    );
  }

  return (
    <FavContext.Provider
      value={{
        favorites,
        isLoadingFavorites,
        favoritesError,
        toggleFavorite,
        isFavorite,
        reloadFavorites: loadFavorites,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
