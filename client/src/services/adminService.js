import apiClient from './apiClient';

export async function getAdminDestinations() {
  const response = await apiClient.get('/admin/destinations');

  return response.data;
}

export async function addDestination(destination) {
  const response = await apiClient.post(
    '/admin/destinations',
    destination,
  );

  return response.data;
}
export async function getAdminDestination(destinationId) {
  const response = await apiClient.get(
    `/admin/destinations/${destinationId}`,
  );
  return response.data;
}

export async function updateDestination(destinationId, destination) {
  const response = await apiClient.patch(
    `/admin/destinations/${destinationId}`,
    destination,
  );

  return response.data;
}
export async function updateDestinationStatus(
  destinationId,
  isActive,
) {
  const response = await apiClient.patch(
    `/admin/destinations/${destinationId}/status`,
    { isActive },
  );

  return response.data;
}
