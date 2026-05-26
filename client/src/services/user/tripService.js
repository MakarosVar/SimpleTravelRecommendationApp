import apiClient from '../apiClient';

export async function getTripItems() {
  const response = await apiClient.get('/trips');
  return response.data;
}

export async function addTripItem(destinationId) {
  const response = await apiClient.post('/trips', { destinationId });
  return response.data;
}

export async function updateTripItem(destinationId, updates) {
  const response = await apiClient.patch(
    `/trips/${destinationId}`,
    updates,
  );
  return response.data;
}
export async function deleteTripItem(destinationId) {
  const response = await apiClient.delete(`/trips/${destinationId}`);
  return response.data;
}
