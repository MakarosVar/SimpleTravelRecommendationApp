import { FAVORITES_API_URL } from '../config/api';
import { handleResponse } from '../utils/handleResponse';

export async function getFavorites() {
  const response = await fetch(FAVORITES_API_URL);
  return handleResponse(response);
}

export async function addFavorite(destinationId) {
  const response = await fetch(FAVORITES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destinationId }),
  });
  return handleResponse(response);
}
export async function deleteFavorite(destinationId) {
  const response = await fetch(
    FAVORITES_API_URL + '/' + destinationId,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return handleResponse(response);
}
