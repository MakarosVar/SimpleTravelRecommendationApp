import apiClient from './apiClient';

export async function getDestinations() {
  const response = await apiClient.get('/destinations');

  return response.data;
}

export async function getDestinationById(id) {
  const response = await apiClient.get(`/destinations/${id}`);

  return response.data;
}
