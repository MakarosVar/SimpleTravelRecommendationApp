import apiClient from './apiClient';

export async function getFavorites() {
  const response = await apiClient.get('/favorites');
  return response.data;
}

export async function addFavorite(destinationId) {
  const response = await apiClient.post('/favorites', {
    destinationId,
  });

  return response.data;
}
export async function deleteFavorite(destinationId) {
  const response = await apiClient.delete(
    `/favorites/${destinationId}`,
  );
  return response.data;
}
