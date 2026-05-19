import { TRIPS_API_URL } from '../config/api';
import { handleResponse } from '../utils/handleResponse';

export async function getTripItems() {
  const response = await fetch(TRIPS_API_URL);
  return handleResponse(response);
}

export async function addTripItem(destinationId) {
  const response = await fetch(TRIPS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ destinationId }),
  });

  return handleResponse(response);
}

export async function updateTripItem(destinationId, updates) {
  const response = await fetch(TRIPS_API_URL + '/' + destinationId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
}
export async function deleteTripItem(destinationId) {
  const response = await fetch(TRIPS_API_URL + '/' + destinationId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
}
