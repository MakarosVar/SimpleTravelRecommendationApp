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
