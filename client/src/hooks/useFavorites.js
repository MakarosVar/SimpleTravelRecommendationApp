import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from '../services/user/favoritesService';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

export function useFavorites(options = {}) {
  const { enabled = true } = options;
  const { authLoading, isAuthenticated } = useAuth();
  const [favoritesError, setFavoritesError] = useState(null);
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const {
    data: favorites = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: enabled && !authLoading && isAuthenticated,
  });

  function clearFavorites() {
    queryClient.setQueryData(['favorites'], []);
    setFavoritesError(null);
  }
  const favoriteMutation = useMutation({
    mutationFn: ({ destinationId, shouldRemove }) => {
      if (shouldRemove) {
        return deleteFavorite(destinationId);
      }
      return addFavorite(destinationId);
    },

    onMutate: () => {
      setFavoritesError(null);
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
      addToast(
        variables.shouldRemove
          ? 'Removed from favorites'
          : 'Added to favorites',
        'success',
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || 'Could not update favorite';

      setFavoritesError(message);
      addToast(message, 'error');
    },
  });
  function toggleFavorite(destinationId) {
    const shouldRemove = isFavorite(destinationId);

    favoriteMutation.mutate({
      destinationId,
      shouldRemove,
    });
  }
  function isFavorite(destinationId) {
    return favorites.some(
      (destination) => destination._id === destinationId,
    );
  }

  return {
    favorites,
    isLoadingFavorites: isAuthenticated && isPending,
    favoritesError: isError
      ? 'Could not load favorites.'
      : favoritesError,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    reloadFavorites: refetch,
  };
}
