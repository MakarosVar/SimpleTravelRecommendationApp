import apiClient from '../apiClient';

export async function getTrips() {
  const response = await apiClient.get('/trips');
  return response.data;
}

export async function createTrip(payload) {
  const response = await apiClient.post('/trips', payload);
  return response.data;
}

export async function deleteTrip(tripId) {
  const response = await apiClient.delete(`/trips/${tripId}`);
  return response.data;
}

export async function getTripById(tripId) {
  const response = await apiClient.get(`/trips/${tripId}`);
  return response.data;
}

export async function updateTrip(tripId, payload) {
  const response = await apiClient.patch(`/trips/${tripId}`, payload);
  return response.data;
}

export async function addTripItem(tripId, destinationId) {
  const response = await apiClient.post(`/trips/${tripId}/items`, {
    destinationId,
  });

  return response.data;
}

export async function updateTripItem(tripId, destinationId, updates) {
  const response = await apiClient.patch(
    `/trips/${tripId}/items/${destinationId}`,
    updates,
  );

  return response.data;
}

export async function deleteTripItem(tripId, destinationId) {
  const response = await apiClient.delete(
    `/trips/${tripId}/items/${destinationId}`,
  );

  return response.data;
}
