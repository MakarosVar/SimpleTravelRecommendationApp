import { createContext, useState } from 'react';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  function toggleFavorite(destinationId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(destinationId)) {
        const nextFavorites = currentFavorites.filter(
          (id) => id !== destinationId,
        );
        return nextFavorites;
      }

      const nextFavorites = [...currentFavorites, destinationId];
      return nextFavorites;
    });
  }

  function isFavorite(destinationId) {
    return favorites.includes(destinationId);
  }

  return (
    <FavContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};
